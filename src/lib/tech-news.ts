import "server-only";

import { Redis } from "@upstash/redis";
import { XMLParser } from "fast-xml-parser";
import { NEWS_MAX_STALE_MS, resolveNews, type NewsSnapshot } from "./news-cache";

const xmlParser = new XMLParser({ ignoreAttributes: false, parseTagValue: false });
const FEED_TIMEOUT_MS = 3500;
const FAILURE_RETRY_MS = 2 * 60 * 1000;
const NEWS_CACHE_KEY = "helpful-npc:news:v3";
const fetchOptions = { next: { revalidate: 1800 } };
let memorySnapshot: NewsSnapshot | null = null;
let pendingNews: Promise<NewsItem[]> | null = null;
let retryAfter = 0;

export type NewsSource = "GeekNews" | "전자신문" | "AI타임스";

export type NewsItem = {
  title: string;
  url: string;
  publishedAt: string;
  source: NewsSource;
};

function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object" && "#text" in value) return text(value["#text"]);
  return "";
}

function items(value: unknown): Record<string, unknown>[] {
  const list = Array.isArray(value) ? value : value ? [value] : [];
  return list.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
}

function safeUrl(value: unknown, hostname: string, pathPrefix = "/"): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== hostname || !url.pathname.startsWith(pathPrefix)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function decodeEntities(value: string): string {
  const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…" };
  return value.replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#")) {
      const hexadecimal = entity[1]?.toLowerCase() === "x";
      const point = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : match;
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

function newsItem(source: NewsSource, titleValue: unknown, url: string | null, dateValue: unknown): NewsItem | null {
  const title = decodeEntities(text(titleValue));
  const rawDate = text(dateValue);
  const publishedAt = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(rawDate)
    ? `${rawDate.replace(" ", "T")}+09:00`
    : rawDate;
  if (!title || !url || !publishedAt || Number.isNaN(Date.parse(publishedAt))) return null;
  return { source, title, url, publishedAt: new Date(publishedAt).toISOString() };
}

async function fetchXml(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, { ...fetchOptions, signal: AbortSignal.timeout(FEED_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return xmlParser.parse(await response.text());
}

async function geekNews(): Promise<NewsItem[]> {
  const parsed = await fetchXml("https://news.hada.io/rss/news");
  const feed = parsed.feed as Record<string, unknown> | undefined;
  return items(feed?.entry).flatMap((entry) => {
    const link = items(entry.link).find((item) => item["@_rel"] === "alternate" && item["@_type"] === "text/html");
    const url = safeUrl(link?.["@_href"], "news.hada.io", "/topic");
    const item = newsItem("GeekNews", entry.title, url, entry.published ?? entry.updated);
    return item ? [item] : [];
  }).slice(0, 50);
}

async function rssNews(feedUrl: string, source: NewsSource, hostname: string): Promise<NewsItem[]> {
  const parsed = await fetchXml(feedUrl);
  const rss = parsed.rss as Record<string, unknown> | undefined;
  const channel = rss?.channel as Record<string, unknown> | undefined;
  return items(channel?.item).flatMap((entry) => {
    const item = newsItem(source, entry.title, safeUrl(text(entry.link), hostname), entry.pubDate);
    return item ? [item] : [];
  });
}

async function safeLoad(source: NewsSource, load: () => Promise<NewsItem[]>): Promise<NewsItem[]> {
  try {
    return await load();
  } catch (error) {
    console.error(`Failed to load ${source} feed`, error);
    return [];
  }
}

async function loadFreshNews(): Promise<NewsItem[]> {
  const feeds = await Promise.all([
    safeLoad("GeekNews", geekNews),
    safeLoad("전자신문", () => rssNews("https://rss.etnews.com/03.xml", "전자신문", "www.etnews.com")),
    safeLoad("AI타임스", () => rssNews("https://www.aitimes.com/rss/allArticle.xml", "AI타임스", "www.aitimes.com")),
  ]);

  for (const feed of feeds) feed.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  const merged: NewsItem[] = [];
  const seen = new Set<string>();
  const longest = Math.max(...feeds.map((feed) => feed.length));
  for (let index = 0; index < longest; index++) {
    for (const feed of feeds) {
      const item = feed[index];
      if (!item) continue;
      const key = item.title.toLocaleLowerCase().replace(/\s+/g, " ");
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(item);
    }
  }
  return merged;
}

function hasRedis() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function readSnapshot(): Promise<NewsSnapshot | null> {
  if (memorySnapshot && Date.now() - memorySnapshot.updatedAt < NEWS_MAX_STALE_MS) return memorySnapshot;
  if (!hasRedis()) return null;

  try {
    const snapshot = await Redis.fromEnv().get<NewsSnapshot>(NEWS_CACHE_KEY);
    if (!snapshot || !Array.isArray(snapshot.items) || !Number.isFinite(snapshot.updatedAt)
      || Date.now() - snapshot.updatedAt >= NEWS_MAX_STALE_MS) return null;
    memorySnapshot = snapshot;
    return snapshot;
  } catch {
    return null;
  }
}

async function persistSnapshot(snapshot: NewsSnapshot): Promise<void> {
  memorySnapshot = snapshot;
  if (!hasRedis()) return;
  try {
    await Redis.fromEnv().set(NEWS_CACHE_KEY, snapshot, { ex: NEWS_MAX_STALE_MS / 1000 });
  } catch {
    // The in-memory snapshot still keeps this server instance useful.
  }
}

export async function getTechNews(): Promise<NewsItem[]> {
  if (!pendingNews) {
    pendingNews = (async () => {
      const snapshot = await readSnapshot();
      if (Date.now() < retryAfter) return snapshot?.items ?? [];
      return resolveNews(snapshot, Date.now(), async () => {
        const fresh = await loadFreshNews();
        retryAfter = fresh.length ? 0 : Date.now() + FAILURE_RETRY_MS;
        return fresh;
      }, persistSnapshot);
    })().finally(() => { pendingNews = null; });
  }
  return pendingNews;
}

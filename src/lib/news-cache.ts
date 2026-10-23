import type { NewsItem } from "./tech-news";

export type NewsSnapshot = { items: NewsItem[]; updatedAt: number };

export const NEWS_FRESH_MS = 30 * 60 * 1000;
export const NEWS_MAX_STALE_MS = 48 * 60 * 60 * 1000;

export async function resolveNews(
  snapshot: NewsSnapshot | null,
  now: number,
  refresh: () => Promise<NewsItem[]>,
  persist: (next: NewsSnapshot) => Promise<void>,
): Promise<NewsItem[]> {
  const usable = snapshot && snapshot.items.length > 0 && now - snapshot.updatedAt < NEWS_MAX_STALE_MS
    ? snapshot
    : null;
  if (usable && now - usable.updatedAt < NEWS_FRESH_MS) return usable.items;

  try {
    const fresh = await refresh();
    if (fresh.length) {
      await persist({ items: fresh, updatedAt: now });
      return fresh;
    }
  } catch {
    // A failed refresh must not erase the last successfully fetched stories.
  }

  return usable?.items ?? [];
}

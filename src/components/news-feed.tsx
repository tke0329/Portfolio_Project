"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/lib/tech-news";

const PAGE_SIZE = 15;
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <a className={`news-card${index === 0 ? " news-card-featured" : ""}`} href={item.url} target="_blank" rel="noopener noreferrer">
      <span className="news-card-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="news-card-content">
        <div className="news-card-meta">
          <span>{item.source.toUpperCase()}</span>
          <time dateTime={item.publishedAt}>{dateFormatter.format(new Date(item.publishedAt))} KST</time>
        </div>
        <h2>{item.title}</h2>
        <span className="news-card-action">{item.source}에서 읽기 <ArrowUpRight size={16} aria-hidden="true" /></span>
      </div>
      <ArrowUpRight className="news-card-arrow" size={22} aria-hidden="true" />
    </a>
  );
}

export function NewsFeed({ items }: { items: NewsItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const remaining = Math.max(items.length - visibleCount, 0);

  return (
    <>
      <div className="news-list">{items.slice(0, visibleCount).map((item, index) => <NewsCard item={item} index={index} key={item.url} />)}</div>
      <div className="news-feed-progress" aria-live="polite">{Math.min(visibleCount, items.length)} / {items.length}개 소식</div>
      {remaining > 0 && (
        <button className="news-more" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
          {Math.min(remaining, PAGE_SIZE)}개 더 보기 <ArrowDown size={17} aria-hidden="true" />
        </button>
      )}
    </>
  );
}

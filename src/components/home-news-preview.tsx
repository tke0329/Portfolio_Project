"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Rss } from "lucide-react";
import type { NewsItem } from "@/lib/tech-news";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "2-digit",
  day: "2-digit",
});

export function HomeNewsPreview() {
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/news/preview", { signal: controller.signal });
        if (!response.ok) throw new Error("News preview unavailable");
        const data = (await response.json()) as { items: NewsItem[] };
        setItems(data.items);
      } catch {
        if (!controller.signal.aborted) setItems([]);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  return (
    <section className="home-news-section" aria-labelledby="home-news-title">
      <div className="shell home-news-wrap">
        <div className="home-news-heading">
          <div>
            <span className="home-news-kicker"><Rss size={13} aria-hidden="true" /> THE WIZARD&apos;S DISPATCH</span>
            <h2 id="home-news-title">마법사의 <em>소식지</em></h2>
            <p>작업실에 도착한 오늘의 개발 소식을 펼쳐보세요.</p>
          </div>
          <Link href="/news" className="home-news-more">전체 소식 보기 <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>

        <div className="home-news-list" aria-live="polite">
          {items === null ? (
            <div className="home-news-status">새로운 소식을 펼치는 중입니다…</div>
          ) : items.length === 0 ? (
            <div className="home-news-status">지금은 최신 소식을 불러오지 못했습니다. 소식지에서 다시 확인해 주세요.</div>
          ) : (
            items.map((item, index) => (
              <a className="home-news-item" href={item.url} target="_blank" rel="noopener noreferrer" key={item.url}>
                <span className="home-news-item-body">
                  <span className="home-news-meta"><strong>{item.source}</strong><time dateTime={item.publishedAt}>{dateFormatter.format(new Date(item.publishedAt))}</time></span>
                  <span className="home-news-title">{item.title}</span>
                  <span className="home-news-item-foot"><span className="home-news-index">NO. {String(index + 1).padStart(2, "0")}</span><span className="home-news-read">원문 읽기 <ArrowUpRight size={16} aria-hidden="true" /></span></span>
                </span>
              </a>
            ))
          )}
        </div>
        <Link href="/news" className="home-news-more home-news-more-mobile">전체 소식 보기 <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

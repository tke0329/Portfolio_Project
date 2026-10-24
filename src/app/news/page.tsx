import type { Metadata } from "next";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { NewsFeed } from "@/components/news-feed";
import { getTechNews } from "@/lib/tech-news";

export const metadata: Metadata = {
  title: "기술 소식",
  description: "GeekNews, 전자신문, AI타임스의 최신 IT/기술 소식을 한곳에서 봅니다.",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const items = await getTechNews();

  return (
    <div className="news-page">
      <div className="shell news-shell">
        <div className="news-masthead">
          <div>
            <span className="news-kicker"><Sparkles size={14} aria-hidden="true" /> TECH BULLETIN</span>
            <h1>기술 소식지<span aria-hidden="true">.</span></h1>
            <p>GeekNews, 전자신문, AI타임스의 최신 IT 이슈를 모았습니다.<br />제목을 누르면 출처의 원문으로 이동합니다.</p>
          </div>
          <div className="news-masthead-art" aria-hidden="true"><span>✦</span><span>NEWS</span><span>✦</span></div>
        </div>

        <div className="news-board">
          <span className="news-board-hardware news-board-hardware-tl" aria-hidden="true" />
          <span className="news-board-hardware news-board-hardware-tr" aria-hidden="true" />
          <span className="news-board-hardware news-board-hardware-bl" aria-hidden="true" />
          <span className="news-board-hardware news-board-hardware-br" aria-hidden="true" />
          <div className="news-board-head">
            <div><span className="news-live-dot" aria-hidden="true" /> <strong>소식 모아보기</strong> </div>
            
          </div>
          {items.length > 0 ? (
            <NewsFeed items={items} />
          ) : (
            <div className="news-empty">
              <p>지금은 소식을 불러오지 못했습니다.</p>
              <a href="https://news.hada.io" target="_blank" rel="noopener noreferrer">GeekNews에서 바로 보기 <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          )}
          <div className="news-board-foot">
            <span>출처별 최신 글을 번갈아 표시 · 약 30분 간격 갱신</span>
            <div className="news-source-links">
              <a href="https://news.hada.io" target="_blank" rel="noopener noreferrer">GeekNews <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href="https://www.etnews.com" target="_blank" rel="noopener noreferrer">전자신문 <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href="https://www.aitimes.com" target="_blank" rel="noopener noreferrer">AI타임스 <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

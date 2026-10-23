import Link from "next/link";
import { ChevronDown, BookOpenText, CodeXml, Compass, Mail, Dot } from "lucide-react";
import { HeroNpcChat } from "@/components/hero-npc-chat";
import { HomeNewsPreview } from "@/components/home-news-preview";
import { NpcDialogue } from "@/components/npc-dialogue";
import { profile } from "@/data/profile";
import { logs } from "@/data/logs";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-background" />
        <div className="hero-shade" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">DEVELOPER PORTFOLIO</span>
            <h1 id="hero-title">평범한<br /><em>마법사인</em> 내가<br />이 세계에선<br /><em>개발자?</em></h1>
            <p>{profile.introduction}</p>
            <div className="hero-actions"><NpcDialogue label="NPC에게 길 묻기" /></div>
          </div>
          <HeroNpcChat />
          <span className="scroll-hint">SCROLL TO EXPLORE <span className="scroll-hint"><ChevronDown size={15}/></span></span>
        </div>
      </section>

      <HomeNewsPreview />

      <section className="board-world board-below" aria-labelledby="board-title">
        <div className="shell noticeboard-wrap">
          <div className="board-topline"><span>✦ THE HELPFUL NPC</span><span>YEON SU&apos;S WORKSHOP · EST. 2026</span></div>
          <div className="noticeboard">
            <span className="board-corner board-corner-tl" aria-hidden="true" />
            <span className="board-corner board-corner-tr" aria-hidden="true" />
            <span className="board-corner board-corner-bl" aria-hidden="true" />
            <span className="board-corner board-corner-br" aria-hidden="true" />
            <div className="board-intro-note">
              <div><span className="letter-kicker">A NOTE FROM YEON SU <span aria-hidden="true">✧</span></span><h2 id="board-title">끝까지 묻고,<br /><em>깊이 이해하고,</em><br />해결합니다.</h2></div>
              <div className="board-intro-copy"><p>{profile.introduction}</p><p>{profile.recentWork}</p><span>{profile.role} · {profile.name}</span></div>
            </div>
            <div className="board-section-label"><span>게시판의 기록들</span><small>어느 메모부터 펼쳐 볼까요?</small></div>
            <div className="board-note-grid">
              <Link href="/about" className="board-note note-about">
                <span className="note-number">01 / ABOUT</span>
                <span className="note-icon"><Compass size={27} strokeWidth={1.5} /></span>
                <h3>어떤 개발자인가요?</h3>
                <p>문제를 바라보는 방식과 지금의 관심사를 소개합니다.</p>
                <span className="note-open">소개 펼치기 </span>
              </Link>
              <Link href="/projects" className="board-note note-project">
                <span className="note-number">02 / PROJECT</span>
                <span className="note-thumb note-thumb-keyoff" aria-hidden="true" />
                <h3>만든 서비스</h3>
                <p>작곡가의 포트폴리오를 직접 관리하는 Keyoff Lab.</p>
                <span className="note-open">프로젝트 보기</span>
              </Link>
              <Link href="/skills" className="board-note note-skills">
                <span className="note-number">03 / TECH STACK</span>
                <span className="note-icon"><CodeXml size={28} strokeWidth={1.5} /></span>
                <h3>분야별 기술 지도</h3>
                <p>Backend · Frontend · Database · Infra / DevOps</p>
                <span className="note-open">기술 살펴보기</span>
              </Link>
              <Link href="/logs" className="board-note note-logs">
                <span className="note-number">04 / LOG</span>
                <span className="note-thumb note-thumb-log" aria-hidden="true" />
                <h3>작업의 기록</h3>
                <p>Velog에 남긴 글 {logs.length}편을 주제별로 모았습니다.</p>
                <span className="note-open">기록 보기 </span>
              </Link>
            </div>
            <div className="board-bottom-strip">
              <span><BookOpenText size={17} /> 문제를 읽고, 만들고, 기록합니다.</span>
              <Link href="/contact"><Mail size={17} /> 연락하기 </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

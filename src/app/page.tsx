import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Compass, Layers3 } from "lucide-react";
import { NpcDialogue } from "@/components/npc-dialogue";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-background" />
        <div className="hero-shade" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> DEVELOPER PORTFOLIO</span>
            <h1 id="hero-title">기술보다<br /><em>문제를 먼저</em><br />생각합니다.</h1>
            <p>{profile.introduction}</p>
            <div className="hero-actions">
              <NpcDialogue />
              <Link href="/projects" className="text-link">프로젝트 보기 <ArrowRight size={17} /></Link>
            </div>
          </div>
          <Image src="/images/npc-developer.webp" width={530} height={485} alt="방문자를 안내하는 픽셀 아트 NPC" className="hero-npc" priority />
          <div className="hero-route-card" aria-label="빠른 이동">
            <span className="route-card-title">WHERE TO?</span>
            <Link href="/about">About <span>개발자 소개</span></Link>
            <Link href="/projects">Projects <span>문제 해결 사례</span></Link>
            <Link href="/skills">Tech Stack <span>기술 경험</span></Link>
            <Link href="/logs">Log <span>기술 기록</span></Link>
          </div>
          <span className="scroll-hint">SCROLL <span>↓</span></span>
        </div>
      </section>

      <section className="home-intro shell section-pad">
        <div className="section-heading">
          <span className="eyebrow">01 / THE APPROACH</span>
          <h2>좋은 해결책은<br /><em>좋은 질문</em>에서 시작됩니다.</h2>
        </div>
        <div className="intro-content">
          <p>기술을 선택하기 전에 사용자와 시스템이 마주한 문제를 살핍니다. 제약을 이해하고, 작은 단위로 검증하며, 오래 유지할 수 있는 방향을 찾습니다.</p>
          <Link href="/about" className="outlined-link">개발자 소개 보기 <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="home-paths section-pad">
        <div className="shell">
          <div className="section-title-row"><div><span className="eyebrow">02 / EXPLORE</span><h2>무엇을 찾고 계신가요?</h2></div><span className="tiny-stars" aria-hidden="true">✦ ✧ ✦</span></div>
          <div className="path-grid">
            <Link href="/projects" className="path-card"><Compass size={31} /><span>QUEST 01</span><h3>프로젝트</h3><p>어떤 문제를 만나고 어떻게 접근했는지 살펴보세요.</p><b>탐색하기 ↗</b></Link>
            <Link href="/skills" className="path-card"><Layers3 size={31} /><span>QUEST 02</span><h3>기술 경험</h3><p>기술 이름보다 실제 사용 맥락과 학습 상태를 확인하세요.</p><b>탐색하기 ↗</b></Link>
            <Link href="/logs" className="path-card"><Code2 size={31} /><span>QUEST 03</span><h3>엔지니어링 로그</h3><p>설계와 문제 해결 과정에서 남긴 생각을 읽어보세요.</p><b>탐색하기 ↗</b></Link>
          </div>
        </div>
      </section>

      <section className="home-cta shell section-pad"><div className="cta-panel"><span className="eyebrow">A MESSAGE FROM THE NPC</span><h2>더 궁금한 이야기가 있나요?</h2><p>필요한 페이지를 안내해 드릴게요.</p><NpcDialogue label="NPC에게 길 묻기" /></div></section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "About", description: `${profile.name}의 개발 관점과 현재 관심 분야를 소개합니다.` };

export default function AboutPage() {
  return <div className="interior-page"><div className="shell page-content">
    <PageHeading eyebrow="ABOUT / CHARACTER PROFILE" title="사용자의 불편을 해결하는 개발자입니다." description="문제를 정의하고, 기술을 선택하고, 결과를 확인하는 과정을 중요하게 생각합니다." />
    <div className="about-grid">
      <div className="portrait-panel"><div className="portrait-halo" /><Image src="/images/npc-developer.webp" width={480} height={440} alt="The Helpful NPC 캐릭터" /><span>THE HELPFUL NPC</span></div>
      <div className="rpg-panel profile-panel"><div className="panel-top"><span>✦ CHARACTER INFO</span><span>PROFILE</span></div><div className="profile-row"><span>NAME</span><strong>{profile.name}</strong></div><div className="profile-row"><span>FOCUS</span><strong>Backend Engineering</strong></div><div className="profile-row"><span>APPROACH</span><strong>Problem First</strong></div><div className="profile-row"><span>NOW</span><strong>AI 분야 학습과 확장</strong></div><div className="profile-quote"><CircleDot size={17} /><p>“기술은 수단이고, 좋은 경험이 목적이라고 생각합니다.”</p></div><div className="profile-actions"><Link href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></Link>{profile.resumeUrl && <Link href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">이력서 <ArrowUpRight size={16} /></Link>}</div></div>
    </div>
    <div className="philosophy-grid"><div><span className="eyebrow">MY APPROACH</span><h2>문제에서 출발합니다.</h2></div><div><p>요구사항의 배경과 사용자의 불편을 먼저 파악합니다. 선택한 기술이 문제에 적합한지 검토하고, 구현 뒤에는 실제 동작과 유지보수성을 확인합니다.</p><p>현재는 백엔드 엔지니어링과 인프라 경험을 정리하고, AI 기술의 활용 가능성을 학습하고 있습니다.</p></div></div>
  </div></div>;
}

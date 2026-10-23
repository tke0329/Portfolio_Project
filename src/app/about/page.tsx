import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "About", description: `${profile.name}의 개발 관점과 현재 관심 분야를 소개합니다.` };

export default function AboutPage() {
  return <div className="interior-page"><div className="shell page-content">
    <PageHeading eyebrow="ABOUT / CHARACTER PROFILE" title={profile.headline} description={profile.introduction} />
    <div className="about-grid">
      <div className="portrait-panel"><div className="portrait-halo" /><Image src="/images/npc-developer.webp" width={480} height={440} alt="The Helpful NPC 캐릭터" /><span>THE HELPFUL NPC</span></div>
      <div className="rpg-panel profile-panel"><div className="panel-top"><span>✦ CHARACTER INFO</span><span>PROFILE</span></div><div className="profile-row"><span>NAME</span><strong>{profile.name}</strong></div><div className="profile-row"><span>FOCUS</span><strong>{profile.role}</strong></div><div className="profile-row"><span>APPROACH</span><strong>Problem First</strong></div><div className="profile-row"><span>NOW</span><strong>AI를 학습 도구로 활용</strong></div><div className="profile-quote"><CircleDot size={17} /><p>“{profile.headline}”</p></div><div className="profile-actions"><Link href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></Link>{profile.resumeUrl && <Link href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">이력서 <ArrowUpRight size={16} /></Link>}</div></div>
    </div>
    <div className="philosophy-grid"><div><span className="eyebrow">MY APPROACH</span><h2>원리를 이해한 뒤 해결합니다.</h2></div><div><p>{profile.recentWork}</p><p>{profile.direction}</p></div></div>
  </div></div>;
}

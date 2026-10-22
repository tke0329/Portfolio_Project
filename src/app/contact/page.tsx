import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, Github, BookOpen } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { CopyEmailButton } from "@/components/copy-email-button";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Contact", description: `${profile.name}에게 연락하거나 개발 기록을 확인하세요.` };

export default function ContactPage() {
  return <div className="interior-page"><div className="shell page-content"><PageHeading eyebrow="CONTACT / SEND A MESSAGE" title="함께 만들어가고 싶습니다." description="문제와 아이디어를 나누고 싶다면 편하게 연락해 주세요." /><div className="contact-layout"><div className="contact-copy"><h2>좋은 대화는<br />새로운 해결책의 시작입니다.</h2><p>협업 제안이나 기술 이야기를 환영합니다. 아래 채널에서 연락해 주세요.</p></div><div className="contact-list"><div className="contact-item"><Mail size={26} /><div><span>EMAIL</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div><CopyEmailButton email={profile.email} /></div><Link className="contact-item" href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={27} /><div><span>GITHUB</span><strong>github.com/tke0329</strong></div><ArrowUpRight size={19} /></Link><Link className="contact-item" href={profile.blogUrl} target="_blank" rel="noopener noreferrer"><BookOpen size={27} /><div><span>BLOG</span><strong>velog.io/@tke0329</strong></div><ArrowUpRight size={19} /></Link>{profile.resumeUrl && <Link className="contact-item" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"><BookOpen size={27} /><div><span>RESUME</span><strong>이력서 보기</strong></div><ArrowUpRight size={19} /></Link>}</div></div></div></div>;
}

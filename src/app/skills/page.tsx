import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { skillCategories, skills } from "@/data/skills";

export const metadata: Metadata = { title: "Tech Stack", description: "사용 경험과 학습 상태를 기준으로 기술을 소개합니다." };

export default function SkillsPage() {
  return <div className="interior-page"><div className="shell page-content"><PageHeading eyebrow="TECH STACK / EQUIPMENT" title="문제를 해결하기 위해 기술을 사용합니다." description="기술 이름과 숙련도 수치보다, 실제로 어떤 맥락에서 사용했는지를 기록합니다." /><div className="skills-layout"><div className="category-rail">{skillCategories.map((category) => <span key={category}>{category}</span>)}</div><div className="rpg-panel skills-panel">{skills.length ? skillCategories.map((category) => <section key={category}><h2>{category}</h2><div className="skill-grid">{skills.filter((skill) => skill.category === category).map((skill) => <div className="skill-card" key={skill.name}><strong>{skill.name}</strong><span>{skill.experience}</span><p>{skill.detail}</p>{skill.relatedProjects.map((slug) => <Link href={`/projects/${slug}`} key={slug}>관련 프로젝트 <ArrowRight size={13} /></Link>)}</div>)}</div></section>) : <div className="waiting-panel"><Layers3 size={40} /><h2>기술 경험을 정리하고 있습니다.</h2><p>사용한 기술과 프로젝트별 적용 경험을 확인한 뒤 이곳에 추가합니다. 학습 중인 분야는 별도로 표시합니다.</p></div>}</div></div></div></div>;
}

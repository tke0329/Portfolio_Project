import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.title ?? "Project", description: project?.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <div className="interior-page"><div className="shell page-content detail-content"><Link className="back-link" href="/projects"><ArrowLeft size={17} /> 프로젝트 목록</Link><div className="detail-hero"><span className="eyebrow">PROJECT / {project.category.toUpperCase()}</span><h1>{project.title}</h1><p>{project.summary}</p><span className="draft-badge">사례 내용 검증 중</span></div><div className="detail-layout"><nav className="detail-nav" aria-label="프로젝트 상세 목차"><span>OVERVIEW</span><span>PROBLEM</span><span>APPROACH</span><span>ARCHITECTURE</span><span>IMPLEMENTATION</span><span>TROUBLESHOOTING</span><span>RESULTS</span></nav><div className="detail-body"><div className="rpg-panel waiting-panel"><BookOpen size={36} /><h2>사례를 준비하고 있습니다.</h2><p>담당 역할, 문제 상황, 설계 근거와 결과를 확인한 뒤 이 페이지에 공개할 예정입니다. 확인되지 않은 구현 내용이나 성과는 게시하지 않습니다.</p></div></div></div></div></div>;
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
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
  if (project.status === "published") {
    return <div className="interior-page"><article className="shell page-content detail-content published-project"><Link className="back-link" href="/projects"><ArrowLeft size={17} /> 프로젝트 목록</Link><div className="detail-hero"><span className="eyebrow">PROJECT / {project.category.toUpperCase()}</span><h1>{project.title}</h1><p>{project.summary}</p>{project.website && <a className="outlined-link project-site-link" href={project.website} target="_blank" rel="noopener noreferrer">실제 사이트 보기 <ArrowUpRight size={17} /></a>}</div>{project.image && <Image className="project-screenshot" src={project.image} width={1280} height={720} alt={`${project.title} 공개 사이트 첫 화면`} /> }<div className="project-facts"><section className="rpg-panel"><span className="eyebrow">ROLE</span><h2>제작 범위</h2><p>{project.role}</p></section><section className="rpg-panel"><span className="eyebrow">FEATURE</span><h2>직접 관리하는 포트폴리오</h2><p>작곡가가 자신의 포트폴리오를 생성·조회·수정·삭제할 수 있도록 제작했습니다.</p></section></div></article></div>;
  }
  return <div className="interior-page"><div className="shell page-content detail-content"><Link className="back-link" href="/projects"><ArrowLeft size={17} /> 프로젝트 목록</Link><div className="detail-hero"><span className="eyebrow">PROJECT / {project.category.toUpperCase()}</span><h1>{project.title}</h1><p>{project.summary}</p><span className="draft-badge">사례 내용 검증 중</span></div><div className="detail-layout"><nav className="detail-nav" aria-label="프로젝트 상세 목차"><span>OVERVIEW</span><span>PROBLEM</span><span>APPROACH</span><span>ARCHITECTURE</span><span>IMPLEMENTATION</span><span>TROUBLESHOOTING</span><span>RESULTS</span></nav><div className="detail-body"><div className="rpg-panel waiting-panel"><BookOpen size={36} /><h2>사례를 준비하고 있습니다.</h2><p>담당 역할, 문제 상황, 설계 근거와 결과를 확인한 뒤 이 페이지에 공개할 예정입니다. 확인되지 않은 구현 내용이나 성과는 게시하지 않습니다.</p></div></div></div></div></div>;
}

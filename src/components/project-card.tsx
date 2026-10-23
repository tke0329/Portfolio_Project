import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card accent-${project.accent}`}>
      <div className="project-art" aria-hidden="true" />
      <div className="project-card-body">
        <div className="card-meta"><span>{project.category}</span><span>{project.status === "draft" ? "내용 확인 중" : project.website ? "LIVE SITE" : "Case Study"}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span className="card-link">자세히 보기 <ArrowUpRight size={17} /></span>
      </div>
    </Link>
  );
}

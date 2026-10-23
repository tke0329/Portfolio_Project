import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects", description: "정연수가 만든 웹 서비스를 살펴보세요." };

export default function ProjectsPage() {
  return <div className="interior-page"><div className="shell page-content"><PageHeading eyebrow="PROJECTS / BUILT & SHIPPED" title="실제로 만든 웹 서비스" description="기획과 구현을 거쳐 사용자가 만날 수 있는 서비스입니다." /><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div></div>;
}

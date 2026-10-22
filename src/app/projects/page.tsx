import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { ProjectGallery } from "@/components/project-gallery";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects", description: "문제 해결 중심의 프로젝트 사례를 살펴보세요." };

export default function ProjectsPage() {
  return <div className="interior-page"><div className="shell page-content"><PageHeading eyebrow="PROJECTS / FIELD NOTES" title="문제를 발견하고, 해결한 프로젝트들입니다." description="각 사례의 담당 범위와 구현 내용을 검증해 순차적으로 공개합니다." /><ProjectGallery projects={projects} /><p className="content-note">※ 현재 프로젝트 상세 내용은 공개 범위와 개인 기여도를 확인하고 있습니다.</p></div></div>;
}

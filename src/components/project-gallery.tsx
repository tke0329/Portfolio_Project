"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/projects";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const categories = ["전체", ...Array.from(new Set(projects.map((project) => project.category)))];
  const [selected, setSelected] = useState("전체");
  const visible = selected === "전체" ? projects : projects.filter((project) => project.category === selected);

  return <><div className="filter-strip" aria-label="프로젝트 카테고리">
    {categories.map((category) => <button key={category} type="button" className={selected === category ? "filter-active" : ""} aria-pressed={selected === category} onClick={() => setSelected(category)}>{category}</button>)}
  </div><div className="project-grid">{visible.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></>;
}

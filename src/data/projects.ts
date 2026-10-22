export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem?: string;
  role?: string;
  technologies: string[];
  status: "draft" | "published";
  accent: string;
};

// The PRD lists these as candidates. Publish a case study only after verifying
// the author's role, implementation details and permission to share them.
export const projects: Project[] = [
  {
    slug: "catcheat-infrastructure",
    title: "Catcheat Infrastructure",
    category: "Infrastructure",
    summary: "공개 가능한 설계·구현 내용을 확인하고 있습니다.",
    technologies: [],
    status: "draft",
    accent: "castle",
  },
  {
    slug: "spring-security-jwt",
    title: "Spring Security / JWT Authentication",
    category: "Backend",
    summary: "담당 범위와 문제 해결 과정을 정리하고 있습니다.",
    technologies: [],
    status: "draft",
    accent: "shield",
  },
  {
    slug: "madedex-comment-like",
    title: "MadeDex Comment & Like",
    category: "Backend",
    summary: "공개 가능한 기능과 개인 기여를 확인하고 있습니다.",
    technologies: [],
    status: "draft",
    accent: "book",
  },
  {
    slug: "websocket-communication",
    title: "WebSocket Communication",
    category: "Backend",
    summary: "구현 경험과 검증 결과를 정리하고 있습니다.",
    technologies: [],
    status: "draft",
    accent: "portal",
  },
];

export const publishedProjects = projects.filter((project) => project.status === "published");

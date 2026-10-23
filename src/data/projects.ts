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
  website?: string;
  image?: string;
};

// Projects contains shipped web services. Technical topics in preparation live in Log.
export const projects: Project[] = [
  {
    slug: "keyoff-lab",
    title: "Keyoff Lab",
    category: "Web App",
    summary: "작곡가들이 자신의 포트폴리오를 직접 만들고 관리할 수 있는 음악 포트폴리오 사이트입니다.",
    role: "사이트 제작",
    technologies: [],
    status: "published",
    accent: "keyoff",
    website: "https://keyoff-lab.com",
    image: "/images/keyoff-lab-home.webp",
  },
];

export const publishedProjects = projects.filter((project) => project.status === "published");

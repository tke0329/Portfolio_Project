export type SkillDomain = {
  id: "backend" | "frontend" | "database" | "infra";
  name: string;
  technologies: readonly string[];
};

// The owner provided these technologies.
export const languages = ["Java", "JavaScript", "TypeScript", "Python"] as const;

export const skillDomains: readonly SkillDomain[] = [
  {
    id: "backend",
    name: "Backend",
    technologies: ["Spring Boot", "Spring Data JPA", "Spring Security"],
  },
  {
    id: "frontend",
    name: "Frontend / Mobile",
    technologies: ["React", "React Native", "Next.js"],
  },
  {
    id: "database",
    name: "Database",
    technologies: ["PostgreSQL", "MySQL", "Redis", "Flyway"],
  },
  {
    id: "infra",
    name: "Infra / DevOps",
    technologies: ["AWS · EC2 / ECR / S3", "Docker", "GitHub Actions", "Terraform"],
  },
];

export const technologyNames = [
  ...languages,
  ...skillDomains.flatMap((domain) => domain.technologies),
];

export type SkillDomain = {
  id: "backend" | "frontend" | "database" | "infra";
  name: string;
  description: string;
  technologies: readonly string[];
};

// The owner provided these technologies.
export const languages = ["Java", "JavaScript", "TypeScript", "Python"] as const;

export const skillDomains = [
  {
    id: "backend",
    name: "Backend",
    description: "백엔드",
    technologies: ["Spring Boot", "Spring Data JPA", "Spring Security"],
  },
  {
    id: "frontend",
    name: "Frontend / Mobile",
    description: "프론트",
    technologies: ["React", "React Native", "Next.js"],
  },
  {
    id: "database",
    name: "Database",
    description: "데이터 베이스",
    technologies: ["PostgreSQL", "MySQL", "Redis", "Flyway"],
  },
  {
    id: "infra",
    name: "Infra / DevOps",
    description: "인프라",
    technologies: ["AWS · EC2 / ECR / S3", "Docker", "GitHub Actions", "Terraform"],
  },
] as const satisfies readonly SkillDomain[];

export const technologyNames = [
  ...languages,
  ...skillDomains.flatMap((domain) => domain.technologies),
];

export const skillGemImages = {
  Java: "/images/tech-gems/java.webp",
  JavaScript: "/images/tech-gems/javascript.webp",
  TypeScript: "/images/tech-gems/typescript.webp",
  Python: "/images/tech-gems/python.webp",
  "Spring Boot": "/images/tech-gems/spring-boot.webp",
  "Spring Data JPA": "/images/tech-gems/spring-data-jpa.webp",
  "Spring Security": "/images/tech-gems/spring-security.webp",
  React: "/images/tech-gems/react.webp",
  "React Native": "/images/tech-gems/react-native.webp",
  "Next.js": "/images/tech-gems/nextjs.webp",
  PostgreSQL: "/images/tech-gems/postgresql.webp",
  MySQL: "/images/tech-gems/mysql.webp",
  Redis: "/images/tech-gems/redis.webp",
  Flyway: "/images/tech-gems/flyway.webp",
  "AWS · EC2 / ECR / S3": "/images/tech-gems/aws-ec2-ecr-s3.webp",
  Docker: "/images/tech-gems/docker.webp",
  "GitHub Actions": "/images/tech-gems/github-actions.webp",
  Terraform: "/images/tech-gems/terraform.webp",
} satisfies Record<(typeof technologyNames)[number], string>;

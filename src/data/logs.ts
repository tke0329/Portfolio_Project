export type LogGroupId = "implementation" | "operations" | "backend" | "learning";
export type LogAccent = "castle" | "shield" | "book" | "portal";

export type LogEntry = {
  slug: string;
  title: string;
  group: LogGroupId;
  category: string;
  summary: string;
  date: string;
  status: "published";
  sourceUrl?: string;
};

export const logGroups: readonly {
  id: LogGroupId;
  title: string;
  description: string;
  accent: LogAccent;
}[] = [
  { id: "implementation", title: "서비스 구현", description: "MadeDex 기능을 만들며 남긴 설계와 구현 기록", accent: "book" },
  { id: "operations", title: "배포와 운영", description: "AWS, Docker, CI/CD와 운영 환경에서 겪은 문제들", accent: "castle" },
  { id: "backend", title: "백엔드 학습", description: "인증, 데이터 접근, 실시간 통신을 이해해 가는 과정", accent: "shield" },
  { id: "learning", title: "학습과 문제 풀이", description: "기획, 실습, 알고리즘과 SQL의 초기 기록", accent: "portal" },
];

// Curated links to the owner's published Velog posts, checked on 2026-10-22.
// Keep the summaries original and link to Velog for the full article.
export const logs: LogEntry[] = [
  {
    slug: "spring-event-websocket-notifications",
    title: "Spring Event + WebSocket/STOMP로 실시간 알림 시스템 만들기",
    group: "implementation",
    category: "Backend",
    summary: "댓글 기능 이후 Spring Event와 WebSocket/STOMP를 사용해 알림 흐름을 연결한 기록입니다.",
    date: "2026-08-20",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/3.-Spring-Event-WebSocketSTOMP로-실시간-알림-시스템-만들기",
  },
  {
    slug: "jpa-flyway-schema-mismatch",
    title: "Entity는 맞는데 왜 서버가 안 뜰까? — JPA와 Flyway 스키마 불일치",
    group: "implementation",
    category: "Database",
    summary: "MadeDex 댓글·좋아요 기능을 구현하며 Entity와 데이터베이스 마이그레이션을 맞춘 과정입니다.",
    date: "2026-08-20",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/Entity는-맞는데-왜-서버가-안-뜰까-JPA와-Flyway-스키마-불일치-해결기",
  },
  {
    slug: "madedex-comments-likes",
    title: "Spring Boot 댓글·좋아요 기능 구현기 — N:M 관계와 N+1",
    group: "implementation",
    category: "Backend",
    summary: "댓글과 좋아요의 관계를 설계하며 N:M 관계와 N+1 문제까지 고민한 기록입니다.",
    date: "2026-08-20",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/Spring-Boot-댓글좋아요-기능-구현기-NM-관계와-N1까지-고민하기",
  },
  {
    slug: "production-csrf-websocket-nginx",
    title: "로컬에서는 되는데 운영에서는 왜 안 될까? — CSRF, WebSocket, Nginx",
    group: "operations",
    category: "Troubleshooting",
    summary: "EC2 운영 서버에서 발생한 CSRF, WebSocket, Nginx 문제를 추적한 기록입니다.",
    date: "2026-08-20",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/7.-로컬에서는-되는데-운영에서는-왜-안-될까-CSRF-WebSocket-Nginx-트러블슈팅",
  },
  {
    slug: "flyway-github-actions-cd",
    title: "Flyway 충돌 해결부터 GitHub Actions CD 자동배포까지",
    group: "operations",
    category: "CI / CD",
    summary: "Flyway 충돌을 해결하고 새 이미지를 EC2에 반영하는 자동배포를 구축한 과정입니다.",
    date: "2026-08-11",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/Flyway-마이그레이션-충돌-해결부터-GitHub-Actions-CD-자동배포까지",
  },
  {
    slug: "nginx-forwarded-proto",
    title: "Nginx X-Forwarded-Proto 문제 해결기",
    group: "operations",
    category: "Troubleshooting",
    summary: "HTTPS 프록시 환경에서 X-Forwarded-Proto와 관련된 문제를 해결한 기록입니다.",
    date: "2026-08-11",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/Nginx-X-Forwarded-Proto-문제-해결기",
  },
  {
    slug: "github-actions-aws-ecr-ci",
    title: "GitHub Actions + AWS ECR로 Spring Boot CI/CD 구축하기",
    group: "operations",
    category: "CI / CD",
    summary: "Spring Boot Docker 이미지를 빌드하고 AWS ECR로 전달하는 CI 환경을 정리했습니다.",
    date: "2026-08-07",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/GitHub-Actions-AWS-ECR로-Spring-Boot-CICD-구축하기",
  },
  {
    slug: "aws-ec2-deployment-3",
    title: "AWS EC2 백엔드 배포 ③ — 빌드와 컨테이너 문제",
    group: "operations",
    category: "AWS / Docker",
    summary: "Docker Compose 배포 중 Gradle bootJar와 백엔드 컨테이너 문제를 다룬 기록입니다.",
    date: "2026-08-05",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/AWS-EC2-백엔드-배포3",
  },
  {
    slug: "aws-ec2-deployment-2",
    title: "AWS EC2 백엔드 배포 ② — Docker Compose",
    group: "operations",
    category: "AWS / Docker",
    summary: "Terraform으로 만든 EC2 환경에 Spring Boot 서버를 Docker Compose로 배포한 과정입니다.",
    date: "2026-08-05",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/AWS-EC2-백엔드-배포2",
  },
  {
    slug: "aws-ec2-deployment-1",
    title: "AWS EC2 백엔드 배포 ① — Terraform 인프라",
    group: "operations",
    category: "AWS / Terraform",
    summary: "Spring Boot 배포를 위해 Terraform으로 EC2 인프라를 구축한 첫 번째 기록입니다.",
    date: "2026-08-05",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/AWS-EC2-백엔드-배포",
  },
  {
    slug: "jwt-authentication-filter",
    title: "JWT Authentication Filter 동작 원리 분석",
    group: "backend",
    category: "Security",
    summary: "JWT 발급 이후 요청마다 인증 상태가 확인되는 흐름을 분석한 글입니다.",
    date: "2026-08-05",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/JWT-Authentication-Filter-동작-원리-분석",
  },
  {
    slug: "spring-security-jwt-websocket-review",
    title: "Spring Security, JWT, WebSocket 복습 프로젝트",
    group: "backend",
    category: "Backend",
    summary: "Spring Security, JWT, CORS, JPA와 WebSocket을 구현하며 학습한 프로젝트 기록입니다.",
    date: "2026-08-05",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/Spring-Security-Jwt-WebSocket-복습-프로젝트",
  },
  {
    slug: "mybatis-conditional-search",
    title: "MyBatis 조건 검색",
    group: "backend",
    category: "Database",
    summary: "SQL 매퍼인 MyBatis를 이용한 조건 검색을 정리한 글입니다.",
    date: "2026-04-26",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/MyBatis-조건-검색",
  },
  {
    slug: "programmers-e-coli-sql",
    title: "[프로그래머스] 특정 형질을 가지는 대장균 찾기",
    group: "learning",
    category: "SQL",
    summary: "프로그래머스 SQL 문제를 풀며 조건에 맞는 대장균 데이터를 찾은 기록입니다.",
    date: "2026-04-19",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/프로그래머스-특정-형질을-가지는-대장균-찾기",
  },
  {
    slug: "programmers-string-to-integer",
    title: "[프로그래머스] 문자열을 정수로 바꾸기",
    group: "learning",
    category: "Java",
    summary: "문자열을 정수로 바꾸는 문제를 풀며 Java 변환 방식을 살펴본 기록입니다.",
    date: "2026-04-14",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/프로그래머스-문자열을-정수로-바꾸기",
  },
  {
    slug: "planning-elements",
    title: "기획 단계에서 필요한 요소",
    group: "learning",
    category: "Planning",
    summary: "팀 미션을 시작하며 소통과 협업을 위한 기획 자료를 정리한 글입니다.",
    date: "2026-04-01",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/기획단계에서-필요한-요소",
  },
  {
    slug: "mission-01",
    title: "Mission _01",
    group: "learning",
    category: "React",
    summary: "React 실습 코드와 초기 학습 내용을 남긴 기록입니다.",
    date: "2026-03-09",
    status: "published",
    sourceUrl: "https://velog.io/@tke0329/Mission",
  },
];

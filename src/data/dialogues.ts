export type DialogueOption = {
  id: string;
  label: string;
  nextNodeId?: string;
  href?: string;
};

export type DialogueNode = {
  id: string;
  message: string;
  options: DialogueOption[];
};

export const dialogues: Record<string, DialogueNode> = {
  start: {
    id: "start",
    message: "안녕하세요. 어떤 정보를 찾고 계신가요?",
    options: [
      { id: "problems", label: "어떤 문제를 해결해 왔나요?", nextNodeId: "problems" },
      { id: "technologies", label: "어떤 기술을 사용하나요?", nextNodeId: "technologies" },
      { id: "about", label: "어떤 개발자인가요?", nextNodeId: "about" },
      { id: "news", label: "최신 IT 소식을 알고 싶어요", nextNodeId: "news" },
      { id: "contact", label: "협업을 제안하고 싶습니다.", nextNodeId: "contact" },
    ],
  },
  problems: {
    id: "problems",
    message: "프로젝트별 문제 정의와 접근 과정을 살펴보세요.",
    options: [
      { id: "go-projects", label: "프로젝트 살펴보기", href: "/projects" },
    ],
  },
  technologies: {
    id: "technologies",
    message: "기술은 실제 사용 경험과 학습 상태에 맞춰 소개합니다.",
    options: [
      { id: "go-skills", label: "기술 경험 살펴보기", href: "/skills" },
    ],
  },
  about: {
    id: "about",
    message: "문제를 먼저 정의하고, 상황에 맞는 해결책을 찾는 개발자를 지향합니다.",
    options: [
      { id: "go-about", label: "소개 페이지로", href: "/about" },
    ],
  },
  news: {
    id: "news",
    message: "GeekNews, InfoQ, GitHub Blog에서 모은 최신 기술 소식을 확인해 보세요.",
    options: [
      { id: "go-news", label: "기술 소식지 열기", href: "/news" },
    ],
  },
  contact: {
    id: "contact",
    message: "협업에 관한 정보는 연락 페이지에서 확인할 수 있습니다.",
    options: [
      { id: "go-contact", label: "연락 페이지로", href: "/contact" },
    ],
  },
};

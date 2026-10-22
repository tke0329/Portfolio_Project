export type Skill = {
  name: string;
  category: "Backend" | "Database" | "AI / Data" | "Infrastructure" | "Frontend";
  experience: "project" | "learning" | "familiar";
  detail: string;
  relatedProjects: string[];
};

// Add verified technologies and project links as portfolio content is supplied.
export const skills: Skill[] = [];

export const skillCategories: Skill["category"][] = [
  "Backend",
  "Database",
  "AI / Data",
  "Infrastructure",
  "Frontend",
];

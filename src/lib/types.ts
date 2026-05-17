export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  completionDate: string;
  duration?: string;
  category: "SEO Audit" | "Frontend" | "Research" | "Backend" | "Full Stack";
  featured?: boolean;
  image?: string;
}

export interface LogPost {
  slug: string;
  title: string;
  date: string;
  week: number;
  summary: string;
  tags: string[];
}

export type TechStack = string[];
export type Category = Project["category"];
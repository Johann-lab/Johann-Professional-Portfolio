import { Project, LogPost } from "./types";
import projectsData from "../data/projects.json";

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return getProjects().filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const categories = getProjects().map((p) => p.category);
  return [...new Set(categories)];
}

export function getAllTechStacks(): string[] {
  const stacks = getProjects().flatMap((p) => p.techStack);
  return [...new Set(stacks)];
}

export async function getLogPosts(): Promise<LogPost[]> {
  const posts: LogPost[] = [
    {
      slug: "week-1-introduction",
      title: "Week 1: Introduction & Setup",
      date: "2024-01-08",
      week: 1,
      summary: "Initial setup of development environment and introduction to the team.",
      tags: ["setup", "onboarding"],
    },
    {
      slug: "week-2-first-project",
      title: "Week 2: First Project Assignment",
      date: "2024-01-15",
      week: 2,
      summary: "Assigned to the e-commerce platform project. Started with requirements gathering.",
      tags: ["project", "planning"],
    },
    {
      slug: "week-3-api-development",
      title: "Week 3: API Development",
      date: "2024-01-22",
      week: 3,
      summary: "Built RESTful APIs for user authentication and product management.",
      tags: ["backend", "api"],
    },
    {
      slug: "week-4-frontend-integration",
      title: "Week 4: Frontend Integration",
      date: "2024-01-29",
      week: 4,
      summary: "Connected frontend to backend APIs and implemented responsive UI components.",
      tags: ["frontend", "integration"],
    },
    {
      slug: "week-5-seo-basics",
      title: "Week 5: SEO Basics & Optimization",
      date: "2024-02-05",
      week: 5,
      summary: "Learned SEO fundamentals and implemented basic optimizations for the portfolio.",
      tags: ["seo", "optimization"],
    },
  ];
  return posts;
}

export async function getLogPostBySlug(slug: string): Promise<LogPost | undefined> {
  const posts = await getLogPosts();
  return posts.find((p) => p.slug === slug);
}
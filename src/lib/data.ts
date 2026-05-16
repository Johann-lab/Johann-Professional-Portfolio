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
      slug: "week-1-foundation-architecture",
      title: "Week 1: Foundation & Architecture",
      date: "2024-01-08",
      week: 1,
      summary: "Team onboarding and orientation with project scope introduction. Technology stack setup (Next.js, MongoDB, Sui SDK, Pinata Storage) and database initialization with unified role-based user system.",
      tags: ["setup", "onboarding", "database"],
    },
    {
      slug: "week-2-core-development",
      title: "Week 2: Core Development",
      date: "2024-01-15",
      week: 2,
      summary: "GitHub version control seminar. Implemented user project viewing, Leaflet API map integration, CSV upload feature with data preview, and MongoDB structure optimization.",
      tags: ["backend", "api", "integration"],
    },
    {
      slug: "week-3-api-integration",
      title: "Week 3: API Integration",
      date: "2024-01-22",
      week: 3,
      summary: "Database architecture refinement with multi-connection setup for scalability. Enhanced Shadow Profile feature, created university signup page, and implemented notification system with UI improvements.",
      tags: ["database", "api", "frontend"],
    },
    {
      slug: "week-4-full-integration",
      title: "Week 4: Full Integration",
      date: "2024-01-29",
      week: 4,
      summary: "Coach platform redesign with improved input validation and auto-responsive email feature. Added coach dashboard with user search functionality and role-based access control.",
      tags: ["frontend", "integration", "ux"],
    },
    {
      slug: "week-5-optimization",
      title: "Week 5: Optimization",
      date: "2024-02-05",
      week: 5,
      summary: "Completed notification system with Level 3 nested comment system supporting likes, replies, and deletion. Implemented favorites feature and strengthened security by protecting API keys.",
      tags: ["optimization", "security", "features"],
    },
    {
      slug: "week-6-feature-enhancement",
      title: "Week 6: Feature Enhancement",
      date: "2024-02-12",
      week: 6,
      summary: "Redesigned admin interface for all roles with consistent layout. Fixed security vulnerabilities (exposed IDs) and created archive file management page for documentation storage.",
      tags: ["security", "admin", "ui"],
    },
    {
      slug: "week-7-testing-qa",
      title: "Week 7: Testing & QA",
      date: "2024-02-19",
      week: 7,
      summary: "Introduced chat system with one-on-one conversations and rate limiting. Refined system logic, enhanced comment features, and improved security by removing legacy code.",
      tags: ["testing", "chat", "security"],
    },
    {
      slug: "week-8-performance-tuning",
      title: "Week 8: Performance Tuning",
      date: "2024-02-26",
      week: 8,
      summary: "Optimized data by removing unnecessary fields. Re-implemented real-time notifications and added online status indicator. Integrated map-based location selection in registration.",
      tags: ["performance", "optimization", "realtime"],
    },
    {
      slug: "week-9-documentation",
      title: "Week 9: Documentation",
      date: "2024-03-04",
      week: 9,
      summary: "Enhanced Leaflet map with location data visualization. Implemented shadcn/ui profile sheet, completed project handover documentation, and transitioned to new project with WSL setup.",
      tags: ["documentation", "ui", "transition"],
    },
    {
      slug: "week-10-security-review",
      title: "Week 10: Security Review",
      date: "2024-03-11",
      week: 10,
      summary: "Enhanced Integration Audit module with validation flags for better monitoring. Improved analytics with visibility, mention, and ranking rate calculations. Implemented query deletion UI and backend functionality.",
      tags: ["security", "audit", "analytics"],
    },
    {
      slug: "week-11-deployment-prep",
      title: "Week 11: Deployment Prep",
      date: "2024-03-18",
      week: 11,
      summary: "Prepared deployment infrastructure and configuration. Set up CI/CD pipelines. Created deployment documentation and runbooks.",
      tags: ["deployment", "devops", "ci-cd"],
    },
    {
      slug: "week-12-launch-monitoring",
      title: "Week 12: Launch & Monitoring",
      date: "2024-03-25",
      week: 12,
      summary: "Successfully launched the application to production. Set up monitoring, alerting, and analytics. Monitored system performance and user engagement.",
      tags: ["launch", "monitoring", "production"],
    },
    {
      slug: "week-13-maintenance-support",
      title: "Week 13: Maintenance & Support",
      date: "2024-04-01",
      week: 13,
      summary: "Provided ongoing maintenance and support. Gathered user feedback and identified improvements. Planned for future enhancements and scalability.",
      tags: ["maintenance", "support", "feedback"],
    },
  ];
  return posts;
}

export async function getLogPostBySlug(slug: string): Promise<LogPost | undefined> {
  const posts = await getLogPosts();
  return posts.find((p) => p.slug === slug);
}
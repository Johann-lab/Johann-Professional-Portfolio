"use client";

import { useState } from "react";
import { Project } from "@/lib/types";
import { Badge } from "../atoms";

interface ProjectCardProps {
  project: Project;
}

const categoryColors: Record<string, string> = {
  "SEO Audit": "#059669",
  Frontend: "#1E40AF",
  Backend: "#7C3AED",
  Research: "#DC2626",
  "Full Stack": "#64748B",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const color = categoryColors[project.category] || "#0055BF";

  return (
    <div
      className={`bg-white rounded-lg border transition-all cursor-pointer shadow-sm ${
        isHovered ? "shadow-md border-[#7C3AED] scale-105" : "border-[#E2E8F0]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden border-b-2 transition-all"
        style={{
          backgroundColor: `${color}08`,
          borderBottomColor: color,
        }}
      >
        {isHovered && (
          <div className="absolute inset-0 bg-black/2" />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
          {project.title}
        </h3>
        <p className="text-[#64748B] mb-4 leading-relaxed text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech, i) => (
            <Badge key={i} color="blue">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 3 && (
            <Badge color="slate">+{project.techStack.length - 3}</Badge>
          )}
        </div>
        <p className="text-xs font-medium text-[#94A3B8] hover:text-[#1E40AF] transition-colors">
          {new Date(project.completionDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </p>
      </div>
    </div>
  );
}
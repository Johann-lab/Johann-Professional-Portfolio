"use client";

import { useState } from "react";
import { Project } from "@/lib/types";
import { useTheme } from "@/context/ThemeContext";

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

type TechMeta = {
  label: string;
  iconSrc: string;
  bgColorLight: string;
  bgColorDark: string;
};

const techStackMeta: Record<string, TechMeta> = {
  "Next.js": {
    label: "Next.js",
    iconSrc: "https://cdn.simpleicons.org/nextdotjs/ffffff",
    bgColorLight: "bg-black",
    bgColorDark: "bg-gray-900",
  },
  React: {
    label: "React",
    iconSrc: "https://cdn.simpleicons.org/react/ffffff",
    bgColorLight: "bg-cyan-500",
    bgColorDark: "bg-cyan-600",
  },
  TypeScript: {
    label: "TypeScript",
    iconSrc: "https://cdn.simpleicons.org/typescript/ffffff",
    bgColorLight: "bg-blue-600",
    bgColorDark: "bg-blue-700",
  },
  MongoDB: {
    label: "MongoDB",
    iconSrc: "https://cdn.simpleicons.org/mongodb/ffffff",
    bgColorLight: "bg-green-600",
    bgColorDark: "bg-green-700",
  },
  Python: {
    label: "Python",
    iconSrc: "https://cdn.simpleicons.org/python/ffffff",
    bgColorLight: "bg-sky-600",
    bgColorDark: "bg-sky-700",
  },
  "OpenAI API": {
    label: "OpenAI API",
    iconSrc: "https://cdn.simpleicons.org/openai/ffffff",
    bgColorLight: "bg-emerald-600",
    bgColorDark: "bg-emerald-700",
  },
  "D3.js": {
    label: "D3.js",
    iconSrc: "https://cdn.simpleicons.org/d3dotjs/ffffff",
    bgColorLight: "bg-orange-500",
    bgColorDark: "bg-orange-600",
  },
  "Tailwind CSS": {
    label: "Tailwind CSS",
    iconSrc: "https://cdn.simpleicons.org/tailwindcss/ffffff",
    bgColorLight: "bg-sky-500",
    bgColorDark: "bg-sky-600",
  },
  "Framer Motion": {
    label: "Framer Motion",
    iconSrc: "https://cdn.simpleicons.org/framer/ffffff",
    bgColorLight: "bg-indigo-600",
    bgColorDark: "bg-indigo-700",
  },
};

const fallbackTechMeta: TechMeta = {
  label: "Tech",
  iconSrc: "https://cdn.simpleicons.org/code/ffffff",
  bgColorLight: "bg-[#1E40AF]",
  bgColorDark: "bg-[#1E3A8A]",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const color = categoryColors[project.category] || "#0055BF";

  return (
    <div
      className={`rounded-lg border transition-all duration-300 cursor-pointer shadow-sm group ${
        isHovered 
          ? `shadow-xl border-[#7C3AED] scale-105` 
          : `${isDark ? "border-[#334155]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`
      } ${isDark ? "bg-linear-to-br from-[#1E293B] to-[#0F172A]" : "bg-linear-to-br from-white to-[#F8FAFC]"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden border-b-2 transition-all"
        style={{
          backgroundColor: `${color}08`,
          borderBottomColor: isHovered ? color : color + "20",
        }}
      >
        {isHovered && (
          <div className="absolute inset-0 bg-linear-to-br from-[#1E40AF]/5 to-[#7C3AED]/5 animate-pulse" />
        )}
        {(project.logo || project.image) && (
          <img
            src={project.logo || project.image}
            alt={project.title + " logo"}
            className="w-28 h-28 object-contain z-10"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 group-hover:text-[#1E40AF] transition-colors ${
          isDark ? "text-white" : "text-[#0F172A]"
        }`}>
          {project.title}
        </h3>
        <p className={`mb-4 leading-relaxed text-sm ${
          isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
        }`}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, i) => {
            const techMeta = techStackMeta[tech] || fallbackTechMeta;

            return (
              <div key={i} className="group">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${isDark ? techMeta.bgColorDark : techMeta.bgColorLight} text-white shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent group-hover:px-4 ${
                    isDark ? "group-hover:border-white/40" : "group-hover:border-[#1E40AF]/40"
                  }`}
                >
                  <img
                    src={techMeta.iconSrc}
                    alt={techMeta.label}
                    className="w-4 h-4 shrink-0 brightness-0 invert"
                  />
                  <span className="text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 hidden group-hover:inline-block">
                    {techMeta.label}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        <p className={`text-xs font-medium group-hover:text-[#1E40AF] transition-colors ${
          isDark ? "text-[#7C9AC6]" : "text-[#94A3B8]"
        }`}>
          {new Date(project.completionDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </p>
      </div>
    </div>
  );
}
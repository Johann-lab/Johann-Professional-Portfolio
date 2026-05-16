"use client";

import NavDashboard from "../navigation dashboard/NavDashboard";
import { ProjectCard } from "@/components/molecules";
import { getProjects } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";
import type { Project } from "@/lib/types";

export default function WorkPage() {
  const { isDark } = useTheme();
  const projects = getProjects();
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className={`min-h-screen transition-colors ${
      isDark 
        ? "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" 
        : "bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
    }`}>
      <NavDashboard />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className={`text-6xl md:text-7xl font-bold mb-4 ${
              isDark ? "text-white" : "text-[#0F172A]"
            }`}>
              Portfolio
            </h1>
            <p className={`text-xl max-w-2xl leading-relaxed ${
              isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
            }`}>
              A curated collection of projects showcasing technical expertise, problem-solving, and strategic implementation across diverse technologies and domains.
            </p>
          </div>

          <p className={`text-sm font-medium mb-12 ${
            isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
          }`}>
            <span className={isDark ? "text-white" : "text-[#0F172A]"}>{featuredProjects.length}</span> featured projects
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{
                animationDelay: `${idx * 50}ms`
              }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-[#94A3B8] py-8 text-center mt-16 border-t border-[#334155]">
        <p className="font-medium text-sm">
          © 2024 Johann Gacayan. Built with precision and attention to detail.
        </p>
      </footer>
    </div>
  );
}
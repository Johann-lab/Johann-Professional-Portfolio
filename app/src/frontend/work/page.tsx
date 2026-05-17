"use client";

import { useMemo, useState } from "react";
import NavDashboard from "../navigation dashboard/NavDashboard";
import { ProjectCard } from "@/components/molecules";
import { getProjects } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

export default function WorkPage() {
  const { isDark } = useTheme();
  const projects = getProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const availableCategories = useMemo(
    () => Array.from(new Set(projects.map((project) => project.category))).sort(),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, categoryFilter]);

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark
          ? "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]"
          : "bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
      }`}
    >
      <NavDashboard />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 ${
                isDark ? "text-white" : "text-[#0F172A]"
              }`}
            >
              My <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Work</span>
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
              }`}
            >
              A collection of projects showcasing technical skills, problem-solving, and creative solutions across different domains.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                  isDark
                    ? "bg-[#0F172A] border-[#334155] text-white placeholder-[#64748B] focus:border-[#7C3AED]"
                    : "bg-white border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1E40AF]"
                }`}
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`px-6 py-4 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                isDark
                  ? "bg-[#0F172A] border-[#334155] text-white focus:border-[#7C3AED]"
                  : "bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#1E40AF]"
              }`}
            >
              <option value="all">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className={`text-lg ${isDark ? "text-[#CBD5E1]" : "text-[#64748B]"}`}>
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
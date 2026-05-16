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
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch) ||
        project.category.toLowerCase().includes(normalizedSearch) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, projects, searchQuery]);

  return (
    <div className={`min-h-screen transition-colors ${
      isDark 
        ? "bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]"
        : "bg-linear-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
    }`}>
      <NavDashboard />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className={`text-6xl md:text-7xl font-bold mb-4 ${
              isDark ? "text-white" : "text-[#0F172A]"
            }`}>
              Portfolio
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
            }`}>
              A curated collection of projects showcasing technical expertise, problem-solving, and strategic implementation across diverse technologies and domains.
            </p>
          </div>

          <div className="mb-12 grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem_auto] items-center">
            <div className="relative">
              <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${
                isDark ? "text-[#64748B]" : "text-[#94A3B8]"
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, description, category, or tech"
                className={`w-full rounded-lg border-2 pl-12 pr-4 py-3 text-sm md:text-base transition-all duration-300 focus:outline-none focus:scale-[1.01] ${
                  isDark
                    ? "bg-[#0F172A] border-[#334155] text-white placeholder-[#64748B] focus:border-[#7C3AED] focus:shadow-lg focus:shadow-[#7C3AED]/20"
                    : "bg-white border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1E40AF] focus:shadow-lg focus:shadow-[#1E40AF]/10"
                }`}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`w-full rounded-lg border-2 px-4 py-3 text-sm md:text-base transition-all duration-300 focus:outline-none focus:scale-[1.01] ${
                isDark
                  ? "bg-[#0F172A] border-[#334155] text-white focus:border-[#7C3AED] focus:shadow-lg focus:shadow-[#7C3AED]/20"
                  : "bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#1E40AF] focus:shadow-lg focus:shadow-[#1E40AF]/10"
                }`}
            >
              <option value="all">All categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <p className={`text-sm font-medium ${
              isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
            }`}>
              <span className={isDark ? "text-white" : "text-[#0F172A]"}>{filteredProjects.length}</span> project{filteredProjects.length === 1 ? "" : "s"} shown
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{
                animationDelay: `${idx * 50}ms`
              }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className={`mt-12 rounded-2xl border-2 border-dashed p-10 text-center ${
              isDark ? "border-[#334155] text-[#CBD5E1]" : "border-[#E2E8F0] text-[#64748B]"
            }`}>
              <p className="text-lg font-semibold mb-2">No projects match your filters.</p>
              <p className="text-sm">Try a different search term or switch the category dropdown back to All categories.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-linear-to-r from-[#0F172A] to-[#1E293B] text-[#94A3B8] py-8 text-center mt-16 border-t border-[#334155]">
        <p className="font-medium text-sm">
          © 2024 Johann Gacayan. Built with precision and attention to detail.
        </p>
      </footer>
    </div>
  );
}
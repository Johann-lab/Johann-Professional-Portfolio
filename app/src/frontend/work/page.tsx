"use client";

import { useState, useMemo } from "react";
import NavDashboard from "../navigation dashboard/NavDashboard";
import { ProjectCard } from "@/components/molecules";
import { getProjects, getAllCategories, getAllTechStacks } from "@/lib/data";
import type { Project } from "@/lib/types";

export default function WorkPage() {
  const projects = getProjects();
  const categories = getAllCategories();
  const allTechStacks = getAllTechStacks();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch = selectedCategory
        ? project.category === selectedCategory
        : true;
      const techMatch = selectedTech
        ? project.techStack.includes(selectedTech)
        : true;
      return categoryMatch && techMatch;
    });
  }, [projects, selectedCategory, selectedTech]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedTech("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]">
      <NavDashboard />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-[#0F172A] mb-4">
              Portfolio
            </h1>
            <p className="text-xl text-[#64748B] max-w-2xl leading-relaxed">
              A curated collection of projects showcasing technical expertise, problem-solving, and strategic implementation across diverse technologies and domains.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#E2E8F0] shadow-sm mb-12">
            <h2 className="font-semibold text-[#0F172A] mb-6 text-lg">Filters</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-[#E2E8F0] rounded-lg font-medium text-[#0F172A] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-opacity-10 transition-all bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                  Technology
                </label>
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="w-full p-3 border border-[#E2E8F0] rounded-lg font-medium text-[#0F172A] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-opacity-10 transition-all bg-white"
                >
                  <option value="">All Technologies</option>
                  {allTechStacks.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {(selectedCategory || selectedTech) && (
              <button
                onClick={clearFilters}
                className="mt-6 px-4 py-2 text-[#7C3AED] font-semibold hover:bg-[#EEF2FF] rounded-lg transition-colors text-sm"
              >
                Reset Filters
              </button>
            )}
          </div>

          <p className="text-sm font-medium text-[#64748B] mb-8">
            <span className="text-[#0F172A]">{filteredProjects.length}</span> of <span className="text-[#0F172A]">{projects.length}</span> projects
          </p>

          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-[#E2E8F0]">
              <div className="text-6xl mb-4 text-[#CBD5E1]">∅</div>
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-3">
                No projects matched
              </h3>
              <p className="text-[#64748B] mb-6">
                Try adjusting your filters or{" "}
                <button
                  onClick={clearFilters}
                  className="text-[#7C3AED] font-semibold hover:underline"
                >
                  reset filters
                </button>
              </p>
            </div>
          )}
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
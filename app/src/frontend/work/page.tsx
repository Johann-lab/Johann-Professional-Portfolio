"use client";

import { useMemo, useState, useEffect } from "react";
import NavDashboard from "../navigation dashboard/NavDashboard";
import { ProjectCard } from "@/components/molecules";
import { getProjects } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

function ProjectSkeleton() {
  return (
    <div className="rounded-xl border-2 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const { isDark } = useTheme();
  const projects = getProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const availableProjects = useMemo(
    () => projects.map((project) => project.title).sort(),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesProject = categoryFilter === "all" || project.title === categoryFilter;

      return matchesSearch && matchesProject;
    });
  }, [projects, searchQuery, categoryFilter]);

  const skeletons = [1, 2, 3, 4, 5, 6];

  if (isLoading) {
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
              <div className="h-12 w-64 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-6 animate-pulse" />
              <div className="h-6 w-96 bg-gray-300 dark:bg-gray-700 rounded mx-auto animate-pulse" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="flex-1 h-14 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-14 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skeletons.map((i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-[#0F172A] text-[#94A3B8] py-12 text-center border-t border-[#334155]/50">
          <div className="mb-8 flex justify-center gap-6 flex-wrap">
            {[
              {
                icon: (
                  <img src="https://thesvg.org/icons/gmail/default.svg" alt="Gmail" className="w-6 h-6 brightness-0 invert shrink-0" />
                ),
                href: "mailto:johann@example.com",
                username: "gacayanjohann@gmail.com",
                bgColorLight: "bg-red-500",
                bgColorDark: "bg-red-600"
              },
              {
                icon: (
                  <img src="https://thesvg.org/icons/linkedin/default.svg" alt="LinkedIn" className="w-6 h-6 brightness-0 invert shrink-0" />
                ),
                href: "https://www.linkedin.com/in/gacayan-johann-kien-s-9a4434283/",
                username: "Gacayan Johann",
                bgColorLight: "bg-blue-600",
                bgColorDark: "bg-blue-700"
              },
              {
                icon: (
                  <img src="https://thesvg.org/icons/discord/default.svg" alt="Discord" className="w-6 h-6 brightness-0 invert shrink-0" />
                ),
                href: "https://discord.com/users/726681678894071889",
                username: "726681678894071889",
                bgColorLight: "bg-indigo-600",
                bgColorDark: "bg-indigo-700"
              },
              {
                icon: (
                  <img src="https://thesvg.org/icons/github/default.svg" alt="GitHub" className="w-6 h-6 shrink-0" />
                ),
                href: "https://github.com/Johann-lab",
                username: "Johann-lab",
                bgColorLight: "bg-white",
                bgColorDark: "bg-gray-200",
                textColor: "text-gray-900"
              },
              {
                icon: (
                  <img src="https://thesvg.org/icons/facebook/default.svg" alt="Facebook" className="w-6 h-6 shrink-0" />
                ),
                href: "https://www.facebook.com/JohannGacayan/",
                username: "Johann Gacayan",
                bgColorLight: "bg-blue-500",
                bgColorDark: "bg-blue-600"
              },
              {
                icon: (
                  <img src="https://thesvg.org/icons/vercel/default.svg" alt="Vercel" className="w-6 h-6 brightness-0 invert shrink-0" />
                ),
                href: "https://vercel.com/johann-labs-projects",
                username: "johann-labs-projects",
                bgColorLight: "bg-black",
                bgColorDark: "bg-gray-900"
              },
            ].map((contact, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-full ${isDark ? contact.bgColorDark : contact.bgColorLight} animate-pulse`}
              />
            ))}
          </div>
          <div className="h-4 w-64 bg-gray-700 rounded mx-auto animate-pulse" />
        </footer>
      </div>
    );
  }

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
              <option value="all">All Projects</option>
              {availableProjects.map((projectName) => (
                <option key={projectName} value={projectName}>
                  {projectName}
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

      <footer className="bg-[#0F172A] text-[#94A3B8] py-12 text-center border-t border-[#334155]/50">
        <div className="mb-8 flex justify-center gap-6 flex-wrap">
          {[
            {
              icon: (
                <img src="https://thesvg.org/icons/gmail/default.svg" alt="Gmail" className="w-6 h-6 brightness-0 invert shrink-0" />
              ),
              href: "mailto:johann@example.com",
              label: "Gmail",
              username: "gacayanjohann@gmail.com",
              bgColorLight: "bg-red-500",
              bgColorDark: "bg-red-600"
            },
            {
              icon: (
                <img src="https://thesvg.org/icons/linkedin/default.svg" alt="LinkedIn" className="w-6 h-6 brightness-0 invert shrink-0" />
              ),
              href: "https://www.linkedin.com/in/gacayan-johann-kien-s-9a4434283/",
              label: "LinkedIn",
              target: "_blank",
              username: "Gacayan Johann",
              bgColorLight: "bg-blue-600",
              bgColorDark: "bg-blue-700"
            },
            {
              icon: (
                <img src="https://thesvg.org/icons/discord/default.svg" alt="Discord" className="w-6 h-6 brightness-0 invert shrink-0" />
              ),
              href: "https://discord.com/users/726681678894071889",
              label: "Discord",
              target: "_blank",
              username: "726681678894071889",
              bgColorLight: "bg-indigo-600",
              bgColorDark: "bg-indigo-700"
            },
            {
              icon: (
                <img src="https://thesvg.org/icons/github/default.svg" alt="GitHub" className="w-6 h-6 shrink-0" />
              ),
              href: "https://github.com/Johann-lab",
              label: "GitHub",
              target: "_blank",
              username: "Johann-lab",
              bgColorLight: "bg-white",
              bgColorDark: "bg-gray-200",
              textColor: "text-gray-900"
            },
            {
              icon: (
                <img src="https://thesvg.org/icons/facebook/default.svg" alt="Facebook" className="w-6 h-6 shrink-0" />
              ),
              href: "https://www.facebook.com/JohannGacayan/",
              label: "Facebook",
              target: "_blank",
              username: "Johann Gacayan",
              bgColorLight: "bg-blue-500",
              bgColorDark: "bg-blue-600"
            },
            {
              icon: (
                <img src="https://thesvg.org/icons/vercel/default.svg" alt="Vercel" className="w-6 h-6 brightness-0 invert shrink-0" />
              ),
              href: "https://vercel.com/johann-labs-projects",
              label: "Vercel",
              target: "_blank",
              username: "johann-labs-projects",
              bgColorLight: "bg-black",
              bgColorDark: "bg-gray-900"
            },
          ].map((contact, i) => (
            <div key={i} className="group">
              <a
                href={contact.href}
                target={contact.target}
                rel={contact.target === "_blank" ? "noopener noreferrer" : undefined}
                title={contact.label}
                className={`inline-flex items-center gap-3 p-4 rounded-full ${isDark ? contact.bgColorDark : contact.bgColorLight} ${isDark ? "text-white" : (contact.textColor || "text-white")} shadow-lg hover:shadow-2xl transition-all duration-300 hover:brightness-110 border-2 border-transparent group-hover:px-6 ${
                  isDark ? "group-hover:border-white group-hover:shadow-white/30" : "group-hover:border-[#1E40AF] group-hover:shadow-black/20"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {contact.icon}
                <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1E40AF]"} opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden group-hover:inline-block`}>
                  {contact.username}
                </span>
              </a>
            </div>
          ))}
        </div>
        <p className="font-medium text-sm">
          © 2024 Johann Gacayan. Built with precision and attention to detail.
        </p>
      </footer>
    </div>
  );
}
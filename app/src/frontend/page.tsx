"use client";

import { useState } from "react";
import NavDashboard from "./navigation dashboard/NavDashboard";
import { ProjectCard } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { getProjects, getFeaturedProjects, getLogPosts } from "@/lib/data";
import type { Project, LogPost } from "@/lib/types";

const legoColors = {
  primary: "#1E40AF",
  accent: "#7C3AED",
  secondary: "#64748B",
  light: "#F8FAFC",
};

export default function Home() {
  const projects = getProjects();
  const featuredProjects = getFeaturedProjects();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]">
      <NavDashboard />

      <section
        id="home"
        className="pt-32 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7C3AED] opacity-3 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1E40AF] opacity-3 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-[#1E40AF] text-white px-4 py-2 font-semibold text-xs tracking-wider rounded-md shadow-sm">
                FULL-STACK DEVELOPER
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] leading-tight">
                Building
                <br />
                <span className="text-[#7C3AED]">Scalable</span>
                <br />
                Solutions
              </h1>
              <p className="text-lg text-[#475569] max-w-md leading-relaxed">
                I design and develop modular, enterprise-grade applications with precision and clarity. Every project is built with scalability, maintainability, and excellence as core principles.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button href="/work" variant="primary" size="lg">
                  View Work
                </Button>
                <Button href="/logs/week-1-introduction" variant="outline" size="lg">
                  Read Logs
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] rounded-lg border border-[#3B82F6] flex items-center justify-center shadow-2xl">
                  <div className="grid grid-cols-3 gap-3 absolute">
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-sm border border-[#6D28D9]" />
                    <div className="w-8 h-8 bg-[#06B6D4] rounded-sm border border-[#0891B2]" />
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-sm border border-[#6D28D9]" />
                    <div className="w-8 h-8 bg-[#06B6D4] rounded-sm border border-[#0891B2]" />
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-sm border border-[#6D28D9]" />
                    <div className="w-8 h-8 bg-[#06B6D4] rounded-sm border border-[#0891B2]" />
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-sm border border-[#6D28D9]" />
                    <div className="w-8 h-8 bg-[#06B6D4] rounded-sm border border-[#0891B2]" />
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-sm border border-[#6D28D9]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="py-32 px-4 bg-[#FFFFFF] relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#0F172A]">
              Featured Projects
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              Carefully crafted solutions demonstrating technical excellence and strategic thinking across diverse domains.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/work" variant="secondary" size="lg">
              View All Projects →
            </Button>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-32 px-4 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#0F172A]">
              Development Timeline
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#CBD5E1]" />
            {[
              { week: 1, title: "Week 1", desc: "Foundation & Architecture" },
              { week: 2, title: "Week 2", desc: "Core Development" },
              { week: 3, title: "Week 3", desc: "API Integration" },
              { week: 4, title: "Week 4", desc: "Full Integration" },
              { week: 5, title: "Week 5", desc: "Optimization" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 mb-8 relative">
                <div className="w-16 h-16 bg-[#1E40AF] border border-[#3B82F6] rounded-lg flex items-center justify-center font-bold text-white z-10 shadow-md">
                  {item.week}
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] flex-1 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-[#0F172A]">{item.title}</h3>
                  <p className="text-[#64748B] mt-1 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/logs/week-1-introduction" variant="primary" size="lg">
              Read Full Logs →
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#0F172A]">
              Expertise
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "▪",
                title: "Architecture",
                desc: "Design scalable, maintainable systems with clear structure and modularity",
              },
              {
                icon: "▪",
                title: "Engineering",
                desc: "Build robust solutions using industry best practices and clean code principles",
              },
              {
                icon: "▪",
                title: "Optimization",
                desc: "Enhance performance, user experience, and system efficiency across all layers",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] p-8 rounded-lg border border-[#E2E8F0] hover:border-[#7C3AED] hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-4 font-bold text-[#7C3AED] group-hover:text-[#1E40AF] transition-colors">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-4 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-[#CBD5E1] mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
            Ready to discuss your next project or explore collaboration opportunities? I'd be delighted to hear from you.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Button href="mailto:johann@example.com" variant="primary" size="lg">
              📧 Email Me
            </Button>
            <Button href="#" variant="secondary" size="lg">
              💼 LinkedIn
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F172A] text-[#94A3B8] py-8 text-center border-t border-[#334155]">
        <p className="font-medium text-sm">
          © 2024 Johann Gacayan. Built with precision and attention to detail.
        </p>
      </footer>
    </div>
  );
}
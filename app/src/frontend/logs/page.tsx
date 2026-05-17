"use client";

import { useState } from "react";
import Link from "next/link";
import NavDashboard from "../navigation dashboard/NavDashboard";
import { getLogPosts } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

export default function LogsPage() {
  const { isDark } = useTheme();
  const logPosts = getLogPosts();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const weekGroups = logPosts.reduce((acc, post) => {
    if (!acc[post.week]) {
      acc[post.week] = [];
    }
    acc[post.week].push(post);
    return acc;
  }, {} as Record<number, typeof logPosts>);

  const sortedWeeks = Object.keys(weekGroups).map(Number).sort((a, b) => b - a);

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
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 ${
                isDark ? "text-white" : "text-[#0F172A]"
              }`}
            >
              Internship <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Logs</span>
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
              }`}
            >
              Weekly documentation of learning, challenges, and growth during my internship journey at Makerspace InnovHub OPC.
            </p>
          </div>

          <div className="space-y-8">
            {sortedWeeks.map((week) => (
              <div key={week}>
                <button
                  onClick={() => setSelectedWeek(selectedWeek === week ? null : week)}
                  className={`w-full flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] ${
                    isDark
                      ? "bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155] hover:border-[#7C3AED]"
                      : "bg-gradient-to-br from-white to-[#F8FAFC] border-[#E2E8F0] hover:border-[#7C3AED]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#7C3AED] flex items-center justify-center text-white font-bold text-xl">
                      {week}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#0F172A]"}`}>
                        Week {week}
                      </h3>
                      <p className={`text-sm ${isDark ? "text-[#CBD5E1]" : "text-[#64748B]"}`}>
                        {weekGroups[week].length} {weekGroups[week].length === 1 ? "entry" : "entries"}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
                      selectedWeek === week ? "rotate-180" : ""
                    } ${isDark ? "text-[#CBD5E1]" : "text-[#64748B]"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {selectedWeek === week && (
                  <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {weekGroups[week].map((post) => (
                      <Link
                        key={post.slug}
                        href={`/logs/${post.slug}`}
                        className={`block p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                          isDark
                            ? "bg-[#0F172A] border-[#334155] hover:border-[#7C3AED]"
                            : "bg-white border-[#E2E8F0] hover:border-[#7C3AED]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-[#0F172A]"}`}>
                              {post.title}
                            </h4>
                            <p className={`text-sm mb-3 ${isDark ? "text-[#CBD5E1]" : "text-[#64748B]"}`}>
                              {post.summary}
                            </p>
                            <div className="flex gap-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 text-xs font-medium rounded-full bg-[#1E40AF]/10 text-[#1E40AF]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className={`text-sm whitespace-nowrap ${isDark ? "text-[#64748B]" : "text-[#94A3B8]"}`}>
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
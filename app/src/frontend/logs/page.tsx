"use client";

import { useEffect, useState } from "react";
import NavDashboard from "../navigation dashboard/NavDashboard";
import { getLogPosts } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";
import type { LogPost } from "@/lib/types";

const weekIcons = [
  { svg: "M19 12h-2m-4 0H9m4-9V3m0 18v-2M7.05 7.05L5.636 5.636m9.728 9.728l1.414 1.414M7.05 16.95L5.636 18.364m9.728-9.728l1.414-1.414M5 12a7 7 0 1114 0 7 7 0 01-14 0z" },
  { svg: "M10 20v-6h4v6m0-11V3m0 8h.01M3 10h18M3 14h18" },
  { svg: "M13.828 10.172a4 4 0 00-5.656 0l-4.243 4.243a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4.242-4.243a4 4 0 00-5.656-5.656l-1.1 1.1" },
  { svg: "M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { svg: "M13 10V3L4 14h7v7l9-11h-7z" },
  { svg: "M12 6V4m6 2a8 8 0 11-16 0 8 8 0 0116 0zm0 8v2m-6-2a8 8 0 01-16 0 8 8 0 0116 0zm-6-2h2m6 0h2" },
  { svg: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { svg: "M13 10V3L4 14h7v7l9-11h-7z" },
  { svg: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { svg: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { svg: "M13 10V3L4 14h7v7l9-11h-7z" },
  { svg: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { svg: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export default function LogsPage() {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState<LogPost[]>([]);
  const [layoutMode, setLayoutMode] = useState<"list" | "grid">("list");
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("oldest");
  const [searchQuery, setSearchQuery] = useState("");
  const [weekFilter, setWeekFilter] = useState<string>("all");
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      const data = await getLogPosts();

      if (isMounted) {
        setPosts(data);
        setIsLoading(false);
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sort posts based on sortOrder
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
  });

  const availableWeeks = [...posts].sort((a, b) => a.week - b.week);

  const filteredPosts = sortedPosts.filter((post) => {
    const matchesWeek = weekFilter === "all" || post.week === Number(weekFilter);
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      post.title.toLowerCase().includes(normalizedSearch) ||
      post.summary.toLowerCase().includes(normalizedSearch) ||
      post.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch)) ||
      post.week.toString().includes(normalizedSearch);

    return matchesWeek && matchesSearch;
  });

  const selectedPost = posts.find(p => p.week === selectedWeek);

  if (isLoading) {
    return (
      <div className={`min-h-screen transition-colors ${
        isDark 
          ? "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" 
          : "bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
      }`}>
        <NavDashboard />
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className={isDark ? "text-[#CBD5E1]" : "text-[#64748B]"}>Loading...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={`min-h-screen animate-in fade-in duration-1000 transition-colors ${
      isDark 
        ? "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" 
        : "bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
    }`}>
      <NavDashboard />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
              isDark ? "text-white" : "text-[#0F172A]"
            }`}>
              Development <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Logs</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
            }`}>
              Detailed documentation of technical progress, challenges, learnings, and implementations throughout the development journey.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(12rem,14rem)_auto_auto] items-center">
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
                  placeholder="Search logs by title, summary, tag, or week"
                  className={`w-full rounded-lg border-2 pl-12 pr-4 py-3 text-sm md:text-base transition-all duration-300 focus:outline-none focus:scale-[1.01] ${
                    isDark
                      ? "bg-[#0F172A] border-[#334155] text-white placeholder-[#64748B] focus:border-[#7C3AED] focus:shadow-lg focus:shadow-[#7C3AED]/20"
                      : "bg-white border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1E40AF] focus:shadow-lg focus:shadow-[#1E40AF]/10"
                  }`}
                />
              </div>

              <select
                value={weekFilter}
                onChange={(e) => setWeekFilter(e.target.value)}
                className={`w-full rounded-lg border-2 px-4 py-3 text-sm md:text-base transition-all duration-300 focus:outline-none focus:scale-[1.01] ${
                  isDark
                    ? "bg-[#0F172A] border-[#334155] text-white focus:border-[#7C3AED] focus:shadow-lg focus:shadow-[#7C3AED]/20"
                    : "bg-white border-[#E2E8F0] text-[#0F172A] focus:border-[#1E40AF] focus:shadow-lg focus:shadow-[#1E40AF]/10"
                }`}
              >
                <option value="all">All weeks</option>
                {availableWeeks.map((post) => (
                  <option key={post.week} value={post.week}>
                    Week {post.week}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "oldest" ? "newest" : "oldest")}
                className="p-3 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
                title={sortOrder === "oldest" ? "Sort Newest to Oldest" : "Sort Oldest to Newest"}
              >
                {sortOrder === "oldest" ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" transform="rotate(180)" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setLayoutMode(layoutMode === "list" ? "grid" : "list")}
                className="p-3 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
                title={layoutMode === "list" ? "Switch to Grid View" : "Switch to List View"}
              >
                {layoutMode === "list" ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {layoutMode === "list" ? (
            <div className="space-y-4">
            {filteredPosts.map((post, idx) => (
              <div
                key={post.slug}
                onClick={() => setSelectedWeek(post.week)}
                className={`block group relative cursor-pointer rounded-xl border-2 hover:shadow-2xl hover:scale-102 transition-all duration-300 animate-in fade-in slide-in-from-left-4 duration-500 overflow-hidden ${
                  isDark 
                    ? "bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155] hover:border-[#7C3AED]" 
                    : "bg-gradient-to-br from-white to-[#F8FAFC] border-[#E2E8F0] hover:border-[#7C3AED]"
                }`}
                style={{
                  animationDelay: `${idx * 75}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-[#1E40AF]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="p-7 relative">
                  <div className="flex items-start gap-6 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-[#1E40AF] via-[#2E5FD8] to-[#1E3A8A] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={weekIcons[idx % weekIcons.length].svg} />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white text-xs font-bold rounded-full">
                          Week {post.week}
                        </span>
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 group-hover:text-[#1E40AF] transition-colors ${
                        isDark ? "text-white" : "text-[#0F172A]"
                      }`}>
                        {post.title}
                      </h3>
                      <p className={`text-sm font-medium ${
                        isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                      }`}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className={`mb-4 leading-relaxed text-base border-l-4 border-[#7C3AED] pl-4 ${
                    isDark ? "text-[#CBD5E1]" : "text-[#475569]"
                  }`}>{post.summary}</p>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-xs rounded-full font-semibold border transition-all duration-200 ${
                          isDark 
                            ? "bg-[#1E3A8A]/30 text-[#7C3AED] border-[#1E3A8A]/50 hover:bg-[#7C3AED] hover:text-white" 
                            : "bg-[#F0F4FF] text-[#1E40AF] border-[#D4E1FF] hover:bg-[#1E40AF] hover:text-white"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <div
                  key={post.slug}
                  onClick={() => setSelectedWeek(post.week)}
                  className={`group relative cursor-pointer rounded-xl border-2 hover:shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden animate-in fade-in zoom-in duration-500 ${
                    isDark 
                      ? "bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155] hover:border-[#7C3AED]" 
                      : "bg-gradient-to-br from-white to-[#F8FAFC] border-[#E2E8F0] hover:border-[#7C3AED]"
                  }`}
                  style={{
                    animationDelay: `${idx * 75}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="p-6 h-full flex flex-col relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300 -z-10" />
                    
                    <div className="mb-6">
                      <div className="relative w-14 h-14 bg-gradient-to-br from-[#1E40AF] via-[#2E5FD8] to-[#1E3A8A] rounded-lg flex items-center justify-center font-bold text-white mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={weekIcons[idx % weekIcons.length].svg} />
                        </svg>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white text-xs font-bold rounded-full">
                          Week {post.week}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold line-clamp-2 group-hover:text-[#1E40AF] transition-colors ${
                        isDark ? "text-white" : "text-[#0F172A]"
                      }`}>
                        {post.title}
                      </h3>
                      <p className={`text-xs mt-3 font-medium ${
                        isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                      }`}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className={`h-px bg-gradient-to-r mb-4 ${
                      isDark ? "from-[#334155] via-[#7C3AED]/20 to-transparent" : "from-[#E2E8F0] via-[#7C3AED]/20 to-transparent"
                    }`} />
                    <p className={`text-sm leading-relaxed mb-4 flex-grow line-clamp-3 ${
                      isDark ? "text-[#CBD5E1]" : "text-[#475569]"
                    }`}>
                      {post.summary}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded-full font-semibold border transition-all duration-200 ${
                            isDark 
                              ? "bg-[#1E3A8A]/30 text-[#7C3AED] border-[#1E3A8A]/50 hover:bg-[#7C3AED] hover:text-white" 
                              : "bg-[#F0F4FF] text-[#1E40AF] border-[#D4E1FF] hover:bg-[#1E40AF] hover:text-white"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white rounded-full font-semibold">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className={`rounded-2xl border-2 border-dashed p-10 text-center ${
                  isDark ? "border-[#334155] text-[#CBD5E1]" : "border-[#E2E8F0] text-[#64748B]"
                }`}>
                  <p className="text-lg font-semibold mb-2">No logs match your filters.</p>
                  <p className="text-sm">Try a different search term or switch the week dropdown back to All weeks.</p>
                </div>
              )}
            </div>
          )}

          {selectedWeek && selectedPost && (
            <div className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 ${
              isDark ? "bg-black/40" : "bg-white/20"
            }`} onClick={() => setSelectedWeek(null)}>
              <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-in zoom-in slide-in-from-bottom-8 duration-300 ${
                isDark ? "bg-[#0F172A]" : "bg-white"
              }`} onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-gradient-to-br from-[#1E40AF] via-[#3B5FD8] to-[#7C3AED] p-8 rounded-t-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                  </div>
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={weekIcons[selectedWeek - 1].svg} />
                        </svg>
                        <h3 className="text-4xl font-bold text-white">{selectedPost.title}</h3>
                      </div>
                      <div className="h-1 w-24 bg-gradient-to-r from-white to-transparent rounded-full" />
                    </div>
                    <button
                      onClick={() => setSelectedWeek(null)}
                      className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-3 transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={`p-8 space-y-6 ${isDark ? "text-[#E2E8F0]" : ""}`}>
                  <div>
                    <h4 className="text-sm font-bold text-[#7C3AED] uppercase tracking-wider mb-3">Summary</h4>
                    <p className={`text-lg leading-relaxed ${
                      isDark ? "text-[#CBD5E1]" : "text-[#475569]"
                    }`}>
                      {selectedPost.summary}
                    </p>
                  </div>
                  <div className={`h-px bg-gradient-to-r from-[#7C3AED] to-[#7C3AED] ${
                    isDark ? "opacity-30" : "from-[#E2E8F0] via-[#7C3AED] to-[#E2E8F0]"
                  }`} />
                  <div>
                    <p className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                      isDark ? "text-white" : "text-[#0F172A]"
                    }`}>Week Details</p>
                    <p className={`mb-3 ${
                      isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                    }`}>
                      <span className="font-semibold">Date:</span> {new Date(selectedPost.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#E2E8F0] via-[#7C3AED] to-[#E2E8F0]" />
                  <div>
                    <div className={`bg-gradient-to-br p-6 rounded-xl border-2 hover:border-[#7C3AED] transition-all duration-300 ${
                      isDark 
                        ? "from-[#1E293B] to-[#0F172A] border-[#334155]" 
                        : "from-[#F0F4FF] to-[#F8FAFC] border-[#E2E8F0]"
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#7C3AED] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <p className={`text-sm font-bold uppercase tracking-wider ${
                          isDark ? "text-white" : "text-[#0F172A]"
                        }`}>Tags</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {selectedPost.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-[#1E40AF] text-white text-xs rounded-full font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-[#94A3B8] py-8 text-center border-t border-[#334155]">
        <p className="font-medium text-sm">
          © 2024 Johann Gacayan. Built with precision and attention to detail.
        </p>
      </footer>
    </div>
  );
}
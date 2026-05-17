"use client";

import Link from "next/link";
import { use } from "react";
import NavDashboard from "../../navigation dashboard/NavDashboard";
import { getLogPosts } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { isDark } = useTheme();
  const logPosts = getLogPosts();
  const post = logPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div
        className={`min-h-screen ${
          isDark
            ? "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]"
            : "bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
        }`}
      >
        <NavDashboard />
        <div className="pt-32 px-4 text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-[#0F172A]"}`}>
            Post not found
          </h1>
          <Link href="/logs" className="text-[#1E40AF] hover:underline">
            ← Back to Logs
          </Link>
        </div>
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

      <article className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/logs"
            className={`inline-flex items-center gap-2 mb-8 text-sm font-medium hover:text-[#1E40AF] transition-colors ${
              isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Logs
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#7C3AED] flex items-center justify-center text-white font-bold">
                {post.week}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#7C3AED] uppercase tracking-wider">Week {post.week}</p>
                <p className={`text-sm ${isDark ? "text-[#64748B]" : "text-[#94A3B8]"}`}>
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-[#0F172A]"}`}>
              {post.title}
            </h1>

            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-[#1E40AF]/10 text-[#1E40AF]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`prose prose-lg max-w-none ${
              isDark ? "prose-invert prose-invert" : ""
            }`}
          >
            <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-[#CBD5E1]" : "text-[#475569]"}`}>
              {post.summary}
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[#334155]/30">
            <Link
              href="/logs"
              className="inline-flex items-center gap-2 text-[#1E40AF] font-semibold hover:underline"
            >
              ← View All Logs
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
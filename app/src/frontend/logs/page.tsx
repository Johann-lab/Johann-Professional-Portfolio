import Link from "next/link";
import NavDashboard from "../navigation dashboard/NavDashboard";
import { getLogPosts } from "@/lib/data";
import type { LogPost } from "@/lib/types";

export default async function LogsPage() {
  const posts = await getLogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]">
      <NavDashboard />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-[#0F172A] mb-4">
              Development Logs
            </h1>
            <p className="text-xl text-[#64748B] leading-relaxed">
              Detailed documentation of technical progress, challenges, learnings, and implementations throughout the development journey.
            </p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/logs/${post.slug}`}
                className="block bg-white rounded-lg border border-[#E2E8F0] hover:border-[#7C3AED] hover:shadow-md transition-all"
              >
                <div className="p-7">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="w-14 h-14 bg-[#1E40AF] border border-[#3B82F6] rounded-lg flex items-center justify-center font-semibold text-white shadow-sm">
                      W{post.week}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-[#0F172A]">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#64748B] mt-1">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#64748B] ml-20 mb-4 leading-relaxed text-sm">{post.summary}</p>
                  <div className="flex gap-2 ml-20 flex-wrap">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-[#1E40AF] text-white rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
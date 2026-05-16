import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavDashboard from "../../navigation dashboard/NavDashboard";
import { getLogPosts, getLogPostBySlug } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getLogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getLogPostBySlug(slug);
  
  if (!post) {
    return { title: "Log Not Found" };
  }

  return {
    title: `${post.title} | Johann's Internship Logs`,
    description: post.summary,
  };
}

export default async function LogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getLogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const posts = await getLogPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]">
      <NavDashboard />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/logs"
            className="inline-flex items-center text-[#7C3AED] font-semibold mb-10 hover:text-[#1E40AF] text-sm tracking-wider"
          >
            ← BACK TO LOGS
          </Link>

          <article className="bg-white rounded-lg border border-[#E2E8F0] p-10 shadow-sm">
            <header className="mb-10">
              <div className="flex items-center gap-6 mb-6">
                <span className="w-20 h-20 bg-[#1E40AF] border border-[#3B82F6] rounded-lg flex items-center justify-center font-semibold text-white text-lg shadow-md">
                  W{post.week}
                </span>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A]">
                    {post.title}
                  </h1>
                  <p className="text-[#64748B] text-sm mt-2">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-[#1E40AF] text-white rounded-md font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#64748B] text-lg leading-relaxed">
                {post.summary}
              </p>
              <div className="mt-10 p-8 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <p className="text-[#0F172A] font-semibold">
                  Key highlights:
                </p>
                <ul className="mt-6 space-y-3 text-[#64748B]">
                  <li>• Technical implementations and solutions</li>
                  <li>• Challenges encountered and resolutions</li>
                  <li>• Learning outcomes and insights gained</li>
                  <li>• Code patterns and best practices applied</li>
                </ul>
              </div>
            </div>
          </article>

          <div className="flex justify-between gap-6 mt-12">
            {prevPost ? (
              <Link
                href={`/logs/${prevPost.slug}`}
                className="bg-white px-8 py-4 rounded-lg border border-[#E2E8F0] hover:border-[#7C3AED] hover:shadow-md transition-all flex-1"
              >
                <span className="text-xs text-[#64748B] font-semibold tracking-wider">← PREVIOUS</span>
                <p className="font-semibold text-[#0F172A] text-sm mt-2">{prevPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/logs/${nextPost.slug}`}
                className="bg-white px-8 py-4 rounded-lg border border-[#E2E8F0] hover:border-[#7C3AED] hover:shadow-md transition-all text-right flex-1"
              >
                <span className="text-xs text-[#64748B] font-semibold tracking-wider">NEXT →</span>
                <p className="font-semibold text-[#0F172A] text-sm mt-2">{nextPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
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
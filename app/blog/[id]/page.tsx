import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { PORTFOLIO_CONTENT } from "@/data/portfolioContent";
import BlogMusicPlayer from "@/components/BlogMusicPlayer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const aiArticles = PORTFOLIO_CONTENT.ai.articles.map((a) => ({ id: a.id }));
  const sweArticles = PORTFOLIO_CONTENT.swe.articles.map((a) => ({ id: a.id }));
  return [...aiArticles, ...sweArticles];
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const allArticles = [
    ...PORTFOLIO_CONTENT.ai.articles,
    ...PORTFOLIO_CONTENT.swe.articles,
  ];
  const article = allArticles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <div
      className="min-h-screen w-full font-sans text-white select-none overflow-x-hidden"
      style={{
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(circle at 80% 12%, rgba(192, 132, 252, 0.08) 0%, rgba(147, 51, 234, 0.03) 35%, transparent 65%)",
      }}
    >
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/75 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group"
          >
            <Icon
              icon="lucide:arrow-left"
              className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="text-xs font-mono text-purple-300 hover:underline"
            >
              All field guides
            </Link>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-xs font-mono text-neutral-400">EMSTACK</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {article.project && (
              <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-purple-300/40 bg-purple-500/20 text-purple-200 font-bold uppercase tracking-wider">
                {article.project}
              </span>
            )}
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-3 py-1 rounded-full border border-purple-300/20 bg-purple-500/10 text-purple-300 font-semibold"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs font-mono text-neutral-400 ml-2">
              {article.date} · {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed italic border-l-2 border-purple-400/50 pl-4">
              {article.subtitle}
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-[1px]">
                <div className="h-full w-full rounded-full bg-[#090b10] flex items-center justify-center text-xs font-mono font-bold text-white">
                  EM
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {article.author || "Emmanuel (EMSTACK)"}
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  Full-Stack Software &amp; AI Automation Engineer
                </p>
              </div>
            </div>

            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-colors"
            >
              <span>Discuss topic</span>
              <Icon icon="lucide:message-square" className="h-3.5 w-3.5 text-purple-300" />
            </Link>
          </div>
        </div>

        <article className="prose prose-invert max-w-none space-y-8 text-neutral-300 text-base sm:text-lg leading-relaxed pt-6 border-t border-white/10">
          {article.content ? (
            article.content.map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{article.excerpt}</p>
          )}
        </article>

        <div className="my-16 p-6 sm:p-8 rounded-2xl border border-purple-300/20 bg-purple-500/[0.04] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider block mb-1">
              Architecture Advisory &amp; Collaboration
            </span>
            <h3 className="text-xl font-bold text-white">
              Need deterministic systems built for your team?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg">
              I architect autonomous workflows, high-throughput microservices, and modern web applications with strict SLAs.
            </p>
          </div>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(216,180,254,0.3)] shrink-0"
          >
            Get in touch
          </Link>
        </div>

        {relatedArticles.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">
                More Engineering Field Guides
              </h3>
              <Link
                href="/blog"
                className="text-xs font-mono text-purple-300 hover:underline inline-flex items-center gap-1"
              >
                <span>View all</span>
                <Icon icon="lucide:arrow-right" className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.id}`}
                  className="group p-6 rounded-2xl border border-white/10 bg-[#07090d]/80 hover:border-purple-300/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-3">
                      <span>{rel.date}</span>
                      <span className="text-purple-300">{rel.readTime}</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-mono text-[10px]">{rel.tags[0]}</span>
                    <span className="group-hover:translate-x-1 transition-transform text-purple-300">
                      <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <BlogMusicPlayer />
    </div>
  );
}

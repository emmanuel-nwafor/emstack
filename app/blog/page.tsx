"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { PORTFOLIO_CONTENT } from "@/data/portfolioContent";
import BlogMusicPlayer from "@/components/BlogMusicPlayer";

export default function BlogArchivePage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allArticles = [
    ...PORTFOLIO_CONTENT.ai.articles,
    ...PORTFOLIO_CONTENT.swe.articles,
  ];

  const uniqueArticles = Array.from(
    new Map(allArticles.map((a) => [a.id, a])).values()
  );

  const allTags = [
    "All",
    ...Array.from(new Set(uniqueArticles.flatMap((a) => a.tags))),
  ];

  const filteredArticles =
    selectedTag === "All"
      ? uniqueArticles
      : uniqueArticles.filter((a) => a.tags.includes(selectedTag));

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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
            <span className="text-xs font-mono font-semibold text-purple-300">
              Field Guides &amp; Research
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-xs font-mono text-neutral-400">EMSTACK</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <header className="mb-14 max-w-2xl">
          <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest block mb-2">
            Engineering Archives
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Field guides &amp;{" "}
            <em className="font-serif italic font-normal text-purple-300">
              research notes
            </em>
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed">
            Personal engineering post-mortems, architectural blockers, and production solutions from shipping GoEat, Voom Now, Victhon, and real-world client platforms.
          </p>
        </header>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                selectedTag === tag
                  ? "bg-purple-300 text-slate-950 font-bold shadow-[0_0_12px_rgba(216,180,254,0.4)]"
                  : "border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((item) => (
            <Link
              key={item.id}
              href={`/blog/${item.id}`}
              className="group flex flex-col justify-between p-7 rounded-2xl border border-white/10 bg-[#07090d]/80 backdrop-blur-2xl transition-all duration-300 hover:border-purple-300/40 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(216,180,254,0.08)] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span>{item.date}</span>
                    {item.project && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-purple-300/20 bg-purple-500/10 text-purple-300 font-semibold">
                        {item.project}
                      </span>
                    )}
                  </div>
                  <span className="text-purple-300 font-semibold">{item.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-neutral-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-transform">
                  <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BlogMusicPlayer />
    </div>
  );
}

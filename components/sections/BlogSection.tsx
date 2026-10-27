"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { BlogSectionProps } from "@/constants";

export default function BlogSection({ articles }: BlogSectionProps) {
  return (
    <section
      id="blog"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 select-none"
    >
      <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
            06 — Research &amp; Writing
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
            Engineering{" "}
            <em className="font-serif italic font-normal text-purple-300">
              notes &amp; field guides
            </em>
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-neutral-400 max-w-md">
            Post-mortems, architectural blockers, and production solutions from shipping GoEat, Voom Now, Victhon, and real-world client platforms.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-all shrink-0 hover:border-purple-300/40"
          >
            <span>All articles</span>
            <Icon icon="lucide:arrow-right" className="h-3.5 w-3.5 text-purple-300" />
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/blog/${item.id}`}
            className="group flex flex-col justify-between p-7 rounded-2xl border border-white/10 bg-[#07090d]/80 backdrop-blur-2xl transition-colors duration-200 hover:bg-white/[0.08] cursor-pointer"
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

            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
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
              <span className="text-neutral-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all">
                <Icon icon="lucide:arrow-right" className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

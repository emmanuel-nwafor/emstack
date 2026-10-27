"use client";

import React from "react";
import { ToolkitSectionProps } from "@/constants";

export default function ToolkitSection({ toolkit }: ToolkitSectionProps) {
  return (
    <section
      id="toolkit"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 select-none"
    >
      <header className="mb-14">
        <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
          05 — Skills &amp; Tools
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
          The toolkit,{" "}
          <em className="font-serif italic font-normal text-purple-300">
            kept sharp
          </em>
        </h2>
      </header>

      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl divide-y divide-white/[0.08] overflow-hidden">
        {toolkit.map((cat) => (
          <div
            key={cat.title}
            className="px-6 sm:px-10 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12"
          >
            <span className="w-28 sm:w-36 shrink-0 text-xs font-mono font-semibold text-neutral-400 uppercase tracking-widest">
              {cat.title}
            </span>
            <div className="flex flex-wrap gap-2.5 items-center">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-xs sm:text-sm font-medium text-neutral-200 transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

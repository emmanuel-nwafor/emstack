"use client";

import React from "react";
import { PrinciplesSectionProps } from "@/constants";

export default function PrinciplesSection({ principles }: PrinciplesSectionProps) {
  return (
    <section
      id="principles"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 select-none"
    >
      <header className="mb-12">
        <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
          05 — How I work
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
          Opinions,{" "}
          <em className="font-serif italic font-normal text-purple-300">
            earned the hard way
          </em>
        </h2>
      </header>

      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#07090d]/80 overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {principles.map((item, idx) => {
            const isRightCol = idx % 2 === 1;
            const isBottomRow = idx >= 2;
            return (
              <div
                key={item.num}
                className={`p-6 sm:p-10 transition-colors duration-200 hover:bg-white/[0.08] cursor-default flex flex-col justify-between min-h-[160px] sm:min-h-[180px] ${
                  idx > 0 && !isRightCol ? "border-t border-white/10" : ""
                } ${
                  isRightCol ? "md:border-l border-white/10 border-t md:border-t-0" : ""
                } ${
                  isBottomRow ? "md:border-t border-white/10" : ""
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-2.5 mb-2.5">
                    <span className="text-purple-300 font-serif italic text-xl sm:text-2xl font-normal select-none shrink-0">
                      {item.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl pl-0 sm:pl-8">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

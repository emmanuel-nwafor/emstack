"use client";

import React from "react";
import { MarqueeTickerProps } from "@/constants";

export default function MarqueeTicker({ items }: MarqueeTickerProps) {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#07090d]/60 py-4 backdrop-blur-md select-none">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07090d] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07090d] to-transparent z-10" />

      <div className="flex w-max animate-marquee space-x-8 text-xs font-mono tracking-wider uppercase text-neutral-300">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                idx % 2 === 0
                  ? "bg-purple-300 shadow-[0_0_6px_rgba(216,180,254,0.6)]"
                  : "bg-white/40"
              }`}
            />
            <span className="hover:text-white transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

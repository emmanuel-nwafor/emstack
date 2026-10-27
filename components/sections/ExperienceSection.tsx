"use client";

import React from "react";
import { ExperienceSectionProps } from "@/constants";

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      <header className="mb-14">
        <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
          03 — Experience
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
          Engineering journey,{" "}
          <em className="font-serif italic font-normal text-purple-300">
            one throughline
          </em>
        </h2>
      </header>

      <ol className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-12">
        {experience.map((item, idx) => (
          <li key={idx} className="relative pl-8 sm:pl-12">
            <span
              className={`absolute -left-2 top-1.5 h-4 w-4 rounded-full border-2 bg-white/[0.04] ${
                item.isCurrent
                  ? "border-purple-300 shadow-[0_0_8px_rgba(216,180,254,0.8)]"
                  : "border-white/20"
              }`}
            />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
              <span
                className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  item.isCurrent ? "text-purple-300" : "text-neutral-400"
                }`}
              >
                {item.period}
              </span>
              {item.isCurrent && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-300 w-max">
                  Current
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {item.role} &bull;{" "}
              <span className="text-purple-300">
                {item.company}
              </span>
            </h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed max-w-2xl">
              {item.desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

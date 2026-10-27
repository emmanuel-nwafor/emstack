"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { TestimonialsSectionProps } from "@/constants";

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 select-none"
    >
      <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
            04 — Proof of Impact
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
            What builders say,{" "}
            <em className="font-serif italic font-normal text-purple-300">
              in their own words
            </em>
          </h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md">
          Direct observations from founders, operators, and product leaders on delivered architectures, speed, and real-world system reliability.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl transition-colors duration-200 hover:bg-white/[0.08] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-purple-500/10 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-6">
                <Icon
                  icon="lucide:quote"
                  className="h-7 w-7 text-purple-300/50 group-hover:text-purple-300 transition-colors shrink-0"
                />
                {item.metric && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-300/20 bg-purple-500/10 text-[11px] font-mono font-semibold text-purple-300 shrink-0">
                    <Icon icon="lucide:sparkles" className="h-3 w-3" />
                    <span>{item.metric}</span>
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-[15px] text-neutral-300 leading-relaxed font-normal">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="flex items-start gap-3.5">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-300/30 flex items-center justify-center font-mono font-bold text-xs text-purple-200 shrink-0 mt-0.5">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white tracking-tight truncate">
                      {item.name}
                    </h4>
                    <span title="Verified Collaborator">
                      <Icon
                        icon="lucide:check-circle-2"
                        className="h-3.5 w-3.5 text-emerald-400 shrink-0"
                      />
                    </span>
                    {item.linkedIn && (
                      <a
                        href={item.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        className="text-neutral-400 hover:text-purple-300 transition-colors inline-flex items-center p-0.5 rounded hover:bg-white/5 ml-auto sm:ml-0"
                      >
                        <Icon icon="lucide:linkedin" className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 mt-1 leading-snug">
                    {item.role}
                  </p>
                  <p className="text-[11px] font-mono text-neutral-400 mt-0.5 leading-snug">
                    {item.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

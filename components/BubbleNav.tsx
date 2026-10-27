"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { BubbleNavProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function BubbleNav({
  mode,
  onChange,
  isDarkTheme,
}: BubbleNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const isSwe = mode === "swe";
  const travelX = 52;

  useGSAP(
    () => {
      if (!bubbleRef.current) return;
      const targetX = isSwe ? travelX : 0;

      gsap.to(bubbleRef.current, {
        x: targetX,
        duration: 0.65,
        ease: "power3.inOut",
      });

      gsap
        .timeline()
        .to(bubbleRef.current, {
          scaleX: 1.15,
          scaleY: 0.88,
          duration: 0.22,
          ease: "power2.out",
        })
        .to(bubbleRef.current, {
          scaleX: 0.96,
          scaleY: 1.04,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(bubbleRef.current, {
          scaleX: 1.0,
          scaleY: 1.0,
          duration: 0.35,
          ease: "elastic.out(1.2, 0.45)",
        });
    },
    { scope: containerRef, dependencies: [mode] }
  );

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center select-none pointer-events-auto"
    >
      <div
        role="switch"
        aria-checked={isSwe}
        tabIndex={0}
        onClick={() => onChange(isSwe ? "ai" : "swe")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(isSwe ? "ai" : "swe");
          }
        }}
        className={`relative flex h-[38px] w-[110px] cursor-pointer items-center justify-between rounded-full p-1 transition-all duration-500 focus:outline-none ${
          isDarkTheme
            ? "bg-[#090d14]/85 border border-white/15 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.6)]"
            : "bg-white/85 border border-slate-200 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_18px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div
          className={`relative z-10 flex h-full w-[50px] items-center justify-center transition-all duration-300 ${
            !isSwe
              ? "text-purple-300 scale-105 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]"
              : isDarkTheme
              ? "text-neutral-500 hover:text-neutral-300 opacity-60"
              : "text-slate-400 hover:text-slate-600 opacity-60"
          }`}
          title="AI Automation Mode"
        >
          <Icon icon="lucide:bot" className="h-[20px] w-[20px]" />
        </div>

        <div
          className={`relative z-10 flex h-full w-[50px] items-center justify-center transition-all duration-300 ${
            isSwe
              ? "text-white scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              : isDarkTheme
              ? "text-neutral-500 hover:text-neutral-300 opacity-60"
              : "text-slate-400 hover:text-slate-600 opacity-60"
          }`}
          title="Software Engineering Mode"
        >
          <Icon icon="lucide:code-2" className="h-[18px] w-[18px]" />
        </div>

        <div
          ref={bubbleRef}
          className="pointer-events-none absolute -left-[4px] -top-[5px] flex h-[48px] w-[58px] items-center justify-center rounded-full will-change-transform"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: isDarkTheme
                ? "1.2px solid rgba(255, 255, 255, 0.7)"
                : "1.2px solid rgba(255, 255, 255, 0.95)",
              boxShadow: isDarkTheme
                ? `
                  inset 0 2px 2.5px rgba(255, 255, 255, 0.95),
                  inset 0 1px 1px #ffffff,
                  inset 0 -2px 2.5px rgba(216, 180, 254, 0.5),
                  inset -1.5px 0 2px rgba(168, 85, 247, 0.3),
                  0 0 10px rgba(216, 180, 254, 0.25)
                `
                : `
                  inset 0 2px 2.5px rgba(255, 255, 255, 1),
                  inset 0 1px 1px #ffffff,
                  inset 0 -2px 2.5px rgba(216, 180, 254, 0.4),
                  0 0 8px rgba(216, 180, 254, 0.2)
                `,
            }}
          />

          <div
            className="absolute inset-[1px] rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 110% 45% at 50% 5%, 
                  rgba(255, 255, 255, 0.95) 0%, 
                  rgba(255, 255, 255, 0.25) 30%, 
                  transparent 55%
                )
              `,
            }}
          />

          <div
            className="absolute inset-[1px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 100% 30% at 50% 96%, rgba(216, 180, 254, 0.5) 0%, transparent 50%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

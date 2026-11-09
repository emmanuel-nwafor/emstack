"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PortfolioMode, LiquidNavToggleProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function LiquidNavToggle({
  mode,
  onChange,
  isDarkTheme,
}: LiquidNavToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const isSwe = mode === "swe";
  const travelX = 166;

  useGSAP(
    () => {
      if (!knobRef.current) return;
      const targetX = isSwe ? travelX : 0;

      gsap.to(knobRef.current, {
        x: targetX,
        duration: 0.65,
        ease: "power3.inOut",
      });

      gsap
        .timeline()
        .to(knobRef.current, {
          scaleX: 1.14,
          scaleY: 0.9,
          duration: 0.22,
          ease: "power2.out",
        })
        .to(knobRef.current, {
          scaleX: 0.96,
          scaleY: 1.04,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(knobRef.current, {
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
      className="relative inline-flex items-center select-none"
    >
      
      <div
        role="switch"
        aria-checked={isSwe}
        tabIndex={0}
        onClick={() => onChange(isSwe ? "ai" : "swe")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(isSwe ? "ai" : "swe")}
        }}
        className={`relative flex h-[50px] w-[346px] cursor-pointer items-center justify-between rounded-full p-1 transition-colors duration-500 focus:outline-none ${
          isDarkTheme
            ? "bg-white/[0.08] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.4)]"
            : "bg-black/[0.05] border border-black/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_16px_rgba(0,0,0,0.06)]"
        }`}
      >
        
        <div
          className={`relative z-10 flex flex-1 h-full items-center justify-center gap-1.5 px-3 transition-colors duration-300 ${
            !isSwe
              ? isDarkTheme
                ? "text-white font-semibold"
                : "text-slate-900 font-semibold"
              : isDarkTheme
              ? "text-neutral-400 font-medium hover:text-neutral-200"
              : "text-slate-500 font-medium hover:text-slate-700"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[13px] tracking-tight">AI Automation</span>
        </div>

        
        <div
          className={`relative z-10 flex flex-1 h-full items-center justify-center gap-1.5 px-3 transition-colors duration-300 ${
            isSwe
              ? isDarkTheme
                ? "text-white font-semibold"
                : "text-slate-900 font-semibold"
              : isDarkTheme
              ? "text-neutral-400 font-medium hover:text-neutral-200"
              : "text-slate-500 font-medium hover:text-slate-700"
          }`}
        >
          <span className="text-[13px] tracking-tight">Software Eng</span>
        </div>

        <div
          ref={knobRef}
          className="pointer-events-none absolute -left-[2px] -top-[4px] flex h-[58px] w-[176px] items-center justify-center rounded-full will-change-transform"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: isDarkTheme
                ? `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.15) 100%)`
                : `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.4) 100%)`,
              border: isDarkTheme
                ? "1px solid rgba(255, 255, 255, 0.45)"
                : "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: isDarkTheme
                ? `
                  inset 0 1.5px 2px rgba(255, 255, 255, 0.8),
                  inset 0 -1.5px 2px rgba(255, 255, 255, 0.3),
                  0 4px 12px rgba(0, 0, 0, 0.25)
                `
                : `
                  inset 0 1.5px 2px rgba(255, 255, 255, 1),
                  inset 0 -1.5px 2px rgba(255, 255, 255, 0.6),
                  0 4px 14px rgba(0, 0, 0, 0.08)
                `,
            }}
          />

          <div
            className="absolute inset-[1px] rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 95% 35% at 50% 5%, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(255, 255, 255, 0.2) 35%, 
                  transparent 60%
                )
              `,
            }}
          />
        </div>
      </div>
    </div>
  );
}

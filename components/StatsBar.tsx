"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StatsBarProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsBar({ stats }: StatsBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === "undefined" || !container) return;

    const ctx = gsap.context(() => {
      stats.forEach((stat, idx) => {
        const el = numRefs.current[idx];
        if (!el) return;

        const cleanVal = stat.value.replace(/,/g, "");
        const targetNum = parseFloat(cleanVal);
        if (isNaN(targetNum)) {
          el.textContent = stat.value;
          return;
        }

        const hasComma = stat.value.includes(",");
        const isDecimal = stat.value.includes(".");
        const decimals = isDecimal ? stat.value.split(".")[1].length : 0;
        const startVal = targetNum === 0 ? 0 : 1;
        const proxy = { val: startVal };

        const formatVal = (val: number) => {
          if (isDecimal) return val.toFixed(decimals);
          if (hasComma) return Math.round(val).toLocaleString();
          return Math.round(val).toString();
        };

        el.textContent = formatVal(startVal);

        gsap.to(proxy, {
          val: targetNum,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (el) {
              el.textContent = formatVal(proxy.val);
            }
          },
        });
      });

      const items = container.querySelectorAll(".stat-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 select-none">
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] overflow-hidden">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="stat-item flex flex-col items-start justify-center px-6 sm:px-10 py-6 sm:py-8 transition-colors duration-300 hover:bg-white/[0.02]"
          >
            <div className="flex items-baseline gap-1 text-3xl sm:text-4xl lg:text-5xl font-bold font-mono tracking-tight text-white">
              <span
                ref={(el) => {
                  numRefs.current[idx] = el;
                }}
              >
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-300 ml-0.5">
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 font-medium leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

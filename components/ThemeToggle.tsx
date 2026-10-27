"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { ThemeToggleProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!iconRef.current) return;
      gsap.fromTo(
        iconRef.current,
        { rotate: isDark ? -90 : 90, scale: 0.7, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }
      );
    },
    { dependencies: [isDark] }
  );

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle light/dark theme"
      className={`relative flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ${
        isDark
          ? "bg-white/[0.08] border-white/15 text-amber-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:bg-white/[0.14]"
          : "bg-black/[0.04] border-black/10 text-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-black/[0.08]"
      }`}
    >
      <div ref={iconRef} className="flex items-center justify-center">
        {isDark ? (
          <Icon icon="lucide:moon" className="h-5 w-5" />
        ) : (
          <Icon icon="lucide:sun" className="h-5 w-5" />
        )}
      </div>
    </button>
  );
}

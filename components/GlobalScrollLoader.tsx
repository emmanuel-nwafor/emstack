"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalScrollLoader() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const bar = barRef.current;
    if (!bar) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      gsap.to(bar, { scaleX: progress, duration: 0.15, ease: "none", overwrite: "auto" });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-[2.5px] z-50 bg-white/[0.04] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-400 origin-left will-change-transform shadow-[0_0_10px_rgba(56,189,248,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

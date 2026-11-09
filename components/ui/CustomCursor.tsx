"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowCoreRef = useRef<HTMLDivElement>(null);
  const projectCursorRef = useRef<HTMLDivElement>(null);
  const projectLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      return;
    }

    const spotlight = spotlightRef.current;
    const glowCore = glowCoreRef.current;
    const projectCursor = projectCursorRef.current;
    const projectLabel = projectLabelRef.current;
    if (!spotlight || !glowCore || !projectCursor) return;

    gsap.set(spotlight, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      scale: 1,
      opacity: 1,
    });

    gsap.set(glowCore, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
    });

    gsap.set(projectCursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      scale: 0.8,
      opacity: 0,
    });

    const xSpotlight = gsap.quickTo(spotlight, "x", { duration: 0.45, ease: "power2.out" });
    const ySpotlight = gsap.quickTo(spotlight, "y", { duration: 0.45, ease: "power2.out" });
    const xGlow = gsap.quickTo(glowCore, "x", { duration: 0.08, ease: "power2.out" });
    const yGlow = gsap.quickTo(glowCore, "y", { duration: 0.08, ease: "power2.out" });
    const xProject = gsap.quickTo(projectCursor, "x", { duration: 0.1, ease: "power2.out" });
    const yProject = gsap.quickTo(projectCursor, "y", { duration: 0.1, ease: "power2.out" });

    let isOverProjectCard = false;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      xSpotlight(e.clientX);
      ySpotlight(e.clientY);
      xGlow(e.clientX);
      yGlow(e.clientY);
      xProject(e.clientX);
      yProject(e.clientY);

      if (!isVisible) {
        isVisible = true;
        gsap.to(glowCore, { opacity: 1, duration: 0.2 });
      }

      const target = e.target as HTMLElement | null;
      const projectCard = target?.closest("[data-project-card]");

      if (projectCard) {
        document.body.style.cursor = "none";
        const title = projectCard.getAttribute("data-project-title") || "";

        if (title && projectLabel) {
          projectLabel.textContent = title;
        }

        if (!isOverProjectCard) {
          isOverProjectCard = true;
          gsap.to(projectCursor, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.5)",
            overwrite: "auto",
          });
          gsap.to(glowCore, {
            opacity: 0,
            scale: 0.2,
            duration: 0.15,
            overwrite: "auto",
          });
        }
      } else {
        document.body.style.cursor = "";
        if (isOverProjectCard) {
          isOverProjectCard = false;
          gsap.to(projectCursor, {
            opacity: 0,
            scale: 0.8,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(glowCore, {
            opacity: 1,
            scale: 1,
            duration: 0.18,
            overwrite: "auto",
          });
        }
      }
    };

    const handleMouseLeave = () => {
      document.body.style.cursor = "";
      isOverProjectCard = false;
      isVisible = false;
      gsap.to([projectCursor, glowCore], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 z-0 h-[950px] w-[950px] sm:h-[1100px] sm:w-[1100px] rounded-full will-change-transform"
        style={{
          background: `radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(147, 51, 234, 0.08) 35%, rgba(99, 102, 241, 0.03) 55%, transparent 75%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        ref={glowCoreRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-5 w-5 rounded-full will-change-transform mix-blend-screen hidden lg:block opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(216, 180, 254, 0.8) 0%, rgba(168, 85, 247, 0.3) 60%, transparent 100%)",
        }}
      />

      <div
        ref={projectCursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:flex items-center gap-2.5 will-change-transform -translate-x-2 -translate-y-2 select-none opacity-0"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] shrink-0"
        >
          <path
            d="M3 2L10 20L13.5 13.5L20 10L3 2Z"
            fill="white"
            stroke="#0a0a0c"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        <span
          ref={projectLabelRef}
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide text-slate-950 bg-purple-300 border border-purple-200/90 shadow-[0_4px_16px_rgba(168,85,247,0.45)] whitespace-nowrap"
        >
          GoEatOne
        </span>
      </div>
    </>
  );
}

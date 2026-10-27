"use client";

import React from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { DockItem } from "@/constants";

const DOCK_SECTIONS: (DockItem & { sign: string })[] = [
  { id: "top", label: "Intro", sign: "✦" },
  { id: "services", label: "What I do", sign: "✧" },
  { id: "work", label: "Work", sign: "✦" },
  { id: "experience", label: "Experience", sign: "✧" },
  { id: "testimonials", label: "Feedback", sign: "✦" },
  { id: "principles", label: "How I work", sign: "✧" },
  { id: "toolkit", label: "Toolkit", sign: "✦" },
  { id: "contact", label: "Contact", sign: "✧" },
];

const DOCK_SECTION_IDS = DOCK_SECTIONS.map((s) => s.id);

export default function SideDock() {
  const activeId = useScrollSpy(DOCK_SECTION_IDS, 0.35);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Celestial Constellation Tracker"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center pointer-events-none select-none"
    >
      <div className="relative flex flex-col items-center gap-1 pointer-events-auto py-4 px-2">
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-4 h-full pointer-events-none overflow-visible"
          fill="none"
        >
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            stroke="rgba(216, 180, 254, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </svg>

        {DOCK_SECTIONS.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="group relative flex items-center justify-center h-8 w-8 focus:outline-none cursor-pointer"
              aria-label={`Navigate to ${item.label}`}
            >
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <div className="absolute -inset-2 rounded-full border border-purple-400/30 animate-spin [animation-duration:8s] pointer-events-none border-dashed" />
                )}

                <div
                  className={`relative z-10 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "text-purple-300 scale-125 drop-shadow-[0_0_8px_rgba(216,180,254,0.9)]"
                      : "text-white/30 group-hover:text-purple-200 group-hover:scale-110"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`transition-all duration-300 ${isActive ? "w-4 h-4" : "w-3 h-3"}`}
                  >
                    <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                  </svg>
                </div>
              </div>

              <div className="absolute right-10 px-3 py-1 rounded-full border border-purple-400/20 bg-[#090b12]/95 backdrop-blur-md text-[11px] font-mono tracking-wider text-purple-200 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 whitespace-nowrap shadow-xl flex items-center gap-1.5">
                <span className="text-purple-400 font-serif italic text-xs">0{idx + 1}</span>
                <span className="text-white/40">·</span>
                <span className="font-semibold uppercase tracking-widest text-[10px]">{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

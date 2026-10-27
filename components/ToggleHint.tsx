"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const STORAGE_KEY = "portfolio_toggle_hint_dismissed";

export default function ToggleHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div
      className="absolute top-full mt-3.5 right-0 sm:left-1/2 sm:-translate-x-1/2 z-50 w-72 sm:w-80 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300"
      role="tooltip"
    >
      <div className="relative p-4 rounded-xl border border-white/15 bg-[#0a0d14]/95 backdrop-blur-2xl shadow-2xl">
        <div className="absolute -top-1.5 right-12 sm:left-1/2 sm:-translate-x-1/2 h-3 w-3 rotate-45 border-t border-l border-white/15 bg-[#0a0d14]" />

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20">
            <Icon icon="lucide:sliders-horizontal" className="h-3 w-3" />
            <span>Dual Specialization</span>
          </span>
          <button
            type="button"
            onClick={dismiss}
            className="text-neutral-400 hover:text-white transition-colors p-1 -mr-1 cursor-pointer"
            aria-label="Dismiss"
          >
            <Icon icon="lucide:x" className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed font-normal">
          Toggle between <span className="text-white font-semibold">Mobile &amp; Full-Stack Systems</span> and <span className="text-purple-300 font-semibold">Autonomous AI Workflows</span> to explore specialized case studies and metrics.
        </p>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-end">
          <button
            type="button"
            onClick={dismiss}
            className="px-3 py-1 rounded-md text-xs font-mono font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

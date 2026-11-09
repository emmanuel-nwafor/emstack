"use client";

import React from "react";
import InteractiveComposer from "@/components/InteractiveComposer";
import { ContactSectionProps } from "@/constants";

export default function ContactSection({ topics }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      <InteractiveComposer topics={topics} />

      <footer className="mt-24 pt-8 border-t border-white/10 text-xs font-mono text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>
          &copy; 2026 Emmanuel ~ EMSTACK &bull; AI Automation, Software &amp; Mobile Engineering
        </span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for select engineering contracts &bull; Remote worldwide</span>
        </div>
      </footer>
    </section>
  );
}

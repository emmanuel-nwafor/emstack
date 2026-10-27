"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { ServicesSectionProps } from "@/constants";
import AIWorkflowCanvas from "@/components/AIWorkflowCanvas";

export default function ServicesSection({ services, mode = "ai" }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      <header className="mb-12">
        <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
          01 — What I do
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
          Engineering systems,{" "}
          <em className="font-serif italic font-normal text-purple-300">
            end to end
          </em>
        </h2>
      </header>

      {mode === "ai" && <AIWorkflowCanvas />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {services.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl p-8 border border-white/10 bg-white/[0.03] backdrop-blur-2xl transition-colors duration-200 hover:bg-white/[0.08] flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.03] text-purple-300 flex items-center justify-center mb-6 shadow-md transition-colors">
                {item.iconType === "ai" ? (
                  <Icon icon="solar:cpu-bolt-bold-duotone" className="h-6 w-6" />
                ) : item.iconType === "backend" ? (
                  <Icon icon="lucide:server" className="h-6 w-6" />
                ) : (
                  <Icon icon="lucide:layout" className="h-6 w-6" />
                )}
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

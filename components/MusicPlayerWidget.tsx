"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { MusicPlayerWidgetProps } from "@/constants";

export default function MusicPlayerWidget({
  isPlaying,
  onToggle,
  frequencyData,
  trackTitle = "Lofi Study Beat",
  isDarkTheme = true,
  onLoadCustomTrack,
}: MusicPlayerWidgetProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onLoadCustomTrack) {
      onLoadCustomTrack(file);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none pointer-events-auto flex items-center gap-2">
      <div
        className={`group flex items-center p-2 rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-2xl ${
          isDarkTheme
            ? "bg-[#07090d]/90 border-white/10 text-white shadow-[0_12px_32px_rgba(0,0,0,0.8)]"
            : "bg-white/90 border-slate-300 text-slate-900 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
          className="relative h-11 w-11 rounded-xl overflow-hidden bg-[#10141d] flex items-center justify-center shrink-0 border border-white/10 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          <Image
            src="/scenes/frame_001.jpg"
            alt="Track thumbnail"
            width={44}
            height={44}
            className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            {isPlaying ? (
              <Icon icon="lucide:pause" className="h-3.5 w-3.5 text-white" />
            ) : (
              <Icon icon="lucide:play" className="h-3.5 w-3.5 text-purple-300 ml-0.5" />
            )}
          </div>
        </button>

        <div
          className={`flex items-center gap-3 transition-all duration-300 ease-out overflow-hidden ${
            isExpanded ? "max-w-[300px] opacity-100 ml-3 pr-2" : "max-w-0 opacity-0 ml-0 p-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col text-left shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-tight truncate max-w-[130px]">
                {trackTitle}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isPlaying ? "bg-purple-300 animate-pulse shadow-[0_0_6px_rgba(216,180,254,0.8)]" : "bg-neutral-500"
                }`}
              />
            </div>

            <div className="flex items-center gap-1 mt-1 h-3.5">
              {frequencyData.slice(0, 8).map((val, idx) => {
                const heightPct = isPlaying ? Math.max(20, Math.min(100, Math.round(val * 100))) : 20;
                return (
                  <span
                    key={idx}
                    style={{ height: `${heightPct}%` }}
                    className={`w-1 rounded-full transition-all duration-100 ${
                      idx % 2 === 0
                        ? "bg-purple-300 shadow-[0_0_4px_rgba(216,180,254,0.6)]"
                        : "bg-white/40"
                    }`}
                  />
                );
              })}
              <span className="text-[10px] font-mono text-neutral-400 ml-1.5">
                {isPlaying ? "Live" : "Paused"}
              </span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Load your own audio file"
            aria-label="Upload custom music"
            className="p-1.5 rounded-lg border border-white/10 hover:border-purple-300/40 hover:bg-white/[0.04] text-neutral-400 hover:text-purple-200 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Icon icon="lucide:plus" className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse music widget" : "Expand music widget"}
          className="p-1.5 ml-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
        >
          <Icon
            icon={isExpanded ? "lucide:chevron-left" : "lucide:chevron-right"}
            className="h-4 w-4"
          />
        </button>
      </div>
    </div>
  );
}

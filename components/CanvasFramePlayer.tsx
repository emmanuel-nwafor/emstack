"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useSceneFrames } from "@/hooks/useSceneFrames";
import { CanvasFramePlayerProps } from "@/constants";

export default function CanvasFramePlayer({
  className = "",
  currentFrame,
  isPlaying = false,
  onScrub,
  onReleaseScrub,
}: CanvasFramePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isReady, totalFrames, drawFrame } = useSceneFrames(192);
  const targetFractionRef = useRef(0);
  const currentFractionRef = useRef(0);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    drawFrame(canvasRef.current, currentFrame);
  }, [currentFrame, drawFrame, isReady]);

  useEffect(() => {
    if (isPlaying) {
      currentFractionRef.current = currentFrame / Math.max(1, totalFrames - 1);
      targetFractionRef.current = currentFractionRef.current;
    }
  }, [isPlaying, currentFrame, totalFrames]);

  const smoothScrubTick = useCallback(() => {
    if (!onScrub) return;
    const diff = targetFractionRef.current - currentFractionRef.current;
    if (Math.abs(diff) > 0.002) {
      currentFractionRef.current += diff * 0.045;
      onScrub(currentFractionRef.current);
      animIdRef.current = requestAnimationFrame(smoothScrubTick);
    } else {
      currentFractionRef.current = targetFractionRef.current;
      onScrub(currentFractionRef.current);
      animIdRef.current = null;
    }
  }, [onScrub]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isPlaying || !onScrub) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const fraction = Math.max(0, Math.min(1, x / rect.width));
      targetFractionRef.current = fraction;

      if (!animIdRef.current) {
        animIdRef.current = requestAnimationFrame(smoothScrubTick);
      }
    },
    [onScrub, isPlaying, smoothScrubTick]
  );

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) return;
    if (animIdRef.current) {
      cancelAnimationFrame(animIdRef.current);
      animIdRef.current = null;
    }
    onReleaseScrub?.();
  }, [isPlaying, onReleaseScrub]);

  useEffect(() => {
    return () => {
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090d14]/90 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.7)] p-3 transition-transform duration-500 hover:scale-[1.01]">
        <canvas
          ref={canvasRef}
          width={480}
          height={480}
          className={`w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[550px] object-cover rounded-xl bg-[#05080e] ${
            isPlaying ? "cursor-default" : "cursor-grab active:cursor-grabbing"
          }`}
        />

        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 bg-gradient-to-tr from-purple-500/5 via-transparent to-white/[0.02]" />

        <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#07090d]/85 backdrop-blur-md">
          <span
            className={`h-2 w-2 rounded-full ${
              isPlaying
                ? "bg-purple-300 animate-ping shadow-[0_0_8px_rgba(216,180,254,0.8)]"
                : "bg-purple-300/60"
            }`}
          />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-300">
            {isPlaying ? "Vibing to Music" : "Interactive Sequence"}
          </span>
        </div>

        <div className="absolute bottom-5 right-5 z-10 px-3 py-1 rounded-full border border-white/10 bg-[#07090d]/85 backdrop-blur-md text-[10px] font-mono text-white/80">
          EMSTACK
        </div>
      </div>
    </div>
  );
}

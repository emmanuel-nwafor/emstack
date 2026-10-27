"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { SmoothScrollProps } from "@/constants";

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      ref={(lenisRef) => {
        if (typeof window !== "undefined" && lenisRef?.lenis) {
          (window as unknown as { __lenis?: unknown }).__lenis = lenisRef.lenis;
        }
      }}
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
      }}
    >
      <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
        {children}
      </div>
    </ReactLenis>
  );
}

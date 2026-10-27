"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { GlassToggleProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function GlassToggle({
  initialState = false,
  onToggle,
  className = "",
}: GlassToggleProps) {
  const [isDark, setIsDark] = useState(initialState);
  const containerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const meniscusRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const lightTextRef = useRef<HTMLSpanElement>(null);
  const darkTextRef = useRef<HTMLSpanElement>(null);

  const travelX = 188;

  const handleToggle = () => {
    const nextState = !isDark;
    setIsDark(nextState);
    onToggle?.(nextState);
  };

  useGSAP(
    () => {
      if (!knobRef.current) return;
      const targetX = isDark ? travelX : 0;

      gsap.to(knobRef.current, {
        x: targetX,
        duration: 0.65,
        ease: "power3.inOut",
      });

      gsap
        .timeline()
        .to(knobRef.current, {
          scaleX: 1.15,
          scaleY: 0.88,
          duration: 0.24,
          ease: "power2.out",
        })
        .to(knobRef.current, {
          scaleX: 0.95,
          scaleY: 1.05,
          duration: 0.22,
          ease: "power2.inOut",
        })
        .to(knobRef.current, {
          scaleX: 1.0,
          scaleY: 1.0,
          duration: 0.35,
          ease: "elastic.out(1.2, 0.45)",
        });

      if (iconRef.current) {
        gsap.to(iconRef.current, {
          rotate: isDark ? 180 : 0,
          duration: 0.65,
          ease: "power3.inOut",
        });
      }

      if (lightTextRef.current && darkTextRef.current) {
        if (isDark) {
          gsap.to(lightTextRef.current, {
            opacity: 0,
            x: 10,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(darkTextRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power2.out",
          });
        } else {
          gsap.to(darkTextRef.current, {
            opacity: 0,
            x: -10,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(lightTextRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: 0.2,
            ease: "power2.out",
          });
        }
      }

      if (meniscusRef.current) {
        gsap.to(meniscusRef.current, {
          scaleX: isDark ? -1 : 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    },
    { scope: containerRef, dependencies: [isDark] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center select-none ${className}`}
    >
      {/* 2D Track (Pill shape faithfully matching Reference 2) */}
      <div
        role="switch"
        aria-checked={isDark}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        className={`group relative flex h-[106px] w-[340px] cursor-pointer items-center justify-between rounded-full
          bg-[#898d94] transition-all duration-300 active:scale-[0.985] focus:outline-none`}
        style={{
          boxShadow: `
            0 0 45px 3px rgba(255, 255, 255, 0.42),
            0 32px 64px -8px rgba(0, 0, 0, 0.48),
            0 14px 24px -4px rgba(0, 0, 0, 0.3),
            inset 0 1.5px 1.5px rgba(255, 255, 255, 0.65),
            inset 0 -2px 3.5px rgba(0, 0, 0, 0.2)
          `,
        }}
      >
        {/* Left Text: "Dark" (shown when toggled to Dark mode) */}
        <span
          ref={darkTextRef}
          className="absolute left-8 text-[32px] font-semibold tracking-tight text-white/95 transition-none"
          style={{ opacity: isDark ? 1 : 0 }}
        >
          Dark
        </span>

        {/* Right Text: "Light" (shown when in Light mode, exactly matching Reference 2) */}
        <span
          ref={lightTextRef}
          className="absolute right-9 text-[32px] font-semibold tracking-tight text-white/95 transition-none"
          style={{ opacity: isDark ? 0 : 1 }}
        >
          Light
        </span>

        {/* The Glass Sphere Knob (152px diameter - overflowing 23px top & bottom) */}
        <div
          ref={knobRef}
          className="pointer-events-none absolute -left-[6px] -top-[23px] flex h-[152px] w-[152px] items-center justify-center rounded-full will-change-transform"
          style={{
            filter: "drop-shadow(0 28px 36px rgba(0, 0, 0, 0.52)) drop-shadow(0 12px 18px rgba(0, 0, 0, 0.35))",
          }}
        >
          {/* Layer 1: Ambient Glass Volume & Fresnel Vignette */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                radial-gradient(circle at 48% 30%, 
                  rgba(255, 255, 255, 0.38) 0%, 
                  rgba(255, 255, 255, 0.08) 42%, 
                  rgba(45, 48, 52, 0.28) 78%, 
                  rgba(255, 255, 255, 0.3) 100%
                )
              `,
              boxShadow: `
                inset 0 2.5px 3.5px rgba(255, 255, 255, 0.95),
                inset 0 6px 14px rgba(255, 255, 255, 0.45),
                inset 0 -2.5px 3.5px rgba(255, 255, 255, 0.75),
                inset 0 -6px 12px rgba(255, 255, 255, 0.3),
                inset 0 0 0 1px rgba(255, 255, 255, 0.35)
              `,
            }}
          />

          {/* Layer 2: The Optical Meniscus (Pinched track contour inside the lens) */}
          <div
            ref={meniscusRef}
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
          >
            {/* The refracted track silhouette that creates the exact meniscus seen in Reference 2 */}
            <div
              className="absolute left-[8px] h-[78px] w-[100px] rounded-l-full"
              style={{
                background: "#898d94",
                boxShadow: `
                  inset 0 1.5px 1.5px rgba(255, 255, 255, 0.5),
                  inset 0 -2px 3px rgba(0, 0, 0, 0.18),
                  0 0 18px 4px rgba(60, 63, 68, 0.6)
                `,
                borderRadius: "50px 0 0 50px",
                transform: "scaleY(0.92)",
              }}
            />
          </div>

          {/* Layer 3: Glass Surface Curvature Sheen (Top crescent specular highlight) */}
          <div
            className="absolute inset-[1px] rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 110% 55% at 50% 12%, 
                  rgba(255, 255, 255, 0.85) 0%, 
                  rgba(255, 255, 255, 0.25) 45%, 
                  transparent 70%
                )
              `,
              opacity: 0.9,
            }}
          />

          <div
            ref={iconRef}
            className="relative z-10 flex items-center justify-center will-change-transform"
          >
            {!isDark ? (
              <Icon
                icon="lucide:sun"
                className="h-10 w-10 text-white"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 2px rgba(255, 255, 255, 1))",
                }}
              />
            ) : (
              <Icon
                icon="lucide:moon"
                className="h-10 w-10 text-white"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 2px rgba(255, 255, 255, 1))",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

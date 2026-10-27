"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { TabItem } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const TABS: TabItem[] = [
  { id: "home", label: "Home" },
  { id: "analytics", label: "Analytics" },
  { id: "account", label: "Account" },
];

export default function BubbleMenu() {
  const [activeIndex, setActiveIndex] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tabStep = 146;

  useGSAP(
    () => {
      if (!bubbleRef.current) return;
      const targetX = activeIndex * tabStep;

      gsap.to(bubbleRef.current, {
        x: targetX,
        duration: 0.65,
        ease: "power3.inOut",
      });

      gsap
        .timeline()
        .to(bubbleRef.current, {
          scaleX: 1.15,
          scaleY: 0.88,
          duration: 0.22,
          ease: "power2.out",
        })
        .to(bubbleRef.current, {
          scaleX: 0.96,
          scaleY: 1.04,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(bubbleRef.current, {
          scaleX: 1.0,
          scaleY: 1.0,
          duration: 0.35,
          ease: "elastic.out(1.2, 0.45)",
        });

      iconRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === activeIndex) {
          gsap.to(el, {
            scale: 1.1,
            duration: 0.4,
            delay: 0.12,
            ease: "back.out(1.8)",
          });
        } else {
          gsap.to(el, {
            scale: 1.0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    },
    { scope: containerRef, dependencies: [activeIndex] }
  );

  return (
    <div
      ref={containerRef}
      className="relative inline-flex flex-col items-center select-none"
    >
      {/* 2D Cobalt Blue Track (Clean, crisp, no blur, no muddy shadows) */}
      <div
        className="relative flex h-[84px] w-[440px] items-center rounded-full bg-gradient-to-b from-[#135dec] to-[#0a4dd8]"
        style={{
          boxShadow: `
            inset 0 1.5px 1.5px rgba(255, 255, 255, 0.5),
            inset 0 -2px 3px rgba(0, 0, 0, 0.15),
            0 2px 14px rgba(10, 77, 216, 0.2)
          `,
        }}
      >
        {/* The 3 Interactive Tab Buttons */}
        {TABS.map((tab, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="relative z-10 flex h-full w-[146px] cursor-pointer flex-col items-center justify-center gap-1 focus:outline-none"
            >
              <div
                ref={(el) => {
                  iconRefs.current[idx] = el;
                }}
                className="flex flex-col items-center justify-center will-change-transform"
              >
                {tab.id === "home" && (
                  <div
                    className={`flex flex-col items-center justify-center transition-all duration-300 ${
                      isActive ? "text-white" : "text-[#6da7fb]/80 hover:text-[#9bc2fc]"
                    }`}
                  >
                    <Icon icon="lucide:home" className="h-[26px] w-[26px]" />
                  </div>
                )}

                {tab.id === "analytics" && (
                  <div
                    className={`flex flex-col items-center justify-center transition-all duration-300 ${
                      isActive ? "text-white" : "text-[#6da7fb]/80 hover:text-[#9bc2fc]"
                    }`}
                  >
                    <Icon icon="lucide:trending-up" className="h-[26px] w-[26px]" />
                  </div>
                )}

                {/* Tab 2: Account Icon */}
                {tab.id === "account" && (
                  <div
                    className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${
                      isActive ? "text-white" : "text-[#6da7fb]/80 hover:text-[#9bc2fc]"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-current shadow-sm" />
                      <div className="-ml-1 h-2.5 w-2.5 rounded-full bg-current opacity-70 shadow-sm" />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="h-2.5 w-6 rounded-full bg-current shadow-sm" />
                    </div>
                    <span
                      className={`text-[13px] tracking-tight transition-all duration-300 ${
                        isActive
                          ? "opacity-100 font-semibold text-white"
                          : "opacity-75 text-[#6da7fb]"
                      }`}
                    >
                      Account
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}

        <div
          ref={bubbleRef}
          className="pointer-events-none absolute -top-[24px] flex h-[132px] w-[142px] items-center justify-center rounded-full will-change-transform"
          style={{
            left: "6px",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid rgba(255, 255, 255, 0.65)",
              boxShadow: `
                inset 0 2.5px 3px rgba(255, 255, 255, 0.95),
                inset 0 1px 1px #ffffff,
                inset 0 -2.5px 3px rgba(186, 230, 253, 0.9),
                inset -2px 0 3px rgba(56, 189, 248, 0.4),
                inset 2px 0 3px rgba(186, 230, 253, 0.35),
                0 0 6px rgba(186, 230, 253, 0.5)
              `,
            }}
          />

          <div
            className="absolute inset-[1px] rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 110% 40% at 50% 4%, 
                  rgba(255, 255, 255, 0.95) 0%, 
                  rgba(255, 255, 255, 0.25) 25%, 
                  transparent 50%
                )
              `,
            }}
          />

          <div
            className="absolute inset-[1px] rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 100% 28% at 50% 97%, 
                  rgba(186, 230, 253, 0.85) 0%, 
                  rgba(255, 255, 255, 0.2) 20%, 
                  transparent 45%
                )
              `,
            }}
          />

          <div
            className="absolute left-0 top-[14px] bottom-[14px] w-[26px] rounded-l-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 90% 100% at 0% 50%, 
                  rgba(10, 77, 216, 0.35) 0%, 
                  rgba(255, 255, 255, 0.2) 40%, 
                  transparent 70%
                )
              `,
              opacity: 0.75,
            }}
          />
        </div>
      </div>
    </div>
  );
}

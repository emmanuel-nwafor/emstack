"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import BubbleNav from "@/components/BubbleNav";
import { Icon } from "@iconify/react";
import { NavbarHeaderProps } from "@/constants";
import ToggleHint from "@/components/ToggleHint";

const NAV_ITEMS = [
  { label: "Home", id: "top" },
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

export default function NavbarHeader({
  mode,
  setMode,
  isDarkTheme = true,
  onScrollTo,
}: NavbarHeaderProps) {
  const [activeId, setActiveId] = useState("top");
  const navContainerRef = useRef<HTMLDivElement>(null);
  const liquidBubbleRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isMountedRef = useRef(false);
  const isManualClickRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moveBubbleTo = useCallback((id: string, animate: boolean = true) => {
    const btn = buttonRefs.current.get(id);
    const bubble = liquidBubbleRef.current;
    const container = navContainerRef.current;
    if (!btn || !bubble || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetX = btnRect.left - containerRect.left;
    const targetWidth = btnRect.width;

    if (!animate) {
      gsap.set(bubble, { x: targetX, width: targetWidth, opacity: 1 });
      return;
    }

    gsap.to(bubble, {
      x: targetX,
      width: targetWidth,
      opacity: 1,
      duration: 0.65,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    gsap
      .timeline({ overwrite: "auto" })
      .to(bubble, { scaleX: 1.16, scaleY: 0.86, duration: 0.2, ease: "power2.out" })
      .to(bubble, { scaleX: 0.96, scaleY: 1.04, duration: 0.18, ease: "power2.inOut" })
      .to(bubble, { scaleX: 1.0, scaleY: 1.0, duration: 0.3, ease: "elastic.out(1.2, 0.45)" });
  }, []);

  useEffect(() => {
    if (!isMountedRef.current) {
      moveBubbleTo(activeId, false);
      isMountedRef.current = true;
    }
  }, [activeId, moveBubbleTo]);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualClickRef.current) return;

      const scrollPos = window.scrollY + 160;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        if (item.id === "top" && window.scrollY < 200) {
          if (activeId !== "top") {
            setActiveId("top");
            moveBubbleTo("top", true);
          }
          break;
        }
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          if (activeId !== item.id) {
            setActiveId(item.id);
            moveBubbleTo(item.id, true);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId, moveBubbleTo]);

  const handleNavClick = (id: string) => {
    isManualClickRef.current = true;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 1200);

    setActiveId(id);
    moveBubbleTo(id, true);
    onScrollTo(id);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-none max-w-7xl mx-auto">
      <div className="pointer-events-auto flex items-center gap-6">
        <button
          type="button"
          onClick={() => handleNavClick("top")}
          className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 group cursor-pointer"
        >
          <span>EMSTACK</span>
          <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_rgba(216,180,254,0.7)] group-hover:scale-125 transition-transform" />
        </button>

        <nav
          ref={navContainerRef}
          className="relative hidden md:flex items-center p-1 rounded-full border border-white/15 bg-[#090d14]/85 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_32px_rgba(0,0,0,0.7)]"
        >
          <div
            ref={liquidBubbleRef}
            className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full will-change-transform opacity-0"
            style={{
              border: "1.2px solid rgba(255, 255, 255, 0.75)",
              boxShadow: `
                inset 0 2px 2px rgba(255, 255, 255, 0.95),
                inset 0 1px 1px #ffffff,
                inset 0 -2px 2px rgba(216, 180, 254, 0.45),
                inset -1px 0 1.5px rgba(168, 85, 247, 0.25),
                0 0 12px rgba(216, 180, 254, 0.25)
              `,
            }}
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 110% 45% at 50% 5%, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(255, 255, 255, 0.2) 35%, 
                    transparent 60%
                  )
                `,
              }}
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 100% 30% at 50% 96%, rgba(216, 180, 254, 0.45) 0%, transparent 50%)",
              }}
            />
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.label}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                  else buttonRefs.current.delete(item.id);
                }}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pointer-events-auto flex items-center gap-3">
        <div className="relative flex items-center">
          <BubbleNav
            mode={mode}
            onChange={(nextMode) => setMode(nextMode)}
            isDarkTheme={isDarkTheme}
          />
          <ToggleHint />
        </div>

        <button
          type="button"
          onClick={() => handleNavClick("contact")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-purple-300/40 text-white font-semibold text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        >
          <span>Let&apos;s talk</span>
          <Icon icon="lucide:arrow-up-right" className="h-3.5 w-3.5 text-purple-300" />
        </button>
      </div>
    </header>
  );
}

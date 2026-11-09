"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { IOSControlCenterProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const MENU_TABS = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function IOSControlCenter({
  isOpen,
  onClose,
  onNavigateSection,
  isDarkTheme = true,
}: IOSControlCenterProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(isOpen);

  const tabStep = 75;

  const noBgGlassStyle = {
    backdropFilter: "blur(28px) saturate(190%)",
    WebkitBackdropFilter: "blur(28px) saturate(190%)",
    backgroundColor: "transparent",
    border: isDarkTheme
      ? "1.5px solid rgba(45, 212, 191, 0.25)"
      : "1.5px solid rgba(45, 212, 191, 0.4)",
    boxShadow: isDarkTheme
      ? "0 12px 32px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
      : "0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
  };

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useGSAP(
    () => {
      if (!sidebarRef.current) return;

      if (isOpen) {
        gsap.killTweensOf(sidebarRef.current);
        gsap.set(sidebarRef.current, {
          x: "100%",
          opacity: 0,
        });
        gsap.to(sidebarRef.current, {
          x: "0%",
          opacity: 1,
          duration: 0.65,
          ease: "power3.inOut",
        });
      } else if (mounted) {
        gsap.to(sidebarRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => setMounted(false),
        });
      }
    },
    { dependencies: [isOpen, mounted] }
  );

  useGSAP(
    () => {
      if (!bubbleRef.current) return;
      const targetX = activeTab * tabStep;

      gsap.to(bubbleRef.current, {
        x: targetX,
        duration: 0.65,
        ease: "power3.inOut",
      });

      gsap
        .timeline()
        .to(bubbleRef.current, {
          scaleX: 1.18,
          scaleY: 0.86,
          duration: 0.22,
          ease: "power2.out",
        })
        .to(bubbleRef.current, {
          scaleX: 0.95,
          scaleY: 1.05,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(bubbleRef.current, {
          scaleX: 1.0,
          scaleY: 1.0,
          duration: 0.35,
          ease: "elastic.out(1.2, 0.45)",
        });
    },
    { dependencies: [activeTab] }
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
        aria-hidden="true"
      />

      <div
        ref={sidebarRef}
        onClick={(e) => e.stopPropagation()}
        className="fixed top-0 right-0 h-full w-[340px] z-50 flex flex-col gap-3 pt-24 pb-8 px-4 pointer-events-auto will-change-transform"
      >
        <div className="flex items-center justify-between px-2 pt-1 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-300 animate-pulse shadow-[0_0_8px_rgba(216,180,254,0.7)]" />
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-purple-300">
              Control Station
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Dropdown"
            className="h-8 w-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90"
            style={noBgGlassStyle}
          >
            <Icon
              icon="lucide:x"
              className={`h-4 w-4 ${isDarkTheme ? "text-white" : "text-slate-800"}`}
            />
          </button>
        </div>

        <div
          className="relative flex h-[52px] w-full items-center justify-between rounded-[26px] p-1 transition-all"
          style={noBgGlassStyle}
        >
          {MENU_TABS.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                onNavigateSection?.(tab.id);
              }}
              className={`relative z-10 flex h-full flex-1 items-center justify-center text-[11px] font-bold tracking-tight transition-colors duration-200 cursor-pointer ${
                activeTab === idx
                  ? isDarkTheme
                    ? "text-white"
                    : "text-slate-900"
                  : isDarkTheme
                  ? "text-neutral-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div
            ref={bubbleRef}
            className="pointer-events-none absolute left-1 top-1 flex h-[44px] w-[75px] items-center justify-center rounded-[22px] will-change-transform"
            style={{
              border: isDarkTheme
                ? "1.5px solid rgba(255, 255, 255, 0.7)"
                : "1.5px solid rgba(255, 255, 255, 0.95)",
              boxShadow: isDarkTheme
                ? "inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -2px 3px rgba(45, 212, 191, 0.6), 0 0 14px rgba(45, 212, 191, 0.4)"
                : "inset 0 2px 3px rgba(255, 255, 255, 1), inset 0 -2px 3px rgba(217, 70, 239, 0.4), 0 0 10px rgba(217, 70, 239, 0.25)",
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <div
            onClick={() => {
              onNavigateSection?.("top");
              onClose();
            }}
            className="cursor-pointer group flex flex-col justify-between p-4 rounded-[28px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-[120px]"
            style={noBgGlassStyle}
          >
            <div className="flex items-center justify-between">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isDarkTheme ? "bg-purple-300/15 text-purple-300" : "bg-purple-300/10 text-purple-600"
                }`}
              >
                <Icon icon="lucide:user" className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h4
                className={`text-[13px] font-bold tracking-tight ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                Lead Engineer
              </h4>
              <p
                className={`text-[11px] font-medium leading-tight mt-0.5 ${
                  isDarkTheme ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                AI &amp; Systems Architect
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              onNavigateSection?.("work");
              onClose();
            }}
            className="cursor-pointer group flex flex-col justify-between p-4 rounded-[28px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-[120px]"
            style={noBgGlassStyle}
          >
            <div className="flex items-center justify-between">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isDarkTheme ? "bg-purple-300/15 text-purple-300" : "bg-purple-300/10 text-purple-600"
                }`}
              >
                <Icon icon="lucide:code-2" className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h4
                className={`text-[13px] font-bold tracking-tight ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                Case Studies
              </h4>
              <p
                className={`text-[11px] font-medium leading-tight mt-0.5 ${
                  isDarkTheme ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                Shipped Systems
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://github.com/emmanuel-nwafor"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center aspect-square rounded-[22px] transition-all hover:scale-105 active:scale-95"
              style={noBgGlassStyle}
            >
              <Icon
                icon="lucide:github"
                className={`h-6 w-6 ${isDarkTheme ? "text-white" : "text-slate-800"}`}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuel-chinecherem-767739284/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center aspect-square rounded-[22px] transition-all hover:scale-105 active:scale-95"
              style={noBgGlassStyle}
            >
              <Icon
                icon="lucide:linkedin"
                className={`h-6 w-6 ${isDarkTheme ? "text-white" : "text-slate-800"}`}
              />
            </a>

            <div className="col-span-2 flex items-center gap-2 p-3 rounded-[22px]" style={noBgGlassStyle}>
              <span className="h-2 w-2 rounded-full bg-purple-300 animate-pulse shadow-[0_0_8px_rgba(216,180,254,0.7)]" />
              <span
                className={`text-[12px] font-mono font-semibold ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                Available for Projects
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 h-full">
            <div
              className="relative flex flex-col justify-between items-center p-3 rounded-[26px] overflow-hidden"
              style={noBgGlassStyle}
            >
              <div
                className="absolute bottom-0 inset-x-0 rounded-[22px] m-1 bg-purple-300/10"
                style={{ height: "90%" }}
              />
              <span
                className={`relative z-10 text-[11px] font-mono font-bold pt-1 ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                99.9%
              </span>
              <div className="relative z-10 text-center pb-1">
                <Icon
                  icon="lucide:zap"
                  className="h-5 w-5 mx-auto mb-1 text-purple-300"
                />
              </div>
            </div>

            <div
              className="relative flex flex-col justify-between items-center p-3 rounded-[26px] overflow-hidden"
              style={noBgGlassStyle}
            >
              <div
                className="absolute bottom-0 inset-x-0 rounded-[22px] m-1 bg-purple-300/10"
                style={{ height: "65%" }}
              />
              <span
                className={`relative z-10 text-[11px] font-mono font-bold pt-1 ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
              >
                10x
              </span>
              <div className="relative z-10 text-center pb-1">
                <Icon
                  icon="lucide:activity"
                  className="h-5 w-5 mx-auto mb-1 text-purple-300"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onNavigateSection?.("contact");
            onClose();
          }}
          className="flex items-center justify-between px-5 py-4 mt-1 rounded-[26px] transition-all active:scale-[0.98] cursor-pointer group"
          style={noBgGlassStyle}
        >
          <span
            className={`tracking-tight font-sans text-sm font-bold ${
              isDarkTheme ? "text-white" : "text-slate-900"
            }`}
          >
            Start a Conversation
          </span>
          <span
            className="font-mono transition-transform group-hover:translate-x-1 text-purple-300"
          >
            →
          </span>
        </button>
      </div>
    </>
  );
}
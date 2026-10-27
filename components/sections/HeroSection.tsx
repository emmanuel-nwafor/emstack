"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasFramePlayer from "@/components/CanvasFramePlayer";
import { HeroSectionProps } from "@/constants";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function InteractivePill({
  badge,
  badgeBg,
  badgeColor = "#ffffff",
  name,
  title,
  desc,
  onClick,
}: {
  badge: string;
  badgeBg: string;
  badgeColor?: string;
  name: string;
  title: string;
  desc: string;
  onClick?: () => void;
}) {
  return (
    <span className="relative inline-block group align-baseline my-0.5">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mx-1 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] hover:border-purple-300/40 text-xs sm:text-[13px] font-medium text-white transition-all cursor-pointer align-baseline select-none"
      >
        <span
          className="h-4 w-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0"
          style={{ backgroundColor: badgeBg, color: badgeColor }}
        >
          {badge}
        </span>
        <span className="font-semibold">{name}</span>
      </button>

      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl border border-white/15 bg-[#0f1219]/95 backdrop-blur-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 text-left">
        <span className="block text-xs font-semibold text-white mb-0.5">{title}</span>
        <span className="block text-[11px] text-neutral-300 leading-relaxed font-normal">{desc}</span>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-white/15 bg-[#0f1219]" />
      </span>
    </span>
  );
}

export default function HeroSection({
  content,
  onScrollTo,
  currentFrame,
  isPlayingAudio,
  onScrub,
  onReleaseScrub,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ledeRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const characterCardRef = useRef<HTMLDivElement>(null);
  const badgeNowRef = useRef<HTMLDivElement>(null);
  const badgeStackRef = useRef<HTMLDivElement>(null);

  const isSwe =
    content.roleTitle.toLowerCase().includes("full-stack") ||
    content.roleTitle.toLowerCase().includes("systems");

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -20, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ledeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 22, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          "-=0.4"
        )
        .fromTo(
          socialsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.3"
        )
        .fromTo(
          characterCardRef.current,
          { opacity: 0, scale: 0.88, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power4.out" },
          "-=0.9"
        )
        .fromTo(
          [badgeNowRef.current, badgeStackRef.current],
          { opacity: 0, scale: 0.65, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, stagger: 0.14, ease: "back.out(1.8)" },
          "-=0.5"
        );

      gsap.to(textColRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(characterCardRef.current, {
        y: -95,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(badgeNowRef.current, {
        y: -130,
        x: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(badgeStackRef.current, {
        y: -70,
        x: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [content]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative z-10 min-h-screen w-full flex flex-col justify-center pt-28 sm:pt-32 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div ref={textColRef} className="lg:col-span-7 flex flex-col items-start text-left will-change-transform">
          <div ref={eyebrowRef} className="inline-flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-purple-300/25 bg-purple-300/[0.07] text-[11px] font-mono font-semibold text-purple-300 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300 animate-pulse" />
              {content.eyebrow.status}
            </span>
          </div>

          <h1 ref={headlineRef} className="text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.12]">
            {content.headlinePrefix}
            <em className="font-serif italic font-normal text-purple-300 mx-1.5">
              {content.headlineEm}
            </em>
            {content.headlineSuffix}
          </h1>

          <p ref={roleRef} className="mt-4 text-xs sm:text-sm font-mono text-neutral-400 font-medium">
            <span className="text-purple-300 font-semibold">{content.roleAlias}</span>{" "}
            <span className="text-white/30 mx-1.5">—</span>{" "}
            <span className="text-neutral-200">{content.roleTitle}</span>
          </p>

          <div ref={ledeRef} className="mt-6 text-sm sm:text-[15px] text-neutral-300 leading-relaxed max-w-xl space-y-3">
            {isSwe ? (
              <>
                <p>
                  I&apos;m a Full-Stack &amp; Mobile Engineer with 5+ years of experience building digital products across fintech, logistics, B2B, and consumer industries.
                </p>
                <p>
                  Currently engineering mobile and web platforms at{" "}
                  <InteractivePill
                    badge="A"
                    badgeBg="#7c3aed"
                    name="Appfur"
                    title="Appfur · Mobile & Web"
                    desc="Engineering cross-platform mobile and web application architectures."
                    onClick={() => onScrollTo("experience")}
                  />
                  , and building digital systems with startups through{" "}
                  <InteractivePill
                    badge="E"
                    badgeBg="#2563eb"
                    name="EMSTACK"
                    title="EMSTACK Engineering"
                    desc="Contract software engineering, high-throughput backends & offline-first mobile apps."
                    onClick={() => onScrollTo("contact")}
                  />
                  .
                </p>
                <p className="text-neutral-400">
                  I&apos;m drawn to complex distributed problems and enjoy turning them into clear, resilient product architectures — from schema design and offline-first mobile apps to transactional ledger integrity.
                </p>
              </>
            ) : (
              <>
                <p>
                  I&apos;m an AI Automation Architect &amp; Systems Engineer with 5+ years of experience building autonomous agent swarms, self-healing workflow orchestrators, and enterprise integrations.
                </p>
                <p>
                  Currently engineering autonomous AI workflows at{" "}
                  <InteractivePill
                    badge="D"
                    badgeBg="#059669"
                    name="Digital Builders"
                    title="Digital Builders NG"
                    desc="Building autonomous multi-agent pipelines and enterprise automation."
                    onClick={() => onScrollTo("experience")}
                  />
                  , with production systems built on{" "}
                  <InteractivePill
                    badge="L"
                    badgeBg="#9333ea"
                    name="LangGraph & MCP"
                    title="LangGraph & FastMCP"
                    desc="Autonomous function calling, tool orchestration & deterministic state graphs."
                    onClick={() => onScrollTo("toolkit")}
                  />
                  .
                </p>
                <p className="text-neutral-400">
                  I focus on what happens when real APIs fail — engineering deterministic fallbacks, self-healing retries, and transactional state recovery for enterprise scale.
                </p>
              </>
            )}
          </div>

          <div ref={actionsRef} className="flex flex-wrap items-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => onScrollTo("contact")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-purple-300/40 bg-purple-300 text-slate-950 font-bold text-xs hover:bg-white hover:border-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(216,180,254,0.3)] cursor-pointer"
            >
              <span>Start Conversation</span>
              <Icon icon="lucide:arrow-right" className="h-3.5 w-3.5" />
            </button>
            <a
              href="/cv.pdf"
              download="Emmanuel_Nwafor_CV.pdf"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-white font-semibold text-xs hover:bg-white/[0.08] hover:border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Download CV</span>
              <Icon icon="lucide:download" className="h-3.5 w-3.5 text-neutral-400" />
            </a>
          </div>

          <div ref={socialsRef} className="flex items-center gap-5 mt-8 pt-6 border-t border-white/10 text-xs font-mono text-neutral-400">
            <span className="text-neutral-500">Find me on:</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
            >
              <Icon icon="lucide:github" className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
            >
              <Icon icon="simple-icons:x" className="h-3 w-3" />
              <span>Twitter / X</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-purple-300 transition-colors"
            >
              <Icon icon="lucide:linkedin" className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div ref={characterCardRef} className="lg:col-span-5 relative flex flex-col items-center justify-center will-change-transform">
          <CanvasFramePlayer
            className="w-full"
            currentFrame={currentFrame}
            isPlaying={isPlayingAudio}
            onScrub={onScrub}
            onReleaseScrub={onReleaseScrub}
          />

          <div ref={badgeNowRef} className="absolute -top-3 -right-2 sm:right-2 z-20 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#07090d]/90 backdrop-blur-xl shadow-lg -rotate-2 will-change-transform">
            <span className="text-[10px] font-mono font-bold text-purple-300 mr-2">Now</span>
            <span className="text-xs font-semibold text-white">{content.contextBadgeNow}</span>
          </div>

          <div ref={badgeStackRef} className="absolute -bottom-3 -left-2 sm:left-2 z-20 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#07090d]/90 backdrop-blur-xl shadow-lg rotate-2 will-change-transform">
            <span className="text-[10px] font-mono font-bold text-neutral-400 mr-2">Stack</span>
            <span className="text-xs font-semibold text-white">{content.contextBadgeStack}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

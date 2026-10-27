"use client";

import React, { useState, useRef } from "react";
import { useLenis } from "lenis/react";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { useAudioBeatSync } from "@/hooks/useAudioBeatSync";
import { PORTFOLIO_CONTENT, NavMode } from "@/data/portfolioContent";
import SideDock from "@/components/SideDock";
import StatsBar from "@/components/StatsBar";
import MarqueeTicker from "@/components/MarqueeTicker";
import NavbarHeader from "@/components/NavbarHeader";
import MusicPlayerWidget from "@/components/MusicPlayerWidget";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PrinciplesSection from "@/components/sections/PrinciplesSection";
import ToolkitSection from "@/components/sections/ToolkitSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollAnimationManager from "@/components/ScrollAnimationManager";
import gsap from "gsap";

export default function Home() {
  const [isDarkTheme] = useState(true);
  const { mode, setMode } = usePortfolioMode("ai");
  const [displayedMode, setDisplayedMode] = useState(mode);
  const mainRef = useRef<HTMLElement>(null);

  const handleModeChange = (nextMode: NavMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setDisplayedMode(nextMode);
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0.15 },
        { opacity: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" }
      );
    }
  };

  const activeContent = PORTFOLIO_CONTENT[displayedMode];

  const {
    isPlaying,
    currentFrame,
    frequencyData,
    trackName,
    toggle: toggleAudio,
    loadCustomTrack,
    scrubTo,
    releaseScrub,
  } = useAudioBeatSync({ totalFrames: 192, audioSrc: "/madara.mpeg", fps: 35 });

  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    const globalLenis =
      typeof window !== "undefined"
        ? (window as unknown as { __lenis?: { scrollTo: (target: unknown, opts: unknown) => void } }).__lenis
        : null;
    const activeScrollInstance = globalLenis || lenis;

    if (id === "top") {
      if (activeScrollInstance) {
        activeScrollInstance.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      if (activeScrollInstance) {
        const offset = id === "work" ? 0 : -70;
        activeScrollInstance.scrollTo(el, { offset, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="relative min-h-screen w-full font-sans select-none overflow-x-hidden text-white bg-[#050608]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 65% 50% at 0% 0%, rgba(147, 51, 234, 0.16) 0%, rgba(88, 28, 135, 0.06) 40%, transparent 70%),
          radial-gradient(circle 600px at 100% 25%, rgba(168, 85, 247, 0.05) 0%, transparent 60%),
          radial-gradient(circle 700px at 50% 85%, rgba(147, 51, 234, 0.03) 0%, transparent 70%)
        `,
      }}
    >
      <ScrollAnimationManager mode={displayedMode} />
      <SideDock />

      <NavbarHeader
        mode={mode}
        setMode={handleModeChange}
        isDarkTheme={isDarkTheme}
        onScrollTo={scrollToSection}
      />

      <MusicPlayerWidget
        isPlaying={isPlaying}
        onToggle={toggleAudio}
        frequencyData={frequencyData}
        trackTitle={trackName}
        isDarkTheme={isDarkTheme}
        onLoadCustomTrack={loadCustomTrack}
      />

      <main ref={mainRef}>
        <HeroSection
          content={activeContent}
          onScrollTo={scrollToSection}
          currentFrame={currentFrame}
          isPlayingAudio={isPlaying}
          onScrub={scrubTo}
          onReleaseScrub={releaseScrub}
        />
        <StatsBar stats={activeContent.stats} />
        <MarqueeTicker items={activeContent.ticker} />
        <ServicesSection services={activeContent.services} mode={displayedMode} />
        <ProjectsSection projects={activeContent.projects} />
        <ExperienceSection experience={activeContent.experience} />
        <TestimonialsSection testimonials={activeContent.testimonials} />
        <PrinciplesSection principles={activeContent.principles} />
        <ToolkitSection toolkit={activeContent.toolkit} />
        <BlogSection articles={activeContent.articles} />
        <ContactSection topics={activeContent.inquiryTopics} />
      </main>
    </div>
  );
}

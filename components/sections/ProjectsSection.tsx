"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { ProjectsSectionProps, ProjectItem } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ProjectCardSlide({
  project,
  index,
  total,
}: {
  project: ProjectItem;
  index: number;
  total: number;
}) {
  const [selectedSubAppIdx, setSelectedSubAppIdx] = useState(0);

  const currentSubApp =
    project.subApps && project.subApps.length > 0
      ? project.subApps[selectedSubAppIdx] || project.subApps[0]
      : null;
  const displayImage = currentSubApp ? currentSubApp.image : project.image;
  const isIphoneMode = project.deviceType === "mobile";

  return (
    <div
      data-project-card
      data-project-title={project.name}
      className="project-slide w-full max-w-[540px] lg:max-w-none lg:w-[1140px] shrink-0 relative select-none lg:cursor-none"
    >
      <div className="flex lg:hidden flex-col justify-between h-auto py-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-neutral-400 font-bold">{project.id}</span>
            <span className="text-neutral-500 font-mono text-xs">—</span>
            <span
              style={{ color: project.accent || "#10b981" }}
              className="text-[11px] font-mono font-bold tracking-widest uppercase truncate"
            >
              {project.tag || project.name}
            </span>
          </div>

          <h3 className="text-base sm:text-xl font-bold tracking-tight text-white leading-snug line-clamp-2">
            {project.headline}
          </h3>
        </div>

        <div className="relative w-full rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-3 sm:p-5 flex flex-col items-center justify-center overflow-hidden my-auto min-h-[330px] sm:min-h-[380px]">
          <span className="absolute top-2 left-2 font-mono text-xs text-white/20 select-none pointer-events-none">┌</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-white/20 select-none pointer-events-none">┐</span>
          <span className="absolute bottom-2 left-2 font-mono text-xs text-white/20 select-none pointer-events-none">└</span>
          <span className="absolute bottom-2 right-2 font-mono text-xs text-white/20 select-none pointer-events-none">┘</span>

          <span className="absolute -right-2 -bottom-4 font-mono font-bold text-7xl text-white/[0.03] select-none pointer-events-none leading-none">
            {project.id}
          </span>

          {project.subApps && project.subApps.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 mb-3 p-1 rounded-full bg-black/80 border border-white/10 z-20 shadow-md">
              {project.subApps.map((sub, sIdx) => {
                const isSelected = selectedSubAppIdx === sIdx;
                const subIcon =
                  sub.id === "customer"
                    ? "lucide:user"
                    : sub.id === "partners"
                    ? "lucide:store"
                    : "lucide:bike";
                const shortLabel =
                  sub.id === "customer"
                    ? "Customer"
                    : sub.id === "partners"
                    ? "Partners"
                    : "Riders";
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubAppIdx(sIdx)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-purple-300 text-slate-950 font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Icon
                      icon={subIcon}
                      className={`h-3 w-3 ${isSelected ? "text-slate-950" : "text-purple-300/80"}`}
                    />
                    <span>{shortLabel}</span>
                  </button>
                );
              })}
            </div>
          )}

          {isIphoneMode ? (
            <div className="relative h-[245px] sm:h-[285px] aspect-[9/19.5] rounded-2xl p-[6px] bg-gradient-to-b from-[#3a3f47] via-[#1c1f24] to-[#121417] shadow-2xl ring-1 ring-white/25">
              <div className="relative w-full h-full rounded-xl bg-black overflow-hidden flex flex-col justify-between">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 h-3.5 w-14 rounded-full bg-black flex items-center justify-center pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#181a20]" />
                </div>
                {displayImage ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      key={displayImage}
                      src={displayImage}
                      alt={project.name}
                      fill
                      sizes="300px"
                      className="object-cover object-top"
                      priority={index === 0}
                    />
                  </div>
                ) : (
                  <div className="p-3 text-center text-white text-xs">
                    {project.name}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] rounded-xl border border-white/15 bg-[#0a0d14] overflow-hidden shadow-2xl">
              <div className="h-7 bg-[#121620] border-b border-white/10 px-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
              </div>
              {project.image ? (
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="400px"
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                </div>
              ) : (
                <div className="p-4 text-xs font-bold text-white">{project.headline}</div>
              )}
            </div>
          )}

          {currentSubApp && (
            <div className="mt-1 text-center text-[10px] font-mono text-purple-300 truncate max-w-[260px] z-10">
              {currentSubApp.label}: {currentSubApp.roleDescription}
            </div>
          )}
        </div>

        <div className="space-y-1.5 pt-1 border-t border-white/10 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300">
            <span className="text-neutral-500 uppercase">Role:</span>
            <span className="truncate max-w-[240px] font-medium">{project.role}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300">
            <span className="text-neutral-500 uppercase">Outcome:</span>
            <span className="truncate max-w-[240px] font-medium text-purple-200">{project.outcome}</span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-slate-950 font-bold text-xs shadow-md"
              >
                <span>Visit project</span>
                <Icon icon="lucide:arrow-up-right" className="h-3 w-3" />
              </a>

              {currentSubApp?.playStore && (
                <a
                  href={currentSubApp.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono text-white"
                >
                  <Icon icon="bi:google-play" className="h-3 w-3 text-emerald-400" />
                  <span>Play</span>
                </a>
              )}
            </div>

            <span className="text-xs font-mono text-neutral-400">
              0{index + 1} / 0{total}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-12 gap-6 lg:gap-12 items-center">
        <div className="col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400 font-bold">{project.id}</span>
              <span className="text-neutral-500 font-mono">—</span>
              <span
                style={{ color: project.accent || "#10b981" }}
                className="text-xs font-mono font-bold tracking-widest uppercase"
              >
                {project.tag || project.name}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-tight mt-2.5">
              {project.headline}
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
              {project.desc}
            </p>
          </div>

          <div className="border-t border-b border-white/10 divide-y divide-white/10 text-xs sm:text-sm">
            <div className="py-2.5 grid grid-cols-12 gap-3 items-baseline">
              <span className="col-span-3 font-mono text-neutral-400 uppercase tracking-wider text-xs">
                Role
              </span>
              <span className="col-span-9 text-neutral-200 font-medium text-xs sm:text-sm">
                {project.role}
              </span>
            </div>

            <div className="py-2.5 grid grid-cols-12 gap-3 items-baseline">
              <span className="col-span-3 font-mono text-neutral-400 uppercase tracking-wider text-xs">
                Outcome
              </span>
              <span className="col-span-9 text-neutral-200 font-medium text-xs sm:text-sm">
                {project.outcome}
              </span>
            </div>

            <div className="py-2.5 grid grid-cols-12 gap-3 items-baseline">
              <span className="col-span-3 font-mono text-neutral-400 uppercase tracking-wider text-xs">
                Stack
              </span>
              <span className="col-span-9 text-neutral-200 font-mono text-xs leading-relaxed">
                {project.stack}
              </span>
            </div>

            {project.liveOn && (
              <div className="py-2.5 grid grid-cols-12 gap-3 items-center">
                <span className="col-span-3 font-mono text-neutral-400 uppercase tracking-wider text-xs">
                  Live On
                </span>
                <div className="col-span-9 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono text-white">
                    <Icon
                      icon={project.deviceType === "browser" ? "lucide:globe" : "bi:google-play"}
                      className="h-3.5 w-3.5 text-purple-300"
                    />
                    <span>{project.liveOn}</span>
                  </span>
                  {project.subApps && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>3 Production Apps</span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-slate-950 font-bold text-xs hover:opacity-95 transition-all hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(232,121,249,0.35)]"
              >
                <span>Visit project</span>
                <Icon icon="lucide:arrow-up-right" className="h-3.5 w-3.5" />
              </a>

              {currentSubApp?.playStore && (
                <a
                  href={currentSubApp.playStore}
                  target="_blank"
                  rel="noreferrer"
                  title={`Open ${currentSubApp.label} on Google Play`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/15 bg-white/[0.05] text-xs font-mono text-white hover:bg-white/10 hover:border-emerald-400/40 transition-all cursor-pointer"
                >
                  <Icon icon="bi:google-play" className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Google Play</span>
                </a>
              )}

              {currentSubApp?.appStore && (
                <a
                  href={currentSubApp.appStore}
                  target="_blank"
                  rel="noreferrer"
                  title={`Open ${currentSubApp.label} on App Store`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/15 bg-white/[0.05] text-xs font-mono text-white hover:bg-white/10 hover:border-purple-300/40 transition-all cursor-pointer"
                >
                  <Icon icon="bi:apple" className="h-3.5 w-3.5 text-white" />
                  <span>App Store</span>
                </a>
              )}
            </div>

            <span className="text-xs font-mono text-neutral-400">
              0{index + 1} / 0{total}
            </span>
          </div>
        </div>

        <div className="col-span-6 relative">
          <div className="relative w-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden min-h-[440px] sm:min-h-[480px]">
            <span className="project-watermark absolute -right-4 -bottom-6 font-mono font-bold text-[140px] sm:text-[200px] text-white/[0.03] select-none pointer-events-none leading-none will-change-transform">
              {project.id}
            </span>

            <span className="absolute top-3 left-3 font-mono text-base text-white/20 select-none pointer-events-none">
              ┌
            </span>
            <span className="absolute top-3 right-3 font-mono text-base text-white/20 select-none pointer-events-none">
              ┐
            </span>
            <span className="absolute bottom-3 left-3 font-mono text-base text-white/20 select-none pointer-events-none">
              └
            </span>
            <span className="absolute bottom-3 right-3 font-mono text-base text-white/20 select-none pointer-events-none">
              ┘
            </span>

            <div className="relative w-full flex items-center justify-center gap-4 lg:gap-6 my-auto z-10">
              {project.subApps && project.subApps.length > 0 && (
                <div className="flex flex-col items-stretch gap-2 p-1.5 rounded-2xl bg-black/75 border border-white/10 backdrop-blur-md z-20 shadow-2xl shrink-0">
                  {project.subApps.map((sub, sIdx) => {
                    const isSelected = selectedSubAppIdx === sIdx;
                    const subIcon =
                      sub.id === "customer"
                        ? "lucide:user"
                        : sub.id === "partners"
                        ? "lucide:store"
                        : "lucide:bike";
                    const shortLabel =
                      sub.id === "customer"
                        ? "Customer"
                        : sub.id === "partners"
                        ? "Partners"
                        : "Riders";
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSelectedSubAppIdx(sIdx)}
                        title={sub.label}
                        className={`group px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2.5 whitespace-nowrap text-left ${
                          isSelected
                            ? "bg-purple-300 text-slate-950 font-bold shadow-md shadow-purple-500/20 scale-[1.02]"
                            : "text-neutral-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon
                          icon={subIcon}
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isSelected ? "text-slate-950" : "text-purple-300/80 group-hover:text-purple-300"
                          }`}
                        />
                        <div className="flex flex-col leading-tight">
                          <span className="font-semibold">{shortLabel}</span>
                          <span className={`text-[9px] ${isSelected ? "text-slate-800" : "text-neutral-400"}`}>
                            {sub.id === "customer" ? "App" : sub.id === "partners" ? "Hub" : "Delivery"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className={`project-device relative flex flex-col items-center justify-center will-change-transform shrink-0 ${isIphoneMode ? "w-auto" : "w-full"}`}>
                {isIphoneMode ? (
                  <div className="relative my-1">
                    <div className="absolute -left-[3px] top-[70px] w-[3px] h-5 bg-[#2e333a] rounded-l-sm" />
                    <div className="absolute -left-[3px] top-[105px] w-[3px] h-8 bg-[#2e333a] rounded-l-sm" />
                    <div className="absolute -left-[3px] top-[150px] w-[3px] h-8 bg-[#2e333a] rounded-l-sm" />
                    <div className="absolute -right-[3px] top-[115px] w-[3px] h-12 bg-[#2e333a] rounded-r-sm" />

                    <div className="relative w-[210px] lg:w-[220px] aspect-[9/19.5] rounded-[40px] p-[8px] bg-gradient-to-b from-[#3a3f47] via-[#1c1f24] to-[#121417] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(168,85,247,0.12)] ring-1 ring-white/25">
                      <div className="relative w-full h-full rounded-[32px] bg-black overflow-hidden border border-black flex flex-col justify-between">
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/10 z-30 pointer-events-none" />

                        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-18 rounded-full bg-black flex items-center justify-between px-2 shadow-md pointer-events-none">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#181a20] ring-1 ring-white/15 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-[#0d2238]" />
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#111317]" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none z-20" />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-20 h-1 rounded-full bg-white/50 backdrop-blur-sm pointer-events-none" />

                        {displayImage ? (
                          <div className="relative w-full h-full overflow-hidden">
                            <Image
                              key={displayImage}
                              src={displayImage}
                              alt={currentSubApp ? currentSubApp.label : project.name}
                              fill
                              sizes="(max-width: 1024px) 210px, 220px"
                              className="object-cover object-top"
                              priority={index === 0}
                            />
                          </div>
                        ) : (
                          <div className="relative w-full h-full flex flex-col justify-between p-4 pt-10 text-white select-none">
                            <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                                <span>● Live Dispatch</span>
                                <span>Active</span>
                              </div>
                              <p className="text-xs font-bold text-white">{project.name}</p>
                              <p className="text-[10px] text-neutral-400">{project.outcome}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full max-w-[540px] rounded-2xl border border-white/15 bg-[#0a0d14] overflow-hidden my-1 shadow-2xl">
                    <div className="h-8 bg-[#121620] border-b border-white/10 px-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#080a0f] border border-white/10 text-[10px] font-mono text-neutral-400 w-40 justify-center truncate">
                        <Icon icon="lucide:lock" className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{project.link.replace(/^https?:\/\//, "")}</span>
                      </div>
                      <Icon icon="lucide:layout-grid" className="h-3 w-3 text-neutral-500" />
                    </div>

                    {project.image ? (
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 540px"
                          className="object-cover object-top"
                          priority={index === 0}
                        />
                      </div>
                    ) : (
                      <div className="p-4 space-y-3">
                        <p className="text-xs font-bold text-white">{project.headline}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {currentSubApp && (
              <div className="mt-2 text-center text-xs font-mono text-neutral-400 max-w-sm px-2 z-10">
                <span className="text-purple-300 font-semibold">{currentSubApp.label}: </span>
                <span>{currentSubApp.roleDescription}</span>
              </div>
            )}

            <div className="mt-2 flex items-center justify-between w-full text-[10px] font-mono text-neutral-400 px-2 z-10">
              <span>PRODUCTION BUILD</span>
              <span className="text-purple-300">● 100% VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (typeof window === "undefined" || !container || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getScrollAmount = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 200);
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.25}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const active = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length)
            );
            setActiveIdx(active);
          },
        },
      });

      const devices = track.querySelectorAll(".project-device");
      if (devices.length > 0) {
        gsap.to(devices, {
          x: -35,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${getScrollAmount() * 1.25}`,
            scrub: 1.3,
          },
        });
      }

      const watermarks = track.querySelectorAll(".project-watermark");
      if (watermarks.length > 0) {
        gsap.to(watermarks, {
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${getScrollAmount() * 1.25}`,
            scrub: 1.5,
          },
        });
      }
    });

    mm.add("(max-width: 1023px)", () => {
      const slides = track.querySelectorAll(".project-slide");
      slides.forEach((slide) => {
        gsap.fromTo(
          slide,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, [projects]);

  const scrollToSlide = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll(".project-slide");
    const targetSlide = slides[idx] as HTMLElement;
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    setActiveIdx(idx);
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative z-20 w-full min-h-screen lg:h-screen lg:overflow-hidden border-t border-white/10 bg-[#050608] flex flex-col justify-between py-12 lg:py-6 select-none"
    >
      <header className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-20 shrink-0 mb-6 sm:mb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
            02 — Projects
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-1">
            Shipped,{" "}
            <em className="font-serif italic font-normal text-purple-300">
              not just built
            </em>
          </h2>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs font-mono text-neutral-400 hidden sm:inline-block">
            Keep scrolling
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSlide(Math.max(0, activeIdx - 1))}
              className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Previous project"
            >
              <Icon icon="lucide:arrow-left" className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIdx === idx
                      ? "w-6 bg-purple-300 shadow-[0_0_8px_rgba(216,180,254,0.8)]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToSlide(Math.min(projects.length - 1, activeIdx + 1))}
              className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Next project"
            >
              <Icon icon="lucide:arrow-right" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative flex-1 flex items-center lg:overflow-visible w-full my-auto z-10">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row items-center gap-14 sm:gap-20 lg:gap-36 w-full lg:w-max px-4 sm:px-8 lg:px-24 will-change-transform"
        >
          {projects.map((p, idx) => (
            <ProjectCardSlide
              key={p.id}
              project={p}
              index={idx}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

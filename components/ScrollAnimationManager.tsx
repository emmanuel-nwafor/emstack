"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollAnimationManagerProps } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollAnimationManager({ mode }: ScrollAnimationManagerProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const headers = document.querySelectorAll("section header");
      headers.forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      const serviceCards = document.querySelectorAll("#services .group");
      if (serviceCards.length > 0) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#services",
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      const expItems = document.querySelectorAll("#experience .group, #experience .relative.rounded-\\[32px\\]");
      if (expItems.length > 0) {
        gsap.fromTo(
          expItems,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#experience",
              start: "top 80%",
              once: true,
            },
          }
        );
      }


      const toolkitCols = document.querySelectorAll("#toolkit .rounded-\\[32px\\]");
      if (toolkitCols.length > 0) {
        gsap.fromTo(
          toolkitCols,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#toolkit",
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      const blogCards = document.querySelectorAll("#blog article");
      if (blogCards.length > 0) {
        gsap.fromTo(
          blogCards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#blog",
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      const contactEl = document.querySelector("#contact");
      if (contactEl) {
        gsap.fromTo(
          contactEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#contact",
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void } }).__lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [mode]);

  return null;
}

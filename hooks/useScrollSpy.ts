"use client";

import { useState, useEffect, useMemo } from "react";

export function useScrollSpy(sectionIds: string[], offsetPercent = 0.35) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "top");
  const serializedIds = useMemo(() => sectionIds.join(","), [sectionIds]);

  useEffect(() => {
    const ids = serializedIds.split(",").filter(Boolean);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * offsetPercent && rect.bottom >= windowHeight * 0.15) {
            setActiveId((prev) => (prev === id ? prev : id));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [serializedIds, offsetPercent]);

  return activeId;
}


"use client";

import { useState, useCallback } from "react";
import { NavMode, PORTFOLIO_CONTENT, ModeContent } from "@/data/portfolioContent";

export function usePortfolioMode(initialMode: NavMode = "ai") {
  const [mode, setModeState] = useState<NavMode>(initialMode);

  const setMode = useCallback((nextMode: NavMode) => {
    setModeState(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === "ai" ? "swe" : "ai"));
  }, []);

  const content: ModeContent = PORTFOLIO_CONTENT[mode];

  return {
    mode,
    setMode,
    toggleMode,
    content,
    isAi: mode === "ai",
    isSwe: mode === "swe",
  };
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_SCENE_FRAMES = 192;

export function useSceneFrames(totalFrames = TOTAL_SCENE_FRAMES) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));

  useEffect(() => {
    let active = true;
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/scenes/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        if (!active) return;
        framesRef.current[i - 1] = img;
        count++;
        setLoadedCount(count);
        if (count >= Math.min(15, totalFrames)) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (!active) return;
        count++;
        setLoadedCount(count);
      };
    }

    return () => {
      active = false;
    };
  }, [totalFrames]);

  const drawFrame = useCallback(
    (canvas: HTMLCanvasElement | null, frameIndex: number) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const safeIndex = Math.max(0, Math.min(totalFrames - 1, Math.floor(frameIndex)));
      const img = framesRef.current[safeIndex];

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (img && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let renderW = width;
        let renderH = height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          renderW = height * imgRatio;
          offsetX = (width - renderW) / 2;
        } else {
          renderH = width / imgRatio;
          offsetY = (height - renderH) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      }
    },
    [totalFrames]
  );

  return {
    frames: framesRef,
    isReady,
    loadedCount,
    totalFrames,
    drawFrame,
  };
}

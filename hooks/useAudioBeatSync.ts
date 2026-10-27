"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { UseAudioBeatSyncOptions } from "@/constants";

export function useAudioBeatSync({
  totalFrames = 192,
  audioSrc = "/music.mp3",
  fps = 20,
}: UseAudioBeatSyncOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frequencyData, setFrequencyData] = useState<number[]>([0, 0, 0, 0]);
  const [trackName, setTrackName] = useState("Lofi Chill Study Beat");

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isScrubbingRef = useRef(false);
  const startTimeRef = useRef(0);
  const currentSrcRef = useRef(audioSrc);

  const initAudio = useCallback(() => {
    if (audioContextRef.current && audioElRef.current) {
      return { ctx: audioContextRef.current, analyser: analyserRef.current, audio: audioElRef.current };
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    audioContextRef.current = ctx;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.82;
    analyserRef.current = analyser;

    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.src = currentSrcRef.current;
    audioElRef.current = audio;

    try {
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      sourceNodeRef.current = source;
    } catch {
      analyser.connect(ctx.destination);
    }

    return { ctx, analyser, audio };
  }, []);

  const start = useCallback(() => {
    const { ctx, analyser, audio } = initAudio();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (audio) {
      audio.play().catch(() => {});
    }

    startTimeRef.current = performance.now() - (currentFrame / fps) * 1000;
    setIsPlaying(true);

    const dataArray = new Uint8Array(analyser ? analyser.frequencyBinCount : 32);

    const tick = () => {
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        const b0 = dataArray[0] / 255;
        const b1 = dataArray[1] / 255;
        const b2 = dataArray[4] / 255;
        const b3 = dataArray[8] / 255;
        setFrequencyData([b0, b1, b2, b3]);
      }

      if (!isScrubbingRef.current) {
        let elapsedSeconds = 0;
        if (audio && !isNaN(audio.currentTime) && audio.currentTime > 0) {
          elapsedSeconds = audio.currentTime;
        } else {
          elapsedSeconds = (performance.now() - startTimeRef.current) / 1000;
        }

        const calculated = Math.floor(elapsedSeconds * fps) % totalFrames;
        setCurrentFrame(calculated);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [initAudio, fps, totalFrames, currentFrame]);

  const stop = useCallback(() => {
    if (audioElRef.current) {
      audioElRef.current.pause();
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsPlaying(false);
    setFrequencyData([0, 0, 0, 0]);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  const loadCustomTrack = useCallback(
    (file: File) => {
      const fileUrl = URL.createObjectURL(file);
      currentSrcRef.current = fileUrl;
      setTrackName(file.name.replace(/\.[^/.]+$/, ""));

      if (audioElRef.current) {
        audioElRef.current.src = fileUrl;
        if (isPlaying) {
          audioElRef.current.play().catch(() => {});
        }
      }
    },
    [isPlaying]
  );

  const scrubTo = useCallback(
    (fraction: number) => {
      if (isPlaying) return;
      isScrubbingRef.current = true;
      const target = Math.floor(fraction * (totalFrames - 1));
      const clamped = Math.max(0, Math.min(totalFrames - 1, target));
      setCurrentFrame(clamped);

      if (audioElRef.current && !isNaN(audioElRef.current.duration) && audioElRef.current.duration > 0) {
        const timeFraction = clamped / totalFrames;
        audioElRef.current.currentTime = (timeFraction * audioElRef.current.duration) % audioElRef.current.duration;
      }
      startTimeRef.current = performance.now() - (clamped / fps) * 1000;
    },
    [totalFrames, fps, isPlaying]
  );

  const releaseScrub = useCallback(() => {
    if (isPlaying) return;
    isScrubbingRef.current = false;
    startTimeRef.current = performance.now() - (currentFrame / fps) * 1000;
  }, [currentFrame, fps, isPlaying]);

  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stop]);

  return {
    isPlaying,
    currentFrame,
    frequencyData,
    trackName,
    toggle,
    start,
    stop,
    loadCustomTrack,
    scrubTo,
    releaseScrub,
  };
}

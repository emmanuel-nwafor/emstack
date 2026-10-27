"use client";

import React from "react";
import { useAudioBeatSync } from "@/hooks/useAudioBeatSync";
import MusicPlayerWidget from "@/components/MusicPlayerWidget";

export default function BlogMusicPlayer() {
  const {
    isPlaying,
    frequencyData,
    trackName,
    toggle: toggleAudio,
    loadCustomTrack,
  } = useAudioBeatSync({ totalFrames: 192, audioSrc: "/madara.mpeg", fps: 35 });

  return (
    <MusicPlayerWidget
      isPlaying={isPlaying}
      onToggle={toggleAudio}
      frequencyData={frequencyData}
      trackTitle={trackName}
      isDarkTheme={true}
      onLoadCustomTrack={loadCustomTrack}
    />
  );
}

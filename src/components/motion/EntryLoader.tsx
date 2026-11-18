"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function EntryLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay muted video immediately on mount
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {});
    }

    // Safety timeout in case browser throttles or user is idle
    const safetyTimer = setTimeout(() => {
      dismissLoader();
    }, 12000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const dismissLoader = () => {
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 800);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Introduction Video"
      className={cn(
        "fixed inset-0 z-[99999] select-none transition-opacity duration-700 ease-out bg-black cursor-default",
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* ── Pure Fullscreen Intro Video (Mandatory Playback, Zero Sound, Zero Wording, No Skip) ── */}
      <video
        ref={videoRef}
        src="/video/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={dismissLoader}
        onError={dismissLoader}
        className="w-full h-full object-cover object-center scale-[1.01]"
      />
    </div>
  );
}

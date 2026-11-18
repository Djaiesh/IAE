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
      onClick={dismissLoader}
      className={cn(
        "fixed inset-0 z-[99999] select-none transition-opacity duration-700 ease-out bg-black cursor-pointer",
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* ── Pure Fullscreen Intro Video (Zero Sound, Zero Wording) ── */}
      <video
        ref={videoRef}
        src="/video/jilo-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={dismissLoader}
        className="w-full h-full object-cover object-center scale-[1.01]"
      />

      {/* Discreet Minimal Skip Button (Top Right Corner) */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismissLoader();
          }}
          className="px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white/70 hover:text-white text-xs font-sans tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

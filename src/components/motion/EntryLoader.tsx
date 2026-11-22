"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function EntryLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay muted video immediately on mount
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {});
    }

    // Fallback safety timeout (12s) so site is never blocked indefinitely
    const safetyTimer = setTimeout(() => {
      dismissLoader();
    }, 12000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const dismissLoader = () => {
    setFadingOut(true);
    // Dispatch event so Hero video knows to begin playback immediately from 00:00
    try {
      window.dispatchEvent(new CustomEvent("jilo_intro_complete"));
    } catch {}
    setTimeout(() => {
      setVisible(false);
    }, 750);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Initial Presentation Video"
      onClick={dismissLoader}
      className={cn(
        "fixed inset-0 z-[99999] select-none transition-opacity duration-700 ease-out bg-black cursor-pointer",
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* ── Fullscreen Initial Video (Two Trucks Exchange Goods / Maritime Origin) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={dismissLoader}
        onError={dismissLoader}
        className="w-full h-full object-cover object-center scale-[1.01]"
      >
        <source src="/video/intro.mp4" type="video/mp4" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Discreet Minimal Skip Button (Top Right Corner) */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismissLoader();
          }}
          className="px-4 py-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-[#E50914]/70 text-white/80 hover:text-white text-xs font-sans tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer shadow-lg"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

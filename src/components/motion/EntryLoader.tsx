"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export function EntryLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("/video/entry_video_horizontal.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);

  const dismissLoader = useCallback(() => {
    if (fadingOut) return;
    setFadingOut(true);

    try {
      window.dispatchEvent(new CustomEvent("atlanta_intro_complete"));
      window.dispatchEvent(new CustomEvent("jilo_intro_complete"));
      sessionStorage.setItem("atlanta_intro_seen", "true");
    } catch {}

    setTimeout(() => {
      setVisible(false);
    }, 700);
  }, [fadingOut]);

  // Determine horizontal vs vertical entry video based on viewport width
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setVideoSrc(
      isMobile
        ? "/video/entry_video_vertical.mp4"
        : "/video/entry_video_horizontal.mp4"
    );
  }, []);

  // Buffering gate & seamless zero-stutter playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.currentTime = 0;

    const tryStartPlayback = async () => {
      if (hasStartedRef.current) return;
      try {
        video.currentTime = 0;
        await video.play();
        hasStartedRef.current = true;
        setIsPlaying(true);
      } catch (err) {
        // If autoplay policy requires a user gesture or error occurs, dismiss gracefully
      }
    };

    // If browser already buffered the video data
    if (video.readyState >= 3) {
      tryStartPlayback();
    } else {
      video.addEventListener("canplaythrough", tryStartPlayback, { once: true });
      video.addEventListener("loadeddata", tryStartPlayback, { once: true });
    }

    // Fallback safety timeout (9s) so site is never blocked indefinitely
    const safetyTimer = setTimeout(() => {
      dismissLoader();
    }, 9000);

    return () => {
      clearTimeout(safetyTimer);
      if (video) {
        video.removeEventListener("canplaythrough", tryStartPlayback);
        video.removeEventListener("loadeddata", tryStartPlayback);
      }
    };
  }, [videoSrc, dismissLoader]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ATLANTA Import and Export Entry Presentation"
      onClick={dismissLoader}
      className={cn(
        "fixed inset-0 z-[99999] select-none transition-opacity duration-700 ease-out bg-[#061820] cursor-pointer",
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* ── Seamless Fullscreen Video ── */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        muted
        preload="auto"
        onEnded={dismissLoader}
        onError={dismissLoader}
        className={cn(
          "w-full h-full object-cover object-center transition-opacity duration-700 ease-in",
          isPlaying ? "opacity-100 scale-[1.01]" : "opacity-0 scale-100"
        )}
      />

      {/* Subtle Black/Petrol Vignette Overlay for Cinema Look */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061820]/40 via-transparent to-[#061820]/40 pointer-events-none" />

      {/* Discreet Minimal Skip Button (Top Right Corner) */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismissLoader();
          }}
          className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-[#C17B58]/80 text-white/90 hover:text-white text-xs font-sans tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer shadow-xl flex items-center gap-1.5"
        >
          <span>Skip</span>
          <span className="text-[#C17B58]">→</span>
        </button>
      </div>
    </div>
  );
}

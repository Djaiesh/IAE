"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export function EntryLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  // Determine horizontal vs vertical entry video immediately upon client mount
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined"
        ? window.matchMedia("(max-width: 767px)").matches || window.innerWidth < 768
        : false;

    setVideoSrc(
      isMobile
        ? "/video/entry_video_vertical.mp4"
        : "/video/entry_video_horizontal.mp4"
    );
  }, []);

  // Callback ref to guarantee muted, playsInline and properties before any load starts
  const attachVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.playsInline = true;
      node.setAttribute("muted", "");
      node.setAttribute("playsinline", "");
      node.setAttribute("webkit-playsinline", "true");
      node.setAttribute("x5-playsinline", "true");
    }
  }, []);

  // Trigger playback as soon as video element is ready
  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasStartedRef.current) return;

    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasStartedRef.current = true;
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          console.warn("[EntryLoader] Autoplay policy prevented playback:", err);
          setAutoplayBlocked(true);
        });
    }
  }, []);

  // Buffering gate & seamless zero-stutter playback
  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    hasStartedRef.current = false;
    video.muted = true;
    video.defaultMuted = true;

    const onCanPlay = () => {
      startPlayback();
    };

    const onPlaying = () => {
      hasStartedRef.current = true;
      setIsPlaying(true);
      setAutoplayBlocked(false);
    };

    // If browser already buffered the video data
    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener("canplay", onCanPlay, { once: true });
      video.addEventListener("loadeddata", onCanPlay, { once: true });
    }

    video.addEventListener("playing", onPlaying);

    // Fallback safety timeout (9s) so site is never blocked indefinitely
    const safetyTimer = setTimeout(() => {
      dismissLoader();
    }, 9000);

    return () => {
      clearTimeout(safetyTimer);
      if (video) {
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("loadeddata", onCanPlay);
        video.removeEventListener("playing", onPlaying);
      }
    };
  }, [videoSrc, startPlayback, dismissLoader]);

  // Handle container click / tap:
  // If autoplay was blocked by browser policy, tap triggers play. Otherwise it skips/dismisses.
  const handleContainerClick = () => {
    if (autoplayBlocked && !isPlaying && videoRef.current) {
      const v = videoRef.current;
      v.muted = true;
      v.play()
        .then(() => {
          hasStartedRef.current = true;
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          dismissLoader();
        });
    } else {
      dismissLoader();
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ATLANTA Import and Export Entry Presentation"
      onClick={handleContainerClick}
      onTouchStart={autoplayBlocked ? handleContainerClick : undefined}
      className={cn(
        "fixed inset-0 z-[99999] select-none transition-opacity duration-700 ease-out bg-[#061820] cursor-pointer",
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* ── Seamless Fullscreen Video ── */}
      {videoSrc && (
        <video
          key={videoSrc}
          ref={attachVideoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={dismissLoader}
          onError={(e) => {
            console.warn("[EntryLoader] Video error:", e);
            dismissLoader();
          }}
          className={cn(
            "w-full h-full object-cover object-center transition-opacity duration-700 ease-in",
            isPlaying ? "opacity-100 scale-[1.01]" : "opacity-0 scale-100"
          )}
          {...({
            "webkit-playsinline": "true",
            "x5-playsinline": "true",
          } as React.VideoHTMLAttributes<HTMLVideoElement>)}
        />
      )}

      {/* Tap to Play prompt if mobile browser strictly blocked unprompted autoplay (e.g. iOS Low Power Mode) */}
      {autoplayBlocked && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="px-5 py-2.5 rounded-full bg-black/70 border border-white/30 text-white text-sm font-sans tracking-wide backdrop-blur-md animate-pulse shadow-2xl flex items-center gap-2">
            <span>Tap anywhere to begin</span>
            <span className="text-[#C17B58]">▶</span>
          </div>
        </div>
      )}

      {/* Subtle Black/Petrol Vignette Overlay for Cinema Look */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061820]/40 via-transparent to-[#061820]/40 pointer-events-none" />

      {/* Discreet Minimal Skip Button (Top Right Corner with Notch Safe-Area Offset) */}
      <div className="absolute top-[max(1.25rem,env(safe-area-inset-top))] right-[max(1.25rem,env(safe-area-inset-right))] z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismissLoader();
          }}
          className="px-4 py-2 sm:py-1.5 rounded-full bg-black/70 hover:bg-black/90 active:scale-95 border border-white/20 hover:border-[#C17B58]/80 text-white/90 hover:text-white text-xs font-sans tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer shadow-xl flex items-center gap-1.5"
        >
          <span>Skip</span>
          <span className="text-[#C17B58]">→</span>
        </button>
      </div>
    </div>
  );
}

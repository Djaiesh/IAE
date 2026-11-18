"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Volume2, VolumeX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function EntryLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt autoplay immediately
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Safety timeout: automatically dismiss video after 12 seconds in case user is idle or browser pauses
    const safetyTimer = setTimeout(() => {
      dismissLoader();
    }, 12000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = Math.min(100, Math.round((videoRef.current.currentTime / videoRef.current.duration) * 100));
      setProgress(pct);
    }
  };

  const dismissLoader = () => {
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 700);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="JILO Cinematic Introduction"
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col justify-between p-6 sm:p-10 select-none transition-all duration-700 ease-out bg-black overflow-hidden",
        fadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      )}
    >
      {/* ── Background Cinematic Video (Full Bleed) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/video/jilo-intro.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={dismissLoader}
          className="w-full h-full object-cover object-center scale-[1.02] brightness-95"
        />

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* ── Top Header Bar ── */}
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Brand Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl border border-[#E6C687]/40 bg-black/60 backdrop-blur-xl flex items-center justify-center shadow-lg">
            <span className="font-display text-lg font-bold text-[#E6C687]">J</span>
          </div>
          <div>
            <span className="font-display text-xl text-white font-bold tracking-widest block leading-none">
              JILO
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#E6C687] font-sans font-semibold block mt-0.5">
              Global Agro-Exports
            </span>
          </div>
        </div>

        {/* Top Controls: Audio & Skip/Enter Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-2.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl text-slate-300 hover:text-white hover:border-[#E6C687] transition-all cursor-pointer shadow-md"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E6C687]" />}
          </button>

          <button
            type="button"
            onClick={dismissLoader}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E6C687] to-[#C29B4D] hover:opacity-95 text-black font-sans text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_25px_rgba(230,198,135,0.4)] flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Enter JILO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Bottom Progress & Title Banner ── */}
      <div className="relative z-10 max-w-2xl mx-auto w-full text-center space-y-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#E6C687] font-semibold block mb-1">
            Intercontinental Agro-Commodities
          </span>
          <h2 className="font-display text-2xl sm:text-4xl text-white font-normal tracking-tight">
            From Origin Soil to Global Berths
          </h2>
        </div>

        {/* Video Progress Line */}
        <div className="w-full max-w-md mx-auto h-1 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#E6C687] via-[#DFC08A] to-[#C29B4D] transition-all duration-200 shadow-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, ArrowRight, ShieldCheck, Ship, Phone } from "lucide-react";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";

export function CinematicHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTenderOpen, setIsTenderOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;

    const startPlaybackFromBeginning = () => {
      if (!video) return;
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          setIsVideoLoaded(true);
        })
        .catch(() => {
          setIsVideoLoaded(true);
        });
    };

    // Check if intro is already dismissed or will be played
    let introSeen = false;
    try {
      introSeen = Boolean(sessionStorage.getItem("jilo_intro_seen"));
    } catch {}

    if (introSeen) {
      // Intro already finished in past navigation: start immediately from frame 00:00
      startPlaybackFromBeginning();
    } else {
      // Intro loader is active: wait for it to dismiss before starting hero video from 00:00
      const onIntroComplete = () => {
        startPlaybackFromBeginning();
      };
      window.addEventListener("jilo_intro_complete", onIntroComplete, { once: true });

      // Fallback in case intro doesn't trigger
      const fallbackTimer = setTimeout(() => {
        startPlaybackFromBeginning();
      }, 5000);

      return () => {
        window.removeEventListener("jilo_intro_complete", onIntroComplete);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  const handleScrollDown = () => {
    if (sectionRef.current) {
      const nextElem = sectionRef.current.nextElementSibling;
      if (nextElem) {
        nextElem.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#040810]"
    >
      {/* ── Background Video Layer with Smooth Fade-In ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Sophisticated Multilayer Scrim for Contrast & Luxury Tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(4,8,16,0.85)_100%)]" />
      </div>

      {/* ── Hero Foreground Content ── */}
      <div className="relative z-20 max-w-6xl mx-auto px-5 sm:px-8 text-center pt-24 pb-20 flex flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#E6C687]/40 backdrop-blur-xl mb-6 shadow-lg animate-in fade-in duration-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#E6C687]">
            Sovereign Agro-Exports • Ocean Freight Custody
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.04] tracking-tight max-w-5xl drop-shadow-2xl">
          Direct Origin Agro-Commodities
          <span className="block italic text-[#E6C687] font-light mt-1 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Delivered Across Global Seaports
          </span>
        </h1>

        {/* Editorial Subheadline */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 font-light mt-6 max-w-2xl leading-relaxed drop-shadow-md">
          Laboratory-calibrated spices, hydro-cooled export vegetables, and Global-GAP certified tropical fruits. Continuous refrigerated container custody from Indian hinterlands to 50+ international discharge berths.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsTenderOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C687] to-[#C29B4D] hover:brightness-110 text-black font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_12px_35px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Request Spot Quotation</span>
          </button>

          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/55 hover:bg-black/85 border border-white/20 hover:border-[#E6C687]/60 backdrop-blur-xl text-white font-sans font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-4 h-4 text-[#E6C687]" />
          </Link>
        </div>

        {/* Trust Badges Row */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-sans text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-[#E6C687] font-bold font-display text-base">50+</span>
            <span>Discharge Ports</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold font-display text-base">&lt; 3h</span>
            <span>Farm-to-Pre-Cool</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-[#E6C687] font-bold font-display text-base">ISO 17025</span>
            <span>HPLC Tested</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-sky-400 font-bold font-display text-base">100%</span>
            <span>Satellite Telemetry</span>
          </div>
        </div>
      </div>

      {/* ── Scroll Down Indicator Arrow Button ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll down to explore contents"
          className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.22em] text-white/70 group-hover:text-white transition-colors drop-shadow-md">
            Explore Shipping Corridors
          </span>
          <div className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/25 hover:border-[#E6C687] backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg animate-bounce">
            <ChevronDown className="w-4 h-4 text-white group-hover:text-[#E6C687] transition-colors" />
          </div>
        </button>
      </div>

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </section>
  );
}

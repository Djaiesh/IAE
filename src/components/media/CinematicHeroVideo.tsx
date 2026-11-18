"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroParticles3D } from "@/components/three/HeroParticles3D";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";

export function CinematicHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTenderOpen, setIsTenderOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }

    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (videoRef.current && sectionRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 8,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* ── Background Video Layer: Pure, Vivid, Fullscreen with Zero Obstructive Wording ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          className="w-full h-full object-cover object-center scale-[1.01] will-change-transform opacity-95"
        >
          <source src="/video/jilo-intro.mp4" type="video/mp4" />
          <source src="/video/hero.mp4" type="video/mp4" />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-sailing-in-the-open-sea-43098-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle, soft bottom vignette to transition cleanly into the voyage section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

        {/* 3D WebGL Stardust Particles Layer */}
        <HeroParticles3D />
      </div>

      {/* ── Minimal Bottom Scroll Cue (No text, pure subtle motion) ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 bg-black/40 backdrop-blur-md">
          <div className="w-1 h-2 rounded-full bg-[#E6C687] animate-bounce" />
        </div>
      </div>

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </section>
  );
}

"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";

export function CinematicHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTenderOpen, setIsTenderOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
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
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Background Video Layer: Pure, Vivid, Fullscreen (Zero Effects, Zero Particles, Zero Wording) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Scroll Down Indicator Arrow Button (Smoothly scrolls to next section on click) ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll down to explore contents"
          className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-white/80 group-hover:text-white transition-colors drop-shadow-md">
            Explore
          </span>
          <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/25 hover:border-saffron/80 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg animate-bounce">
            <ChevronDown className="w-5 h-5 text-white group-hover:text-saffron transition-colors" />
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

"use client";

import React, { useRef, useEffect, useState } from "react";
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

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </section>
  );
}

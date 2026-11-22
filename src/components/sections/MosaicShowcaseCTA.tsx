"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare, Compass, Sparkles, Anchor, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MosaicShowcaseCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Parallax scroll on the mosaic image
      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Gentle floating animation on the CTA card
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: -6,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden bg-abyss">
      {/* ── Background Mosaic with 3D Isometric Agro-Export Visuals ── */}
      <div className="relative w-full max-w-[1400px] mx-auto min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden rounded-5xl border border-white/10 shadow-2xl">
        
        {/* Parallax Container Image */}
        <div ref={imageRef} className="absolute inset-0 scale-[1.08] will-change-transform">
          <Image
            src="/images/agro-export-gallery-mosaic.jpg"
            alt="IAE Global Agro-Exports Operational Mosaic"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />

          {/* ── Multi-Layer Gradations & Dark Vignettes ── */}
          <div className="absolute inset-0 bg-gradient-to-b from-abyss via-transparent to-abyss opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-r from-abyss via-transparent to-abyss opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(4,13,24,0.3)_0%,_rgba(4,13,24,0.8)_55%,_#040D18_94%)]" />

          {/* Central subtle warm Saffron/Amber atmosphere glow behind buttons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-saffron/20 blur-[110px] rounded-full pointer-events-none" />
        </div>

        {/* ── Floating Center Content & Dual Buttons ── */}
        <div 
          ref={cardRef}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-xl mx-auto will-change-transform" 
          data-reveal="scale"
        >
          
          {/* Floating Subtle Micro Badge with Saffron Glow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron/40 bg-abyss/85 backdrop-blur-2xl shadow-saffron mb-6">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span className="font-sans text-[10px] uppercase tracking-eyebrow text-saffron-light font-semibold">
              Field to Global Seaport Network
            </span>
          </div>

          {/* Minimalist Editorial Eyebrow Heading */}
          <h3 className="font-display text-2xl sm:text-4xl text-cream font-normal tracking-wide mb-8 drop-shadow-md">
            Connecting Direct Origin To
            <span className="text-saffron italic block font-normal mt-1">
              Every Major Continent
            </span>
          </h3>

          {/* ── Dual Buttons with Matching Glass Sheen and Saffron/Gold Gradients ── */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            
            {/* Button 1: "EXPLORE COMMODITIES →" */}
            <Link
              href="/products"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans text-xs uppercase tracking-[0.18em] font-bold text-cream transition-all duration-300 overflow-hidden shadow-2xl active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, rgba(255, 56, 92, 0.8) 0%, rgba(225, 29, 72, 0.65) 50%, rgba(13, 32, 53, 0.7) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 56, 92, 0.6)",
                boxShadow: "0 8px 32px rgba(255, 56, 92, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-saffron/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Commodities</span>
                <ArrowRight className="w-4 h-4 text-saffron-light group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Button 2: "CHAT WITH TRADE DESK" */}
            <Link
              href="/contact"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-sans text-xs uppercase tracking-[0.18em] font-semibold text-cream/90 transition-all duration-300 overflow-hidden shadow-xl active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, rgba(13, 32, 53, 0.8) 0%, rgba(255, 56, 92, 0.2) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 24px rgba(4, 13, 24, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
              }}
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-saffron" />
                <span>Chat With Trade Desk</span>
              </span>
            </Link>

          </div>

          {/* Micro trust indicator below buttons */}
          <span className="font-sans text-[11px] text-foam/60 mt-6 tracking-wider font-light flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal" />
            <span>24/7 Reefer Telemetry & Instant FOB/CIF Booking</span>
          </span>

        </div>

      </div>
    </section>
  );
}

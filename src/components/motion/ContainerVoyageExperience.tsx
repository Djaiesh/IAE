"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PackageOpen,
  LockKeyhole,
  Ship,
  ArrowRight,
  CheckCircle2,
  Compass,
  Anchor,
  Sparkles,
  Thermometer,
  ShieldCheck,
  ChevronDown,
  Layers,
  MapPin,
  Clock,
  FlaskConical,
  Award,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MilestoneTab {
  id: string;
  step: string;
  name: string;
  targetP: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MILESTONE_TABS: MilestoneTab[] = [
  { id: "spices",  step: "01", name: "Spices",      targetP: 0.08 },
  { id: "veggies", step: "02", name: "Vegetables",  targetP: 0.31 },
  { id: "fruits",  step: "03", name: "Fruits",      targetP: 0.53 },
  { id: "port",    step: "04", name: "Port Berth",  targetP: 0.75 },
  { id: "ocean",   step: "05", name: "Ocean Liner", targetP: 0.94 },
];

const TELEMETRY_TAGS = [
  "Ambient Dry · Curcumin 5.2% · <60% RH",
  "Hydro-Chilled 6°C · Farmgate Stuffing",
  "ISO 17712 Bolt Clamped · CA 12°C",
  "440V Aux Marine Reefer Connected",
  "High-Seas Sea Lanes · Deep Water Berth",
];

// Desktop motion keyframe positions: [xPercent, yVh, rotateY, rotateZ, scale]
const DESKTOP_MOTION_KEYFRAMES = [
  [-28,  -20, -18, -2.5, 0.94],  // 0.00: Top-Left
  [-22,   -8,   5,  0.0, 1.02],  // 0.20
  [ 26,    2,  18,  2.0, 1.08],  // 0.42: Swings to Right
  [-26,   12, -16, -1.5, 1.12],  // 0.65: Swings back to Left
  [ 24,   24,  14,  3.5, 0.98],  // 0.85: Swings to Right & Hoisted
  [  0,   32,   0,  0.0, 1.15],  // 1.00: Settles at Center
] as const;

// Mobile motion keyframe positions: safe horizontal bounds, stays in upper viewport
const MOBILE_MOTION_KEYFRAMES = [
  [-5,  -16, -10, -1.5, 0.80],  // 0.00: Top-Left gentle
  [-3,  -14,   4,  0.0, 0.86],  // 0.20
  [ 5,  -12,  10,  1.5, 0.90],  // 0.42: Swings to Right gentle
  [-5,  -10,  -8, -1.0, 0.92],  // 0.65: Swings back to Left gentle
  [ 4,   -8,   6,  2.5, 0.86],  // 0.85: Swings to Right & Hoisted
  [ 0,   -6,   0,  0.0, 0.94],  // 1.00: Settles at Center
] as const;

// Progress breakpoints that map to MOTION_KEYFRAMES indices
const PROGRESS_BREAKS = [0, 0.20, 0.42, 0.65, 0.85, 1.0];

// ─── Helper: lerp motion between keyframes ────────────────────────────────────

function interpolateMotion(progress: number, isMobile: boolean) {
  let segIdx = PROGRESS_BREAKS.length - 2;
  for (let i = 0; i < PROGRESS_BREAKS.length - 1; i++) {
    if (progress <= PROGRESS_BREAKS[i + 1]) { segIdx = i; break; }
  }
  const p0 = PROGRESS_BREAKS[segIdx];
  const p1 = PROGRESS_BREAKS[segIdx + 1];
  const t = (progress - p0) / (p1 - p0);
  const kfList = isMobile ? MOBILE_MOTION_KEYFRAMES : DESKTOP_MOTION_KEYFRAMES;
  const kf0 = kfList[segIdx];
  const kf1 = kfList[segIdx + 1];
  return {
    xPercent: kf0[0] + (kf1[0] - kf0[0]) * t,
    yVh:      kf0[1] + (kf1[1] - kf0[1]) * t,
    rotateY:  kf0[2] + (kf1[2] - kf0[2]) * t,
    rotateZ:  kf0[3] + (kf1[3] - kf0[3]) * t,
    scale:    kf0[4] + (kf1[4] - kf0[4]) * t,
  };
}

function progressToActiveIndex(p: number): number {
  if (p < 0.20) return 0;
  if (p < 0.42) return 1;
  if (p < 0.65) return 2;
  if (p < 0.85) return 3;
  return 4;
}

// Image layer opacity centered on specific progress values
function calcLayerOpacity(progress: number, center: number, halfWidth: number): number {
  const dist = Math.abs(progress - center);
  if (dist >= halfWidth) return 0;
  return 1 - dist / halfWidth;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ContainerVoyageExperience() {
  const sectionRef        = useRef<HTMLDivElement>(null);
  const containerRef      = useRef<HTMLDivElement>(null);
  const shadowRef         = useRef<HTMLDivElement>(null);
  const craneWiresRef     = useRef<HTMLDivElement>(null);
  const progressBarRef    = useRef<HTMLDivElement>(null);

  // Image layer refs
  const layerIsolatedRef  = useRef<HTMLDivElement>(null);
  const layerStage1Ref    = useRef<HTMLDivElement>(null);
  const layerStage2Ref    = useRef<HTMLDivElement>(null);
  const layerStage3Ref    = useRef<HTMLDivElement>(null);
  const layerStage4Ref    = useRef<HTMLDivElement>(null);

  // Content card refs
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null]);

  // React state for responsive layout & active index
  const [activeIndex, setActiveIndex] = useState(0);
  const [xSide, setXSide] = useState<"left" | "right">("left");
  const [isMobile, setIsMobile] = useState(false);

  // Responsive mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Scroll-to-milestone (click nav) ──────────────────────────────────────
  const scrollToMilestone = useCallback((targetP: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const totalScroll = section.offsetHeight - window.innerHeight;
    const targetScroll = window.scrollY + rect.top + targetP * totalScroll;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  // ─── GSAP ScrollTrigger setup ─────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    if (containerRef.current) {
      containerRef.current.style.willChange = "transform, opacity";
    }

    const ctx = gsap.context(() => {
      const driver = { progress: 0 };

      gsap.to(driver, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4, // Responsive, buttery scrub
          onUpdate: (self) => {
            const p = self.progress;
            const mobileMode = window.innerWidth < 768;

            // ── Progress Bar Width ──────────────────────────────────────────
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${p * 100}%`;
            }

            // ── 3D Container Transform (interpolated) ──────────────────────
            const motion = interpolateMotion(p, mobileMode);
            if (containerRef.current) {
              containerRef.current.style.transform =
                `translate3d(${motion.xPercent}%, ${motion.yVh}vh, 0) ` +
                `rotateY(${motion.rotateY}deg) rotateZ(${motion.rotateZ}deg) ` +
                `scale(${motion.scale})`;
            }

            // ── Ground shadow scaling ───────────────────────────────────────
            if (shadowRef.current) {
              const shadowScale = Math.max(0.4, 1 - Math.abs(motion.yVh) / (mobileMode ? 40 : 60));
              const shadowOpacity = Math.max(0.2, 0.8 - Math.abs(motion.yVh) / (mobileMode ? 50 : 70));
              shadowRef.current.style.transform = `scale(${shadowScale})`;
              shadowRef.current.style.opacity = `${shadowOpacity}`;
            }

            // ── Crane Wires visibility ──────────────────────────────────────
            if (craneWiresRef.current) {
              const stage3Op = calcLayerOpacity(p, 0.75, 0.14);
              gsap.set(craneWiresRef.current, {
                opacity: stage3Op > 0.3 ? 1 : 0,
              });
            }

            // ── Image layer cross-fades ──────────────────────────────────────
            const isolatedOp = p < 0.18 ? 1 - (p / 0.18) * 0.5 : 0.28;
            if (layerIsolatedRef.current) gsap.set(layerIsolatedRef.current, { opacity: isolatedOp });
            if (layerStage1Ref.current)  gsap.set(layerStage1Ref.current,  { opacity: calcLayerOpacity(p, 0.31, 0.16) });
            if (layerStage2Ref.current)  gsap.set(layerStage2Ref.current,  { opacity: calcLayerOpacity(p, 0.53, 0.16) });
            if (layerStage3Ref.current)  gsap.set(layerStage3Ref.current,  { opacity: calcLayerOpacity(p, 0.75, 0.14) });
            if (layerStage4Ref.current)  gsap.set(layerStage4Ref.current,  { opacity: calcLayerOpacity(p, 0.93, 0.14) });

            // ── Active index & card side ────────────────────────────────────
            const newIdx = progressToActiveIndex(p);
            setActiveIndex((prev) => (prev !== newIdx ? newIdx : prev));
            setXSide(motion.xPercent <= 0 ? "left" : "right");
          },
        },
      });

      // ── Per-card entrance animations ────────────────────────────────────
      const cardProgressPoints = [0.08, 0.31, 0.53, 0.75, 0.94];
      cardProgressPoints.forEach((cp, i) => {
        const totalScroll = section.offsetHeight - window.innerHeight;
        ScrollTrigger.create({
          trigger: section,
          start: () => `top+=${cp * totalScroll - 80} top`,
          end:   () => `top+=${cp * totalScroll + 160} top`,
          onEnter: () => {
            const el = cardRefs.current[i];
            if (el) {
              gsap.fromTo(el,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
              );
            }
          },
          onLeaveBack: () => {
            const el = cardRefs.current[i];
            if (el) {
              gsap.to(el, { opacity: 0, y: 30, duration: 0.25, ease: "power2.in" });
            }
          },
        });
      });

    }, section);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        containerRef.current.style.willChange = "auto";
      }
    };
  }, []);

  // ─── Render Values ──────────────────────────────────────────────────────────

  const telemetry   = TELEMETRY_TAGS[activeIndex];
  const phaseBadge  = ["Ex-Works / Farmgate", "FAS Berth Reefer", "FOB Tamper Sealed", "FOB Berth Loaded", "CIF Destination Berth"][activeIndex];
  const regionLabel = ["Western Ghats / Erode", "Maharashtra Central Packhouse", "Inland Customs Terminal", "JNPT Berth 4 / Mundra", "Arabian Sea & Suez"][activeIndex];
  const waypointLabel = ["Spices & Aromatics", "Fresh Vegetables", "Orchard Fruits", "Port Hoist", "High-Seas Transit"][activeIndex];

  // Card container positioning class: responsive layout for mobile vs desktop
  const cardPositionClass = isMobile
    ? "w-full max-w-full px-2 sm:px-4 self-end mb-1 sm:mb-3"
    : activeIndex === 4
      ? "max-w-4xl mx-auto self-end mb-4"
      : xSide === "left"
        ? "max-w-md sm:max-w-xl ml-auto mr-4 sm:mr-8 self-center"
        : "max-w-md sm:max-w-xl mr-auto ml-4 sm:ml-8 self-center";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[440vh] sm:min-h-[500vh] bg-abyss text-cream"
    >
      {/* ── STICKY VIEWPORT: Pinned to deliver the seamless zigzag across half the home page ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-3 sm:px-8 py-3 sm:py-5 z-20">

        {/* Background Ambient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-navy to-deep pointer-events-none" />

        {/* S-Curve Zigzag Trail */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
            <path
              d="M 320 140 C 700 180, 1120 220, 1120 340 C 1120 440, 320 480, 320 580 C 320 680, 1120 680, 1120 750 C 1120 820, 720 850, 720 900"
              stroke="url(#saffronZigZagLine)"
              strokeWidth="4"
              strokeDasharray="10 10"
            />
            <defs>
              <linearGradient id="saffronZigZagLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#FF6B00" stopOpacity="0.8" />
                <stop offset="25%"  stopColor="#1B6B7C" stopOpacity="0.8" />
                <stop offset="50%"  stopColor="#FF6B00" stopOpacity="0.9" />
                <stop offset="75%"  stopColor="#E50914" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.95" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── 01. HEADER: PROGRESS BAR & QUICK-JUMP MILESTONE TABS ── */}
        <header className="relative z-30 max-w-6xl mx-auto w-full pt-1 sm:pt-2">
          <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2.5">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-saffron animate-pulse shrink-0" />
              <span className="eyebrow text-saffron text-[10px] sm:text-xs tracking-widest font-mono truncate">
                SOVEREIGN EXPEDITION
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-foam/70 shrink-0">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-deep/90 border border-white/10 text-saffron-light">
                {phaseBadge}
              </span>
              <span className="hidden md:inline text-[11px] text-foam/50">
                {regionLabel}
              </span>
            </div>
          </div>

          {/* 5 Milestone Tabs: Touch-optimized for mobile & desktop */}
          <div className="grid grid-cols-5 gap-1 sm:gap-2 bg-abyss/85 backdrop-blur-xl p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-float">
            {MILESTONE_TABS.map((s, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToMilestone(s.targetP)}
                  className={cn(
                    "px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center sm:justify-between cursor-pointer min-h-[34px] sm:min-h-[38px]",
                    isCurrent
                      ? "bg-saffron text-white shadow-saffron border border-saffron"
                      : "hover:bg-white/5 text-foam/60 hover:text-foam"
                  )}
                >
                  <div className="flex items-center gap-1 truncate">
                    <span className={cn("font-mono text-xs font-bold", isCurrent ? "text-white" : "text-saffron")}>
                      {s.step}
                    </span>
                    <span className="font-sans text-[11px] font-semibold truncate hidden lg:inline ml-1">
                      {s.name}
                    </span>
                  </div>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full shrink-0 hidden sm:inline-block",
                    isCurrent ? "bg-white animate-pulse" : "bg-white/20"
                  )} />
                </button>
              );
            })}
          </div>

          {/* Continuous Progress Bar */}
          <div className="w-full h-1 bg-deep/80 rounded-full mt-2 sm:mt-2.5 overflow-hidden border border-white/5">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-teal via-saffron to-gold rounded-full shadow-saffron"
              style={{ width: "0%" }}
            />
          </div>
        </header>

        {/* ── 02. MAIN STAGE: ZIGZAGGING CONTAINER & ADAPTIVE CONTENT CARDS ── */}
        <main className="relative z-20 flex-1 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto w-full my-auto overflow-visible">

          {/* THE 3D MOVING CONTAINER: Sized and positioned safely for mobile & desktop */}
          <div
            ref={containerRef}
            className="absolute z-20 w-full max-w-[270px] sm:max-w-[340px] md:max-w-[560px] aspect-[1024/767] pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1200px",
            }}
          >
            {/* 3D Floating Ground Shadow */}
            <div
              ref={shadowRef}
              className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-8 sm:h-10 bg-black/80 blur-2xl rounded-full pointer-events-none"
            />

            {/* Ambient Aura Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-saffron/20 via-teal/20 to-saffron/20 blur-3xl rounded-full pointer-events-none opacity-70" />

            {/* Crane Hook Wires */}
            <div
              ref={craneWiresRef}
              className="absolute -top-36 sm:-top-48 left-1/2 -translate-x-1/2 w-32 sm:w-44 flex justify-between pointer-events-none"
              style={{ opacity: 0 }}
            >
              <div className="w-0.5 h-40 sm:h-52 bg-gradient-to-b from-white/40 via-saffron/60 to-white/70 shadow-sm" />
              <div className="w-0.5 h-40 sm:h-52 bg-gradient-to-b from-white/40 via-saffron/60 to-white/70 shadow-sm" />
            </div>

            {/* LAYER 0: BASE ISOLATED CONTAINER */}
            <div
              ref={layerIsolatedRef}
              className="absolute inset-0 rounded-3xl sm:rounded-4xl overflow-hidden border border-white/15 drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
              style={{ opacity: 1 }}
            >
              <Image
                src="/images/container-stage-2-sealed.jpg"
                alt="3D Marine Cargo Container Traversal"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 280px, 600px"
              />
            </div>

            {/* LAYER 1: OPEN CONTAINER (VEGETABLES) */}
            <div
              ref={layerStage1Ref}
              className="absolute inset-0 rounded-3xl sm:rounded-4xl overflow-hidden border border-white/15 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <Image
                src="/images/container-stage-1-open.jpg"
                alt="Form 01: Open Container Farmgate Stuffing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-black/20" />
            </div>

            {/* LAYER 2: SEALED BOLT DOORS (FRUITS) */}
            <div
              ref={layerStage2Ref}
              className="absolute inset-0 rounded-3xl sm:rounded-4xl overflow-hidden border border-white/15 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <Image
                src="/images/container-stage-2-sealed.jpg"
                alt="Form 02: Hermetic ISO Bolt Sealed Container"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-black/20" />
            </div>

            {/* LAYER 3: GANTRY CRANE HOIST (PORT) */}
            <div
              ref={layerStage3Ref}
              className="absolute inset-0 rounded-3xl sm:rounded-4xl overflow-hidden border border-white/15 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <Image
                src="/images/container-stage-3-crane.jpg"
                alt="Form 03: Gantry Crane Berth Hoisting at Port"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-black/20" />
            </div>

            {/* LAYER 4: HIGH-SEAS CONTAINER VESSEL */}
            <div
              ref={layerStage4Ref}
              className="absolute inset-0 rounded-3xl sm:rounded-4xl overflow-hidden border border-white/15 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <Image
                src="/images/container-stage-4-vessel.jpg"
                alt="Form 04: High-Seas Ocean Freight Transit"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-black/20" />
            </div>

            {/* Active Telemetry Tag */}
            <div className="absolute top-2 left-3 sm:top-4 sm:left-6 z-30 flex items-center gap-1.5 sm:gap-2 bg-abyss/90 backdrop-blur-xl border border-saffron/60 text-cream px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-saffron">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-saffron animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-saffron-light uppercase font-bold truncate max-w-[160px] sm:max-w-[220px]">
                {telemetry}
              </span>
            </div>

            {/* Milestone Badge */}
            <div className="absolute bottom-2 right-3 sm:bottom-4 sm:right-6 z-30 flex items-center gap-1 sm:gap-2 bg-navy/90 backdrop-blur-xl border border-white/20 text-cream px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-card">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal" />
              <span className="text-[9px] sm:text-[10px] font-sans font-medium text-foam">
                Phase 0{activeIndex + 1}
              </span>
            </div>
          </div>

          {/* ── 03. ADAPTIVE CONTENT CARDS (FITS MOBILE & DESKTOP SEAMLESSLY) ── */}
          <div className={cn("relative z-30 w-full transition-all duration-500 ease-out", cardPositionClass)}>

            {/* MILESTONE 01: SPICES & AROMATICS */}
            {activeIndex === 0 && (
              <div
                ref={(el) => { cardRefs.current[0] = el; }}
                className="glass p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-4xl border border-white/15 shadow-float"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-saffron/15 border border-saffron/30 text-saffron text-[10px] sm:text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>01 · SPICES & AROMATICS</span>
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-foam/50">Phase 01 / 05</span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl lg:text-3xl text-cream font-normal leading-snug mb-1.5 sm:mb-2">
                  Laboratory-Calibrated Bio-Active Potency
                </h3>

                <p className="font-sans text-xs sm:text-sm text-foam/80 font-light leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  Sourced from certified farmer collectives in the Western Ghats. Batch-tested for active curcumin and essential oils before vacuum export sealing.
                </p>

                <div className="space-y-1.5 sm:space-y-2 border-t border-white/10 pt-2.5 sm:pt-3.5 font-sans mb-3 sm:mb-4 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Alleppey Finger Turmeric
                    </span>
                    <span className="text-saffron-light font-medium text-[11px] sm:text-xs">4.5%–5.5% Curcumin</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Tellicherry Black Pepper
                    </span>
                    <span className="text-foam/70 text-[11px] sm:text-xs">TGSEB Extra Bold</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Guntur S17 Teja Chilli
                    </span>
                    <span className="text-foam/70 text-[11px] sm:text-xs">High ASTA Color & Heat</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pt-2.5 sm:pt-3.5 border-t border-white/10">
                  <span className="text-[10px] sm:text-[11px] font-sans text-foam/60 hidden sm:inline">
                    25kg Multi-Wall Bags · 24-Month Shelf Life
                  </span>
                  <Link
                    href="/products/spices"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
                  >
                    <span>Explore Spices Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* MILESTONE 02: FRESH VEGETABLES */}
            {activeIndex === 1 && (
              <div
                ref={(el) => { cardRefs.current[1] = el; }}
                className="glass p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-4xl border border-white/15 shadow-float"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-saffron/15 border border-saffron/30 text-saffron text-[10px] sm:text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>02 · FRESH VEGETABLES</span>
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-foam/50">Phase 02 / 05</span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl lg:text-3xl text-cream font-normal leading-snug mb-1.5 sm:mb-2">
                  Hydro-Cooled Within 3 Hours of Farmgate
                </h3>

                <p className="font-sans text-xs sm:text-sm text-foam/80 font-light leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  Rapid thermal extraction halts degradation. Sized and stowed into pre-chilled reefer containers with continuous airflow circulation.
                </p>

                <div className="space-y-1.5 sm:space-y-2 border-t border-white/10 pt-2.5 sm:pt-3.5 font-sans mb-3 sm:mb-4 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Nasik Red Onions
                    </span>
                    <span className="text-saffron-light font-medium text-[11px] sm:text-xs">45mm–60mm Export Caliber</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      G4 Green Chillies
                    </span>
                    <span className="text-foam/70 text-[11px] sm:text-xs">Stem-on Fresh · Zero MRL</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Tender Export Okra
                    </span>
                    <span className="text-foam/70 text-[11px] sm:text-xs">8cm–12cm Airflow Packed</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pt-2.5 sm:pt-3.5 border-t border-white/10">
                  <span className="text-[10px] sm:text-[11px] font-sans text-foam/60 hidden sm:inline">
                    Ventilated Cartons · Pre-Cooled Reefer
                  </span>
                  <Link
                    href="/products/vegetables"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
                  >
                    <span>Explore Vegetables Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* MILESTONE 03: ORCHARD FRUITS */}
            {activeIndex === 2 && (
              <div
                ref={(el) => { cardRefs.current[2] = el; }}
                className="glass p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-4xl border border-white/15 shadow-float"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-saffron/15 border border-saffron/30 text-saffron text-[10px] sm:text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>03 · EXOTIC ORCHARD FRUITS</span>
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-foam/50">Phase 03 / 05</span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl lg:text-3xl text-cream font-normal leading-snug mb-1.5 sm:mb-2">
                  Controlled Atmosphere & Ethylene Scrubbing
                </h3>

                <p className="font-sans text-xs sm:text-sm text-foam/80 font-light leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  GI-tagged tropical fruits picked at optimum maturity. Hermetically locked with ISO 17712 bolt seals and regulated nitrogen atmosphere.
                </p>

                <div className="space-y-1.5 sm:space-y-2 border-t border-white/10 pt-2.5 sm:pt-3.5 font-sans mb-3 sm:mb-4 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Ratnagiri Alphonso Mango
                    </span>
                    <span className="text-saffron-light font-medium text-[11px] sm:text-xs">GI-Tagged · Hot Water Treated</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Bhagwa Pomegranates
                    </span>
                    <span className="text-foam/70 text-[11px] sm:text-xs">Brix 16°+ Ruby Arils</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-cream font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      Cavendish G9 Bananas
                    </span>
                    <span className="text-foam/70 text-[11px] sm:text-xs">39mm–46mm Caliber Cell Trays</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pt-2.5 sm:pt-3.5 border-t border-white/10">
                  <span className="text-[10px] sm:text-[11px] font-sans text-foam/60 hidden sm:inline">
                    Foam Netting Sleeves · GPS Pulp Logger
                  </span>
                  <Link
                    href="/products/fruits"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
                  >
                    <span>Explore Fruits Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* MILESTONE 04: FLAGSHIP SPOTLIGHT & BERTH HOIST */}
            {activeIndex === 3 && (
              <div
                ref={(el) => { cardRefs.current[3] = el; }}
                className="glass p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-4xl border border-white/15 shadow-float"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-saffron/15 border border-saffron/30 text-saffron text-[10px] sm:text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>04 · FLAGSHIP COMMODITIES</span>
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-foam/50">Phase 04 / 05</span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl lg:text-3xl text-cream font-normal leading-snug mb-1.5 sm:mb-2">
                  Direct Vessel Gate-In at JNPT & Mundra
                </h3>

                <p className="font-sans text-xs sm:text-sm text-foam/80 font-light leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  Hoisted directly onto the ocean container vessel. Coupled to ship's 440V auxiliary marine circuit with zero terminal dwell.
                </p>

                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-2.5 sm:pt-3.5 mb-3 sm:mb-4 text-center">
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/8">
                    <span className="text-[9px] sm:text-[10px] text-saffron uppercase font-bold block truncate">Turmeric</span>
                    <span className="text-[11px] sm:text-xs text-cream block font-medium truncate">18 MT FCL</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/8">
                    <span className="text-[9px] sm:text-[10px] text-teal uppercase font-bold block truncate">Red Onions</span>
                    <span className="text-[11px] sm:text-xs text-cream block font-medium truncate">25 MT Reefer</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/8">
                    <span className="text-[9px] sm:text-[10px] text-gold uppercase font-bold block truncate">Alphonso</span>
                    <span className="text-[11px] sm:text-xs text-cream block font-medium truncate">Air / Sea</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pt-2.5 sm:pt-3.5 border-t border-white/10">
                  <span className="text-[10px] sm:text-[11px] font-sans text-foam/60 hidden sm:inline">
                    Clean Bill of Lading · FOB Vessel Deck
                  </span>
                  <Link
                    href="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
                  >
                    <span>View All Commodities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* MILESTONE 05: QUALITY & OCEAN VOYAGE */}
            {activeIndex === 4 && (
              <div
                ref={(el) => { cardRefs.current[4] = el; }}
                className="glass p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-4xl border border-white/15 shadow-float text-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/15 border border-saffron/30 text-saffron text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>05 · AUDITED QUALITY & HIGH-SEAS TRANSIT</span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl lg:text-3xl text-cream font-normal leading-snug mb-1.5 sm:mb-2 max-w-xl mx-auto">
                  Unbroken Cold Chain to World Seaports
                </h3>

                <p className="font-sans text-xs sm:text-sm text-foam/80 font-light leading-relaxed mb-3 sm:mb-5 max-w-xl mx-auto line-clamp-2 sm:line-clamp-none">
                  Zero-tolerance multi-residue pesticide screens via GC-MS/MS & LC-MS/MS in NABL/ISO-17025 accredited labs before container release.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-5 text-left text-xs">
                  <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/8">
                    <FlaskConical className="w-3.5 h-3.5 text-saffron mb-1" />
                    <h4 className="font-sans text-xs font-semibold text-cream">HPLC Active Assay</h4>
                    <p className="text-[10px] text-foam/60 font-light hidden sm:block">Curcumin, Piperine & Capsaicin.</p>
                  </div>
                  <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/8">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal mb-1" />
                    <h4 className="font-sans text-xs font-semibold text-cream">Pesticide MRL Zero</h4>
                    <p className="text-[10px] text-foam/60 font-light hidden sm:block">Compliant with EU & US FDA limits.</p>
                  </div>
                  <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/8">
                    <Thermometer className="w-3.5 h-3.5 text-foam mb-1" />
                    <h4 className="font-sans text-xs font-semibold text-cream">Reefer Telemetry</h4>
                    <p className="text-[10px] text-foam/60 font-light hidden sm:block">15-min core temperature satellite logs.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3 border-t border-white/10">
                  <Link
                    href="/quality"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
                  >
                    <span>View Quality Standards</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/export-process"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full border border-white/15 hover:border-saffron hover:bg-white/5 text-foam hover:text-white font-sans text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all"
                  >
                    <span>Explore 6-Stage Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

          </div>

        </main>

        {/* ── 04. FOOTER: ZIGZAG SCROLL GUIDE PROMPT ── */}
        <footer className="relative z-30 max-w-6xl mx-auto w-full pb-1 sm:pb-2">
          <div className="flex items-center justify-between gap-2 bg-abyss/90 backdrop-blur-xl px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-white/10 shadow-md">
            <div className="flex items-center gap-1.5 text-[11px] font-sans text-foam/70 truncate">
              <ChevronDown className="w-3.5 h-3.5 text-saffron animate-bounce shrink-0" />
              <span className="hidden sm:inline">Scroll to explore zigzag expedition</span>
              <span className="sm:hidden font-mono text-[10px] text-saffron font-bold">0{activeIndex + 1}/05</span>
            </div>

            <div className="hidden md:block text-xs font-mono text-saffron font-bold">
              Waypoint 0{activeIndex + 1} of 05 · {waypointLabel}
            </div>

            <Link
              href="/export-process"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-saffron shrink-0"
            >
              <span>Pipeline</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </footer>

      </div>
    </section>
  );
}

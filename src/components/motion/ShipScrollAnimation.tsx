"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 100;
const FRAME_PATH = (idx: number) =>
  `/new-ship-frames/frame-${String(idx).padStart(4, "0")}.webp`;

/**
 * Centered "JILO EXPORTS" with typing effect in the center of the frame
 * as requested for the overhead container view.
 */
function CenteredJiloExportsTyping({ active }: { active: boolean }) {
  const fullText = "JILO EXPORTS";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!active) {
      setTypedText("");
      return;
    }

    let i = 0;
    setTypedText("");
    const timer = setInterval(() => {
      i++;
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [active]);

  if (!active && !typedText) return null;

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4 select-none">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#E50914] block mb-2 font-semibold drop-shadow-md">
          Sovereign Maritime Agro-Trade
        </span>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-white drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] flex items-center justify-center leading-none">
          <span className="bg-gradient-to-r from-white via-[#E50914] to-white bg-clip-text text-transparent">
            {typedText}
          </span>
          <span className="inline-block w-1.5 sm:w-2.5 h-8 sm:h-14 bg-[#E50914] ml-2 animate-pulse shadow-[0_0_15px_#E50914]" />
        </h2>
        <span className="text-xs sm:text-sm font-sans tracking-[0.22em] uppercase text-slate-300/85 block mt-3 font-medium drop-shadow">
          APEDA &amp; Global Cold-Chain Certified
        </span>
      </div>
    </div>
  );
}

interface ShipScrollAnimationProps {
  nextSectionRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function ShipScrollAnimation({
  nextSectionRef,
  className,
}: ShipScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const frameWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cached frame images array [0..100], index 1..100 corresponds to frame-0001..frame-0100
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES + 1).fill(null)
  );
  const currentRenderedFrameRef = useRef<number>(1);
  const activeFrameRef = useRef<number>(1);
  const [activeFrame, setActiveFrame] = useState<number>(1);
  const isComponentMountedRef = useRef<boolean>(true);

  // ─── 00. Guarantee Fresh Start on Page Load / Refresh ───────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, []);

  // ─── 01. High-Fidelity Canvas Drawing Engine (Pristine Image Quality) ───────
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Maintain ultra-high standards for scaling & rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clamp frame index between 1 and 100
    const targetIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIndex)));

    // Look for exact image or nearest available frame
    let imgToDraw = imagesRef.current[targetIdx];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      for (let i = targetIdx; i >= 1; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
          imgToDraw = imagesRef.current[i];
          break;
        }
      }
      if (!imgToDraw) {
        for (let i = targetIdx + 1; i <= TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
            imgToDraw = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!imgToDraw) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgWidth = imgToDraw.naturalWidth || 1280;
    const imgHeight = imgToDraw.naturalHeight || 720;

    // In frames 1 to 25, crop out baked black letterbox bars (sy: 68, sHeight: 584) so video is uniform full-frame
    const hasBakedLetterbox = targetIdx <= 25;
    const srcX = 0;
    const srcY = hasBakedLetterbox ? 68 : 0;
    const srcWidth = imgWidth;
    const srcHeight = hasBakedLetterbox ? Math.max(100, imgHeight - 136) : imgHeight;

    const imgRatio = srcWidth / srcHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(imgToDraw, srcX, srcY, srcWidth, srcHeight, offsetX, offsetY, drawWidth, drawHeight);
    currentRenderedFrameRef.current = targetIdx;

    if (Math.abs(targetIdx - activeFrameRef.current) >= 3 || targetIdx === 1 || targetIdx === 100) {
      activeFrameRef.current = targetIdx;
      setActiveFrame(targetIdx);
    }
  }, []);

  // ─── 02. Resize Handler with DPI Normalization ──────────────────────────────
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    const pin = pinWrapperRef.current;
    if (!canvas || !pin) return;

    const rect = pin.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.round(rect.width) || (typeof window !== "undefined" ? window.innerWidth : 1920);
    const displayHeight = Math.round(rect.height) || (typeof window !== "undefined" ? window.innerHeight : 1080);

    if (displayWidth === 0 || displayHeight === 0) return;

    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    renderFrame(currentRenderedFrameRef.current);
  }, [renderFrame]);

  // ─── 03. Progressive Frame Preloading (Frame 1 Immediate, Rest in Background) 
  useEffect(() => {
    isComponentMountedRef.current = true;
    updateCanvasDimensions();

    // 1. Immediately load frame 1 for instant first paint
    const firstImg = new window.Image();
    firstImg.src = FRAME_PATH(1);
    const onFirstLoad = () => {
      if (!isComponentMountedRef.current) return;
      imagesRef.current[1] = firstImg;
      updateCanvasDimensions();
      renderFrame(1);
    };

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      onFirstLoad();
    } else {
      firstImg.onload = onFirstLoad;
    }

    // 2. Preload next batch (frames 2..20) for immediate scrolling response
    const preloadBatch = () => {
      for (let i = 2; i <= 20; i++) {
        const img = new window.Image();
        img.src = FRAME_PATH(i);
        img.onload = () => {
          if (!isComponentMountedRef.current) return;
          imagesRef.current[i] = img;
        };
      }
    };
    const batchTimer = setTimeout(preloadBatch, 30);

    // 3. Preload all remaining frames (21..100)
    const preloadRemaining = () => {
      for (let i = 21; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = FRAME_PATH(i);
        img.onload = () => {
          if (!isComponentMountedRef.current) return;
          imagesRef.current[i] = img;
        };
      }
    };
    const remainingTimer = setTimeout(preloadRemaining, 100);

    return () => {
      isComponentMountedRef.current = false;
      clearTimeout(batchTimer);
      clearTimeout(remainingTimer);
    };
  }, [renderFrame, updateCanvasDimensions]);

  // ─── 04. Window Resize & Orientation Observer ──────────────────────────────
  useEffect(() => {
    updateCanvasDimensions();

    const handleResize = () => {
      updateCanvasDimensions();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [updateCanvasDimensions]);

  // ─── 05. GSAP ScrollTrigger Timelines (100% Scroll-Controlled Playback) ────
  useEffect(() => {
    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;

    if (!container || !pinWrapper) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      renderFrame(1);
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const pinDistance = isMobile ? window.innerHeight * 2.8 : window.innerHeight * 3.4;

      // ── TIMELINE 1: Pinned Ship Voyage Animation Timeline ──
      gsap.timeline({
        scrollTrigger: {
          id: "shipScrollAnimationTrigger",
          trigger: container,
          pin: pinWrapper,
          start: "top top",
          end: `+=${pinDistance}`,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress; // 0.000 to 1.000

            // Normalization:
            // 0.00 to 0.88 plays frames 1 to 90
            // 0.88 to 1.00 plays frames 90 to 100 (the last 10 frames)
            let targetFrame: number;
            if (p <= 0.88) {
              const t = p / 0.88;
              targetFrame = 1 + t * 89; // 1 to 90
            } else {
              const u = (p - 0.88) / 0.12; // 0 to 1
              targetFrame = 90 + u * 10; // 90 to 100
            }

            const clampedFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(targetFrame)));
            if (clampedFrame !== currentRenderedFrameRef.current) {
              renderFrame(clampedFrame);
            }

            // Smoothly reduce frame size to half during the last 10 frames (p >= 0.88)
            if (frameWrapperRef.current) {
              if (p >= 0.88) {
                const shrinkProgress = (p - 0.88) / 0.12; // 0.0 to 1.0
                const currentScale = 1 - shrinkProgress * 0.48; // 1.0 down to 0.52 (half size)
                const radius = shrinkProgress * 28; // 0 to 28px
                frameWrapperRef.current.style.transform = `scale(${currentScale})`;
                frameWrapperRef.current.style.borderRadius = `${radius}px`;
                frameWrapperRef.current.style.boxShadow = shrinkProgress > 0.08
                  ? `0 30px 90px rgba(0, 0, 0, ${0.4 + shrinkProgress * 0.55}), 0 0 0 1px rgba(229, 9, 20, ${shrinkProgress * 0.35})`
                  : "none";
              } else {
                frameWrapperRef.current.style.transform = "scale(1)";
                frameWrapperRef.current.style.borderRadius = "0px";
                frameWrapperRef.current.style.boxShadow = "none";
              }
            }
          },
        },
      });

      // ── TIMELINE 2: Scroll-Controlled Transition into Next Section ──
      const nextTarget =
        nextSectionRef?.current || document.getElementById("global-reach-map");

      if (nextTarget) {
        gsap.timeline({
          scrollTrigger: {
            id: "nextSectionTransitionTrigger",
            trigger: container,
            start: () => `+=${pinDistance * 0.84}`,
            end: () => `+=${pinDistance}`,
            scrub: 0.6,
          },
        }).fromTo(
          nextTarget,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          }
        );
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [nextSectionRef, renderFrame]);

  const getWorkflowInfo = (frame: number) => {
    if (frame <= 25) {
      return {
        step: "01 / ORIGIN DOCK",
        title: "EXPORT ALLOCATION STAGING",
        desc: "Gantry crane terminal transfer & pre-cooled container hoist",
      };
    } else if (frame <= 65) {
      return {
        step: "02 / VESSEL STOWAGE",
        title: "PRECISION REEFER LASHING",
        desc: "Continuous cold-chain power hookup & deep-sea deck stowage",
      };
    } else if (frame <= 80) {
      return {
        step: "03 / OCEAN CORRIDOR",
        title: "TRANS-OCEANIC LINER TRANSIT",
        desc: "Automated GPS telemetry across Mediterranean & Asian sea lanes",
      };
    } else {
      return {
        step: "04 / DESTINATION HANDOVER",
        title: "IMPORT BERTH CLEARANCE",
        desc: "APEDA & GlobalG.A.P. compliant direct consignee delivery",
      };
    }
  };

  const workflow = getWorkflowInfo(activeFrame);

  return (
    <section
      ref={containerRef}
      className={cn("relative w-full bg-transparent", className)}
    >
      {/* ── Pinned Viewport Container (100svh) with video frames, workflow & subtle tint ── */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[100svh] overflow-hidden bg-transparent flex items-center justify-center select-none"
      >
        {/* Inner scaling frame wrapper: reduces to half size during the last 10 frames */}
        <div
          ref={frameWrapperRef}
          className="relative w-full h-full overflow-hidden flex items-center justify-center will-change-transform"
        >
          {/* Instant Native Image Paint - Guaranteed Zero Black Flash */}
          <img
            src="/new-ship-frames/frame-0001.webp"
            alt="JILO Maritime Export Logistics"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />

          {/* ── High-Performance Canvas for Ship Animation Frames ── */}
          <canvas
            ref={canvasRef}
            aria-label="Interactive scroll-driven ship animation"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform z-[1]"
          />

          {/* ── Subtle corporate blue gradient for crisp contrast and legibility ── */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B3B82]/75 via-transparent to-black/20 pointer-events-none z-[2]" />

          {/* ── Workflow Tracking in Video Empty Space (Bottom-Left) ── */}
          <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 lg:left-16 z-20 pointer-events-none max-w-lg select-none transition-all duration-300">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D448E]/85 border border-[#FF1E27]/50 backdrop-blur-md mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-[#FF1E27]">
                {workflow.step}
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-lg leading-tight">
              {workflow.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-slate-200 mt-1.5 max-w-md font-normal drop-shadow leading-relaxed">
              {workflow.desc}
            </p>
          </div>

          {/* ── Centered "JILO EXPORTS" with Typing Effect (Frames 75-100 Overhead View) ── */}
          <CenteredJiloExportsTyping active={activeFrame >= 75} />
        </div>
      </div>
    </section>
  );
}

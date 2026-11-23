"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 149;
const FRAME_PATH = (idx: number) =>
  `/horizontal_scroll_frames/frame-${String(idx).padStart(4, "0")}.webp`;

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

  // Cached frame images array [0..149], index 1..149 corresponds to frame-0001..frame-0149
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES + 1).fill(null)
  );
  const currentRenderedFrameRef = useRef<number>(1);
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

    // Ultra-high standards for scaling & rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clamp frame index between 1 and 149
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

    const imgWidth = imgToDraw.naturalWidth || 1920;
    const imgHeight = imgToDraw.naturalHeight || 1080;

    const imgRatio = imgWidth / imgHeight;
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

    ctx.drawImage(imgToDraw, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
    currentRenderedFrameRef.current = targetIdx;
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

  // ─── 03. Progressive Frame Preloading (Frame 1 Immediate, Batched Background) ─
  useEffect(() => {
    isComponentMountedRef.current = true;
    updateCanvasDimensions();

    // Helper to safely load individual frame
    const loadFrame = (idx: number) => {
      if (idx < 1 || idx > TOTAL_FRAMES || imagesRef.current[idx]) return;
      const img = new window.Image();
      img.src = FRAME_PATH(idx);
      img.onload = () => {
        if (!isComponentMountedRef.current) return;
        imagesRef.current[idx] = img;
      };
    };

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

    // 2. Preload initial batch (frames 2..35) for immediate scrolling response
    const t1 = setTimeout(() => {
      for (let i = 2; i <= Math.min(35, TOTAL_FRAMES); i++) {
        loadFrame(i);
      }
    }, 20);

    // 3. Preload middle batch (frames 36..90)
    const t2 = setTimeout(() => {
      for (let i = 36; i <= Math.min(90, TOTAL_FRAMES); i++) {
        loadFrame(i);
      }
    }, 120);

    // 4. Preload remaining frames (91..149)
    const t3 = setTimeout(() => {
      for (let i = 91; i <= TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    }, 300);

    return () => {
      isComponentMountedRef.current = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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

      // ── Pinned Hero Video Animation Timeline ──
      gsap.timeline({
        scrollTrigger: {
          id: "heroScrollAnimationTrigger",
          trigger: container,
          pin: pinWrapper,
          start: "top top",
          end: `+=${pinDistance}`,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress; // 0.000 to 1.000
            const targetFrame = Math.max(
              1,
              Math.min(TOTAL_FRAMES, Math.round(1 + p * (TOTAL_FRAMES - 1)))
            );

            if (targetFrame !== currentRenderedFrameRef.current) {
              renderFrame(targetFrame);
            }

            // Opportunistically load frames ahead of current scroll
            for (let offset = 1; offset <= 12; offset++) {
              const ahead = targetFrame + offset;
              if (ahead <= TOTAL_FRAMES && !imagesRef.current[ahead]) {
                const img = new window.Image();
                img.src = FRAME_PATH(ahead);
                img.onload = () => {
                  if (isComponentMountedRef.current) {
                    imagesRef.current[ahead] = img;
                  }
                };
              }
            }
          },
        },
      });

      // ── Scroll-Controlled Smooth Transition into Next Section ──
      const nextTarget =
        nextSectionRef?.current || document.getElementById("global-reach-map");

      if (nextTarget) {
        gsap.timeline({
          scrollTrigger: {
            id: "nextSectionTransitionTrigger",
            trigger: container,
            start: () => `+=${pinDistance * 0.88}`,
            end: () => `+=${pinDistance}`,
            scrub: 0.6,
          },
        }).fromTo(
          nextTarget,
          {
            opacity: 0,
            y: 70,
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

  return (
    <section
      ref={containerRef}
      id="hero-scroll-video"
      className={cn("relative w-full bg-transparent", className)}
    >
      {/* ── Pinned Viewport Container (100svh) with Pure Video Frames ── */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[100svh] overflow-hidden bg-transparent flex items-center justify-center select-none"
      >
        <div
          ref={frameWrapperRef}
          className="relative w-full h-full overflow-hidden flex items-center justify-center will-change-transform"
        >
          {/* Instant Native Image Paint - Guaranteed Zero Flash */}
          <img
            src="/horizontal_scroll_frames/frame-0001.webp"
            alt="Hero Video Frame"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />

          {/* ── High-Performance Canvas for Scroll Animation Frames ── */}
          <canvas
            ref={canvasRef}
            aria-label="Scroll-driven hero video animation"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform z-[1]"
          />

          {/* Subtle bottom gradient to blend seamlessly into next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061820]/75 via-transparent to-black/20 pointer-events-none z-[2]" />
        </div>
      </div>
    </section>
  );
}

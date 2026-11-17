"use client";

import React, { useEffect, useState } from "react";
import { Ship, Compass, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CRITICAL_IMAGES = [
  "/images/container-isolated.png",
  "/images/container-stage-1-open.jpg",
  "/images/container-stage-2-sealed.jpg",
  "/images/container-stage-3-crane.jpg",
  "/images/container-stage-4-vessel.jpg",
  "/images/agro-export-gallery-mosaic.jpg",
];

const STATUS_MESSAGES = [
  "Synchronizing Sovereign Export Infrastructure...",
  "Pre-cooling 3D Marine Reefer Containers & Telemetry...",
  "Calibrating High-Curcumin Spices & Hydro-Cooled Produce...",
  "Connecting Direct Port Terminals (JNPT / Mundra)...",
  "All Systems Synchronized. Entering Global Trade Desk.",
];

export function EntryLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(5);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  const [fadingOut, setFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let currentProgress = 5;

    // Smooth progress incrementer to keep visual feedback fluid
    const progressTimer = setInterval(() => {
      if (isCancelled) return;
      if (currentProgress < 90) {
        currentProgress += Math.floor(Math.random() * 6) + 3;
        if (currentProgress > 90) currentProgress = 90;
        setProgress(currentProgress);

        // Update status messages according to progress thresholds
        if (currentProgress < 25) {
          setStatusText(STATUS_MESSAGES[0]);
        } else if (currentProgress < 50) {
          setStatusText(STATUS_MESSAGES[1]);
        } else if (currentProgress < 75) {
          setStatusText(STATUS_MESSAGES[2]);
        } else {
          setStatusText(STATUS_MESSAGES[3]);
        }
      }
    }, 80);

    // ── 01. Preload Images Guarantee ──
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Safety fallback
        }
      });
    };

    // ── 02. Preload Fonts Guarantee ──
    const preloadFonts = async (): Promise<void> => {
      if (typeof document !== "undefined" && document.fonts) {
        try {
          await document.fonts.ready;
        } catch {
          // Fallback if fonts api fails
        }
      }
    };

    // ── 03. Window Complete Load Guarantee ──
    const waitForPageLoad = (): Promise<void> => {
      return new Promise((resolve) => {
        if (typeof document !== "undefined" && document.readyState === "complete") {
          resolve();
        } else {
          window.addEventListener("load", () => resolve(), { once: true });
          setTimeout(resolve, 2500); // Safety ceiling
        }
      });
    };

    // ── 04. Video Buffering Readiness Check ──
    const waitForVideoReady = (): Promise<void> => {
      return new Promise((resolve) => {
        const video = document.querySelector("video");
        if (!video || video.readyState >= 2) {
          resolve();
        } else {
          video.addEventListener("canplay", () => resolve(), { once: true });
          setTimeout(resolve, 2000); // Safety timeout so it never blocks
        }
      });
    };

    // Execute All Preloaders in Parallel
    const loadAllAssets = async () => {
      const startTime = Date.now();

      await Promise.all([
        ...CRITICAL_IMAGES.map((src) => preloadImage(src)),
        preloadFonts(),
        waitForPageLoad(),
        waitForVideoReady(),
      ]);

      if (isCancelled) return;

      // Ensure loader displays for at least 1.1s for luxury feel, but finishes fast
      const elapsed = Date.now() - startTime;
      const minDisplayTime = 1200;
      if (elapsed < minDisplayTime) {
        await new Promise((r) => setTimeout(r, minDisplayTime - elapsed));
      }

      if (isCancelled) return;

      // Final 100% completion
      clearInterval(progressTimer);
      setProgress(100);
      setStatusText(STATUS_MESSAGES[4]);
      setIsReady(true);

      // Graceful curtain reveal
      setTimeout(() => {
        if (isCancelled) return;
        setFadingOut(true);
        setTimeout(() => {
          if (isCancelled) return;
          setVisible(false);
        }, 600);
      }, 350);
    };

    loadAllAssets();

    // Absolute fallback safety timeout (in case of network drop)
    const absoluteSafety = setTimeout(() => {
      if (!isCancelled) {
        clearInterval(progressTimer);
        setProgress(100);
        setFadingOut(true);
        setTimeout(() => setVisible(false), 500);
      }
    }, 4500);

    return () => {
      isCancelled = true;
      clearInterval(progressTimer);
      clearTimeout(absoluteSafety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading JILO Global Agro-Exports Experience"
      suppressHydrationWarning
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out bg-abyss",
        fadingOut ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100 scale-100"
      )}
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #0d2035 0%, #040d18 80%)",
      }}
    >
      {/* Background Subtle Wave Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
          <circle cx="720" cy="450" r="380" stroke="url(#loaderRing)" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="720" cy="450" r="280" stroke="url(#loaderRing)" strokeWidth="1" strokeDasharray="4 8" />
          <defs>
            <linearGradient id="loaderRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B6B7C" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        
        {/* Brand Emblem */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-20 h-20 rounded-3xl border border-saffron/40 bg-navy/90 backdrop-blur-2xl flex items-center justify-center shadow-glow mb-4">
            <Compass className="w-10 h-10 text-saffron animate-spin-slow" />
            
            {/* Pulsing Saffron Aura */}
            <div className="absolute inset-0 rounded-3xl bg-saffron/15 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl text-cream font-normal tracking-widest block leading-tight">
            JILO
          </h1>
          <span className="text-[10px] tracking-eyebrow uppercase text-saffron font-sans font-bold mt-1">
            Global Agro-Exports & Logistics
          </span>
        </div>

        {/* Nautical Progress Line */}
        <div className="relative max-w-xs mx-auto mb-6">
          <div className="h-1.5 bg-deep/90 rounded-full overflow-hidden border border-white/10 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-teal via-saffron to-gold transition-all duration-150 ease-out rounded-full shadow-saffron"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Floating Vessel Node along the progress line */}
          <div
            className="absolute -top-3 transition-all duration-150 ease-out"
            style={{ left: `calc(${Math.min(Math.max(progress, 5), 95)}% - 12px)` }}
          >
            <div className="w-6 h-6 rounded-full bg-abyss border border-saffron flex items-center justify-center shadow-md">
              <Ship className="w-3.5 h-3.5 text-saffron" />
            </div>
          </div>
        </div>

        {/* Real-time Percentage Counter */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="font-mono text-2xl font-bold text-cream tracking-tight">
            {progress}
          </span>
          <span className="font-mono text-xs text-saffron font-bold">%</span>
        </div>

        {/* Dynamic Status Text */}
        <div className="min-h-[28px] flex items-center justify-center">
          <p className="font-sans text-xs text-foam/80 font-light tracking-wide transition-all duration-300">
            {statusText}
          </p>
        </div>

        {/* Verification Pill */}
        <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-sans text-foam/60">
          <ShieldCheck className="w-3.5 h-3.5 text-teal" />
          <span>APEDA · ISO 17712 · Reefer Cold Chain Calibrated</span>
        </div>

      </div>
    </div>
  );
}

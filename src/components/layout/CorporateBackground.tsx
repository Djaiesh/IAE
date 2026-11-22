"use client";

import React from "react";
import { CinematicOceanCanvas } from "./CinematicOceanCanvas";

/**
 * CorporateBackground
 * 
 * Cinematic Maritime Visual Engine:
 * - Living 60FPS volumetric God rays streaming from the sunlit surface
 * - Shimmering aquatic caustics & deep sea ambient glow
 * - Bioluminescent & gold marine particle stardust that responds to mouse motion
 * - High-precision maritime navigation route arcs & bathymetric curves
 * - Crisp lat/long coordinate telemetry grid
 */
export function CorporateBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
    >
      {/* ── 01. Living Procedural Oceanic Atmosphere (Rays, Caustics, Particles) ── */}
      <CinematicOceanCanvas />

      {/* ── 02. Fluid Maritime Shipping Route Waves (SVG Matching GlobalLink) ── */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <svg
          className="w-full h-full min-w-[1200px] object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.05" />
              <stop offset="35%" stopColor="#7DD3FC" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="waveLine2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Accent Glowing Sea Route 1 */}
          <path
            d="M-100 280 C 250 140, 520 420, 850 260 C 1180 100, 1420 320, 1600 240"
            stroke="url(#waveLine)"
            strokeWidth="1.8"
            strokeDasharray="8 6"
          />

          {/* Accent Glowing Sea Route 2 */}
          <path
            d="M-100 480 C 300 360, 650 620, 1050 440 C 1350 310, 1500 480, 1600 420"
            stroke="url(#waveLine2)"
            strokeWidth="1.5"
          />

          {/* Subtle Bathymetric Depth Arc */}
          <path
            d="M-100 680 C 350 560, 750 780, 1150 620 C 1380 520, 1520 640, 1600 580"
            stroke="url(#waveLine)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />
        </svg>
      </div>

      {/* ── 03. Navigational Latitude/Longitude Coordinate Grid ── */}
      <div className="corporate-nav-grid absolute inset-0 opacity-40 pointer-events-none" />

      {/* ── 04. Soft Vignette to focus contrast on center content ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_50%,transparent_50%,rgba(4,18,44,0.45)_100%)] pointer-events-none" />
    </div>
  );
}

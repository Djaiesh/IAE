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

      {/* ── 02. Fluid Maritime Shipping Route Waves & Sinuous Silhouettes (Matching GlobalLink) ── */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <svg
          className="w-full h-full min-w-[1200px] object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
              <stop offset="35%" stopColor="#7DD3FC" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveLine2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveFillSwell" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0A3B8C" stopOpacity="0.0" />
            </linearGradient>
            <radialGradient id="particleAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Organic Ambient Wave Swell Ribbon (GlobalLink Style) */}
          <path
            d="M-100 320 C 300 200, 580 460, 950 300 C 1220 180, 1420 360, 1600 300 L 1600 900 L -100 900 Z"
            fill="url(#waveFillSwell)"
          />

          {/* Accent Glowing Sea Route 1 */}
          <path
            d="M-100 280 C 250 140, 520 420, 850 260 C 1180 100, 1420 320, 1600 240"
            stroke="url(#waveLine)"
            strokeWidth="2.2"
            strokeDasharray="8 6"
          />

          {/* Accent Glowing Sea Route 2 */}
          <path
            d="M-100 480 C 300 360, 650 620, 1050 440 C 1350 310, 1500 480, 1600 420"
            stroke="url(#waveLine2)"
            strokeWidth="1.8"
          />

          {/* Subtle Bathymetric Depth Arc */}
          <path
            d="M-100 680 C 350 560, 750 780, 1150 620 C 1380 520, 1520 640, 1600 580"
            stroke="url(#waveLine)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />

          {/* Luminous Particle Scatter on Swells */}
          <circle cx="340" cy="220" r="3.5" fill="url(#particleAura)" />
          <circle cx="580" cy="380" r="2.5" fill="url(#particleAura)" />
          <circle cx="890" cy="270" r="4.0" fill="url(#particleAura)" />
          <circle cx="1120" cy="340" r="3.0" fill="url(#particleAura)" />
          <circle cx="720" cy="560" r="3.0" fill="url(#particleAura)" />
          <circle cx="1280" cy="460" r="3.5" fill="url(#particleAura)" />
        </svg>
      </div>

      {/* ── 03. Navigational Latitude/Longitude Coordinate Grid ── */}
      <div className="corporate-nav-grid absolute inset-0 opacity-35 pointer-events-none" />

      {/* ── 04. Soft Luminous Oceanic Edge Diffusion (No Dark Muddy Vignette) ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_40%,transparent_60%,rgba(10,50,120,0.25)_100%)] pointer-events-none" />
    </div>
  );
}

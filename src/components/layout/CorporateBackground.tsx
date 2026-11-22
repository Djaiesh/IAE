"use client";

import React from "react";

/**
 * CorporateBackground
 * 
 * Professional, high-end corporate maritime background designed specifically
 * for JILO Global Agro-Exports. Inspired by world-class logistics leaders
 * (GlobalLink & SkyStructure references):
 * 
 * - Radiant multi-stop royal & cerulean sapphire gradient
 * - Luminous ambient aurora light blooms (cyan & sky-blue)
 * - Fluid curved maritime shipping route wave ribbons (SVG)
 * - Lat/Long navigational coordinate grid with glowing intersection nodes
 * - 100% GPU-accelerated, crisp on all resolutions, zero compression artifacts
 */
export function CorporateBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
    >
      {/* ── 01. Radiant Multi-Stop Corporate Blue Canvas ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_100%_at_50%_-10%,#1E62B0_0%,#134988_28%,#0D3568_60%,#071F42_100%)]" />

      {/* ── 02. Luminous Ambient Aurora Blooms ── */}
      <div className="corporate-ambient-lights absolute inset-0 opacity-90" />

      {/* ── 03. Fluid Maritime Shipping Route Waves (SVG Matching GlobalLink Reference) ── */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <svg
          className="w-full h-full min-w-[1200px] object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#0284C7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#0EA5E9" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
              <stop offset="35%" stopColor="#7DD3FC" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Flowing Wave 1 */}
          <path
            d="M-100 280 C 250 140, 520 420, 850 260 C 1180 100, 1420 320, 1600 240 L 1600 950 L -100 950 Z"
            fill="url(#waveGrad1)"
          />

          {/* Flowing Wave 2 */}
          <path
            d="M-100 480 C 300 360, 650 620, 1050 440 C 1350 310, 1500 480, 1600 420 L 1600 950 L -100 950 Z"
            fill="url(#waveGrad2)"
          />

          {/* Accent Glowing Contour Line 1 */}
          <path
            d="M-100 280 C 250 140, 520 420, 850 260 C 1180 100, 1420 320, 1600 240"
            stroke="url(#waveLine)"
            strokeWidth="1.8"
            strokeDasharray="8 6"
          />

          {/* Accent Glowing Contour Line 2 */}
          <path
            d="M-100 480 C 300 360, 650 620, 1050 440 C 1350 310, 1500 480, 1600 420"
            stroke="url(#waveLine)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ── 04. Navigational Latitude/Longitude Coordinate Grid ── */}
      <div className="corporate-nav-grid absolute inset-0" />

      {/* ── 05. Golden & Cyan Floating Macro Flares ── */}
      <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,transparent_70%)] blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.25)_0%,transparent_70%)] blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute -bottom-40 left-10 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.20)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}

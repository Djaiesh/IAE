"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CinematicHeroVideo } from "@/components/media/CinematicHeroVideo";
import { JiloMovingCommodityCards } from "@/components/sections/JiloMovingCommodityCards";
import { JiloPerspectiveMosaic } from "@/components/sections/JiloPerspectiveMosaic";

// ── 3D WebGL Sovereign Globe dynamically imported on client ──
const SovereignGlobe3D = dynamic(
  () => import("@/components/three/SovereignGlobe3D").then((m) => m.SovereignGlobe3D),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      {/* 01 — Cinematic Hero: High-Visibility 4K Video (Clean, Zero Text Overlay) */}
      <CinematicHeroVideo />

      {/* 02 — Interactive 3D WebGL Globe: Intercontinental Maritime Trade Arcs from India to Global Berths */}
      <SovereignGlobe3D />

      {/* 03 — Smooth Moving 3D Commodity Cards: Continuous Gliding Marquee with Interactive Hover Zoom & Technical Specs */}
      <JiloMovingCommodityCards />

      {/* 04 — Sovereign Agro-Export Mosaic: High-Density 3D Diamond Grid of Provenance & Ocean Terminals */}
      <JiloPerspectiveMosaic />
    </>
  );
}

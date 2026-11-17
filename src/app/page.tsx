"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CinematicHeroVideo } from "@/components/media/CinematicHeroVideo";
import { ContainerVoyageExperience } from "@/components/motion/ContainerVoyageExperience";
import { JiloMovingCommodityCards } from "@/components/sections/JiloMovingCommodityCards";
import { ReeferFreightCalculator3D } from "@/components/leads/ReeferFreightCalculator3D";
import { JiloPerspectiveMosaic } from "@/components/sections/JiloPerspectiveMosaic";

// ── 3D WebGL Components dynamically imported on client ──
const SovereignGlobe3D = dynamic(
  () => import("@/components/three/SovereignGlobe3D").then((m) => m.SovereignGlobe3D),
  { ssr: false }
);

const ColdChainMarine3D = dynamic(
  () => import("@/components/three/ColdChainMarine3D").then((m) => m.ColdChainMarine3D),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      {/* 01 — Cinematic Hero: High-Visibility 4K Video (Clean, Zero Text Overlay) */}
      <CinematicHeroVideo />

      {/* 02 — Interactive 3D Container Zigzag Traversal & Transforming Expedition Across Half Homepage */}
      <ContainerVoyageExperience />

      {/* 03 — Interactive 3D WebGL Globe: Sovereign Maritime Shipping Arcs from India to Global Seaports */}
      <SovereignGlobe3D />

      {/* 04 — Smooth Moving 3D Commodity Cards: Continuous Gliding Marquee with Technical Specs & Quote CTAs */}
      <JiloMovingCommodityCards />

      {/* 05 — 3D High-Seas Ocean Freight Simulation: Dynamic Procedural Waves, Pitching Vessel & Reefer Telemetry */}
      <ColdChainMarine3D />

      {/* 06 — Interactive 3D Container Freight & CIF Pricing Matrix (Direct B2B Procurement Lead Engine) */}
      <ReeferFreightCalculator3D />

      {/* 07 — Reference 3D Isometric Diamond Mosaic: Container & Harvest Visual Grid with Floating Glass Action Pills */}
      <JiloPerspectiveMosaic />
    </>
  );
}

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CinematicHeroVideo } from "@/components/media/CinematicHeroVideo";
import { LazyMountOnScroll } from "@/components/motion/LazyMountOnScroll";
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
      {/* 01 — Cinematic Hero: Fullscreen 4K Video with Bottom Down-Arrow Navigation */}
      <CinematicHeroVideo />

      {/* 02 — Interactive 3D WebGL Globe: Loads only when user scrolls to this section */}
      <LazyMountOnScroll minHeight="650px" rootMargin="150px 0px 150px 0px">
        <SovereignGlobe3D />
      </LazyMountOnScroll>

      {/* 03 — Smooth Moving Commodity Cards: Loads and glides only when scrolled into view */}
      <LazyMountOnScroll minHeight="520px" rootMargin="150px 0px 150px 0px">
        <JiloMovingCommodityCards />
      </LazyMountOnScroll>

      {/* 04 — Sovereign Agro-Export Mosaic Gallery: Mounts only when scrolled into view */}
      <LazyMountOnScroll minHeight="600px" rootMargin="150px 0px 150px 0px">
        <JiloPerspectiveMosaic />
      </LazyMountOnScroll>
    </>
  );
}

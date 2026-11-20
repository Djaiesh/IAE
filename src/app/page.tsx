"use client";

import React, { useRef } from "react";
import { ShipScrollAnimation } from "@/components/motion/ShipScrollAnimation";
import { UnitedGlobeSection } from "@/components/sections/UnitedGlobeSection";
import { JiloMovingCommodityCards } from "@/components/sections/JiloMovingCommodityCards";
import { QualityTrustSection } from "@/components/sections/QualityTrustSection";
import { JiloPerspectiveMosaic } from "@/components/sections/JiloPerspectiveMosaic";

export default function HomePage() {
  const nextSectionRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* 01 — Scroll-Driven Ship Sequence Hero with Seamless Next Section Transition */}
      <ShipScrollAnimation nextSectionRef={nextSectionRef} />

      {/* 02 — 3D Global Logistics Globe with Industrial Typography (Matching Reference) */}
      <UnitedGlobeSection ref={nextSectionRef} />

      {/* 03 — Continuous Smooth Moving Commodity Exhibition with Dynamic Per-Item Quotes */}
      <JiloMovingCommodityCards />

      {/* 04 — Scientific Quality Standards & Accreditations (HPLC, MRL, Reefer Telemetry) */}
      <QualityTrustSection />

      {/* 05 — Sovereign Agro-Export Mosaic Gallery (Directly above footer, matching Image 1) */}
      <JiloPerspectiveMosaic />
    </>
  );
}

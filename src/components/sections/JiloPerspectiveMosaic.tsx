"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";

interface MosaicTile {
  id: string;
  image: string;
  title: string;
  category: string;
}

const MOSAIC_TILES_ROW1: MosaicTile[] = [
  { id: "tile-1", image: "/images/jilo-container-port-sunset.jpg", title: "Container Port Terminal", category: "Logistics" },
  { id: "tile-2", image: "/images/luxury-spices-curcumin.jpg", title: "High-Curcumin Turmeric", category: "Spices" },
  { id: "tile-3", image: "/images/jilo-farmgate-harvest.jpg", title: "Western Ghats Harvest", category: "Origin" },
  { id: "tile-4", image: "/images/container-stage-3-crane.jpg", title: "Gantry Crane Stacking", category: "Maritime" },
  { id: "tile-5", image: "/images/jilo-turmeric-sorting.jpg", title: "Optical Sorting Packhouse", category: "Quality" },
  { id: "tile-6", image: "/images/luxury-fresh-produce.jpg", title: "Hydro-Cooled Red Onions", category: "Vegetables" },
  { id: "tile-7", image: "/images/luxury-ocean-vessel.jpg", title: "Trans-Oceanic Freight", category: "Sea Freight" },
  { id: "tile-8", image: "/images/luxury-exotic-fruits.jpg", title: "GI Ratnagiri Alphonso", category: "Fruits" },
];

const MOSAIC_TILES_ROW2: MosaicTile[] = [
  { id: "tile-9", image: "/images/jilo-reefer-vessel-open-ocean.jpg", title: "Midnight Ocean Voyage", category: "Cold Chain" },
  { id: "tile-10", image: "/images/container-stage-2-sealed.jpg", title: "NPPO Phytosanitary Seals", category: "Compliance" },
  { id: "tile-11", image: "/images/container-stage-4-vessel.jpg", title: "Liner Vessel Departure", category: "Berths" },
  { id: "tile-12", image: "/images/container-stage-1-open.jpg", title: "CA Reefer Loading", category: "Equipment" },
  { id: "tile-13", image: "/images/agro-export-gallery-mosaic.jpg", title: "Commercial Produce Packing", category: "Packhouse" },
  { id: "tile-14", image: "/images/jilo-ocean-bg.jpg", title: "Indian Ocean Deep Lane", category: "Logistics" },
  { id: "tile-15", image: "/images/luxury-spices-curcumin.jpg", title: "HPLC Laboratory Assay", category: "Testing" },
  { id: "tile-16", image: "/images/jilo-farmgate-harvest.jpg", title: "Export Grade Harvest", category: "Agriculture" },
];

export function JiloPerspectiveMosaic() {
  const [isTenderOpen, setIsTenderOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello JILO Agro-Exports Trade Desk, I am looking to procure export agricultural commodities and verify current shipping schedules."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section className="relative py-24 sm:py-32 bg-transparent overflow-hidden font-sans border-t border-b border-white/15">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0284C7]/15 blur-[140px] pointer-events-none rounded-full" />

      {/* ── Section Header ── */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-12 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#082247]/80 border border-[#E6C687]/50 backdrop-blur-xl mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#E6C687]">
            Visual Cargo Provenance
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
          Sovereign Agro-Export Mosaic
        </h2>
        <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-3 font-light leading-relaxed">
          An unbroken visual timeline spanning Western Ghats harvest co-operatives, optical packhouse sorting, containerized reefer stowage, and global berth departures.
        </p>
      </div>

      {/* ── Panoramic Visual Exhibition Tilted Grid (Matching Reference Angle) ── */}
      <div className="relative w-full overflow-hidden py-12 -my-6">
        
        {/* Tilted Diagonal Container */}
        <div
          className="flex flex-col gap-4 sm:gap-6 w-[130%] -ml-[15%] will-change-transform"
          style={{ transform: "rotate(-12deg) scale(1.12)" }}
        >
          {/* Row 1: Forward Gliding Gallery Track */}
          <div className="flex gap-4 sm:gap-6 w-max animate-glide hover:[animation-play-state:paused]">
            {[...MOSAIC_TILES_ROW1, ...MOSAIC_TILES_ROW1].map((tile, i) => (
              <div
                key={`r1-${tile.id}-${i}`}
                className="group relative w-56 sm:w-68 lg:w-76 h-36 sm:h-44 lg:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#0E3C7A]/80 shadow-2xl transition-all duration-500 hover:border-[#38BDF8] hover:scale-[1.04] shrink-0 cursor-pointer"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 640px) 240px, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.9] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#E6C687] block truncate">
                    {tile.category}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block truncate leading-tight mt-0.5">
                    {tile.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Reverse Gliding Gallery Track */}
          <div
            className="flex gap-4 sm:gap-6 w-max hover:[animation-play-state:paused]"
            style={{
              animation: "glideAnimation 42s linear infinite reverse",
            }}
          >
            {[...MOSAIC_TILES_ROW2, ...MOSAIC_TILES_ROW2].map((tile, i) => (
              <div
                key={`r2-${tile.id}-${i}`}
                className="group relative w-56 sm:w-68 lg:w-76 h-36 sm:h-44 lg:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#0E3C7A]/80 shadow-2xl transition-all duration-500 hover:border-[#38BDF8] hover:scale-[1.04] shrink-0 cursor-pointer"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 640px) 240px, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.9] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-300 block truncate">
                    {tile.category}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block truncate leading-tight mt-0.5">
                    {tile.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Forward Gliding Gallery Track for Deep Perspective */}
          <div
            className="flex gap-4 sm:gap-6 w-max hover:[animation-play-state:paused]"
            style={{
              animation: "glideAnimation 38s linear infinite",
            }}
          >
            {[...MOSAIC_TILES_ROW1, ...MOSAIC_TILES_ROW2].map((tile, i) => (
              <div
                key={`r3-${tile.id}-${i}`}
                className="group relative w-56 sm:w-68 lg:w-76 h-36 sm:h-44 lg:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-[#0E3C7A]/80 shadow-2xl transition-all duration-500 hover:border-[#38BDF8] hover:scale-[1.04] shrink-0 cursor-pointer"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 640px) 240px, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.9] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#E6C687] block truncate">
                    {tile.category}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white block truncate leading-tight mt-0.5">
                    {tile.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Seamless Multi-Layer Edge Vignettes (Melts cleanly into footer) ── */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0A3266] via-[#0A3266]/70 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0A3266] via-[#0A3266]/90 to-transparent pointer-events-none z-10" />
        <div className="absolute left-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-r from-[#0A3266] via-[#0A3266]/70 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-l from-[#0A3266] via-[#0A3266]/70 to-transparent pointer-events-none z-10" />

        {/* ── Floating Center Frosted Call to Actions (Level Upright, Matching Image 1) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 z-20 pointer-events-none p-4">
          <Link
            href="/products"
            className="pointer-events-auto px-8 py-3.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_15px_40px_rgba(2,132,199,0.45)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>EXPLORE COMMODITIES</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="pointer-events-auto px-8 py-3.5 rounded-full bg-[#072248]/90 hover:bg-[#072248] backdrop-blur-2xl border border-white/25 hover:border-[#E6C687]/70 text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#E6C687]" />
            <span>CHAT WITH US</span>
          </button>
        </div>

      </div>

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </section>
  );
}

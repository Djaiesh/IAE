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
  subtitle: string;
  category: string;
}

const MOSAIC_TILES: MosaicTile[] = [
  // Row 1
  {
    id: "tile-1",
    image: "/images/jilo-container-port-sunset.jpg",
    title: "Container Port Terminal",
    subtitle: "JNPT Harbor Berth",
    category: "Logistics",
  },
  {
    id: "tile-2",
    image: "/images/luxury-spices-curcumin.jpg",
    title: "High-Curcumin Turmeric",
    subtitle: "5.0%+ Bioactive Grade",
    category: "Spices",
  },
  {
    id: "tile-3",
    image: "/images/jilo-farmgate-harvest.jpg",
    title: "Western Ghats Provenance",
    subtitle: "Organic Farmgate Sourcing",
    category: "Origin",
  },
  {
    id: "tile-4",
    image: "/images/container-stage-3-crane.jpg",
    title: "Gantry Crane Stacking",
    subtitle: "40ft Heavy FCL Stowage",
    category: "Maritime",
  },

  // Row 2
  {
    id: "tile-5",
    image: "/images/luxury-fresh-produce.jpg",
    title: "Hydro-Cooled Red Onions",
    subtitle: "Nashik Export Zone 55mm+",
    category: "Vegetables",
  },
  {
    id: "tile-6",
    image: "/images/jilo-turmeric-sorting.jpg",
    title: "Laser Optical Sorting",
    subtitle: "ISO 17025 Packhouse Hub",
    category: "Quality",
  },
  {
    id: "tile-7",
    image: "/images/luxury-ocean-vessel.jpg",
    title: "Trans-Oceanic Freight",
    subtitle: "Scheduled Liner Service",
    category: "Sea Freight",
  },
  {
    id: "tile-8",
    image: "/images/luxury-exotic-fruits.jpg",
    title: "GI Ratnagiri Alphonso",
    subtitle: "Hot Water Treated Mangoes",
    category: "Fruits",
  },

  // Row 3
  {
    id: "tile-9",
    image: "/images/jilo-reefer-vessel-open-ocean.jpg",
    title: "Midnight Ocean Voyage",
    subtitle: "Continuous Cold-Chain Telemetry",
    category: "Cold Chain",
  },
  {
    id: "tile-10",
    image: "/images/container-stage-2-sealed.jpg",
    title: "Quarantine Port Clearance",
    subtitle: "NPPO Phytosanitary Seals",
    category: "Compliance",
  },
  {
    id: "tile-11",
    image: "/images/container-stage-4-vessel.jpg",
    title: "Liner Vessel Departure",
    subtitle: "Mundra to Rotterdam / Jebel Ali",
    category: "Berths",
  },
  {
    id: "tile-12",
    image: "/images/container-stage-1-open.jpg",
    title: "Controlled Atmosphere Reefer",
    subtitle: "-0.5°C to +14°C Air Scrubbing",
    category: "Equipment",
  },
];

export function JiloPerspectiveMosaic() {
  const [isTenderOpen, setIsTenderOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello JILO Agro-Exports, I am an international buyer interested in container availability and current spot CIF rates."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section className="relative bg-black pt-16 pb-0 overflow-hidden">
      {/* ── Section Header ── */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E6C687]/30 backdrop-blur-xl mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
          <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#E6C687]">
            Visual Cargo Provenance
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight">
          Sovereign Agro-Export Mosaic
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-3 font-light">
          An unbroken visual timeline spanning accredited Western Ghats harvest co-operatives, optical packhouse sorting, containerized reefer stowage, and global berth departures.
        </p>
      </div>

      {/* ── 3D Isometric Diamond Perspective Viewport ── */}
      <div className="relative w-full h-[620px] sm:h-[750px] lg:h-[860px] perspective-stage overflow-hidden flex items-center justify-center">
        {/* Tilted Perspective Plane */}
        <div className="isometric-plane grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 w-[1200px] sm:w-[1500px] lg:w-[1750px]">
          {MOSAIC_TILES.map((tile) => (
            <div
              key={tile.id}
              className="isometric-card group relative h-48 sm:h-64 lg:h-72 rounded-3xl overflow-hidden border border-white/15 bg-[#08080C] shadow-2xl cursor-pointer"
            >
              {/* Tile Image */}
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 300px, 450px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Ambient Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/70" />

              {/* Card Meta Content */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest font-semibold px-2 py-0.5 rounded-full bg-black/60 border border-white/15 text-[#E6C687] backdrop-blur-md inline-block mb-1.5">
                  {tile.category}
                </span>
                <h4 className="font-display text-sm sm:text-base text-white font-medium truncate group-hover:text-[#E6C687] transition-colors">
                  {tile.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-300 font-light truncate">
                  {tile.subtitle}
                </p>
              </div>

              {/* Specular Edge Sheen on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E6C687]/60 rounded-3xl transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* ── Central Floating Glass Action Pills (Exactly like Reference Image) ── */}
        <div className="absolute z-30 flex flex-col items-center gap-3.5 pointer-events-auto">
          {/* Button 1: Warm Amber / Gold Glow Pill */}
          <Link
            href="/products"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8C5E28] via-[#B8863A] to-[#6A461E] hover:from-[#A26D2F] hover:to-[#7E5325] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-2xl border border-[#DFC08A]/40 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore Commodities</span>
            <ArrowRight className="w-4 h-4 text-[#F4E2BB]" />
          </Link>

          {/* Button 2: Smoked Frosted Glass Pill */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-black/70 hover:bg-black/90 text-slate-200 hover:text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-2xl border border-white/20 backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat With Us</span>
          </button>
        </div>

        {/* ── Bottom Gradient Mask to Pitch Black Footer ── */}
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
      </div>

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </section>
  );
}

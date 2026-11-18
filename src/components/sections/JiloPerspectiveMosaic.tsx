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

const MOSAIC_TILES: MosaicTile[] = [
  // Row 1 (6 items)
  {
    id: "tile-1",
    image: "/images/jilo-container-port-sunset.jpg",
    title: "Container Port Terminal",
    category: "Logistics",
  },
  {
    id: "tile-2",
    image: "/images/luxury-spices-curcumin.jpg",
    title: "High-Curcumin Turmeric",
    category: "Spices",
  },
  {
    id: "tile-3",
    image: "/images/jilo-farmgate-harvest.jpg",
    title: "Western Ghats Harvest",
    category: "Origin",
  },
  {
    id: "tile-4",
    image: "/images/container-stage-3-crane.jpg",
    title: "Gantry Crane Stacking",
    category: "Maritime",
  },
  {
    id: "tile-5",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    title: "Tellicherry Black Pepper",
    category: "Spices",
  },
  {
    id: "tile-6",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
    title: "Guntur S4 Red Chilli",
    category: "Spices",
  },

  // Row 2 (6 items)
  {
    id: "tile-7",
    image: "/images/luxury-fresh-produce.jpg",
    title: "Nashik Export Red Onions",
    category: "Vegetables",
  },
  {
    id: "tile-8",
    image: "/images/jilo-turmeric-sorting.jpg",
    title: "Optical Sorting Packhouse",
    category: "Quality",
  },
  {
    id: "tile-9",
    image: "/images/luxury-ocean-vessel.jpg",
    title: "Trans-Oceanic Freight",
    category: "Sea Freight",
  },
  {
    id: "tile-10",
    image: "/images/luxury-exotic-fruits.jpg",
    title: "GI Ratnagiri Alphonso",
    category: "Fruits",
  },
  {
    id: "tile-11",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    title: "Cavendish Fresh Bananas",
    category: "Fruits",
  },
  {
    id: "tile-12",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    title: "Fresh Horticulture Carrots",
    category: "Vegetables",
  },

  // Row 3 (6 items)
  {
    id: "tile-13",
    image: "/images/jilo-reefer-vessel-open-ocean.jpg",
    title: "Midnight Ocean Voyage",
    category: "Cold Chain",
  },
  {
    id: "tile-14",
    image: "/images/container-stage-2-sealed.jpg",
    title: "NPPO Phytosanitary Seals",
    category: "Compliance",
  },
  {
    id: "tile-15",
    image: "/images/container-stage-4-vessel.jpg",
    title: "Liner Vessel Departure",
    category: "Berths",
  },
  {
    id: "tile-16",
    image: "/images/container-stage-1-open.jpg",
    title: "CA Reefer Loading",
    category: "Equipment",
  },
  {
    id: "tile-17",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=600&q=80",
    title: "Bhagwa Pomegranates",
    category: "Fruits",
  },
  {
    id: "tile-18",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    title: "Green Cardamom Extra Bold",
    category: "Spices",
  },

  // Row 4 (6 items)
  {
    id: "tile-19",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    title: "High-Seas Cargo Line",
    category: "Maritime",
  },
  {
    id: "tile-20",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    title: "Export Terminal Warehouse",
    category: "Storage",
  },
  {
    id: "tile-21",
    image: "/images/jilo-container-port-sunset.jpg",
    title: "JNPT Harbor Berth",
    category: "Gateways",
  },
  {
    id: "tile-22",
    image: "/images/luxury-spices-curcumin.jpg",
    title: "HPLC Assayed Spices",
    category: "Laboratory",
  },
  {
    id: "tile-23",
    image: "/images/luxury-fresh-produce.jpg",
    title: "Hydro-Cooled Calibers",
    category: "Vegetables",
  },
  {
    id: "tile-24",
    image: "/images/luxury-ocean-vessel.jpg",
    title: "Direct Liner to Rotterdam",
    category: "Discharge",
  },
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
    <section className="relative bg-black pt-16 pb-0 overflow-hidden font-sans">
      {/* ── Section Header ── */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E6C687]/30 backdrop-blur-xl mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
          <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#E6C687]">
            Visual Cargo Provenance
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight">
          Sovereign Agro-Export Mosaic
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2.5 font-light">
          An unbroken visual timeline spanning Western Ghats harvest co-operatives, optical packhouse sorting, containerized reefer stowage, and global berth departures.
        </p>
      </div>

      {/* ── 3D Isometric Diamond Perspective Viewport ── */}
      <div className="relative w-full h-[620px] sm:h-[720px] lg:h-[820px] perspective-stage overflow-hidden flex items-center justify-center">
        {/* Tilted Perspective Plane: Compact Cards & High-Density Grid */}
        <div className="isometric-plane grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 w-[1300px] sm:w-[1700px] lg:w-[2100px]">
          {MOSAIC_TILES.map((tile) => (
            <div
              key={tile.id}
              className="isometric-card group relative h-28 sm:h-36 lg:h-44 rounded-2xl overflow-hidden border border-white/10 bg-[#08080C] shadow-2xl transition-all duration-300 hover:border-[#E6C687]/70 hover:scale-[1.04] hover:shadow-[0_15px_30px_rgba(230,198,135,0.2)] cursor-pointer"
            >
              {/* Tile Image */}
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 640px) 200px, 320px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.92] group-hover:brightness-105"
              />

              {/* Liquid Smoked Glass Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Tile Micro Badge on Hover */}
              <div className="absolute bottom-2 left-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#E6C687] block truncate">
                  {tile.category}
                </span>
                <span className="text-xs font-semibold text-white block truncate leading-tight">
                  {tile.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Floating Frosted Glass Action Pills (Exact Match to Reference Design) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 z-30 pointer-events-auto">
          {/* Button 1: Warm Amber Frosted Glass Pill */}
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#8C5E28]/85 via-[#B88741]/85 to-[#8C5E28]/85 backdrop-blur-2xl border border-[#E6C687]/50 text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-widest hover:brightness-110 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(230,198,135,0.3)] flex items-center gap-2.5 cursor-pointer hover:scale-105"
          >
            <span>EXPLORE COMMODITIES</span>
            <ArrowRight className="w-4 h-4 text-[#F4E2BB]" />
          </Link>

          {/* Button 2: Deep Dark Frosted Glass Pill */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="px-8 py-3.5 rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/20 hover:border-[#E6C687]/60 text-slate-200 hover:text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 shadow-2xl flex items-center gap-2.5 cursor-pointer hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 text-[#E6C687]" />
            <span>CHAT WITH TRADE DESK</span>
          </button>
        </div>

        {/* Top & Bottom Vignette for seamless blend into pure black */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
      </div>

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </section>
  );
}

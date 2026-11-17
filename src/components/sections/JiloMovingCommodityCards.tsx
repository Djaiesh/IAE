"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Check } from "lucide-react";
import { ProcurementTenderModal, TenderPreFill } from "@/components/leads/ProcurementTenderModal";

interface CardCommodity {
  id: string;
  name: string;
  category: string;
  grade: string;
  spec: string;
  packaging: string;
  image: string;
  moq: string;
}

const CARDS_DATA: CardCommodity[] = [
  {
    id: "card-turmeric",
    name: "Alleppey Finger Turmeric",
    category: "Spices",
    grade: "Premium Export Grade · Polished",
    spec: "Curcumin 5.0%+ (HPLC Assayed)",
    packaging: "25kg / 50kg Multi-Wall PP / Jute",
    image: "/images/luxury-spices-curcumin.jpg",
    moq: "1 x 20ft FCL (19 MT)",
  },
  {
    id: "card-pepper",
    name: "Malabar Bold Black Pepper",
    category: "Spices",
    grade: "TGSEB Extra Bold · Bulk Density 570g/L",
    spec: "Piperine >= 4.5% · Moisture <11%",
    packaging: "25kg High-Barrier Nitrogen Vacuum Sacks",
    image: "/images/jilo-turmeric-sorting.jpg",
    moq: "1 x 20ft FCL (16 MT)",
  },
  {
    id: "card-onions",
    name: "Nashik Fresh Red Onions",
    category: "Vegetables",
    grade: "55mm+ Caliber · Hydro-Cooled",
    spec: "Pre-Cooled <3h from Harvest",
    packaging: "10kg / 25kg Leno Ventilated Mesh",
    image: "/images/luxury-fresh-produce.jpg",
    moq: "1 x 40ft Reefer (29 MT)",
  },
  {
    id: "card-mangoes",
    name: "Ratnagiri Alphonso Mangoes",
    category: "Fruits",
    grade: "GI-Tagged · Hot Water / VHT Treated",
    spec: "Brix 17°–19° · Zero Chemical MRL",
    packaging: "3kg / 12-Piece Telescopic Export Cartons",
    image: "/images/luxury-exotic-fruits.jpg",
    moq: "Air Freight Pallets / Reefer",
  },
  {
    id: "card-chillies",
    name: "G4 Fresh Green Chillies",
    category: "Vegetables",
    grade: "Export Fresh Stem-On · Class AAA",
    spec: "Controlled Atmosphere (+7°C)",
    packaging: "4.5kg Corrugated Perforated Boxes",
    image: "/images/jilo-farmgate-harvest.jpg",
    moq: "1 x 40ft Reefer (18 MT)",
  },
  {
    id: "card-sea-freight",
    name: "Scheduled Reefer Freight",
    category: "Logistics",
    grade: "Mundra & JNPT Direct Liners",
    spec: "Continuous Satellite GPS & Pulp Telemetry",
    packaging: "20ft FCL / 40ft High Cube CA Reefer",
    image: "/images/jilo-container-port-sunset.jpg",
    moq: "Direct Port Gate Allocation",
  },
];

export function JiloMovingCommodityCards() {
  const [isTenderOpen, setIsTenderOpen] = useState(false);
  const [preFill, setPreFill] = useState<TenderPreFill | undefined>(undefined);

  const handleOpenQuote = (item: CardCommodity) => {
    setPreFill({
      commodity: `${item.name} (${item.spec})`,
      volume: item.moq,
    });
    setIsTenderOpen(true);
  };

  // Duplicate items for continuous seamless gliding marquee
  const marqueeItems = [...CARDS_DATA, ...CARDS_DATA];

  return (
    <section className="relative z-10 py-20 bg-black overflow-hidden border-t border-b border-white/10">
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#E6C687]/30 text-[#E6C687] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Smooth Continuous Moving Exhibition
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
              Export Calibrated Commodities
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl font-light">
              Certified single-origin spices, hydro-cooled vegetables, and GI-tagged tropical fruits. Hover over any commodity to pause and inspect technical parameters.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View All Commodities</span>
            <ArrowRight className="w-4 h-4 text-[#E6C687]" />
          </Link>
        </div>
      </div>

      {/* ── Continuous Smooth Gliding Marquee Container ── */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right subtle edge fade */}
        <div className="absolute left-0 inset-y-0 w-20 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Gliding Cards Track */}
        <div className="flex gap-6 w-max animate-glide group-hover:[animation-play-state:paused] py-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="relative w-72 sm:w-80 h-[440px] rounded-3xl overflow-hidden bg-[#07070B] border border-white/10 shadow-2xl flex flex-col justify-between shrink-0 transition-all duration-300 hover:scale-[1.02] hover:border-[#E6C687]/50 hover:shadow-[#E6C687]/15 group/card"
            >
              {/* Photo Frame */}
              <div className="relative h-52 w-full overflow-hidden bg-[#0A0A10]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-transparent to-black/30" />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-[#E6C687] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg text-white font-medium group-hover/card:text-[#E6C687] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.spec}</span>
                  </div>
                  <p className="text-slate-400 text-xs font-light mt-2 line-clamp-2">
                    {item.grade}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 mt-3 space-y-2 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Packaging:</span>
                    <span className="text-slate-200 truncate max-w-[170px]">{item.packaging.split("·")[0]}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>MOQ:</span>
                    <span className="text-[#E6C687] font-bold">{item.moq}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 mt-3 border-t border-white/10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenQuote(item)}
                    className="w-full py-2.5 rounded-full bg-white/5 hover:bg-[#E6C687] hover:text-black border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
        preFill={preFill}
      />
    </section>
  );
}

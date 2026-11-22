"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
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
    packaging: "25kg Double Food-Grade PP Bags",
    image: "/images/products/alleppey-finger-turmeric.jpg",
    moq: "1 x 20ft FCL (19 MT)",
  },
  {
    id: "card-pepper",
    name: "Malabar Bold Black Pepper",
    category: "Spices",
    grade: "TGSEB Extra Bold · Bulk Density 570g/L",
    spec: "Piperine >= 4.5% · Moisture <11%",
    packaging: "25kg High-Barrier Nitrogen Vacuum Sacks",
    image: "/images/products/tellicherry-black-pepper.jpg",
    moq: "1 x 20ft FCL (16 MT)",
  },
  {
    id: "card-onions",
    name: "Nashik Fresh Red Onions",
    category: "Vegetables",
    grade: "55mm+ Caliber · Hydro-Cooled",
    spec: "Pre-Cooled <3h from Harvest",
    packaging: "10kg Pre-Cooled Ventilated Corrugated Cartons",
    image: "/images/products/nashik-red-onion.jpg",
    moq: "1 x 40ft Reefer (29 MT)",
  },
  {
    id: "card-mangoes",
    name: "Ratnagiri Alphonso Mangoes",
    category: "Fruits",
    grade: "GI-Tagged · Hot Water / VHT Treated",
    spec: "Brix 17°–19° · Zero Chemical MRL",
    packaging: "3kg / 12-Piece Telescopic Export Cartons",
    image: "/images/products/ratnagiri-alphonso-mango.jpg",
    moq: "Air Freight Pallets / Reefer",
  },
  {
    id: "card-chillies",
    name: "G4 Fresh Green Chillies",
    category: "Vegetables",
    grade: "Export Fresh Stem-On · Class AAA",
    spec: "Controlled Atmosphere (+7°C)",
    packaging: "4.5kg Corrugated Perforated Boxes",
    image: "/images/products/g4-green-chilli.jpg",
    moq: "1 x 40ft Reefer (18 MT)",
  },
  {
    id: "card-pomegranate",
    name: "Bhagwa Deep Red Pomegranates",
    category: "Fruits",
    grade: "Grade Super A · Soft Seeded",
    spec: "Brix 15.5°+ · High Antioxidants",
    packaging: "3.5kg / 4kg Master Cartons",
    image: "/images/products/bhagwa-pomegranate.jpg",
    moq: "1 x 40ft Reefer (15 MT)",
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
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleOpenQuote = (e: React.MouseEvent, item: CardCommodity) => {
    e.stopPropagation();
    // Send exact commodity name, category, packaging, and volume so new form is pre-selected
    setPreFill({
      commodity: `${item.name} (${item.spec})`,
      category: item.category,
      packaging: item.packaging,
      volume: item.moq,
    });
    setIsTenderOpen(true);
  };

  // Duplicate items for continuous seamless gliding marquee
  const marqueeItems = [...CARDS_DATA, ...CARDS_DATA];

  return (
    <section className="relative z-10 py-24 bg-transparent overflow-hidden border-t border-b border-white/15">
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#082247]/80 border border-[#E6C687]/50 text-[#E6C687] text-xs font-semibold uppercase tracking-widest mb-3 font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              Continuous Export Marquee
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
              Export Calibrated Commodities
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-2 max-w-xl font-light font-sans">
              Single-origin spices, hydro-cooled vegetables, and GI-tagged tropical fruits. Click &quot;Instant Quote&quot; on any commodity to configure procurement tenders with automated specifications.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider transition-colors self-start md:self-auto cursor-pointer font-sans"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 text-[#E6C687]" />
          </Link>
        </div>
      </div>

      {/* ── Continuous Smooth Gliding Marquee Container ── */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right subtle edge fade matching the bright corporate blue */}
        <div className="absolute left-0 inset-y-0 w-20 sm:w-32 bg-gradient-to-r from-[#0A3266] via-[#0A3266]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 sm:w-32 bg-gradient-to-l from-[#0A3266] via-[#0A3266]/70 to-transparent z-10 pointer-events-none" />

        {/* Gliding Cards Track with generous vertical padding for large scale hover */}
        <div className="flex gap-7 w-max animate-glide group-hover:[animation-play-state:paused] py-8 px-6">
          {marqueeItems.map((item, idx) => {
            const isSelected = activeCardId === `${item.id}-${idx}`;

            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setActiveCardId(isSelected ? null : `${item.id}-${idx}`)}
                className={`relative w-64 sm:w-80 h-[430px] sm:h-[440px] rounded-3xl overflow-hidden bg-[#0E3C7A]/85 backdrop-blur-xl shadow-2xl flex flex-col justify-between shrink-0 transition-all duration-300 cursor-pointer group/card font-sans ${
                  isSelected
                    ? "scale-105 sm:scale-110 -translate-y-3 sm:-translate-y-4 z-30 border-2 border-[#E6C687] shadow-[0_25px_60px_rgba(230,198,135,0.35)]"
                    : "border border-white/20 hover:scale-105 sm:hover:scale-110 hover:-translate-y-3 sm:hover:-translate-y-4 hover:z-30 hover:border-[#38BDF8] hover:shadow-[0_25px_60px_rgba(56,189,248,0.3)]"
                }`}
              >
                {/* Photo Frame */}
                <div className="relative h-52 w-full overflow-hidden bg-[#0B2E5E]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3C7A] via-transparent to-black/20" />

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[10px] font-sans uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#082247]/90 border border-white/20 text-[#E6C687] backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans text-base sm:text-lg text-white font-bold group-hover/card:text-[#E6C687] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <div className="text-[11px] font-sans text-emerald-300 mt-1 flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.spec}</span>
                    </div>
                    <p className="text-slate-200 text-xs font-normal mt-2 line-clamp-2">
                      {item.grade}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/15 mt-3 space-y-1.5 text-[11px] font-sans">
                    <div className="flex justify-between text-slate-300">
                      <span>Packaging:</span>
                      <span className="text-white truncate max-w-[170px]">{item.packaging}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Target MOQ:</span>
                      <span className="text-[#E6C687] font-bold">{item.moq}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-3 mt-3 border-t border-white/15 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleOpenQuote(e, item)}
                      className="w-full py-2.5 rounded-full bg-white/10 hover:bg-[#0284C7] hover:border-[#0284C7] hover:text-white border border-white/25 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Instant Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

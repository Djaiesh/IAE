"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Award, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  provenance: string;
  image: string;
  headline: string;
  specs: string[];
  link: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "spices",
    title: "Alleppey Turmeric & Tellicherry Pepper",
    category: "Bio-Active Spices",
    provenance: "Western Ghats Collectives · Kerala & Karnataka",
    image: "/images/luxury-spices-curcumin.jpg",
    headline: "Up to 5.5% Curcumin & TGSEB Extra Bold Caliber",
    specs: ["HPLC Purity Certified", "Moisture < 10%", "24-Month Stability"],
    link: "/products/spices",
  },
  {
    id: "produce",
    title: "Nasik Red Onions & G4 Chillies",
    category: "Fresh Horticulture",
    provenance: "Deccan Plateau Agro Hub · Maharashtra",
    image: "/images/luxury-fresh-produce.jpg",
    headline: "Pre-Cooled Within 3 Hours of Farmgate Harvest",
    specs: ["45–60mm Export Caliber", "Zero Pesticide MRL", "Micro-Vented Boxes"],
    link: "/products/vegetables",
  },
  {
    id: "fruits",
    title: "Ratnagiri Alphonso & Bhagwa Pomegranates",
    category: "GI-Tagged Orchards",
    provenance: "Coastal Konkan Belt & Maharashtra Orchards",
    image: "/images/luxury-exotic-fruits.jpg",
    headline: "Physiological Maturity with 16°–19° Brix Sweetness",
    specs: ["Global-GAP Certified", "Hot Water Treated", "Nitrogen Reefer CA"],
    link: "/products/fruits",
  },
  {
    id: "vessel",
    title: "High-Seas Cold-Chain Fleet",
    category: "Ocean Freight Transit",
    provenance: "West Coast Terminal Berths (JNPT & Mundra)",
    image: "/images/luxury-ocean-vessel.jpg",
    headline: "Unbroken -25°C to +14°C Marine Reefer Sea Lanes",
    specs: ["440V Ship Power Coupled", "15-Min GPS Satellite Logs", "Direct Liner Sailings"],
    link: "/export-process",
  },
];

export function LuxuryVisualExhibition() {
  const [activeItem, setActiveItem] = useState(GALLERY_ITEMS[0]);

  return (
    <section className="relative py-28 sm:py-36 bg-navy overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-abyss to-navy pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16" data-reveal="up">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-saffron/40 bg-deep/80 backdrop-blur-xl mb-4 shadow-glow">
              <Award className="w-3.5 h-3.5 text-saffron" />
              <span className="eyebrow text-[10px] text-saffron tracking-widest font-semibold">
                Sovereign Visual Archive · Luxury Still Life
              </span>
            </div>

            <h2 className="section-title text-cream">
              Precision Cultivation,
              <span className="text-saffron italic font-normal block mt-1">
                Captured at Origin
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed">
              Bespoke high-definition visual documentation of our four operational pillars: active bio-active spices, hydro-cooled fresh produce, GI-tagged royal fruits, and deep-ocean reefer container transport.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 py-3.5 px-6 rounded-full glass hover:border-saffron text-cream text-xs uppercase tracking-wider font-semibold transition-all"
            >
              <span>Explore All 20+ Commodities</span>
              <ArrowRight className="w-4 h-4 text-saffron" />
            </Link>
          </div>
        </div>

        {/* ── 4-CARD 3D TILT GALLERY GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-stagger>
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-4xl overflow-hidden border border-white/10 bg-abyss/85 backdrop-blur-2xl shadow-float transition-all duration-500 hover:border-saffron/50 hover:shadow-saffron flex flex-col justify-between"
            >
              {/* Image Frame with Zoom on Hover */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />

                {/* Floating Provenance Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-abyss/90 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-saffron-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                  <span>{item.category}</span>
                </div>

                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-deep/90 backdrop-blur-xl border border-white/10 text-[10px] font-sans text-foam/80">
                  {item.provenance}
                </div>
              </div>

              {/* Text & Specs Card Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-2xl text-cream font-normal group-hover:text-saffron-light transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-foam/75 font-light leading-relaxed mb-6">
                    {item.headline}
                  </p>

                  {/* 3 Spec Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-sans px-3 py-1 rounded-full bg-white/5 border border-white/8 text-foam/90 flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3 h-3 text-saffron" />
                        <span>{spec}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-foam/50">
                    FOB &amp; CIF Contract Ready
                  </span>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-saffron hover:text-saffron-light font-bold transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

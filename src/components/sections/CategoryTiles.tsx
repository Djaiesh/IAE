"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORIES, ProductCategory } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";

interface CategoryTilesProps {
  className?: string;
  showHeader?: boolean;
}

export function CategoryTiles({ className, showHeader = true }: CategoryTilesProps) {
  const getCategoryGradient = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "spices":
        return "from-amber-500/25 via-[#0E3C7A]/85 to-[#0A2E5C]/95 border-amber-400/40 group-hover:border-amber-300 group-hover:shadow-[0_20px_50px_rgba(251,191,36,0.25)]";
      case "vegetables":
        return "from-emerald-500/25 via-[#0E3C7A]/85 to-[#0A2E5C]/95 border-emerald-400/40 group-hover:border-emerald-300 group-hover:shadow-[0_20px_50px_rgba(52,211,153,0.25)]";
      case "fruits":
        return "from-rose-500/25 via-[#0E3C7A]/85 to-[#0A2E5C]/95 border-rose-400/40 group-hover:border-rose-300 group-hover:shadow-[0_20px_50px_rgba(244,63,94,0.25)]";
      default:
        return "from-sky-500/25 via-[#0E3C7A]/85 to-[#0A2E5C]/95 border-sky-400/40";
    }
  };

  const getCategoryAccent = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "spices":
        return "text-amber-300";
      case "vegetables":
        return "text-emerald-300";
      case "fruits":
        return "text-rose-300";
      default:
        return "text-saffron";
    }
  };

  return (
    <section className={cn("relative py-24 sm:py-28 overflow-hidden bg-transparent", className)}>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        {showHeader && (
          <div className="mb-12 sm:mb-16" data-reveal="up">
            <div className="flex items-end justify-between gap-6 flex-col sm:flex-row">
              <div>
                <span className="eyebrow block mb-3 text-saffron">
                  Horticultural Portfolios
                </span>
                <h2 className="section-title text-cream max-w-xl">
                  Three Dedicated
                  <span className="text-saffron italic font-normal block mt-1">
                    International Export Lines
                  </span>
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-saffron hover:text-saffron-light transition-colors shrink-0 font-bold min-h-[44px]"
              >
                <span>Explore All Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* CSS Grid 3-column on desktop, 1-column mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-stagger>
          {CATEGORIES.map((cat: ProductCategory) => {
            const count = PRODUCTS.filter(
              (p) => p.category.toLowerCase() === cat.slug.toLowerCase()
            ).length;
            const gradientClasses = getCategoryGradient(cat.slug);
            const accentClass = getCategoryAccent(cat.slug);

            return (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-4xl border min-h-[500px] p-8 sm:p-9",
                  "bg-gradient-to-b shadow-card transition-all duration-300 ease-out",
                  "hover:scale-[1.02] hover:shadow-[0_24px_64px_rgba(4,13,24,0.9)] active:scale-[0.99]",
                  gradientClasses
                )}
              >
                {/* Background Image with subtle blend overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={cat.heroImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover opacity-35 mix-blend-overlay transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                </div>

                {/* Top Section: Eyebrow + Commodity Count Pill + Top Action Icon */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-200 block font-semibold">
                      Dedicated Origin Line
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-bold bg-[#072248]/80 backdrop-blur-md text-white border border-white/20">
                      {count > 0 ? `${count} Active Cultivars` : `${cat.keyCommodities.length} Commodities`}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white group-hover:bg-[#0284C7] group-hover:border-[#0284C7] transition-all duration-300 shrink-0 shadow-md">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom Section: Category Title, Description, Commodity Tags, Explore CTA */}
                <div className="relative z-10 pt-16">
                  <span className={cn("text-xs font-mono tracking-wide uppercase font-semibold block mb-2", accentClass)}>
                    {cat.shortTagline}
                  </span>

                  {/* Large Category Name */}
                  <h3 className="font-display text-3xl sm:text-4xl text-white font-normal tracking-tight mb-3">
                    {cat.name}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-200 font-light line-clamp-2 mb-5 leading-relaxed">
                    {cat.intro}
                  </p>

                  {/* Key Commodity Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cat.keyCommodities.slice(0, 3).map((comm) => (
                      <span
                        key={comm}
                        className="text-[10px] font-sans bg-[#072248]/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white font-medium"
                      >
                        {comm}
                      </span>
                    ))}
                  </div>

                  {/* Explore Link CTA with 44px min touch target */}
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 group-hover:bg-[#0284C7] text-white border border-white/25 group-hover:border-[#0284C7] font-sans text-xs uppercase tracking-wider font-bold transition-all min-h-[44px] shadow-md">
                    <span>Explore {cat.name} →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Package, CalendarDays, Sparkles } from "lucide-react";
import { getFeaturedProducts, ProductItem } from "@/data/products";
import { cn } from "@/lib/utils";

interface FeaturedProductsProps {
  className?: string;
  limit?: number;
  showExploreAll?: boolean;
}

export function FeaturedProducts({
  className,
  limit = 3,
  showExploreAll = true,
}: FeaturedProductsProps) {
  const allFeatured = getFeaturedProducts();
  const spotlightProducts: ProductItem[] = allFeatured.slice(0, limit);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "spices":
        return "bg-amber-950/80 text-amber-300 border-amber-500/40";
      case "vegetables":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-500/40";
      case "fruits":
        return "bg-rose-950/80 text-rose-300 border-rose-500/40";
      default:
        return "bg-black/80 text-[#E50914] border-[#E50914]/40";
    }
  };

  return (
    <section className={cn("relative py-24 sm:py-32 overflow-hidden bg-transparent text-white", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0284C7]/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 sm:mb-16 gap-6 flex-col sm:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D448E]/85 border border-[#FF1E27]/50 text-[#FF1E27] text-xs font-semibold uppercase tracking-widest mb-3 font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              Prime Export Inventory
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight">
              Flagship Export
              <span className="text-[#FF1E27] italic font-light block mt-1">
                Spotlight Selections
              </span>
            </h2>
          </div>
          {showExploreAll && (
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#FF1E27] hover:brightness-125 transition-colors shrink-0 font-bold min-h-[44px]"
            >
              <span>Explore All Commodities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlightProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#124B9E]/85 backdrop-blur-xl rounded-3xl sm:rounded-4xl overflow-hidden flex flex-col border border-white/25 transition-all duration-300 hover:-translate-y-2 hover:border-[#38BDF8] hover:shadow-[0_20px_50px_rgba(56,189,248,0.3)]"
            >
              {/* Product Image Frame */}
              <div className="relative h-64 w-full overflow-hidden bg-[#0D3F82]">
                <Image
                  src={product.image}
                  alt={`${product.name} - ${product.grade || "Export Quality"}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#124B9E] via-transparent to-black/20 pointer-events-none" />

                {/* Category & Status Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span
                    className={cn(
                      "text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md",
                      getCategoryColor(product.category)
                    )}
                  >
                    {product.category}
                  </span>
                  {product.grade && (
                    <span className="text-[10px] font-sans uppercase tracking-wider bg-[#0D448E]/90 text-slate-200 px-2.5 py-1 rounded-full border border-white/25 backdrop-blur-md">
                      {product.grade.split("(")[0].trim()}
                    </span>
                  )}
                </div>

                {/* Quick Quote Floating Link */}
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}&type=quote`}
                  className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-sans uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg min-h-[40px] inline-flex items-center justify-center focus:opacity-100"
                  aria-label={`Quick quote for ${product.name}`}
                >
                  Quick Quote
                </Link>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-white group-hover:text-[#FF1E27] transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-200 font-light line-clamp-2 mb-6 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Specification Snippets */}
                  <div className="space-y-2.5 border-t border-white/10 pt-4 text-xs font-sans">
                    {product.origin && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Origin
                        </span>
                        <span className="text-slate-200 font-medium truncate max-w-[170px]">
                          {product.origin.split(",")[0]}
                        </span>
                      </div>
                    )}
                    {product.moq && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-[#E50914] shrink-0" /> Target MOQ
                        </span>
                        <span className="text-[#E50914] font-medium truncate max-w-[170px]">
                          {product.moq.split("(")[0].trim()}
                        </span>
                      </div>
                    )}
                    {product.storageTemp && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5 text-sky-400 shrink-0" /> Cold Storage
                        </span>
                        <span className="text-slate-300 font-medium truncate max-w-[170px]">
                          {product.storageTemp.split("(")[0].trim()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                  <Link
                    href={`/products/${product.category}/${product.slug}`}
                    className="flex-1 py-3 px-4 min-h-[44px] rounded-full border border-white/15 text-xs font-sans uppercase tracking-wider text-slate-200 text-center font-semibold hover:border-[#E50914] hover:bg-white/5 hover:text-white transition-all flex items-center justify-center"
                  >
                    View Specs
                  </Link>
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}&type=quote`}
                    className="flex-1 py-3 px-4 min-h-[44px] rounded-full bg-gradient-to-r from-[#E50914] to-[#B8000B] hover:brightness-110 text-white text-xs font-sans uppercase tracking-wider text-center font-bold transition-all shadow-[0_4px_20px_rgba(229, 9, 20,0.35)] flex items-center justify-center gap-1.5"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Central Action */}
        {showExploreAll && (
          <div className="mt-14 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-[#E50914] to-[#B8000B] text-white font-sans text-xs uppercase tracking-widest font-bold transition-all shadow-[0_10px_30px_rgba(229, 9, 20,0.4)] hover:scale-105"
            >
              <span>Explore Complete Export Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHeroVideo } from "@/components/media/PageHeroVideo";
import { CategoryTiles } from "@/components/sections/CategoryTiles";
import { PRODUCTS, ProductItem } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { Search, ArrowRight, Globe, Package, CalendarDays, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.origin && product.origin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.grade && product.grade.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "spices":
        return "bg-amber-950/80 text-amber-300 border-amber-500/40";
      case "vegetables":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-500/40";
      case "fruits":
        return "bg-rose-950/80 text-rose-300 border-rose-500/40";
      default:
        return "bg-abyss/85 text-saffron border-saffron/30";
    }
  };

  return (
    <div className="bg-navy text-cream min-h-screen">
      {/* 1. Cinematic Dedicated Page Hero Video */}
      <PageHeroVideo
        videoSrc="/video/pages/products.mp4"
        badgeIcon={<Package className="w-3.5 h-3.5" />}
        badgeText="Export Portfolio • Certified Commodities"
        title="Certified Global"
        highlightedTitle="Agro-Commodities Catalogue"
        description="Direct farmgate procurement, state-of-the-art optical grading, and cold-chain containerized freight. Browse our certified single-origin spices, hydro-cooled vegetables, and tropical fruits."
        breadcrumbs={[{ label: "Products" }]}
        metrics={[
          { value: "50+", label: "Discharge Berths" },
          { value: "<4h", label: "Harvest to Pre-Cool" },
          { value: "ISO 17025", label: "Lab Assayed" },
          { value: "100%", label: "MRL Compliant" },
        ]}
        primaryCtaText="Explore Directory"
        primaryCtaHref="#catalogue"
        secondaryCtaText="Request Bulk Quote"
        secondaryCtaHref="/contact"
      />

      <div className="py-16 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* 2. CategoryTiles */}
        <div className="mb-20">
          <CategoryTiles className="py-0" showHeader={false} />
        </div>

        {/* 3. Catalogue Section with Search & Filter Tabs */}
        <div id="catalogue" className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="eyebrow block mb-2 text-saffron">Commodity Directory</span>
              <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal">
                Export Specifications & Sizing
              </h2>
            </div>
            <div className="text-xs font-mono text-foam/60">
              Showing {filteredProducts.length} of {PRODUCTS.length} Commodities
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="p-4 sm:p-5 rounded-4xl glass mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer min-h-[44px]",
                  selectedCategory === "all"
                    ? "bg-saffron text-white shadow-saffron"
                    : "bg-white/5 text-foam/70 hover:bg-white/10 hover:text-cream"
                )}
              >
                All ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer min-h-[44px]",
                    selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                      ? "bg-saffron text-white shadow-saffron"
                      : "bg-white/5 text-foam/70 hover:bg-white/10 hover:text-cream"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <label htmlFor="search-input" className="sr-only">Search commodities</label>
              <Search className="w-4 h-4 text-foam/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search origin, grade, or name..."
                className="w-full pl-11 pr-5 py-2.5 bg-navy border border-white/15 rounded-full text-xs text-cream placeholder-foam/40 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors font-sans min-h-[44px]"
              />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center glass rounded-4xl border border-white/10">
              <p className="font-sans text-base text-foam/70 font-light">
                No agricultural commodities matched your query: &quot;{searchQuery}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-saffron/15 text-saffron text-xs font-sans font-bold hover:bg-saffron hover:text-white transition-all cursor-pointer min-h-[44px]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger>
              {filteredProducts.map((product: ProductItem) => (
                <div
                  key={product.id}
                  className="group glass glass-hover rounded-4xl overflow-hidden flex flex-col border border-white/10 transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.99]"
                >
                  {/* Product Image Frame */}
                  <div className="relative h-64 w-full overflow-hidden bg-abyss">
                    <Image
                      src={product.image}
                      alt={`${product.name} - ${product.grade || "Export Quality"}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      <span
                        className={cn(
                          "text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md",
                          getCategoryBadgeClass(product.category)
                        )}
                      >
                        {product.category}
                      </span>
                      {product.grade && (
                        <span className="text-[10px] font-sans uppercase tracking-wider bg-abyss/80 text-foam/80 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                          {product.grade.split("(")[0].trim()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="card-title text-cream group-hover:text-saffron transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-foam/75 font-light line-clamp-2 mb-6 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Technical Specs Snippets */}
                      <div className="space-y-2.5 border-t border-white/10 pt-4 text-xs font-sans">
                        {product.origin && (
                          <div className="flex justify-between items-center">
                            <span className="text-foam/50 flex items-center gap-2">
                              <Globe className="w-3.5 h-3.5 text-teal shrink-0" /> Origin
                            </span>
                            <span className="text-cream font-medium text-right truncate max-w-[170px]">
                              {product.origin.split(",")[0]}
                            </span>
                          </div>
                        )}
                        {product.grade && (
                          <div className="flex justify-between items-center">
                            <span className="text-foam/50 flex items-center gap-2">
                              <Package className="w-3.5 h-3.5 text-saffron shrink-0" /> Grade
                            </span>
                            <span className="text-saffron-light font-medium text-right truncate max-w-[170px]">
                              {product.grade.split("(")[0].trim()}
                            </span>
                          </div>
                        )}
                        {product.moq && (
                          <div className="flex justify-between items-center">
                            <span className="text-foam/50 flex items-center gap-2">
                              <CalendarDays className="w-3.5 h-3.5 text-teal shrink-0" /> MOQ
                            </span>
                            <span className="text-cream font-medium text-right truncate max-w-[170px]">
                              {product.moq.split("(")[0].trim()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Links with 44px min touch targets */}
                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                      <Link
                        href={`/products/${product.category}/${product.slug}`}
                        className="flex-1 py-3 px-4 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold text-cream bg-white/5 hover:bg-saffron/10 hover:border-saffron border border-white/15 rounded-full transition-all flex items-center justify-center"
                      >
                        Specifications
                      </Link>
                      <Link
                        href={`/contact?product=${encodeURIComponent(product.name)}&type=quote`}
                        className="flex-1 py-3 px-4 min-h-[44px] text-center text-xs uppercase tracking-wider font-bold text-white bg-saffron hover:bg-saffron-light rounded-full transition-all shadow-saffron flex items-center justify-center gap-1.5"
                      >
                        <span>Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

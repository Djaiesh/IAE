import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeroVideo } from "@/components/media/PageHeroVideo";
import { getCategoryBySlug, CATEGORIES } from "@/data/categories";
import { getProductsByCategory, ProductItem } from "@/data/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowRight, Globe, Package, CalendarDays, ShieldCheck, Flame, Leaf, Apple } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Export Specifications | IAE Global`,
    description: category.intro,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  const getCategoryThemeIcon = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "spices":
        return <Flame className="w-5 h-5 text-saffron" />;
      case "vegetables":
        return <Leaf className="w-5 h-5 text-teal" />;
      case "fruits":
        return <Apple className="w-5 h-5 text-foam" />;
      default:
        return null;
    }
  };

  const getCategoryVideo = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "spices":
        return "/video/pages/category-spices.mp4";
      case "vegetables":
        return "/video/pages/category-vegetables.mp4";
      case "fruits":
        return "/video/pages/category-fruits.mp4";
      default:
        return "/video/pages/products.mp4";
    }
  };

  return (
    <div className="bg-navy text-cream min-h-screen">
      {/* 1. Cinematic Category Hero Video */}
      <PageHeroVideo
        videoSrc={getCategoryVideo(category.slug)}
        badgeIcon={getCategoryThemeIcon(category.slug)}
        badgeText={`${category.name} Export Line • ${category.shortTagline}`}
        title={`${category.name}`}
        highlightedTitle="Export Grade Portfolio"
        description={category.intro}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
        metrics={[
          { value: `${products.length}`, label: "Available Lines" },
          { value: "Export A", label: "Calibrated Grade" },
          { value: "ISO 17025", label: "Assayed & Tested" },
          { value: "100%", label: "MRL Compliant" },
        ]}
        primaryCtaText="Inspect Commodities"
        primaryCtaHref="#commodities"
        secondaryCtaText="All Products"
        secondaryCtaHref="/products"
      />

      {/* Product List Grid */}
      <div id="commodities" className="py-16 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal">
              Available {category.name} Selections ({products.length})
            </h2>
            <p className="text-xs font-sans text-foam/60 mt-1 font-light">
              Select any commodity to inspect chemical assays, container packaging, and download spec sheets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger>
          {products.map((product: ProductItem) => (
            <div
              key={product.id}
              className="group glass glass-hover rounded-4xl overflow-hidden flex flex-col border border-white/10 transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.99]"
            >
              {/* Image Frame */}
              <div className="relative h-64 w-full overflow-hidden bg-abyss">
                <Image
                  src={product.image}
                  alt={`${product.name} - ${product.grade || "Export Quality"}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-black/30 pointer-events-none" />
                
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="text-[10px] font-sans uppercase font-bold tracking-wider bg-abyss/85 backdrop-blur-xl text-saffron px-3 py-1 rounded-full border border-saffron/30">
                    {product.grade ? product.grade.split("(")[0].trim() : "Grade A"}
                  </span>
                  {product.isDemo && (
                    <span className="text-[9px] font-sans uppercase tracking-wider bg-deep/90 backdrop-blur-xl text-foam/60 px-2.5 py-1 rounded-full border border-white/10">
                      Sample
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="card-title text-cream group-hover:text-saffron transition-colors mb-2">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-foam/75 font-light line-clamp-2 mb-6 leading-relaxed">
                    {product.shortDescription}
                  </p>

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
                    {product.moq && (
                      <div className="flex justify-between items-center">
                        <span className="text-foam/50 flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5 text-teal shrink-0" /> Minimum Order
                        </span>
                        <span className="text-cream font-medium text-right truncate max-w-[170px]">
                          {product.moq.split("(")[0].trim()}
                        </span>
                      </div>
                    )}
                    {product.storageTemp && (
                      <div className="flex justify-between items-center">
                        <span className="text-foam/50 flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-saffron shrink-0" /> Temp Setpoint
                        </span>
                        <span className="text-saffron-light font-medium text-right truncate max-w-[170px]">
                          {product.storageTemp.split("(")[0].trim()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                  <Link
                    href={`/products/${category.slug}/${product.slug}`}
                    className="flex-1 py-3 px-4 min-h-[44px] text-center text-xs uppercase tracking-wider font-semibold text-cream bg-white/5 hover:bg-saffron hover:text-white border border-white/15 hover:border-saffron rounded-full transition-all shadow-sm flex items-center justify-center"
                  >
                    View Specs
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

        {/* Category Footer CTA Box */}
        <div className="mt-20 p-8 sm:p-12 rounded-4xl glass flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10" data-reveal="up">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-cream font-normal">
              Looking for custom calibration, private labeling or bulk FCL schedules?
            </h3>
            <p className="font-sans text-sm text-foam/70 mt-2 font-light max-w-xl">
              Our trade operations team accommodates customized buyer specifications for {category.name.toLowerCase()}.
            </p>
          </div>
          <Link
            href={`/contact?product=${encodeURIComponent(category.name + " Line")}&type=quote`}
            className="btn-primary text-xs px-8 py-4 shrink-0 min-h-[48px] inline-flex items-center gap-2"
          >
            <span>Inquire About {category.name} →</span>
          </Link>
        </div>

      </div>

    </div>
  );
}

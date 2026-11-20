import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Package, 
  CalendarDays, 
  Thermometer, 
  Clock,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    category: prod.category,
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProductBySlug(category, slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Export Specification | ${SITE_CONFIG.name}`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { category: categorySlug, slug: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category) {
    notFound();
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="pt-28 pb-16 sm:pt-32 sm:pb-24 bg-navy text-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Breadcrumb Trail */}
        <div className="overflow-x-auto pb-1 mb-2">
          <Breadcrumbs
            items={[
              { label: "Products", href: "/products" },
              { label: category.name, href: `/products/${category.slug}` },
              { label: product.name },
            ]}
          />
        </div>

        {/* Product Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          
          {/* Left Column: Visual Asset Frame */}
          <div className="lg:col-span-6 space-y-5" data-reveal="right">
            <div className="relative rounded-4xl overflow-hidden aspect-[4/3] shadow-float border border-white/10 bg-abyss group">
              <Image
                src={product.image}
                alt={`${product.name} - ${product.grade || "Export Quality"}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-5 left-5 flex gap-2 z-10">
                <span className="text-xs font-sans font-bold uppercase tracking-wider bg-abyss/90 backdrop-blur-xl text-saffron px-4 py-1.5 rounded-full border border-saffron/40">
                  {category.name}
                </span>
                {product.isDemo && (
                  <span className="text-[10px] font-sans uppercase tracking-wider bg-deep/90 backdrop-blur-xl text-foam/60 px-3 py-1.5 rounded-full border border-white/10">
                    Sample Data
                  </span>
                )}
              </div>

              <div className="absolute bottom-5 left-5 right-5 bg-abyss/90 backdrop-blur-xl p-4 rounded-3xl border border-white/15 flex items-center justify-between text-xs font-sans text-foam z-10">
                <span className="flex items-center gap-2 text-saffron font-medium">
                  <ShieldCheck className="w-4 h-4" /> Lab Certified Phytosanitary
                </span>
                <span className="font-semibold text-cream">FOB / CIF Ready</span>
              </div>
            </div>

            {/* Quick Export Logistics Snippet */}
            <div className="grid grid-cols-2 gap-4">
              {product.storageTemp && (
                <div className="p-4 rounded-3xl glass border border-white/8 text-xs font-sans">
                  <span className="text-foam/50 flex items-center gap-1.5 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-saffron shrink-0" /> Temp Setpoint
                  </span>
                  <span className="text-cream font-medium block truncate">
                    {product.storageTemp}
                  </span>
                </div>
              )}
              {product.shelfLife && (
                <div className="p-4 rounded-3xl glass border border-white/8 text-xs font-sans">
                  <span className="text-foam/50 flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-teal shrink-0" /> Transit Shelf-Life
                  </span>
                  <span className="text-cream font-medium block truncate">
                    {product.shelfLife}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Specification & Inquiry Actions */}
          <div className="lg:col-span-6 space-y-6" data-reveal="left">
            <div>
              <span className="eyebrow block mb-2 text-saffron">
                {category.name} Export Commodity
              </span>
              <h1 className="hero-title text-cream font-normal leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-sm sm:text-base text-foam/85 font-light mt-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Primary Trade Parameters Table */}
            <div className="glass rounded-4xl border border-white/10 divide-y divide-white/8 text-xs sm:text-sm font-sans overflow-hidden">
              {product.origin && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-foam/60">Direct Origin / Region:</span>
                  <span className="text-cream font-medium text-right">{product.origin}</span>
                </div>
              )}
              {product.grade && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-foam/60">Standard Export Grade:</span>
                  <span className="text-saffron-light font-bold text-right">{product.grade}</span>
                </div>
              )}
              {product.packaging && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-foam/60">Export Packaging:</span>
                  <span className="text-cream text-right max-w-xs">{product.packaging}</span>
                </div>
              )}
              {product.moq && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-foam/60">Minimum Order (MOQ):</span>
                  <span className="text-saffron font-bold text-right">{product.moq}</span>
                </div>
              )}
              {product.containerLoading && (
                <div className="p-4 flex justify-between items-center">
                  <span className="text-foam/60">Container Payload:</span>
                  <span className="text-cream text-right max-w-xs">{product.containerLoading}</span>
                </div>
              )}
            </div>

            {/* Seasonality Grid */}
            {product.seasonMonths && (
              <div className="p-5 rounded-3xl glass border border-white/8">
                <span className="text-xs font-sans uppercase tracking-wider text-foam/60 block mb-3 font-semibold">
                  Harvest & Shipping Availability:
                </span>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 text-center text-[10px] font-sans">
                  {months.map((m) => {
                    const isAvailable = product.seasonMonths?.some(
                      (sm) => sm.toLowerCase() === m.toLowerCase() || sm.toLowerCase().includes("all")
                    );
                    return (
                      <div
                        key={m}
                        className={`py-2 px-1 rounded-xl transition-all ${
                          isAvailable
                            ? "bg-saffron text-white font-bold shadow-sm"
                            : "bg-white/5 text-foam/30"
                        }`}
                      >
                        {m}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inquiry Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}&type=quote`}
                className="btn-primary text-xs px-8 py-4 flex-1 text-center justify-center min-h-[48px] inline-flex items-center gap-2"
              >
                <span>Request Container Quote (FOB/CIF)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}&type=sample`}
                className="btn-ghost text-xs px-8 py-4 text-center justify-center min-h-[48px] inline-flex items-center"
              >
                Request Sample Pack
              </Link>
            </div>

            {/* Download Spec Sheet */}
            <div className="pt-2">
              <a
                href={SITE_CONFIG.portfolioPdfUrl}
                download={`${product.slug}-technical-spec-sheet.pdf`}
                className="inline-flex items-center gap-2 text-xs font-sans text-foam/70 hover:text-saffron transition-colors min-h-[44px]"
              >
                <Download className="w-4 h-4 text-saffron shrink-0" />
                <span>Download Official Product Specification Sheet (PDF)</span>
              </a>
            </div>

          </div>

        </div>

        {/* Detailed Laboratory Specification Assay Table */}
        {product.specification && (
          <div className="glass rounded-4xl p-8 sm:p-12 mb-16 border border-white/10 shadow-float" data-reveal="up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="eyebrow text-saffron block mb-1">Chemical & Physical Assay</span>
                <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal mt-1">
                  Technical Specifications & Tolerances
                </h2>
              </div>
              <span className="text-xs font-sans text-teal bg-teal/15 border border-teal/30 px-4 py-1.5 rounded-full font-semibold">
                Standard: ISO / FSSAI / ASTA Compliant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specification).map(([parameter, value]) => (
                <div
                  key={parameter}
                  className="p-4 rounded-2xl bg-white/5 border border-white/8 flex justify-between items-center text-xs sm:text-sm font-sans"
                >
                  <span className="text-foam/70">{parameter}</span>
                  <span className="text-cream font-bold text-right">{value}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs font-sans text-foam/50 leading-relaxed font-light">
              * Note: Sample parameter limits shown for demonstration purposes. Batch-specific Certificates of Analysis (COA) issued by NABL-accredited test laboratories are attached to each commercial export shipment bill of lading.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

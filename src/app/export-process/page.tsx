import React from "react";
import Link from "next/link";
import { PageHeroVideo } from "@/components/media/PageHeroVideo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_CONFIG } from "@/data/site";
import {
  Sprout,
  Microscope,
  PackageCheck,
  FileCheck2,
  Truck,
  Anchor,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export Logistics Pipeline & Cargo Journey | JILO Global",
  description:
    "Explore our complete six-stage export logistics lifecycle: farmgate sourcing, lab inspection, protective packing, customs documentation, and ocean freight.",
};

export default function ExportProcessPage() {
  const getProcessIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="w-6 h-6 text-saffron" />;
      case "Microscope":
        return <Microscope className="w-6 h-6 text-teal" />;
      case "PackageCheck":
        return <PackageCheck className="w-6 h-6 text-foam" />;
      case "FileCheck2":
        return <FileCheck2 className="w-6 h-6 text-saffron" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-teal" />;
      case "Anchor":
        return <Anchor className="w-6 h-6 text-foam" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-saffron" />;
    }
  };

  return (
    <div className="bg-transparent text-cream min-h-screen relative z-10">
      {/* 1. Cinematic Dedicated Page Hero Video */}
      <PageHeroVideo
        videoSrc="/video/export_page_video.mp4"
        badgeIcon={<Compass className="w-3.5 h-3.5 text-saffron" />}
        badgeText="End-to-End Maritime Execution • Port Logistics"
        title="The Six-Stage Maritime"
        highlightedTitle="Export Pipeline & Cargo Journey"
        description="From calibrated farmgate harvesting to the surrender of clean destination delivery orders, our logistics framework eliminates container demurrage and maintains continuous biological chain-of-custody."
        breadcrumbs={[{ label: "Export Process" }]}
        metrics={[
          { value: "0 Demurrage", label: "Port Gate Target" },
          { value: "<3 Hours", label: "Farmgate to Reefer" },
          { value: "15 Min", label: "IoT GPS Telemetry" },
          { value: "100%", label: "Traceable Provenance" },
        ]}
        primaryCtaText="Inspect 6 Stages"
        primaryCtaHref="#pipeline"
        secondaryCtaText="Request Berth Schedule"
        secondaryCtaHref="/contact"
      />

      <div id="pipeline" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* 2. Six-Step Process with Connecting Timeline Lines */}
        <div className="relative mb-24" data-reveal="up">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow block mb-3 text-saffron">Sequential Protocol</span>
            <h2 className="section-title text-cream">
              Container Cargo Journey & Checkpoints
            </h2>
            <p className="font-sans text-sm text-foam/75 font-light mt-3">
              Every shipment advances through six monitored operational milestones before international vessel release.
            </p>
          </div>

          {/* Timeline Container with Connecting Center Line on Desktop */}
          <div className="relative space-y-8 sm:space-y-12 before:absolute before:inset-0 before:left-5 sm:before:left-7 md:before:left-10 before:w-0.5 before:bg-gradient-to-b before:from-saffron before:via-teal before:to-saffron/40 before:pointer-events-none">
            {SITE_CONFIG.exportProcessSteps.map((step, index) => (
              <div
                key={step.stepNumber}
                className="relative pl-11 sm:pl-16 md:pl-24 group"
              >
                {/* Step Circle on Connecting Line */}
                <div className="absolute left-2.5 sm:left-4 md:left-7 top-6 -translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-navy border-2 border-saffron flex items-center justify-center shadow-glow z-10">
                  <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-saffron" />
                </div>

                {/* Step Card with Glassmorphism */}
                <div className="p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl glass glass-hover border border-white/10 flex flex-col md:flex-row gap-6 md:gap-8 items-start transition-all duration-300">
                  {/* Step Monogram and Icon */}
                  <div className="flex md:flex-col items-center gap-4 shrink-0">
                    <span className="font-display text-4xl sm:text-5xl text-saffron font-bold tabular-nums">
                      {step.stepNumber}
                    </span>
                    <div className="w-14 h-14 rounded-3xl bg-deep/90 border border-white/15 flex items-center justify-center shadow-md">
                      {getProcessIcon(step.iconName)}
                    </div>
                  </div>

                  {/* Step Details & Verification Check Badge */}
                  <div className="flex-1 space-y-3 font-sans">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-2xl text-cream font-normal">
                        {step.title}
                      </h2>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-saffron/15 text-saffron-light border border-saffron/30">
                        Stage 0{index + 1}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-foam/95">
                      {step.shortDesc}
                    </p>

                    <p className="text-xs sm:text-sm text-foam/75 font-light leading-relaxed">
                      {step.details}
                    </p>

                    {/* Verification Check Badge */}
                    <div className="pt-3 flex items-center gap-2 text-xs font-sans text-saffron font-semibold">
                      <div className="w-5 h-5 rounded-full bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20">
                        Verification Gate: {step.verificationCheck}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. IncoTerms 2020 Summary Panel */}
        <div className="p-8 sm:p-12 rounded-4xl glass mb-20 border border-white/10 shadow-float" data-reveal="up">
          <div className="max-w-2xl mb-8">
            <span className="eyebrow text-saffron block mb-1">Commercial Contracting</span>
            <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal mt-1">
              Standardized Delivery IncoTerms (2020)
            </h2>
            <p className="text-xs sm:text-sm text-foam/70 mt-2 font-light">
              Clear demarcations of freight booking, marine cargo insurance, and discharge berth liability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/8 flex flex-col justify-between hover:border-saffron/30 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-saffron font-bold text-sm">CIF (Cost, Insurance & Freight)</span>
                  <span className="text-[10px] font-mono text-saffron bg-saffron/15 px-2 py-0.5 rounded-full">Recommended</span>
                </div>
                <p className="text-foam/75 font-light leading-relaxed mt-2">
                  Our premier turnkey export standard. We handle farmgate transport, customs documentation, liner ocean freight booking, and marine transit insurance directly to your specified discharge seaport.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-foam/50 font-mono text-[11px]">
                Risk transfers at vessel rail; freight & insurance prepaid.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/8 flex flex-col justify-between hover:border-teal/30 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-teal font-bold text-sm">FOB (Free on Board)</span>
                  <span className="text-[10px] font-mono text-teal bg-teal/15 px-2 py-0.5 rounded-full">JNPT / Mundra</span>
                </div>
                <p className="text-foam/75 font-light leading-relaxed mt-2">
                  We deliver export-cleared container lots safely past the vessel rail at Nhava Sheva (JNPT) or Mundra Port. The consignee nominates and charters vessel space.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-foam/50 font-mono text-[11px]">
                Buyer contracts ocean freight and assumes transit insurance.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/8 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cream font-bold text-sm">CFR (Cost & Freight)</span>
                  <span className="text-[10px] font-mono text-cream/70 bg-white/10 px-2 py-0.5 rounded-full">Global Seaports</span>
                </div>
                <p className="text-foam/75 font-light leading-relaxed mt-2">
                  We manage and prepay ocean freight to the port of discharge, while marine cargo insurance is placed directly under the importing client's open policy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-foam/50 font-mono text-[11px]">
                Ocean freight prepaid by seller; insurance covered by buyer.
              </div>
            </div>
          </div>
        </div>

        {/* 4. Action CTA */}
        <div className="text-center p-12 rounded-4xl glass border border-white/10" data-reveal="up">
          <h2 className="font-display text-2xl sm:text-4xl text-cream font-normal mb-4">
            Request an IncoTerms Freight Quotation
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 max-w-xl mx-auto mb-8 font-light">
            Share your required container volume, discharge port, and shipping timeline with our trade logistics team for an itemized commercial breakdown.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?type=quote"
              className="btn-primary text-xs px-8 py-4 min-h-[48px] inline-flex items-center gap-2"
            >
              <span>Request IncoTerms Freight Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="btn-ghost text-xs px-8 py-4 min-h-[48px] inline-flex items-center gap-2"
            >
              <span>Explore Commodities</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

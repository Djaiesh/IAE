"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Clock, Thermometer, Award, Anchor } from "lucide-react";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";

interface EnquiryCTASectionProps {
  className?: string;
  initialProduct?: string;
  initialPort?: string;
}

export function EnquiryCTASection({
  className,
  initialProduct,
  initialPort,
}: EnquiryCTASectionProps) {
  const trustSignals = [
    {
      title: "24-Hour Firm Quotations",
      description: "Fast-track FOB and CIF pricing schedules tailored to your destination port and shipping window.",
      icon: Clock,
    },
    {
      title: "IncoTerms 2020 Compliance",
      description: "Transparent maritime logistics, clean bill of lading issuance, and marine cargo transit insurance.",
      icon: ShieldCheck,
    },
    {
      title: "Unbroken Cold Chain Custody",
      description: "Reefer containers pre-cooled to commodity setpoints with 15-minute cellular telemetry data logging.",
      icon: Thermometer,
    },
    {
      title: "GI & GlobalG.A.P. Provenance",
      description: "Accredited ISO 17025 laboratory assay reports (HPLC / GC-MS/MS) and official phytosanitary quarantine seals.",
      icon: Award,
    },
  ];

  return (
    <section className={cn("relative py-28 sm:py-36 overflow-hidden bg-abyss", className)}>
      {/* Background ambient scrim with oceanic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-abyss to-black pointer-events-none" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Split Layout: Left side = Editorial copy + Trust signals; Right side = Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial & Trust Signals (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-8" data-reveal="right">
            <div>
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron/30 bg-saffron/10 mb-6 backdrop-blur-md">
                <Anchor className="w-3.5 h-3.5 text-saffron" />
                <span className="eyebrow text-saffron text-[11px] font-semibold">
                  Direct Exporter Trade Desk
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream font-normal leading-[1.1] tracking-tight">
                Secure Your
                <span className="text-saffron italic block mt-1">
                  Container Allocation
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-5 leading-relaxed">
                Connect directly with our maritime trade logistics specialists. From trial 20ft FCL shipments to recurring seasonal reefer allotments, we provide transparent FOB / CIF pricing, port transit schedules, and laboratory dossiers.
              </p>
            </div>

            {/* 4 Trust Signals with Checkmarks */}
            <div className="space-y-4 pt-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-saffron font-bold block">
                Trade Assurances & Standards
              </span>
              
              <div className="space-y-3.5">
                {trustSignals.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <div
                      key={signal.title}
                      className="p-4 rounded-3xl bg-white/5 border border-white/8 flex items-start gap-4 hover:border-saffron/30 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-teal" />
                          <h3 className="font-sans text-xs font-bold text-cream uppercase tracking-wide">
                            {signal.title}
                          </h3>
                        </div>
                        <p className="font-sans text-xs text-foam/70 font-light leading-relaxed">
                          {signal.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Footer */}
            <div className="p-4 rounded-3xl bg-white/3 border border-white/5 text-xs font-sans text-foam/60 flex flex-col gap-1">
              <span className="text-foam/90 font-medium">Direct Inquiries:</span>
              <span>{SITE_CONFIG.contact.email}</span>
              <span>{SITE_CONFIG.contact.salesDesk}</span>
            </div>
          </div>

          {/* Right Column: Form in Glassmorphism Card (7 cols on lg) */}
          <div className="lg:col-span-7" data-reveal="left">
            <EnquiryForm
              initialProduct={initialProduct}
              initialPort={initialPort}
              className="shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

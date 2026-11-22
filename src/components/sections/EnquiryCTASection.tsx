"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Clock, Thermometer, Award, Anchor } from "lucide-react";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
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
    <section className={cn("relative py-24 sm:py-32 overflow-hidden bg-transparent text-white", className)}>
      {/* Background ambient scrim with oceanic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0284C7]/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial & Trust Signals */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E50914]/50 bg-[#082247]/80 mb-6 backdrop-blur-md">
                <Anchor className="w-3.5 h-3.5 text-[#E50914]" />
                <span className="text-[11px] font-sans text-[#E50914] font-semibold uppercase tracking-[0.2em]">
                  Direct Exporter Trade Desk
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.1] tracking-tight">
                Secure Your
                <span className="text-[#E50914] italic font-light block mt-1">
                  Container Allocation
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-slate-200 font-light mt-5 leading-relaxed">
                Connect directly with our maritime trade logistics specialists. From trial 20ft FCL shipments to recurring seasonal reefer allotments, we provide transparent FOB / CIF pricing, port transit schedules, and laboratory dossiers.
              </p>
            </div>

            {/* 4 Trust Signals */}
            <div className="space-y-4 pt-2">
              <span className="text-[11px] font-sans tracking-widest uppercase text-[#E50914] font-bold block">
                Trade Assurances &amp; Standards
              </span>
              
              <div className="space-y-3.5">
                {trustSignals.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <div
                      key={signal.title}
                      className="p-4 rounded-2xl bg-[#0E3C7A]/85 backdrop-blur-xl border border-white/20 flex items-start gap-4 hover:border-[#38BDF8] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#E50914]" />
                          <h3 className="font-sans text-xs font-bold text-white uppercase tracking-wide">
                            {signal.title}
                          </h3>
                        </div>
                        <p className="font-sans text-xs text-slate-200 font-light leading-relaxed">
                          {signal.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Embedded RFQ Form */}
          <div className="lg:col-span-7">
            <EnquiryForm
              initialProduct={initialProduct}
              initialPort={initialPort}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

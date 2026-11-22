"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, FlaskConical, Thermometer, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

const PILLARS = [
  {
    icon: <FlaskConical className="w-6 h-6 text-[#E6C687]" />,
    title: "HPLC Active Compound Assay",
    desc: "Every spice consignment is calibrated for curcumin (turmeric), piperine (black pepper), or ASTA color units (chilli) to assure consistent bio-active potency.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: "Pesticide MRL & Heavy Metal Testing",
    desc: "Zero-tolerance multi-residue pesticide screens conducted via GC-MS/MS and LC-MS/MS in NABL/ISO-17025 accredited labs compliant with EU and USDA limits.",
  },
  {
    icon: <Thermometer className="w-6 h-6 text-sky-400" />,
    title: "Continuous Reefer Telemetry",
    desc: "Satellite GPS dataloggers embedded into each container record pulp temperature, relative humidity, and air vent settings at 15-minute intervals.",
  },
];

export function QualityTrustSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-transparent text-white">
      {/* Background ambient subtle cyan glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0284C7]/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E6C687]/50 bg-[#082247]/80 backdrop-blur-xl mb-5 shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#E6C687]" />
            <span className="text-[11px] font-sans text-[#E6C687] uppercase tracking-[0.2em] font-semibold">
              Verification &amp; Quality Assurance
            </span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Built on Scientific
            <span className="text-[#E6C687] italic font-light block mt-1">
              Food Safety &amp; Laboratory Standards
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-200 font-light mt-4 leading-relaxed max-w-2xl mx-auto">
            International food safety demands verifiable, audited data. We implement strict multi-stage laboratory analysis before issuing the official export release certificate.
          </p>
        </div>

        {/* 3 Core Scientific Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-[#0E3C7A]/85 backdrop-blur-xl rounded-3xl p-8 border border-white/20 flex flex-col justify-between hover:border-[#38BDF8] hover:shadow-[0_20px_50px_rgba(56,189,248,0.25)] transition-all duration-300 shadow-xl">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-md">
                  {p.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-3 font-normal">{p.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Accreditation Seal Strip & Direct Navigation Action */}
        <div className="bg-[#0B3368]/90 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-white/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-xl">
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#E6C687] font-semibold block mb-2">
                Audited Regulatory Approvals
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mb-3">
                Government &amp; Global Food Safety Compliance
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                Full chain-of-custody, clean phytosanitary certificates, and accredited lab test dossiers supplied with every commercial bill of lading.
              </p>

              {/* Accreditations Row */}
              <div className="flex flex-wrap gap-2.5 mt-5">
                {SITE_CONFIG.complianceCertifications.map((cert) => (
                  <span
                    key={cert.code}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-sans text-white font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{cert.code}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Navigation Button */}
            <div className="shrink-0">
              <Link
                href="/quality"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#0284C7]/30"
              >
                <span>Inspect Quality Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

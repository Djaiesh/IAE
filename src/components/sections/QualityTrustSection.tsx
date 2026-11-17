"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, FlaskConical, Thermometer, Award, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

const PILLARS = [
  {
    icon: <FlaskConical className="w-6 h-6 text-saffron" />,
    title: "HPLC Active Compound Assay",
    desc: "Every spice consignment is calibrated for curcumin (turmeric), piperine (black pepper), or ASTA color units (chilli) to assure consistent bio-active potency.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-teal" />,
    title: "Pesticide MRL & Heavy Metal Testing",
    desc: "Zero-tolerance multi-residue pesticide screens conducted via GC-MS/MS and LC-MS/MS in NABL/ISO-17025 accredited labs compliant with EU and USDA limits.",
  },
  {
    icon: <Thermometer className="w-6 h-6 text-foam" />,
    title: "Continuous Reefer Telemetry",
    desc: "Satellite GPS dataloggers embedded into each container record pulp temperature, relative humidity, and air vent settings at 15-minute intervals.",
  },
];

export function QualityTrustSection() {
  return (
    <section className="relative py-28 sm:py-32 overflow-hidden bg-abyss">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-abyss to-navy pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-reveal="up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-saffron/40 bg-deep/80 backdrop-blur-xl mb-5 shadow-glow">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span className="eyebrow text-saffron text-xs">
              Verification & Quality Assurance
            </span>
          </div>
          
          <h2 className="section-title text-cream">
            Built on Scientific
            <span className="text-saffron italic font-normal block mt-1">
              Food Safety Standards
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed max-w-2xl mx-auto">
            International food safety protocols demand verifiable, audited data. We implement strict multi-stage laboratory analysis before issuing the export release certificate.
          </p>
        </div>

        {/* 3 Core Scientific Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-stagger>
          {PILLARS.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-4xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-3xl bg-deep/90 border border-white/10 flex items-center justify-center mb-6 shadow-md">
                  {p.icon}
                </div>
                <h3 className="card-title text-cream mb-3 font-medium">{p.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-foam/75 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Accreditation Seal Strip & Direct Navigation Action */}
        <div className="glass rounded-4xl p-6 sm:p-10 border border-white/10 shadow-float" data-reveal="up">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-xl">
              <span className="eyebrow text-saffron block mb-2">
                Audited Regulatory Approvals
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-cream font-normal mb-3">
                Government & Global Food Safety Compliance
              </h3>
              <p className="font-sans text-xs sm:text-sm text-foam/70 font-light leading-relaxed">
                Full traceability, clean bills of health, and accredited lab test certificates supplied with every commercial bill of lading.
              </p>

              {/* Accreditations Row */}
              <div className="flex flex-wrap gap-2.5 mt-5">
                {SITE_CONFIG.complianceCertifications.map((cert) => (
                  <span
                    key={cert.code}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-foam/90 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-saffron" />
                    <span>{cert.code}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Navigation Button */}
            <div className="shrink-0 pt-4 lg:pt-0">
              <Link
                href="/quality"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
              >
                <span>View Quality & Testing Standards</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

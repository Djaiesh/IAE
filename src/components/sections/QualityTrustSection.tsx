"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, FlaskConical, Thermometer, ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

interface Pillar {
  icon: React.ReactNode;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <FlaskConical className="w-6 h-6 text-[#C17B58]" />,
    title: "HPLC Active Compound Assay",
    desc: "Every spice consignment is calibrated for curcumin (turmeric), piperine (black pepper), or ASTA color units (chilli) to assure consistent bio-active potency.",
    image: "/images/luxury-spices-curcumin.jpg",
    tag: "Curcumin & Piperine HPLC",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: "Pesticide MRL & Heavy Metal Testing",
    desc: "Zero-tolerance multi-residue pesticide screens conducted via GC-MS/MS and LC-MS/MS in NABL/ISO-17025 accredited labs compliant with EU and USDA limits.",
    image: "/images/jilo-turmeric-sorting.jpg",
    tag: "ISO-17025 Screening",
  },
  {
    icon: <Thermometer className="w-6 h-6 text-[#B8D0CE]" />,
    title: "Continuous Reefer Telemetry",
    desc: "Satellite GPS dataloggers embedded into each container record pulp temperature, relative humidity, and air vent settings at 15-minute intervals.",
    image: "/images/jilo-reefer-vessel-open-ocean.jpg",
    tag: "Satellite CA Telemetry",
  },
];

export function QualityTrustSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-transparent text-white">
      {/* Background ambient subtle petrol glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#164A55]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C17B58]/50 bg-[#0E333C]/80 backdrop-blur-xl mb-5 shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#C17B58]" />
            <span className="text-[11px] font-sans text-[#C17B58] uppercase tracking-[0.2em] font-semibold">
              Verification &amp; Quality Assurance
            </span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Built on Scientific
            <span className="text-[#C17B58] italic font-light block mt-1">
              Food Safety &amp; Laboratory Standards
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-200 font-light mt-4 leading-relaxed max-w-2xl mx-auto">
            International food safety demands verifiable, audited data. We implement strict multi-stage laboratory analysis before issuing the official export release certificate.
          </p>
        </div>

        {/* 3 Core Scientific Pillars with Background Images & Layered Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="group relative rounded-3xl overflow-hidden border border-[#B8D0CE]/25 p-7 sm:p-8 flex flex-col justify-between min-h-[360px] sm:min-h-[380px] shadow-2xl transition-all duration-500 hover:border-[#C17B58] hover:shadow-[0_25px_60px_rgba(193,123,88,0.28)] hover:-translate-y-1.5"
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Multi-layered dark gradient overlay for optimal text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061820]/95 via-[#0E333C]/80 to-[#164A55]/60" />
                <div className="absolute inset-0 bg-[#061820]/30 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-500" />
              </div>

              {/* Text & Content Layer (Directly Above the Image Background) */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Floating Icon Pill */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0E333C]/85 border border-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl group-hover:scale-105 group-hover:border-[#C17B58] transition-all">
                    {p.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl text-white mb-3 font-semibold tracking-wide drop-shadow-md group-hover:text-[#C17B58] transition-colors leading-snug">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-slate-200 font-normal leading-relaxed drop-shadow">
                    {p.desc}
                  </p>
                </div>

                {/* Bottom Audit Tag */}
                <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] font-mono">
                  <span className="uppercase tracking-wider font-semibold text-[#C17B58] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C17B58] animate-pulse" />
                    {p.tag}
                  </span>
                  <span className="text-slate-300 font-sans text-xs group-hover:text-white transition-colors">
                    Audited Standard &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accreditation Seal Strip & Direct Navigation Action */}
        <div className="bg-[#0E333C]/90 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-[#B8D0CE]/25 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-xl">
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#C17B58] font-semibold block mb-2">
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#D68C66] to-[#C17B58] hover:brightness-110 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[rgba(193,123,88,0.3)]"
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

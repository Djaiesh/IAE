import React from "react";
import Link from "next/link";
import { PageHeroVideo } from "@/components/media/PageHeroVideo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  ShieldCheck,
  Award,
  FlaskConical,
  Thermometer,
  CheckCircle2,
  FileText,
  ArrowRight,
  Microscope,
  Dna,
  Binary,
  Layers,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality Assurance & Laboratory Assay Protocols | ATLANTA Import and Export",
  description:
    "Explore our multi-stage inspection pipeline, HPLC & GC-MS/MS laboratory assay standards, and international compliance documentation.",
};

export default function QualityPage() {
  const labTechnologies = [
    {
      title: "HPLC Active Bioactive Quantification",
      method: "High-Performance Liquid Chromatography",
      description:
        "Calibrated determination of active curcuminoids in turmeric fingers (4.5%–5.5%), piperine content in Tellicherry black pepper (5.0%–6.5%), and capsaicin heat values in red chillies.",
      icon: FlaskConical,
      targetMetric: "±0.1% accuracy threshold",
    },
    {
      title: "GC-MS/MS Multi-Residue Pesticide Screen",
      method: "Gas Chromatography–Tandem Mass Spectrometry",
      description:
        "Comprehensive screening across 450+ chemical compounds, organophosphates, and synthetic pyrethroids to enforce strict compliance with European and US-FDA Maximum Residue Limits (MRLs).",
      icon: Microscope,
      targetMetric: "Detection limit down to 0.005 mg/kg",
    },
    {
      title: "Fluorometric Mycotoxin & Aflatoxin Assay",
      method: "Immunoaffinity Chromatography",
      description:
        "Individual detection of Total Aflatoxins (B1, B2, G1, G2) and Ochratoxin A in dried spices, guaranteed under strict European Union limits (<10 ppb).",
      icon: Dna,
      targetMetric: "< 10 ppb EU conformant",
    },
    {
      title: "Karl Fischer Water Activity & Moisture",
      method: "Coulometric Titration & Water Activity (aw)",
      description:
        "Precision moisture verification to prevent post-harvest microbial fermentation and volatile essential oil dissipation across long oceanic voyages.",
      icon: Binary,
      targetMetric: "< 10.0% moisture / aw < 0.60",
    },
  ];

  const qualityTimeline = [
    {
      step: "01",
      title: "Pre-Harvest Agronomic Field Audit",
      description:
        "Our field agronomists test soil chemistry and pre-harvest intervals (PHI) to verify that crops are completely free from prohibited agrochemicals before harvesting commences.",
      badge: "Fieldgate Protocol",
    },
    {
      step: "02",
      title: "Mechanical Optical Sorting & De-stoning",
      description:
        "Crops enter dual vibratory aspiration screens and high-resolution monochromatic optical sorters to eliminate visual defects, split fingers, and extraneous debris.",
      badge: "MIDC Packhouse Hub",
    },
    {
      step: "03",
      title: "ISO 17025 Accredited Laboratory Testing",
      description:
        "Representative batch samples are analyzed via HPLC and GC-MS/MS in accredited third-party laboratories. Official Certificates of Analysis (COA) are generated for every production lot.",
      badge: "Statutory Lab Dossier",
    },
    {
      step: "04",
      title: "NPPO Phytosanitary & Fumigation Clearance",
      description:
        "Government quarantine officials perform visual and microscopic examination of the sealed container lot, endorsing the official Phytosanitary Certificate and Methyl Bromide fumigation register.",
      badge: "Port Departure Seal",
    },
  ];

  return (
    <div className="bg-transparent text-cream min-h-screen relative z-10">
      {/* 1. Cinematic Dedicated Page Hero Video */}
      <PageHeroVideo
        videoSrc="/video/quality_page_video.mp4"
        badgeIcon={<FlaskConical className="w-3.5 h-3.5" />}
        badgeText="ISO 17025 Accreditations • Quality Vault"
        title="Quality Assurance Protocol"
        highlightedTitle="& Laboratory Assay Standards"
        description="We adhere to the uncompromising statutory food safety frameworks governed by the European Food Safety Authority (EFSA), the United States FDA FSMA guidelines, and the Gulf Standards Organization (GSO) through transparent physical and biochemical verification."
        breadcrumbs={[{ label: "Quality Assurance" }]}
        metrics={[
          { value: "ISO 17025", label: "Accredited Lab" },
          { value: "450+", label: "Pesticides Screened" },
          { value: "<10 ppb", label: "Aflatoxin Bound" },
          { value: "HPLC", label: "Assayed Curcumin" },
        ]}
        primaryCtaText="Inspect Methodologies"
        primaryCtaHref="#testing"
        secondaryCtaText="Download Portfolio"
        secondaryCtaHref="/documents/company-portfolio.pdf"
      />

      <div id="testing" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* 2. Analytical Lab Testing Technologies (HPLC, GC-MS/MS, Aflatoxin, Titration) */}
        <div className="mb-16 sm:mb-24" data-reveal="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-white/10">
            <div>
              <span className="eyebrow text-saffron block mb-1">Testing Methodologies</span>
              <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal">
                Laboratory Assay & Scientific Screening
              </h2>
            </div>
            <span className="text-xs font-sans font-semibold bg-teal/20 text-teal border border-teal/30 px-4 py-1.5 rounded-full self-start sm:self-auto">
              ISO/IEC 17025 Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6" data-stagger>
            {labTechnologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.title}
                  className="glass glass-hover rounded-3xl sm:rounded-4xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20">
                        {tech.targetMetric}
                      </span>
                    </div>

                    <h3 className="card-title text-cream mb-1">{tech.title}</h3>
                    <span className="text-xs font-sans text-foam/60 font-semibold block mb-3">
                      {tech.method}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-foam/75 font-light leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-sans text-teal">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Included in Consignment Certificate of Analysis (COA)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Quality Assurance Timeline (4 Sequential Verification Gates) */}
        <div className="mb-24" data-reveal="up">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow block mb-3 text-saffron">Custody Pipeline</span>
            <h2 className="section-title text-cream">
              Four-Stage Quality Verification Timeline
            </h2>
            <p className="font-sans text-sm text-foam/75 font-light mt-3">
              Every production lot must pass four distinct physical and biochemical checkpoints before container sealing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-stagger>
            {qualityTimeline.map((gate) => (
              <div
                key={gate.step}
                className="p-8 rounded-4xl glass glass-hover flex flex-col justify-between border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-4xl text-saffron font-bold">
                      {gate.step}
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-foam/70 border border-white/10">
                      {gate.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-cream font-medium mb-3">
                    {gate.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-foam/75 font-light leading-relaxed">
                    {gate.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-sans text-teal font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Validation Gate Cleared</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Certifications & Statutory Registrations Grid */}
        <div className="p-8 sm:p-12 rounded-4xl glass mb-20 border border-white/10 shadow-float" data-reveal="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <span className="eyebrow text-saffron block mb-1">Audited Compliance Registry</span>
              <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal">
                International Export Certifications
              </h2>
            </div>
            <span className="text-xs font-sans font-semibold bg-saffron/15 text-saffron-light border border-saffron/30 px-4 py-1.5 rounded-full self-start sm:self-auto">
              Verified Compliance Standards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SITE_CONFIG.complianceCertifications.map((cert) => (
              <div
                key={cert.code}
                className="p-6 rounded-3xl border border-white/8 bg-white/5 hover:border-saffron/40 hover:bg-saffron/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-lg font-bold text-cream">
                      {cert.code}
                    </span>
                    <span className="text-[10px] uppercase font-sans font-bold px-2.5 py-0.5 rounded-full bg-teal/20 text-teal border border-teal/30">
                      {cert.status}
                    </span>
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-cream mb-1">
                    {cert.name}
                  </h3>
                  <p className="font-sans text-xs text-foam/60 font-light mb-4">
                    Authority: {cert.authority}
                  </p>
                  <div className="p-3.5 bg-abyss/85 rounded-2xl border border-white/10 text-xs font-sans text-foam/80 leading-relaxed">
                    {cert.scope}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-foam/70">
            <span>
              Certificates and audited compliance dossiers can be annexed to commercial purchase orders.
            </span>
            <Link
              href="/contact?type=sample"
              className="text-saffron hover:text-saffron-light transition-colors font-bold inline-flex items-center gap-1.5 min-h-[44px]"
            >
              <span>Request Sample Dossier & Laboratory Spec Sheet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5. Cold-Chain Digital Temperature Tracking Panel */}
        <div className="p-8 sm:p-12 rounded-4xl glass flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10" data-reveal="up">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-sans text-saffron font-semibold">
              <Thermometer className="w-4 h-4" />
              <span>Real-Time Reefer Telemetry Protocol</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal">
              Continuous Satellite & USB Temperature Dataloggers
            </h2>
            <p className="font-sans text-sm text-foam/80 font-light max-w-2xl leading-relaxed">
              Every ocean container includes certified USB/Cellular temperature data-loggers calibrated to record pulp temperature, ambient air humidity, and air vent openings across the entire voyage. Downloadable audit trails are delivered directly upon discharge berth arrival.
            </p>
          </div>

          <Link
            href="/contact?type=quote"
            className="btn-primary text-xs px-8 py-4 shrink-0 min-h-[48px] inline-flex items-center gap-2"
          >
            <span>Inquire About Cold-Chain Protocols</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

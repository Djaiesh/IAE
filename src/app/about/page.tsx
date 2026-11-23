import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PageHeroVideo } from "@/components/media/PageHeroVideo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  ShieldCheck,
  Ship,
  Warehouse,
  Award,
  Globe,
  ArrowRight,
  Anchor,
  Clock,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Maritime Export Operations | JILO Global",
  description:
    "Discover JILO's legacy in international agricultural commerce, coastal logistics infrastructure, and audited cold-chain custody.",
};

export default function AboutPage() {
  const milestones = [
    {
      year: "2012",
      title: "Founding & Coastal Farmgate Sourcing",
      description:
        "Established direct procurement networks with agricultural co-operatives across Maharashtra and Kerala, prioritizing high-curcumin turmeric and export-grade red onions.",
    },
    {
      year: "2015",
      title: "First Trans-Oceanic Reefer Shipments",
      description:
        "Inaugurated dedicated containerized shipments to Rotterdam and Jebel Ali, proving zero-spoilage transit times via calibrated hydro-cooling protocols.",
    },
    {
      year: "2018",
      title: "MIDC Dindori Packhouse Facility",
      description:
        "Commissioned our 45,000 sq.ft. centralized packing and cold-chain hub in Nashik, equipped with optical weight sorters and pre-cooling bays.",
    },
    {
      year: "2021",
      title: "GlobalG.A.P. & APEDA Registered Exporter",
      description:
        "Achieved comprehensive certification audits across farm assurance, phytosanitary quarantine clearance, and ISO 22000 FSMS management.",
    },
    {
      year: "2024+",
      title: "Real-Time Reefer Telemetry & 50+ Ports",
      description:
        "Deployed IoT-enabled satellite temperature tracking across all container lots, delivering verifiable provenance to importers across Europe, the Gulf, and the Americas.",
    },
  ];

  const leadership = [
    {
      title: "Director of Ocean Logistics",
      name: "Capt. R. Deshmukh",
      role: "Maritime Operations (Demo Entity)",
      bio: "Over two decades directing deep-sea container stowage, port demurrage mitigation, and liner contract negotiations across Western Indian seaports.",
    },
    {
      title: "Chief Agronomist & Quality Officer",
      name: "Dr. V. Kurian",
      role: "Phytosanitary Protocol (Demo Entity)",
      bio: "Former horticultural research consultant specializing in GlobalG.A.P. traceability, pre-harvest pesticide screening, and cold-chain physiological decay prevention.",
    },
    {
      title: "Head of International Trade Compliance",
      name: "Ms. P. Nair",
      role: "IncoTerms & Contracts (Demo Entity)",
      bio: "Directs consular trade documentation, IncoTerms 2020 regulatory adherence, APEDA export quotas, and electronic bills of lading.",
    },
  ];

  return (
    <div className="bg-transparent text-cream min-h-screen relative z-10">
      {/* 1. Cinematic Dedicated Page Hero Video */}
      <PageHeroVideo
        videoSrc="/video/about_page_video.mp4"
        badgeIcon={<Anchor className="w-3.5 h-3.5 text-saffron" />}
        badgeText={`${SITE_CONFIG.brandMark} • Corporate Profile & Origins`}
        title="Bridging Provenance Fields With"
        highlightedTitle="Global Deep-Water Seaports"
        description={`${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}. Headquartered in Valasaravakkam, Chennai with direct export access to major Indian deepwater seaports and processing packhouses across agricultural hinterlands.`}
        breadcrumbs={[{ label: "About" }]}
        metrics={[
          { value: "2012", label: "Founded in Chennai" },
          { value: "50+", label: "Global Berths Served" },
          { value: "100%", label: "Direct Farmgate Custody" },
          { value: "0-Spoil", label: "Cold-Chain Standard" },
        ]}
        primaryCtaText="Explore Export Process"
        primaryCtaHref="/export-process"
        secondaryCtaText="Contact Trade Desk"
        secondaryCtaHref="/contact"
      />

      <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* 2. Editorial Company Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-6 space-y-6 font-sans text-sm sm:text-base text-foam/80 font-light leading-relaxed" data-reveal="right">
            <span className="eyebrow text-saffron block mb-1">Our Origins & Purpose</span>
            <h2 className="font-display text-2xl sm:text-4xl text-cream font-normal leading-tight">
              An Ocean-First Export Philosophy
            </h2>
            <p>
              Perishable agricultural cargo and volatile aromatic spices demand an entirely different standard of logistical care than standard dry containerized freight. The transit from origin harvest fields across the Indian Ocean to northern European or Gulf berths represents a rigorous biological trial.
            </p>
            <p>
              We founded our operations upon an unwavering premise: complete end-to-end custody. By establishing packing operations within hours of prime farmgates and securing priority berths at Chennai, Ennore, and JNPT, we bridge the gap between smallholder agricultural excellence and multinational food processors.
            </p>
            <p>
              Every consignment is backed by independent ISO 17025 accredited laboratory assays, phytosanitary clearances, and continuous temperature records.
            </p>

            <div className="p-6 rounded-3xl glass-saffron border border-saffron/30 text-xs font-sans text-foam/90 space-y-2">
              <span className="text-[#C17B58] font-bold uppercase tracking-wider block">
                The JILO Standard of Provenance:
              </span>
              <p className="leading-relaxed">
                We maintain direct farm-level contracts with certified grower clusters, enforcing strict pre-harvest withholding intervals (PHI) to guarantee zero violation of European and North American Maximum Residue Limits.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6" data-reveal="left">
            <div className="relative rounded-4xl overflow-hidden aspect-[4/3] shadow-float border border-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
                alt="Container ship and coastal cold hub port terminal"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-abyss/90 backdrop-blur-xl border border-white/15 text-xs font-sans">
                <span className="text-saffron font-bold block mb-1">
                  Coastal Reefer Hub Infrastructure
                </span>
                <span className="text-foam/75 leading-relaxed block">
                  Direct connection with Nhava Sheva (JNPT) and Mundra container berths with 24/7 auxiliary cold-chain electricity plug-in bays.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Handling Capabilities & Physical Assets */}
        <div className="mb-28">
          <div className="max-w-2xl mb-12" data-reveal="up">
            <span className="eyebrow block mb-3 text-saffron">Physical Operations</span>
            <h2 className="section-title text-cream">
              Handling Capabilities & Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-stagger>
            <div className="glass glass-hover rounded-4xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-md">
                  <Warehouse className="w-6 h-6 text-[#C17B58]" />
                </div>
                <h3 className="card-title text-cream mb-2 font-medium">Central Packhouse Hub</h3>
                <p className="font-sans text-xs sm:text-sm text-foam/75 leading-relaxed font-light">
                  45,000 sq.ft. facility in the Nashik agro processing corridor equipped with multi-stage air washers, optical color sorting lines, and Banavac vacuum packing systems.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-sans text-[#C17B58] font-semibold">
                MIDC Dindori, Maharashtra
              </div>
            </div>

            <div className="glass glass-hover rounded-4xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-md">
                  <Anchor className="w-6 h-6 text-[#C17B58]" />
                </div>
                <h3 className="card-title text-cream mb-2 font-medium">Port Terminal Staging</h3>
                <p className="font-sans text-xs sm:text-sm text-foam/75 leading-relaxed font-light">
                  Pre-allocated electrical plug-in berths at JNPT Nhava Sheva and Mundra, enabling unbroken refrigeration during customs seals and vessel hold placement.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-sans text-[#C17B58] font-semibold">
                JNPT & Mundra Corridors
              </div>
            </div>

            <div className="glass glass-hover rounded-4xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-md">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="card-title text-cream mb-2 font-medium">Analytical Lab Assay</h3>
                <p className="font-sans text-xs sm:text-sm text-foam/75 leading-relaxed font-light">
                  Equipped with digital NIR moisture analysers, ASTA extractors, and calibrated testing protocols for piperine and curcumin bioactive quantification.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-sans text-white font-semibold">
                ISO 17025 Compliant Screening
              </div>
            </div>
          </div>
        </div>

        {/* 4. Timeline of Milestones */}
        <div className="mb-28" data-reveal="up">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow block mb-3 text-saffron">Evolutionary Journey</span>
            <h2 className="section-title text-cream">
              Milestones in Global Agro-Logistics
            </h2>
            <p className="font-sans text-sm text-foam/75 font-light mt-3">
              A decade of engineering reliable agricultural supply lines between Indian farms and world markets.
            </p>
          </div>

          <div className="relative border-l border-white/15 ml-3 sm:ml-8 pl-5 sm:pl-10 space-y-8 sm:space-y-12">
            {milestones.map((m, index) => (
              <div key={m.year} className="relative group">
                {/* Milestone Node */}
                <div className="absolute -left-[27px] sm:-left-[47px] top-1 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-navy border-2 border-saffron flex items-center justify-center shadow-glow">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-saffron" />
                </div>

                <div className="p-5 sm:p-8 rounded-3xl sm:rounded-4xl glass glass-hover border border-white/10 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-saffron text-sm font-bold bg-saffron/10 px-3 py-1 rounded-full border border-saffron/30">
                      {m.year}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-cream font-medium">
                      {m.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-foam/80 font-light leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Executive Leadership & Governance */}
        <div className="glass rounded-4xl p-8 sm:p-12 mb-20 border border-white/10 shadow-float" data-reveal="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <span className="eyebrow text-saffron block mb-1">Corporate Stewardship</span>
              <h2 className="font-display text-2xl sm:text-3xl text-cream font-normal">
                Executive Leadership & Operations Desk
              </h2>
            </div>
            <span className="text-xs font-sans font-semibold bg-saffron/15 text-saffron-light border border-saffron/30 px-4 py-1.5 rounded-full self-start sm:self-auto">
              Verified Entity Placeholder
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="p-6 rounded-3xl bg-white/5 border border-white/8 flex flex-col justify-between hover:border-saffron/30 transition-colors"
              >
                <div>
                  <span className="text-saffron font-bold uppercase tracking-wider block mb-1 text-[11px]">
                    {leader.title}
                  </span>
                  <span className="text-cream text-lg font-display block mb-1">
                    {leader.name}
                  </span>
                  <span className="text-foam/50 text-[11px] block mb-3 font-mono">
                    {leader.role}
                  </span>
                  <p className="font-light text-foam/75 leading-relaxed text-xs">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CTA to Contact */}
        <div className="text-center p-12 rounded-4xl glass border border-white/10" data-reveal="up">
          <h2 className="font-display text-2xl sm:text-4xl text-cream font-normal mb-4">
            Discuss Your Import Procurement Schedule
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 max-w-xl mx-auto mb-8 font-light">
            Contact our trade logistics directors for custom freight estimates, harvest calendars, and laboratory certification dossiers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?type=quote"
              className="btn-primary text-xs px-8 py-4 min-h-[48px] inline-flex items-center gap-2"
            >
              <span>Connect with Commercial Trade Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="btn-ghost text-xs px-8 py-4 min-h-[48px] inline-flex items-center gap-2"
            >
              <span>Browse Export Portfolio</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

import React from "react";
import { PageHeroVideo } from "@/components/media/PageHeroVideo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { SITE_CONFIG } from "@/data/site";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Anchor,
  Compass,
  Radio,
  Warehouse,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Exporter Desk & Request Quotation | JILO Global",
  description:
    "Direct commercial trade desk for container allocations, FOB/CIF price inquiries, and commercial lab samples.",
};

interface ContactPageProps {
  searchParams: Promise<{
    product?: string;
    type?: string;
    port?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { product, type, port } = await searchParams;

  const validEnquiryType =
    type === "sample" || type === "contract" ? (type as "sample" | "contract") : "quote";

  return (
    <div className="bg-navy text-cream min-h-screen">
      {/* 1. Cinematic Dedicated Page Hero Video */}
      <PageHeroVideo
        videoSrc="/video/pages/contact.mp4"
        badgeIcon={<Anchor className="w-3.5 h-3.5 text-saffron" />}
        badgeText="Direct B2B Procurement Desk • Maritime Trade"
        title="Initiate a Trade Inquiry or"
        highlightedTitle="Sample Allotment Request"
        description="Connect directly with our maritime export operations team. We evaluate volume, seasonal availability, and destination phytosanitary compliance to provide firm commercial quotations within 24 hours."
        breadcrumbs={[{ label: "Commercial Trade Desk" }]}
        metrics={[
          { value: "<2h", label: "Response Window" },
          { value: "FOB / CIF", label: "IncoTerms 2020" },
          { value: "Air Courier", label: "Sample Allotments" },
          { value: "Valsaravakkam", label: "Chennai HQ Desk" },
        ]}
        primaryCtaText="Complete RFQ Form"
        primaryCtaHref="#rfq-form"
      />

      <div id="rfq-form" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* 2. Split Layout: Form & Verified Contact Desks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Enquiry Form (lg:col-span-7) */}
          <div className="lg:col-span-7" data-reveal="right">
            <EnquiryForm
              initialProduct={product}
              initialType={validEnquiryType}
              initialPort={port}
            />
          </div>

          {/* Contact Details & Operations Desks (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6" data-reveal="left">
            
            {/* Commercial Operations Desk Card */}
            <div className="glass rounded-3xl sm:rounded-4xl p-6 sm:p-8 md:p-10 border border-white/10 space-y-6">
              <h2 className="font-display text-2xl text-cream font-normal pb-4 border-b border-white/10">
                Operations & Booking Desk
              </h2>

              <div className="space-y-5 text-xs sm:text-sm font-sans text-foam/80">
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-foam/50 block text-[11px] uppercase tracking-wider font-semibold">
                      Direct Trade Email
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-cream hover:text-saffron transition-colors font-medium text-sm block mt-0.5"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                {/* Sales Desk Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-foam/50 block text-[11px] uppercase tracking-wider font-semibold">
                      Commercial Sales Desk
                    </span>
                    <span className="text-cream font-medium text-sm block mt-0.5">
                      {SITE_CONFIG.contact.salesDesk}
                    </span>
                  </div>
                </div>

                {/* Emergency Reefer Telemetry Desk */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-teal/15 border border-teal/30 flex items-center justify-center text-teal shrink-0 mt-0.5">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-foam/50 block text-[11px] uppercase tracking-wider font-semibold">
                      Port Dispatch & Reefer Telemetry Desk
                    </span>
                    <span className="text-cream font-medium text-sm block mt-0.5">
                      {SITE_CONFIG.contact.emergencyLogistics}
                    </span>
                  </div>
                </div>

                {/* Registered Office */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-foam/50 block text-[11px] uppercase tracking-wider font-semibold">
                      Registered Export House
                    </span>
                    <span className="text-cream font-light block leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.registeredOffice}
                    </span>
                  </div>
                </div>

                {/* Packing Facility */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-teal/15 border border-teal/30 flex items-center justify-center text-teal shrink-0 mt-0.5">
                    <Warehouse className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-foam/50 block text-[11px] uppercase tracking-wider font-semibold">
                      Central Cold Hub Packhouse
                    </span>
                    <span className="text-cream font-light block leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.packingFacility}
                    </span>
                  </div>
                </div>

                {/* Business Hours Display */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-foam/15 border border-foam/30 flex items-center justify-center text-foam shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-foam/50 block text-[11px] uppercase tracking-wider font-semibold">
                      Commercial Hours & Operations
                    </span>
                    <span className="text-cream font-light block leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.businessHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Location Map Box - Valasaravakkam, Chennai */}
            <div className="glass rounded-4xl p-7 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E6C687]">
                  <Compass className="w-4 h-4 text-[#E6C687]" />
                  <span className="uppercase tracking-wider font-semibold">Headquarters &amp; Maritime Port</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/15 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  Chennai Hub · INMAA
                </span>
              </div>

              {/* Embedded Google Map */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-[#090E1A]">
                <iframe
                  title="JILO Headquarters Location Map - Valasaravakkam, Chennai"
                  src="https://maps.google.com/maps?q=Valasaravakkam%2C%20Chennai%2C%20Tamil%20Nadu%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(92%) hue-rotate(180deg) contrast(110%) brightness(85%)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-sans text-slate-400 pt-1">
                <span>Valasaravakkam, Chennai: 13.0403° N, 80.1723° E</span>
                <span className="text-emerald-400 font-semibold">Port: Chennai / Ennore</span>
              </div>
            </div>

            {/* 24/7 WhatsApp Direct Desk */}
            <div className="glass rounded-4xl p-8 border border-white/10 space-y-4">
              <span className="eyebrow text-[#E6C687] block">Direct Senior Trade Desk</span>
              <h3 className="font-display text-xl text-white font-normal">
                Instant WhatsApp Commercial Line
              </h3>
              <p className="font-sans text-xs text-slate-300 font-light leading-relaxed">
                Connect directly with our senior export logistics directors for real-time spot CIF container rate confirmation and vessel booking status.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hello%20JILO%20Agro-Exports,%20I%20am%20an%20international%20buyer%20requesting%20spot%20CIF%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center text-xs py-3.5 min-h-[48px] rounded-full bg-[#25D366] text-black font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Open 24/7 WhatsApp Desk</span>
              </a>
            </div>

            {/* Trade Confidentiality Notice */}
            <div className="p-5 rounded-3xl glass border border-white/5 text-[11px] font-sans text-foam/60 leading-relaxed font-light">
              * Confidentiality Notice: Trade communications, FOB/CIF quote matrices, and phytosanitary certificates are conducted strictly under commercial non-disclosure and IncoTerms 2020 international guidelines.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

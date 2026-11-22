"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles, CheckCircle2, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { CATEGORIES } from "@/data/categories";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";
import { DottedBrandScatter } from "@/components/ui/DottedBrandScatter";

export function Footer() {
  const [isTenderOpen, setIsTenderOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="relative bg-[#0B3B82]/95 backdrop-blur-2xl text-white overflow-hidden border-t border-white/20 font-sans">
      {/* Top Crimson Shimmer Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF1E27]/60 to-transparent" />

      {/* Main Multi-Column Grid */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ── Col 1: Brand & Market Intelligence (4 cols) ── */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl border border-[#E50914]/50 bg-[#0A2E5C] flex items-center justify-center shadow-md group-hover:border-[#E50914] transition-all">
                <span className="font-display text-xl font-bold text-[#E50914]">J</span>
              </div>
              <div>
                <span className="font-display text-2xl text-white font-bold tracking-widest block leading-none">
                  JILO
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#E50914] font-semibold block mt-1">
                  Global Agro-Exports
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 font-light leading-relaxed max-w-sm">
              International B2B maritime export trading house specializing in single-origin spices, hydro-cooled vegetables, and Global-GAP certified tropical fruits with end-to-end cold chain traceability.
            </p>

            {/* Newsletter Spot Rate Subscription */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-2">
                Monthly Spot CIF &amp; Market Intelligence Digest
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter corporate email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#0A2E5C] border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E50914]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-xs font-bold text-white transition-all shrink-0 cursor-pointer shadow-md"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <div className="text-[11px] text-emerald-300 flex items-center gap-1.5 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Subscribed to monthly CIF rate bulletins.
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-300 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>APEDA · FSSAI · US-FDA · Global-GAP Export Supply Chains</span>
            </div>
          </div>

          {/* ── Col 2: Navigation (2 cols) ── */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#E50914] mb-5 block">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-300 hover:text-white transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Commodities (2 cols) ── */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#E50914] mb-5 block">
              Commodities
            </h3>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-slate-300 hover:text-white transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-[#E50914] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/products" className="text-xs uppercase tracking-wider text-[#E50914] hover:underline transition-colors font-semibold">
                  Full Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 4: Registered Office & Interactive Location Map (4 cols) ── */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#E50914]">
                Headquarters &amp; Location
              </h3>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Valasaravakkam,+Chennai,+Tamil+Nadu,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#E50914] hover:underline flex items-center gap-1"
              >
                <span>View on Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Address Details */}
            <div className="p-4 rounded-2xl bg-[#0A2E5C]/85 border border-white/20 space-y-2 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-white block font-semibold">JILO Global Agro-Exports</strong>
                  <span>Valasaravakkam, Chennai, Tamil Nadu 600087, India</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                <span>{SITE_CONFIG.contact.salesDesk}</span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-[#0A2E5C]">
              <iframe
                title="JILO Headquarters Location Map - Valasaravakkam, Chennai, Tamil Nadu"
                src="https://maps.google.com/maps?q=Valasaravakkam%2C%20Chennai%2C%20Tamil%20Nadu%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(92%) hue-rotate(180deg) contrast(110%) brightness(85%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Legal Strip & Back to Top */}
      <div className="border-t border-white/15 py-4 bg-[#041630]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden md:inline">
              VALASARAVAKKAM, CHENNAI, TAMIL NADU · REGISTERED APEDA EXPORTER
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-white/20 bg-white/10 text-slate-200 hover:border-[#E50914] hover:text-[#E50914] transition-all cursor-pointer shadow-sm ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Interactive Dotted Brand Particles ── */}
      <div className="w-full bg-[#031124] border-t border-white/10 py-2 px-2 sm:px-6 overflow-hidden">
        <DottedBrandScatter text="JILO EXPORTS" />
      </div>

      {/* Global Footer Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </footer>
  );
}

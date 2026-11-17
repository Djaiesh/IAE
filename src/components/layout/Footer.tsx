"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, ArrowUp, Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { CATEGORIES } from "@/data/categories";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";

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
    <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">
      {/* Top Gold Shimmer Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E6C687]/30 to-transparent" />

      {/* Editorial Closing Banner */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-12 border-b border-white/10" data-reveal="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="eyebrow block mb-3 text-[#E6C687]">Direct Origin Sea Freight</span>
            <h2 className="font-display text-4xl sm:text-6xl text-white font-normal tracking-tight leading-none">
              {SITE_CONFIG.editorialClosingLine}
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsTenderOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E6C687] to-[#C29B4D] text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Request Spot RFQ</span>
            </button>
            <button
              onClick={scrollToTop}
              className="p-3.5 rounded-full border border-white/15 bg-white/5 text-slate-300 hover:border-[#E6C687] hover:text-[#E6C687] transition-all cursor-pointer shadow-sm"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Maritime Ticker Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/5" data-stagger>
          <div className="p-5 rounded-3xl bg-[#070B13] border border-white/10 flex items-center gap-4">
            <div className="font-display text-3xl sm:text-4xl text-[#E6C687] font-bold tabular-nums">
              180+
            </div>
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-white font-semibold block">
                MT Monthly Volume
              </span>
              <span className="text-[11px] text-slate-400 font-light block">
                Continuous FCL &amp; LCL Reefer Shipments
              </span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#070B13] border border-white/10 flex items-center gap-4">
            <div className="font-display text-3xl sm:text-4xl text-emerald-400 font-bold tabular-nums">
              28
            </div>
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-white font-semibold block">
                International Berths
              </span>
              <span className="text-[11px] text-slate-400 font-light block">
                Direct Scheduled Liner Connections
              </span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#070B13] border border-white/10 flex items-center gap-4">
            <div className="font-display text-3xl sm:text-4xl text-sky-400 font-bold tabular-nums">
              100%
            </div>
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-white font-semibold block">
                Cold Chain Custody
              </span>
              <span className="text-[11px] text-slate-400 font-light block">
                Satellite GPS &amp; Pulp Data Logging
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Grid */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Block */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl border border-[#E6C687]/40 bg-[#090E1A] flex items-center justify-center shadow-md">
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                  <path d="M6 26 L16 6 L26 26" stroke="#E6C687" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 20 L22 20" stroke="#DFC08A" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <span className="font-display text-2xl text-white font-bold tracking-widest block">JILO</span>
                <span className="text-[10px] tracking-eyebrow uppercase text-[#E6C687] font-sans">Global Agro-Exports</span>
              </div>
            </Link>

            <p className="font-sans text-sm text-slate-400 font-light leading-relaxed max-w-sm">
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
                  className="w-full bg-[#070B13] border border-white/15 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E6C687]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-[#E6C687] hover:text-black text-xs font-bold text-white transition-all shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Subscribed to monthly CIF rate bulletins.
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-sans text-emerald-400 pt-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>APEDA · FSSAI · US-FDA · Global-GAP Export Supply Chains</span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="eyebrow mb-5 block text-[#E6C687]">Explore</h3>
            <ul className="space-y-3 font-sans text-sm">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-[#E6C687] transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="eyebrow mb-5 block text-[#E6C687]">Commodities</h3>
            <ul className="space-y-3 font-sans text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-slate-400 hover:text-[#E6C687] transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-[#E6C687] opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/products" className="font-sans text-xs uppercase tracking-wider text-[#E6C687] hover:underline transition-colors font-semibold">
                  Full Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Trade Operations */}
          <div>
            <h3 className="eyebrow mb-5 block text-[#E6C687]">Trade Desk</h3>
            <ul className="space-y-4 font-sans text-xs text-slate-400 font-light">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#E6C687] shrink-0 mt-0.5" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-[#E6C687] transition-colors break-all">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#E6C687] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.salesDesk}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E6C687] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{SITE_CONFIG.contact.registeredOffice}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E6C687] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.businessHours}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Legal Strip */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs text-slate-500">
          <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. All international trade rights reserved.</span>
          <span className="text-slate-600">
            Registered APEDA &amp; FSSAI Agro-Exporter · Sovereign Direct Origin Logistics
          </span>
        </div>
      </div>

      {/* Global Footer Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </footer>
  );
}

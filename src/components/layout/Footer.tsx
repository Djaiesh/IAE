"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <footer className="relative bg-[#061820]/95 backdrop-blur-2xl text-white overflow-hidden border-t border-[#B8D0CE]/20 font-sans">
      {/* Top Copper Shimmer Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C17B58]/50 to-transparent" />

      {/* Main Multi-Column Grid */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ── Col 1: Brand & Market Intelligence (4 cols) ── */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full border border-[#C17B58]/60 bg-[#061820] overflow-hidden shadow-md group-hover:border-[#C17B58] transition-all flex items-center justify-center p-1">
                <Image
                  src="/images/atlanta-logo.jpg"
                  alt="ATLANTA Logo"
                  fill
                  className="object-contain p-0.5"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="font-display text-2xl text-white font-bold tracking-widest block leading-none group-hover:text-[#C17B58] transition-colors">
                  ATLANTA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#C17B58] font-semibold block mt-1">
                  Import and Export
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
                  className="w-full bg-[#0E333C] border border-[#B8D0CE]/25 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#C17B58]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#C17B58] hover:bg-[#D68C66] text-xs font-bold text-white transition-all shrink-0 cursor-pointer shadow-md"
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C17B58] mb-5 block">
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
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C17B58] mb-5 block">
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
                    <span className="text-[10px] text-[#C17B58] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/products" className="text-xs uppercase tracking-wider text-[#C17B58] hover:underline transition-colors font-semibold">
                  Full Catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 4: Registered Office & Interactive Location Map (4 cols) ── */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C17B58]">
                Headquarters &amp; Location
              </h3>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Valasaravakkam,+Chennai,+Tamil+Nadu,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#C17B58] hover:underline flex items-center gap-1"
              >
                <span>View on Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Address Details */}
            <div className="p-4 rounded-2xl bg-[#164A55]/85 border border-[#B8D0CE]/25 space-y-2 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C17B58] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-white block font-semibold">ATLANTA Import and Export</strong>
                  <span>Valasaravakkam, Chennai, Tamil Nadu 600087, India</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#C17B58] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#C17B58] shrink-0" />
                <span>{SITE_CONFIG.contact.salesDesk}</span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#B8D0CE]/20 shadow-xl bg-[#0E333C]">
              <iframe
                title="ATLANTA Headquarters Location Map - Valasaravakkam, Chennai, Tamil Nadu"
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
      <div className="border-t border-[#B8D0CE]/15 py-4 bg-[#041117]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-[11px]">
              Built by <strong className="text-[#C17B58] font-semibold">freelanceXpress</strong> — Empowering Global Commerce with High-Performance Digital Solutions
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-[#B8D0CE]/20 bg-white/10 text-slate-200 hover:border-[#C17B58] hover:text-[#C17B58] transition-all cursor-pointer shadow-sm ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Interactive Dotted Brand Particles ── */}
      <div className="w-full bg-[#041117] border-t border-[#B8D0CE]/10 py-2 px-2 sm:px-6 overflow-hidden">
        <DottedBrandScatter text="ATLANTA IMPORT AND EXPORT" />
      </div>

      {/* Global Footer Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </footer>
  );
}

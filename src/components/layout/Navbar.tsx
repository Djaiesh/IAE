"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTenderOpen, setIsTenderOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { 
    setMobileOpen(false); 
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500",
          isScrolled
            ? "top-0 left-0 right-0 py-3 bg-black/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "top-3 sm:top-4 left-3 right-3 sm:left-5 sm:right-5 py-2.5 sm:py-3 bg-black/75 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
        )}
      >
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 w-full">

            {/* ── LEFT: Contact & Quick Desk Pill (Extreme Left Corner) ── */}
            <div className="flex items-center gap-2 justify-start shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-white text-xs font-medium transition-all cursor-pointer group shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Contact Desk</span>
                <Phone className="w-3.5 h-3.5 text-[#E6C687] group-hover:rotate-12 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => setIsTenderOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E6C687]/15 hover:bg-[#E6C687]/25 border border-[#E6C687]/30 text-[#E6C687] text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3 h-3" />
                <span>Instant Quote</span>
              </button>
            </div>

            {/* ── CENTER: Floating Navigation Pill (Centered in Middle) ── */}
            <nav className="hidden lg:flex items-center justify-center flex-1 px-4" aria-label="Main Navigation">
              <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-inner">
                {SITE_CONFIG.navItems.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative px-4 py-1.5 text-xs font-sans uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer",
                        isActive
                          ? "text-[#E6C687] bg-[#E6C687]/15 border border-[#E6C687]/30 font-bold shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-white/5 font-medium"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* ── RIGHT: Theme Toggle & JILO Brand Logo (Extreme Right Corner) ── */}
            <div className="flex items-center gap-3 justify-end shrink-0">
              <ThemeToggle />

              <Link href="/" aria-label="JILO Global Agro-Exports Home" className="flex items-center gap-3 group">
                <div className="text-right hidden sm:block">
                  <span className="font-display text-2xl font-bold text-white block leading-none tracking-widest group-hover:text-[#E6C687] transition-colors">
                    JILO
                  </span>
                  <span className="text-[9px] tracking-widest uppercase text-[#E6C687] font-sans font-medium block mt-0.5">
                    Agro-Exports
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E6C687]/40 bg-[#090E1A] shadow-md group-hover:border-[#E6C687] transition-all">
                  <span className="font-display text-lg font-bold text-[#E6C687]">J</span>
                </div>
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full border border-white/10 bg-white/5 text-white hover:border-[#E6C687]/50 transition-colors focus:outline-none cursor-pointer"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X className="w-5 h-5 text-[#E6C687]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer (Pure Black & Curved Glass) ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-500",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setMobileOpen(false)} />
      </div>

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full sm:w-96 lg:hidden transition-transform duration-500 ease-in-out bg-[#040406] border-l border-white/10",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative h-full flex flex-col pt-24 px-6 pb-10 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <span className="font-display text-2xl font-bold text-white tracking-widest">JILO</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6C687] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              Navigation
            </span>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {SITE_CONFIG.navItems.map((item, i) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-3.5 px-4 rounded-2xl border transition-all font-display text-lg",
                    isActive
                      ? "text-[#E6C687] border-[#E6C687]/40 bg-[#E6C687]/10"
                      : "text-slate-300 border-white/5 hover:border-white/20 hover:bg-white/5"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#E6C687]/60">0{i + 1}.</span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 mt-auto flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setIsTenderOpen(true);
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E6C687] to-[#C29B4D] text-black font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Spot Quote</span>
            </button>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs uppercase tracking-wider text-center transition-colors cursor-pointer"
            >
              Contact Commercial Desk
            </Link>

            <div className="text-center text-[10px] text-slate-500 font-mono mt-2">
              Trade Desk: {SITE_CONFIG.contact.salesDesk}
            </div>
          </div>
        </div>
      </div>

      {/* Global RFQ Tender Modal */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
      />
    </>
  );
}

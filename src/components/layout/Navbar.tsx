"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function InstagramGradientIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="igGradientNavbar" cx="20%" cy="115%" r="140%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="10%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="65%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      {/* Instagram Gradient Rounded Square */}
      <rect width="24" height="24" rx="6.5" fill="url(#igGradientNavbar)" />
      {/* Camera Outer Rounded Square */}
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="#ffffff" strokeWidth="1.8" fill="none" />
      {/* Center Lens */}
      <circle cx="12" cy="12" r="3.8" stroke="#ffffff" strokeWidth="1.8" fill="none" />
      {/* Flash Dot */}
      <circle cx="16.5" cy="7.5" r="1.1" fill="#ffffff" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            ? "top-0 left-0 right-0 py-3 bg-[#040810]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "top-3 sm:top-4 left-3 right-3 sm:left-5 sm:right-5 py-2.5 sm:py-3 bg-[#070D18]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
        )}
      >
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 w-full">

            {/* ── LEFT: JILO Brand Logo & Name Only (No Extra Clutter) ── */}
            <div className="flex items-center gap-3 justify-start shrink-0">
              <Link href="/" aria-label="JILO Global Agro-Exports Home" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E6C687]/40 bg-[#090E1A] shadow-md group-hover:border-[#E6C687] transition-all">
                  <span className="font-display text-lg font-bold text-[#E6C687]">J</span>
                </div>
                <div className="text-left hidden sm:block">
                  <span className="font-display text-2xl font-bold text-white block leading-none tracking-widest group-hover:text-[#E6C687] transition-colors">
                    JILO
                  </span>
                  <span className="text-[9px] tracking-widest uppercase text-[#E6C687] font-sans font-medium block mt-0.5">
                    Agro-Exports
                  </span>
                </div>
              </Link>
            </div>

            {/* ── CENTER: Floating Navigation Pills ── */}
            <nav className="hidden lg:flex items-center justify-center flex-1 px-2" aria-label="Main Navigation">
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

            {/* ── RIGHT: Theme Toggle, Instagram Icon & WhatsApp Contact Button ── */}
            <div className="flex items-center gap-2 sm:gap-3 justify-end shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Instagram Link with Authentic Gradient Logo */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JILO Instagram Profile"
                className="p-1.5 sm:p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-pink-500/40 transition-all cursor-pointer flex items-center justify-center hover:scale-105 shadow-sm"
              >
                <InstagramGradientIcon className="w-5 h-5 rounded-md" />
              </a>

              {/* Contact Button with Green WhatsApp Icon */}
              <a
                href="https://wa.me/919876543210?text=Hello%20JILO%20Agro-Exports%2C%20I%20would%20like%20to%20connect%20regarding%20export%20inquiries."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact JILO on WhatsApp"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] transition-all cursor-pointer shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:scale-105"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] text-black flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle className="w-3 h-3 fill-black text-black" />
                </div>
                <span className="text-xs font-bold font-sans tracking-wide text-white">Contact</span>
              </a>

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

      {/* ── Mobile Drawer ── */}
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
          "fixed inset-y-0 right-0 z-40 w-full sm:w-96 lg:hidden transition-transform duration-500 ease-in-out bg-[#040810] border-l border-white/10",
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
            <a
              href="https://wa.me/919876543210?text=Hello%20JILO%20Agro-Exports%2C%20I%20would%20like%20to%20connect%20regarding%20export%20inquiries."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3.5 rounded-full border border-[#25D366]/50 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#25D366] text-black flex items-center justify-center shrink-0">
                <MessageCircle className="w-3.5 h-3.5 fill-black text-black" />
              </div>
              <span>Contact on WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-4 py-1">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white text-xs font-sans font-medium"
              >
                <InstagramGradientIcon className="w-4 h-4 rounded-sm" />
                <span>Follow on Instagram</span>
              </a>
            </div>

            <div className="text-center text-[10px] text-slate-500 font-mono mt-1">
              Trade Desk: {SITE_CONFIG.contact.salesDesk}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

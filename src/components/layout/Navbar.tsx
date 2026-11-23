"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";


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
            ? "top-0 left-0 right-0 py-3 bg-[#061820]/95 backdrop-blur-2xl border-b border-[#B8D0CE]/20 shadow-[0_10px_35px_rgba(3,12,16,0.6)]"
            : "top-3 sm:top-4 left-3 right-3 sm:left-5 sm:right-5 py-2.5 sm:py-3 bg-[#0E333C]/85 backdrop-blur-xl border border-[#B8D0CE]/25 rounded-full shadow-[0_10px_35px_rgba(3,12,16,0.5)]"
        )}
      >
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 w-full">

            {/* ── LEFT: ATLANTA Brand Logo & Name Only ── */}
            <div className="flex items-center gap-3 justify-start shrink-0">
              <Link href="/" aria-label="ATLANTA Import and Export Home" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C17B58]/60 bg-[#061820] shadow-md group-hover:border-[#C17B58] transition-all flex items-center justify-center p-1">
                  <Image
                    src="/images/atlanta-logo.jpg"
                    alt="ATLANTA Logo"
                    fill
                    className="object-contain p-0.5"
                    sizes="44px"
                    priority
                  />
                </div>
                <div className="text-left hidden sm:block">
                  <span className="font-display text-2xl font-bold text-white block leading-none tracking-widest group-hover:text-[#C17B58] transition-colors">
                    ATLANTA
                  </span>
                  <span className="text-[9px] tracking-widest uppercase text-[#C17B58] font-sans font-medium block mt-0.5">
                    Import and Export
                  </span>
                </div>
              </Link>
            </div>

            {/* ── CENTER: Floating Navigation Pills ── */}
            <nav className="hidden lg:flex items-center justify-center flex-1 px-2" aria-label="Main Navigation">
              <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#061820]/75 border border-[#B8D0CE]/15 backdrop-blur-xl shadow-inner">
                {SITE_CONFIG.navItems.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative px-4 py-1.5 text-xs font-sans uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer",
                        isActive
                          ? "text-[#C17B58] bg-[#C17B58]/15 border border-[#C17B58]/30 font-bold shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-white/5 font-medium"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* ── RIGHT: Instagram Icon & WhatsApp Contact Button ── */}
            <div className="flex items-center gap-2 sm:gap-3 justify-end shrink-0">

              {/* Instagram Link with Authentic Gradient Logo */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ATLANTA Instagram Profile"
                className="p-1.5 sm:p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-pink-500/40 transition-all cursor-pointer flex items-center justify-center hover:scale-105 shadow-sm"
              >
                <InstagramGradientIcon className="w-5 h-5 rounded-md" />
              </a>

              {/* WhatsApp Contact Button */}
              <a
                href="https://wa.me/919876543210?text=Hello%20ATLANTA%20Import%20and%20Export%2C%20I%20would%20like%20to%20connect%20regarding%20export%20inquiries."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact ATLANTA on WhatsApp"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] transition-all cursor-pointer shadow-[0_0_15px_rgba(37,211,102,0.2)] hover:scale-105"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-xs font-bold font-sans tracking-wide text-white">Contact</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full border border-[#B8D0CE]/20 bg-white/5 text-white hover:border-[#C17B58]/50 transition-colors focus:outline-none cursor-pointer"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X className="w-5 h-5 text-[#C17B58]" /> : <Menu className="w-5 h-5" />}
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
        <div className="absolute inset-0 bg-[#061820]/90 backdrop-blur-3xl" onClick={() => setMobileOpen(false)} />
      </div>

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full sm:w-96 lg:hidden transition-transform duration-500 ease-in-out bg-[#0E333C] border-l border-[#B8D0CE]/20",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative h-full flex flex-col pt-24 px-6 pb-10 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C17B58]/60 bg-[#061820] shadow-md flex items-center justify-center p-0.5">
                <Image
                  src="/images/atlanta-logo.jpg"
                  alt="ATLANTA Logo"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <span className="font-display text-2xl font-bold text-white tracking-widest">ATLANTA</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C17B58] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
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
                      ? "text-[#C17B58] border-[#C17B58]/40 bg-[#C17B58]/10"
                      : "text-slate-300 border-white/5 hover:border-white/20 hover:bg-white/5"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#C17B58]/60">0{i + 1}.</span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 mt-auto flex flex-col gap-3">
            <a
              href="https://wa.me/919876543210?text=Hello%20ATLANTA%20Import%20and%20Export%2C%20I%20would%20like%20to%20connect%20regarding%20export%20inquiries."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3.5 rounded-full border border-[#25D366]/50 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
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

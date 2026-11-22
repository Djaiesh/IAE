"use client";

import React, { useState, useEffect } from "react";
import { FileText, PhoneCall, Calculator, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import { ProcurementTenderModal, TenderPreFill } from "./ProcurementTenderModal";
import { cn } from "@/lib/utils";

export function FloatingRFQDock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preFill, setPreFill] = useState<TenderPreFill | undefined>(undefined);
  const [hideAtFooter, setHideAtFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideAtFooter(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleOpenTender = (fill?: TenderPreFill) => {
    setPreFill(fill);
    setIsModalOpen(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello JILO Global Agro-Exports Desk, I am an international procurement buyer inquiring about current spot availability and CIF rates for export commodities."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Action Dock Container */}
      <aside
        aria-label="Quick Procurement & Trade Desk"
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 transition-all duration-300",
          hideAtFooter
            ? "opacity-0 pointer-events-none translate-y-8 scale-95"
            : "opacity-100 pointer-events-auto translate-y-0 scale-100"
        )}
      >
        {/* Expanded Quick Options Menu */}
        {isExpanded && (
          <div className="flex flex-col gap-2 p-3 rounded-3xl bg-[#0E4E9E]/95 backdrop-blur-2xl border border-white/25 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300 w-64 max-w-[calc(100vw-2rem)]">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FF1E27] flex items-center justify-between">
              <span>Sovereign Trade Desk</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live 24/7
              </span>
            </div>

            <button
              onClick={() => handleOpenTender()}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FF1E27]/15 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold">Instant CIF Quote</div>
                <div className="text-[10px] text-slate-300">Calculate container rates</div>
              </div>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold">Direct WhatsApp Desk</div>
                <div className="text-[10px] text-slate-300">Instant senior trader reply</div>
              </div>
            </button>

            <button
              onClick={() => handleOpenTender({ commodity: "Full Agro-Catalog (2026 Index)" })}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold">2026 Price Index & Specs</div>
                <div className="text-[10px] text-slate-300">Download HPLC Assays</div>
              </div>
            </button>
          </div>
        )}

        {/* Primary Floating Trigger Pill */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0E4E9E]/90 backdrop-blur-2xl border border-white/25 shadow-2xl hover:border-[#FF1E27] transition-all">
          <button
            onClick={() => handleOpenTender()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF1E27] to-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_22px_rgba(255,30,39,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Request Spot Quote</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Quick Trade Menu"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Global Procurement Tender Modal */}
      <ProcurementTenderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preFill={preFill}
      />
    </>
  );
}

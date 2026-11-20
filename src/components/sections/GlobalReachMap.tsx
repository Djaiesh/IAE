"use client";

import React, { useState } from "react";
import { Anchor, Clock, Ship, Navigation, Globe, ArrowRight, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";

// Geographic coordinates on a 1000 x 500 Equirectangular Projection
const MAP_COORDINATES: Record<string, { x: number; y: number }> = {
  "port-rotterdam": { x: 504, y: 178 },
  "port-jebelali": { x: 642, y: 258 },
  "port-singapore": { x: 778, y: 326 },
  "port-newyork": { x: 288, y: 206 },
  "port-london": { x: 494, y: 172 },
};

const ORIGIN_INDIA = { x: 692, y: 278 }; // West Coast Maritime Gateway (JNPT Mumbai / Mundra)

export const GlobalReachMap = React.forwardRef<HTMLElement, { className?: string }>(
  function GlobalReachMap({ className }, ref) {
    const ports = SITE_CONFIG.destinationPorts;
    const [selectedId, setSelectedId] = useState(ports[0].id);
    const [isTenderOpen, setIsTenderOpen] = useState(false);
    const selectedPort = ports.find((p) => p.id === selectedId) || ports[0];

    const handleOpenTenderForPort = (portName: string) => {
      setIsTenderOpen(true);
    };

    return (
      <section
        ref={ref}
        id="global-reach-map"
        className={cn("relative py-24 sm:py-32 overflow-hidden bg-[#040810] text-white", className)}
      >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040810] via-[#071220] to-[#040810] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E6C687]/40 bg-black/60 backdrop-blur-xl mb-4">
            <Globe className="w-3.5 h-3.5 text-[#E6C687]" />
            <span className="text-[11px] font-sans text-[#E6C687] uppercase tracking-[0.2em] font-semibold">
              Global Maritime Freight Corridors
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Strategic International
            <span className="text-[#E6C687] italic font-light block mt-1">
              Discharge Berths & Sea Lanes
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 font-light mt-4 leading-relaxed max-w-2xl">
            Direct scheduled container liner services connecting Indian deep-water gateways (JNPT & Mundra) to major import hubs across Europe, the Middle East, Southeast Asia, and the Americas.
          </p>
        </div>

        {/* ── 01. FAMILIAR & ACCURATE MARITIME CARTOGRAPHY MAP ── */}
        <div className="relative w-full rounded-3xl sm:rounded-4xl border border-white/10 bg-[#070D18]/90 backdrop-blur-2xl p-4 sm:p-8 mb-12 shadow-2xl overflow-hidden">
          
          {/* Subtle Grid Canvas Header */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs font-sans text-slate-400">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE SHIPPING LANES: JNPT / MUNDRA GATEWAYS</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#E6C687]">
              <span>IncoTerms 2020: CIF / FOB</span>
              <span>•</span>
              <span>Reefer Telemetry Active</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[2/1] min-h-[320px] sm:min-h-[440px] flex items-center justify-center">
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-full select-none"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Nautical Lat/Long Grid Pattern */}
                <pattern id="nauticalGrid" width="80" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.7" />
                </pattern>
                
                {/* Glow Filter for Active Routes */}
                <filter id="goldRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="1000" height="500" fill="url(#nauticalGrid)" />

              {/* ── Recognized World Continental Landmasses ── */}
              {/* North & South America */}
              <path
                d="M 120 70 Q 220 50, 310 90 Q 320 150, 290 200 Q 250 240, 260 270 Q 290 320, 270 420 Q 220 440, 210 380 Q 230 310, 190 280 Q 140 220, 110 130 Z"
                fill="rgba(14, 28, 48, 0.85)"
                stroke="rgba(230, 198, 135, 0.2)"
                strokeWidth="1.2"
              />
              {/* Greenland / Iceland */}
              <path
                d="M 370 40 Q 420 30, 440 60 Q 400 90, 360 70 Z"
                fill="rgba(14, 28, 48, 0.75)"
                stroke="rgba(230, 198, 135, 0.15)"
                strokeWidth="1"
              />
              {/* Europe & Africa */}
              <path
                d="M 460 110 Q 520 90, 540 140 Q 510 170, 530 210 Q 570 260, 540 330 Q 520 430, 470 420 Q 440 360, 430 280 Q 410 210, 440 150 Z"
                fill="rgba(14, 28, 48, 0.85)"
                stroke="rgba(230, 198, 135, 0.2)"
                strokeWidth="1.2"
              />
              {/* Asia & Middle East */}
              <path
                d="M 550 140 Q 640 90, 780 100 Q 880 140, 860 230 Q 820 280, 760 300 Q 720 320, 680 290 Q 630 270, 590 240 Q 560 200, 550 140 Z"
                fill="rgba(14, 28, 48, 0.85)"
                stroke="rgba(230, 198, 135, 0.2)"
                strokeWidth="1.2"
              />
              {/* Australia & Oceania */}
              <path
                d="M 780 340 Q 850 330, 870 380 Q 850 430, 790 420 Q 760 380, 780 340 Z"
                fill="rgba(14, 28, 48, 0.85)"
                stroke="rgba(230, 198, 135, 0.2)"
                strokeWidth="1.2"
              />

              {/* ── Maritime Arcs From India to Discharge Ports ── */}
              {ports.map((port) => {
                const coord = MAP_COORDINATES[port.id] || { x: 500, y: 250 };
                const isSelected = port.id === selectedId;

                // Elevated control point for smooth oceanic great-circle arch
                const midX = (ORIGIN_INDIA.x + coord.x) / 2;
                const midY = Math.min(ORIGIN_INDIA.y, coord.y) - 45;
                const pathD = `M ${ORIGIN_INDIA.x} ${ORIGIN_INDIA.y} Q ${midX} ${midY} ${coord.x} ${coord.y}`;

                return (
                  <g key={`route-${port.id}`} className="transition-all duration-300">
                    {/* Shadow / Inactive Lane */}
                    <path
                      d={pathD}
                      stroke={isSelected ? "#E6C687" : "rgba(255, 255, 255, 0.12)"}
                      strokeWidth={isSelected ? "2.5" : "1"}
                      strokeDasharray={isSelected ? "6 4" : "3 5"}
                      fill="none"
                      filter={isSelected ? "url(#goldRouteGlow)" : undefined}
                      className={isSelected ? "animate-pulse" : ""}
                    />

                    {/* Destination Port Node */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isSelected ? "7" : "4.5"}
                      fill={isSelected ? "#E6C687" : "#10B981"}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? "2" : "1"}
                      className="cursor-pointer transition-all duration-300 hover:scale-125"
                      onClick={() => setSelectedId(port.id)}
                    />

                    {/* Pulsing Target Ring for Selected Port */}
                    {isSelected && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="14"
                        fill="none"
                        stroke="#E6C687"
                        strokeWidth="1.5"
                        opacity="0.7"
                        className="animate-ping"
                        style={{ transformOrigin: `${coord.x}px ${coord.y}px`, animationDuration: "2.2s" }}
                      />
                    )}

                    {/* Port City Label */}
                    <text
                      x={coord.x}
                      y={coord.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? "#FFFFFF" : "rgba(203, 213, 225, 0.75)"}
                      fontSize={isSelected ? "11" : "9"}
                      fontFamily="system-ui, sans-serif"
                      fontWeight={isSelected ? "700" : "500"}
                      className="cursor-pointer select-none"
                      onClick={() => setSelectedId(port.id)}
                    >
                      {port.city}
                    </text>
                  </g>
                );
              })}

              {/* Origin Node: Mumbai / JNPT / Mundra (India) */}
              <g>
                <circle cx={ORIGIN_INDIA.x} cy={ORIGIN_INDIA.y} r="8" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx={ORIGIN_INDIA.x} cy={ORIGIN_INDIA.y} r="18" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" className="animate-ping" style={{ transformOrigin: `${ORIGIN_INDIA.x}px ${ORIGIN_INDIA.y}px`, animationDuration: "3s" }} />
                <text
                  x={ORIGIN_INDIA.x}
                  y={ORIGIN_INDIA.y + 20}
                  textAnchor="middle"
                  fill="#E6C687"
                  fontSize="9.5"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="700"
                  letterSpacing="1"
                >
                  WEST COAST INDIA (JNPT / MUNDRA)
                </text>
              </g>
            </svg>
          </div>

          {/* Map Footer Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-sans text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6C687]" />
              <span className="text-white font-medium">Selected Corridor: {selectedPort.name} ({selectedPort.country})</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Primary Gateway: West Coast Terminals</span>
              <span className="text-[#E6C687] font-semibold">Click any destination port to inspect schedule</span>
            </div>
          </div>
        </div>

        {/* ── 02. INTERACTIVE PORT SELECTOR & DETAILED TELEMETRY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Port Selector Cards (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#E6C687] block mb-2">
              Select Discharge Destination Port
            </span>
            {ports.map((port) => {
              const isSelected = port.id === selectedId;
              return (
                <button
                  key={port.id}
                  onClick={() => setSelectedId(port.id)}
                  className={cn(
                    "w-full text-left p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex items-center gap-4 cursor-pointer",
                    isSelected
                      ? "bg-[#091526] border-[#E6C687] shadow-[0_8px_30px_rgba(230,198,135,0.15)] border-l-4"
                      : "bg-[#070D18]/80 border-white/5 hover:bg-white/5 hover:border-white/15"
                  )}
                >
                  <div className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 transition-colors",
                    isSelected ? "bg-[#E6C687] text-black border-[#E6C687] shadow-md" : "bg-white/5 text-slate-400 border-white/10"
                  )}>
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "font-display text-lg block truncate transition-colors", 
                      isSelected ? "text-white font-medium" : "text-slate-300"
                    )}>
                      {port.name}
                    </span>
                    <span className="font-sans text-xs text-slate-400 block">
                      {port.city}, {port.country}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] uppercase font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full shrink-0">
                    {port.region}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Port Detail Card (Right Column) */}
          <div className="lg:col-span-7">
            <div className="bg-[#070D18]/90 rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#E6C687] block mb-1">
                    Verified Shipping Route &amp; Transit Profile
                  </span>
                  <h3 className="font-display text-3xl text-white font-normal mt-1">
                    {selectedPort.name}
                  </h3>
                  <p className="font-sans text-sm text-slate-400 mt-0.5">
                    {selectedPort.city} · {selectedPort.country} ({selectedPort.region})
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#E6C687]/15 border border-[#E6C687]/30 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
                  <Navigation className="w-4 h-4 text-[#E6C687] animate-pulse" />
                  <span className="font-sans text-xs text-[#E6C687] font-semibold">
                    Scheduled Liner Service
                  </span>
                </div>
              </div>

              {/* Transit & Volume Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
                  <div className="flex items-center gap-2 text-xs font-sans text-slate-400 mb-1.5">
                    <Clock className="w-4 h-4 text-[#E6C687]" /> Typical Sea Transit
                  </div>
                  <div className="font-display text-2xl text-white font-medium">
                    {selectedPort.typicalTransitDays}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-sans">
                    Direct ocean transit from JNPT / Mundra
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
                  <div className="flex items-center gap-2 text-xs font-sans text-slate-400 mb-1.5">
                    <Ship className="w-4 h-4 text-emerald-400" /> Handling Frequency
                  </div>
                  <div className="font-display text-2xl text-white font-medium truncate">
                    {selectedPort.handlingVolume}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-sans">
                    Reefer &amp; dry container allocations
                  </div>
                </div>
              </div>

              {/* Primary Cleared Commodities */}
              <div className="mb-8">
                <span className="font-sans text-xs uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
                  Primary Cleared Commodities at this Berth:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPort.primaryCommodities.map((c, i) => (
                    <span
                      key={i}
                      className="font-sans text-xs bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E6C687] shrink-0" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs text-slate-400 font-sans">
                  Customs clearing documentation &amp; phyto clearance at discharge
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenTenderForPort(selectedPort.name)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E6C687] text-black font-sans font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request CIF Rate to {selectedPort.city}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Global RFQ Tender Modal pre-configured for this port */}
      <ProcurementTenderModal
        isOpen={isTenderOpen}
        onClose={() => setIsTenderOpen(false)}
        preFill={{
          destinationPort: `${selectedPort.name} (${selectedPort.country})`,
        }}
      />
    </section>
  );
});

GlobalReachMap.displayName = "GlobalReachMap";

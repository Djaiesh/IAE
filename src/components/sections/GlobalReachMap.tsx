"use client";

import React, { useState } from "react";
import { Anchor, Clock, Ship, Navigation, Globe, ArrowRight, Compass, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";

// Map coordinates mapped to a 1000 x 500 viewBox
const MAP_COORDINATES: Record<string, { x: number; y: number }> = {
  "port-rotterdam": { x: 495, y: 175 },
  "port-jebelali": { x: 615, y: 260 },
  "port-singapore": { x: 775, y: 345 },
  "port-newyork": { x: 275, y: 215 },
  "port-london": { x: 480, y: 168 },
};

const ORIGIN_INDIA = { x: 675, y: 300 }; // Mumbai / JNPT / Mundra Gateway

export function GlobalReachMap() {
  const ports = SITE_CONFIG.destinationPorts;
  const [selectedId, setSelectedId] = useState(ports[0].id);
  const selectedPort = ports.find((p) => p.id === selectedId) || ports[0];

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-deep to-abyss pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-16" data-reveal="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-saffron/30 bg-deep/80 backdrop-blur-xl mb-4">
            <Globe className="w-3.5 h-3.5 text-saffron" />
            <span className="eyebrow text-[10px] text-saffron tracking-widest font-semibold">
              Intercontinental Maritime Freight Corridors
            </span>
          </div>

          <h2 className="section-title text-cream">
            Strategic International
            <span className="text-saffron italic font-normal block mt-1">
              Discharge Berths
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed">
            Direct liner services and express maritime shipping lanes connecting Indian container terminals (JNPT / Mundra) to major import hubs across Europe, the Middle East, Southeast Asia, and North America.
          </p>
        </div>

        {/* ── 01. INTERACTIVE MARITIME CARTOGRAPHY (SVG WORLD MAP) ── */}
        <div className="relative w-full rounded-4xl border border-white/10 bg-abyss/90 backdrop-blur-2xl p-4 sm:p-8 mb-12 shadow-float overflow-hidden">
          
          {/* Ambient Map Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal/10 blur-[100px] pointer-events-none rounded-full" />

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[2/1] min-h-[300px] sm:min-h-[420px] flex items-center justify-center">
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-full select-none"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Latitude & Longitude Subtle Grid */}
              <defs>
                <pattern id="navGrid" width="100" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
                </pattern>
                
                {/* Glow Filter for Active Routes */}
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="1000" height="500" fill="url(#navGrid)" />

              {/* Simplified Continental Outlines */}
              {/* Americas */}
              <path
                d="M 150 120 C 180 100, 260 110, 310 160 C 330 190, 300 240, 270 270 C 250 290, 270 330, 280 370 C 290 410, 260 460, 240 440 C 220 410, 240 350, 220 310 C 190 280, 160 210, 140 180 Z"
                fill="rgba(15, 58, 92, 0.35)"
                stroke="rgba(27, 107, 124, 0.4)"
                strokeWidth="1.2"
              />
              {/* Europe & Africa */}
              <path
                d="M 460 120 C 510 100, 560 130, 540 180 C 520 200, 560 250, 540 310 C 530 360, 520 440, 480 430 C 450 410, 460 330, 440 280 C 420 230, 430 160, 460 120 Z"
                fill="rgba(15, 58, 92, 0.35)"
                stroke="rgba(27, 107, 124, 0.4)"
                strokeWidth="1.2"
              />
              {/* Asia & Australia */}
              <path
                d="M 580 130 C 660 100, 780 110, 840 170 C 890 220, 860 290, 810 320 C 760 340, 720 360, 680 340 C 640 320, 600 270, 570 220 C 560 170, 570 140, 580 130 Z"
                fill="rgba(15, 58, 92, 0.35)"
                stroke="rgba(27, 107, 124, 0.4)"
                strokeWidth="1.2"
              />
              {/* Australia */}
              <path
                d="M 780 360 C 830 350, 880 370, 870 420 C 850 450, 800 440, 770 410 C 760 380, 770 360, 780 360 Z"
                fill="rgba(15, 58, 92, 0.35)"
                stroke="rgba(27, 107, 124, 0.4)"
                strokeWidth="1.2"
              />

              {/* Maritime Shipping Arcs from India to each Destination Port */}
              {ports.map((port) => {
                const coord = MAP_COORDINATES[port.id] || { x: 500, y: 250 };
                const isSelected = port.id === selectedId;

                // Quadratic Bézier curve through an elevated control point for great-circle oceanic arch
                const midX = (ORIGIN_INDIA.x + coord.x) / 2;
                const midY = Math.min(ORIGIN_INDIA.y, coord.y) - 45;
                const pathD = `M ${ORIGIN_INDIA.x} ${ORIGIN_INDIA.y} Q ${midX} ${midY} ${coord.x} ${coord.y}`;

                return (
                  <g key={`route-${port.id}`}>
                    {/* Shadow / Inactive Lane */}
                    <path
                      d={pathD}
                      stroke={isSelected ? "#FF6B00" : "rgba(255, 255, 255, 0.12)"}
                      strokeWidth={isSelected ? "2.5" : "1"}
                      strokeDasharray={isSelected ? "6 4" : "3 6"}
                      fill="none"
                      filter={isSelected ? "url(#routeGlow)" : undefined}
                      className={isSelected ? "animate-pulse" : ""}
                    />

                    {/* Destination Port Node */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isSelected ? "7" : "4"}
                      fill={isSelected ? "#FF6B00" : "#1B6B7C"}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? "2" : "1"}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedId(port.id)}
                    />

                    {/* Pulsing ring around selected port */}
                    {isSelected && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="14"
                        fill="none"
                        stroke="#FF6B00"
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                        style={{ transformOrigin: `${coord.x}px ${coord.y}px`, animationDuration: "2s" }}
                      />
                    )}

                    {/* Port City Label */}
                    <text
                      x={coord.x}
                      y={coord.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? "#FFFFFF" : "rgba(200, 228, 238, 0.7)"}
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

              {/* Origin Node: Mumbai / JNPT / Mundra */}
              <g>
                <circle cx={ORIGIN_INDIA.x} cy={ORIGIN_INDIA.y} r="8" fill="#FF8833" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx={ORIGIN_INDIA.x} cy={ORIGIN_INDIA.y} r="18" fill="none" stroke="#FF6B00" strokeWidth="1.5" opacity="0.7" className="animate-ping" style={{ transformOrigin: `${ORIGIN_INDIA.x}px ${ORIGIN_INDIA.y}px`, animationDuration: "3s" }} />
                <text
                  x={ORIGIN_INDIA.x}
                  y={ORIGIN_INDIA.y + 22}
                  textAnchor="middle"
                  fill="#FF8833"
                  fontSize="10"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="700"
                  letterSpacing="1"
                >
                  ORIGIN (JNPT / MUNDRA)
                </text>
              </g>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-mono text-foam/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-saffron" />
              <span>Active Selection: {selectedPort.name} ({selectedPort.city}, {selectedPort.country})</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Primary Gateway: West Coast Terminals (JNPT / Mundra)</span>
              <span className="text-saffron">Click any port or button below to inspect routes</span>
            </div>
          </div>
        </div>

        {/* ── 02. INTERACTIVE PORT SELECTOR & DETAILED TELEMETRY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Port Selector Cards (Left Column) */}
          <div className="lg:col-span-5 space-y-3" data-stagger>
            <span className="eyebrow text-[11px] block mb-2 text-saffron">
              Select Discharge Destination
            </span>
            {ports.map((port) => {
              const isSelected = port.id === selectedId;
              return (
                <button
                  key={port.id}
                  onClick={() => setSelectedId(port.id)}
                  className={cn(
                    "w-full text-left p-4 sm:p-5 rounded-3xl border transition-all duration-300 flex items-center gap-4 cursor-pointer",
                    isSelected
                      ? "glass-saffron border-saffron shadow-saffron border-l-4"
                      : "glass border-white/5 hover:bg-white/5 hover:border-white/15"
                  )}
                >
                  <div className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 transition-colors",
                    isSelected ? "bg-saffron text-white border-saffron shadow-md" : "bg-deep/80 text-foam/40 border-white/10"
                  )}>
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "font-display text-lg block truncate transition-colors", 
                      isSelected ? "text-cream font-medium" : "text-foam/75"
                    )}>
                      {port.name}
                    </span>
                    <span className="font-sans text-xs text-foam/50 block">
                      {port.city}, {port.country}
                    </span>
                  </div>
                  <span className="font-sans text-[10px] uppercase font-semibold tracking-wider text-teal bg-teal/15 border border-teal/30 px-3 py-1 rounded-full shrink-0">
                    {port.region}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Port Detail Card (Right Column) */}
          <div className="lg:col-span-7" data-reveal="left">
            <div className="glass rounded-4xl p-8 sm:p-12 shadow-float border border-white/10 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
                <div>
                  <span className="eyebrow text-saffron block mb-1 text-[11px]">
                    Maritime Corridors & Liner Routing
                  </span>
                  <h3 className="font-display text-3xl text-cream font-normal mt-1">
                    {selectedPort.name}
                  </h3>
                  <p className="font-sans text-sm text-foam/60 mt-0.5">
                    {selectedPort.city} · {selectedPort.country} ({selectedPort.region})
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-saffron/10 border border-saffron/30 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
                  <Navigation className="w-4 h-4 text-saffron animate-pulse" />
                  <span className="font-sans text-xs text-saffron-light font-semibold">
                    Verified Trade Route
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/8">
                  <div className="flex items-center gap-2 text-xs font-sans text-foam/50 mb-1.5">
                    <Clock className="w-4 h-4 text-saffron" /> Typical Sea Transit
                  </div>
                  <div className="font-display text-xl text-cream font-medium">
                    {selectedPort.typicalTransitDays}
                  </div>
                  <div className="text-[11px] text-foam/50 mt-1 font-sans">
                    Liner direct / scheduled express service
                  </div>
                </div>

                <div className="p-4 rounded-3xl bg-white/5 border border-white/8">
                  <div className="flex items-center gap-2 text-xs font-sans text-foam/50 mb-1.5">
                    <Ship className="w-4 h-4 text-teal" /> Handling Frequency
                  </div>
                  <div className="font-display text-xl text-cream font-medium truncate">
                    {selectedPort.handlingVolume}
                  </div>
                  <div className="text-[11px] text-foam/50 mt-1 font-sans">
                    Temperature-controlled 20ft / 40ft Reefer
                  </div>
                </div>
              </div>

              <div>
                <span className="font-sans text-xs uppercase tracking-wider text-foam/50 block mb-3 font-semibold">
                  Primary Cleared Commodities at this Berth:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPort.primaryCommodities.map((c, i) => (
                    <span
                      key={i}
                      className="font-sans text-xs bg-abyss/80 border border-white/10 px-3.5 py-1.5 rounded-full text-foam/90 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-foam/50 font-sans">
                  Customs clearing agents available at berth
                </span>
                <a
                  href={`/contact?port=${encodeURIComponent(selectedPort.name)}&type=quote`}
                  className="font-sans text-xs uppercase tracking-wider text-saffron hover:text-saffron-light font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Request Freight Rate to {selectedPort.city}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import {
  Ship,
  Thermometer,
  Wind,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  Clock,
  Check,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import { ProcurementTenderModal, TenderPreFill } from "./ProcurementTenderModal";
import { useCard3DTilt } from "@/hooks/useScrollMetrics";

interface SeaportOption {
  id: string;
  name: string;
  region: string;
  transitDays: string;
  originPort: string;
  baseOceanFreightPerMT: number;
}

const SEAPORTS: SeaportOption[] = [
  {
    id: "rotterdam",
    name: "Rotterdam, Netherlands",
    region: "European Union (Gateway Berth)",
    transitDays: "22–24 Days",
    originPort: "JNPT Nhava Sheva",
    baseOceanFreightPerMT: 145,
  },
  {
    id: "jebel-ali",
    name: "Jebel Ali, Dubai",
    region: "GCC & Middle East Hub",
    transitDays: "3–4 Days",
    originPort: "Mundra Port",
    baseOceanFreightPerMT: 48,
  },
  {
    id: "singapore",
    name: "Singapore (PSA)",
    region: "Southeast Asia Gateway",
    transitDays: "6–7 Days",
    originPort: "JNPT / Chennai",
    baseOceanFreightPerMT: 65,
  },
  {
    id: "new-york",
    name: "New York / New Jersey",
    region: "North America (US FDA Berth)",
    transitDays: "28–30 Days",
    originPort: "JNPT Nhava Sheva",
    baseOceanFreightPerMT: 210,
  },
  {
    id: "dammam",
    name: "Dammam / King Abdulaziz",
    region: "Saudi Arabia (SFDA Berth)",
    transitDays: "5–6 Days",
    originPort: "Mundra Port",
    baseOceanFreightPerMT: 52,
  },
  {
    id: "hamburg",
    name: "Hamburg, Germany",
    region: "Central & Northern Europe",
    transitDays: "24–26 Days",
    originPort: "JNPT Nhava Sheva",
    baseOceanFreightPerMT: 155,
  },
];

interface CommodityOption {
  id: string;
  name: string;
  category: "Spices" | "Vegetables" | "Fruits";
  basePricePerMT: number;
  recommendedContainer: "20ft FCL" | "40ft CA Reefer";
  idealTemp: string;
  idealRH: string;
  payload20ftMT: number;
  payload40ftMT: number;
  curcuminOrSpec: string;
}

const COMMODITIES: CommodityOption[] = [
  {
    id: "turmeric",
    name: "Alleppey Finger Turmeric (5.0%+ Curcumin)",
    category: "Spices",
    basePricePerMT: 1850,
    recommendedContainer: "20ft FCL",
    idealTemp: "Ambient / Dry (+18°C)",
    idealRH: "60% RH Max",
    payload20ftMT: 19.0,
    payload40ftMT: 26.0,
    curcuminOrSpec: "Curcumin >= 5.0% (HPLC certified)",
  },
  {
    id: "black-pepper",
    name: "Malabar Bold Black Pepper (TGSEB Grade)",
    category: "Spices",
    basePricePerMT: 6400,
    recommendedContainer: "20ft FCL",
    idealTemp: "Dry Ventilated (+20°C)",
    idealRH: "65% RH Max",
    payload20ftMT: 16.0,
    payload40ftMT: 25.0,
    curcuminOrSpec: "Piperine >= 4.5% • Bulk Density 570 g/L",
  },
  {
    id: "red-onions",
    name: "Nashik Export Red Onions (55mm+ Hydro-Cooled)",
    category: "Vegetables",
    basePricePerMT: 520,
    recommendedContainer: "40ft CA Reefer",
    idealTemp: "+0.5°C to +1.5°C",
    idealRH: "65%–70% RH",
    payload20ftMT: 14.0,
    payload40ftMT: 28.5,
    curcuminOrSpec: "Hydro-cooled • 25kg Leno Bags",
  },
  {
    id: "green-chillies",
    name: "G4 Fresh Green Chillies (Class AAA)",
    category: "Vegetables",
    basePricePerMT: 1450,
    recommendedContainer: "40ft CA Reefer",
    idealTemp: "+7.0°C to +8.5°C",
    idealRH: "85%–90% RH",
    payload20ftMT: 10.0,
    payload40ftMT: 18.0,
    curcuminOrSpec: "Controlled Atmosphere • Ethylene Scrubbed",
  },
  {
    id: "cavendish-banana",
    name: "Fresh Cavendish Bananas (Class AAA 39-47)",
    category: "Fruits",
    basePricePerMT: 680,
    recommendedContainer: "40ft CA Reefer",
    idealTemp: "+13.2°C to +13.8°C",
    idealRH: "90%–95% RH",
    payload20ftMT: 12.5,
    payload40ftMT: 20.8,
    curcuminOrSpec: "Pre-cooled • High-Barrier Vacuum Packed",
  },
  {
    id: "alphonso-mango",
    name: "Ratnagiri Alphonso Mangoes (GI-Tagged)",
    category: "Fruits",
    basePricePerMT: 3900,
    recommendedContainer: "40ft CA Reefer",
    idealTemp: "+11.0°C to +12.5°C",
    idealRH: "85%–90% RH",
    payload20ftMT: 8.5,
    payload40ftMT: 16.0,
    curcuminOrSpec: "Vapour Heat & Hot Water Treated • APEDA Seal",
  },
];

export function ReeferFreightCalculator3D() {
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>("turmeric");
  const [selectedSeaportId, setSelectedSeaportId] = useState<string>("rotterdam");
  const [containerSize, setContainerSize] = useState<"20ft" | "40ft">("40ft");
  const [isTenderModalOpen, setIsTenderModalOpen] = useState(false);

  const commodity = COMMODITIES.find((c) => c.id === selectedCommodityId) || COMMODITIES[0];
  const seaport = SEAPORTS.find((s) => s.id === selectedSeaportId) || SEAPORTS[0];

  const payloadMT = containerSize === "20ft" ? commodity.payload20ftMT : commodity.payload40ftMT;
  const estimatedCIFPerMT = commodity.basePricePerMT + seaport.baseOceanFreightPerMT;
  const totalContainerValue = Math.round(estimatedCIFPerMT * payloadMT);

  const { tiltStyle, eventHandlers } = useCard3DTilt(6);

  const handleOpenTender = () => {
    setIsTenderModalOpen(true);
  };

  return (
    <section className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden border-t border-b border-white/15">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#0EA5E9]/10 via-[#10B981]/05 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF385C]/08 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF385C]/10 border border-[#FF385C]/25 text-[#FF385C] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive 3D Freight & Telemetry Matrix
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight">
            Live Container Freight & CIF Pricing Estimator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Model real-time ocean freight economics from India’s premier seaports (JNPT & Mundra) to global discharge berths. Select commodities, atmospheric specs, and lock spot proforma pricing.
          </p>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 01: Commodity Selector */}
            <div className="p-6 rounded-3xl bg-[#0E3C7A]/85 border border-white/20 backdrop-blur-2xl">
              <label className="block text-xs uppercase tracking-widest text-[#FF385C] font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                Step 1: Select Export Commodity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COMMODITIES.map((c) => {
                  const isSelected = c.id === selectedCommodityId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCommodityId(c.id)}
                      className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-[#FF385C]/15 border-[#FF385C] text-white shadow-lg shadow-[#FF385C]/10"
                          : "bg-white/[0.03] border-white/05 text-slate-300 hover:bg-white/[0.07] hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{c.name.split("(")[0]}</span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                          {c.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#FF385C] mt-1 font-mono">
                        {c.curcuminOrSpec}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 02: Destination Seaport Selector */}
            <div className="p-6 rounded-3xl bg-[#0E3C7A]/85 border border-white/20 backdrop-blur-2xl">
              <label className="block text-xs uppercase tracking-widest text-[#0EA5E9] font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Step 2: Choose Destination Discharge Port
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SEAPORTS.map((s) => {
                  const isSelected = s.id === selectedSeaportId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSeaportId(s.id)}
                      className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-[#0EA5E9]/15 border-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/15"
                          : "bg-white/[0.03] border-white/05 text-slate-300 hover:bg-white/[0.07] hover:border-white/15"
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{s.name.split(",")[0]}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.region.split("(")[0]}</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {s.transitDays}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 03: Container Specification & Equipment */}
            <div className="p-6 rounded-3xl bg-[#0E3C7A]/85 border border-white/20 backdrop-blur-2xl">
              <label className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                <Ship className="w-3.5 h-3.5" />
                Step 3: Container Equipment Specification
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setContainerSize("20ft")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    containerSize === "20ft"
                      ? "bg-emerald-500/15 border-emerald-400 text-white"
                      : "bg-white/[0.03] border-white/05 text-slate-300 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="text-xs font-bold">20ft Heavy FCL Dry Box</div>
                  <div className="text-[11px] text-slate-400 mt-1">Payload: ~{commodity.payload20ftMT} Metric Tons</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Spices & Dry Ambient Cargo</div>
                </button>

                <button
                  onClick={() => setContainerSize("40ft")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    containerSize === "40ft"
                      ? "bg-emerald-500/15 border-emerald-400 text-white"
                      : "bg-white/[0.03] border-white/05 text-slate-300 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="text-xs font-bold">40ft High-Cube CA Reefer</div>
                  <div className="text-[11px] text-slate-400 mt-1">Payload: ~{commodity.payload40ftMT} Metric Tons</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Fresh Produce & High-Capacity Spices</div>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive 3D Reefer HUD & Telemetry Output (5 Cols) */}
          <div
            className="lg:col-span-5 sticky top-28"
            style={tiltStyle}
            {...eventHandlers}
          >
            <div className="p-7 sm:p-8 rounded-4xl bg-gradient-to-b from-[#090E1A] to-[#04070F] border border-white/15 shadow-2xl relative overflow-hidden">
              {/* Top Specular Sheen */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF385C]/10 blur-3xl pointer-events-none" />

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#FF385C]">
                    Sovereign Logistics Telemetry
                  </div>
                  <div className="font-display text-xl text-white font-medium mt-0.5">
                    Live CIF Quotation Card
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Verified Port Rates
                </div>
              </div>

              {/* 3D Wireframe Container Visualizer Graphic */}
              <div className="relative h-44 rounded-2xl bg-[#0A2E5C]/90 border border-white/20 p-4 mb-6 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-sky-400" />
                    Temp: <strong className="text-white font-mono">{commodity.idealTemp}</strong>
                  </span>
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-emerald-400" />
                    RH: <strong className="text-white font-mono">{commodity.idealRH}</strong>
                  </span>
                </div>

                {/* Container 3D Perspective Graphic */}
                <div className="relative flex items-center justify-center my-2">
                  <div className="w-48 h-20 rounded-xl border border-sky-400/40 bg-sky-950/20 shadow-inner flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-pulse" />
                    <div className="text-center">
                      <div className="text-sky-300 font-mono text-xs font-bold tracking-wider">
                        {containerSize.toUpperCase()} CA REEFER
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {seaport.originPort} → {seaport.name.split(",")[0]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transit time bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Transit Duration:</span>
                  <span className="text-[#FF385C] font-bold">{seaport.transitDays}</span>
                </div>
              </div>

              {/* Pricing & Capacity Calculation Breakdown */}
              <div className="space-y-3.5 mb-7 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/05">
                  <span className="text-slate-400">Commodity Specification:</span>
                  <span className="text-white font-semibold text-right max-w-[200px] truncate">
                    {commodity.name}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-white/05">
                  <span className="text-slate-400">Total Container Net Payload:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {payloadMT.toFixed(1)} Metric Tons
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-white/05">
                  <span className="text-slate-400">Estimated Ocean Freight:</span>
                  <span className="text-white font-mono font-semibold">
                    ${seaport.baseOceanFreightPerMT} / MT
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Estimated CIF Spot Rate
                    </span>
                    <span className="text-[10px] text-slate-500">Includes Phytosanitary + SGS COA</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-[#FF385C]">
                      ${estimatedCIFPerMT.toLocaleString()}
                      <span className="text-xs text-slate-400 font-normal"> / MT</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      ≈ ${totalContainerValue.toLocaleString()} per FCL
                    </div>
                  </div>
                </div>
              </div>

              {/* High-Intent Lead Conversion CTA Button */}
              <button
                onClick={handleOpenTender}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF385C] via-[#FF4D6D] to-[#E11D48] text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#FF385C]/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Lock This Spot Rate & Request Proforma</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-3.5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Bank-verified proforma invoices issued within 4 business hours.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Tender Modal connected to this calculator */}
      <ProcurementTenderModal
        isOpen={isTenderModalOpen}
        onClose={() => setIsTenderModalOpen(false)}
        preFill={{
          commodity: commodity.name,
          volume: `1 x ${containerSize.toUpperCase()} FCL (${payloadMT} MT)`,
          destinationPort: seaport.name,
          incoterm: "CIF (Cost, Insurance & Freight)",
          containerType: containerSize === "20ft" ? "20ft Heavy FCL Dry Box" : "40ft High-Cube CA Reefer",
        }}
      />
    </section>
  );
}

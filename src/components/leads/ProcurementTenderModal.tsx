"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Ship,
  ArrowRight,
  Download,
  PhoneCall,
  Clock,
  Sparkles,
} from "lucide-react";

export interface TenderPreFill {
  commodity?: string;
  volume?: string;
  destinationPort?: string;
  incoterm?: string;
  containerType?: string;
}

interface ProcurementTenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preFill?: TenderPreFill;
}

export function ProcurementTenderModal({
  isOpen,
  onClose,
  preFill,
}: ProcurementTenderModalProps) {
  const [step, setStep] = useState(1);
  const [commodity, setCommodity] = useState(preFill?.commodity || "High-Curcumin Alleppey Turmeric (5.0%+)");
  const [packaging, setPackaging] = useState("25kg Double Food-Grade PP Bags");
  const [incoterm, setIncoterm] = useState(preFill?.incoterm || "CIF (Cost, Insurance & Freight)");
  const [containerType, setContainerType] = useState(preFill?.containerType || "40ft High-Cube CA Reefer");
  const [destinationPort, setDestinationPort] = useState(preFill?.destinationPort || "Rotterdam (Netherlands)");
  const [monthlyVolume, setMonthlyVolume] = useState(preFill?.volume || "2 x 40ft FCL / Month");

  const [companyName, setCompanyName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-speed B2B dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setStep(4);
    }, 900);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello JILO Global Agro-Exports Trade Desk,\n\nI am requesting an official B2B Tender / Spot Quote:\n- Commodity: ${commodity}\n- Packaging: ${packaging}\n- Volume: ${monthlyVolume}\n- Incoterm: ${incoterm}\n- Destination Port: ${destinationPort}\n- Company: ${companyName || "International Buyer"}\n- Country: ${country || "Global"}\n\nPlease share current CIF proforma index.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div className="relative z-10 w-full max-w-2xl bg-[#070B13] border border-white/15 rounded-3xl sm:rounded-4xl shadow-2xl p-6 sm:p-8 overflow-hidden my-8">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#E6C687]/15 to-transparent blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6C687]/10 border border-[#E6C687]/25 text-[#E6C687] text-xs font-semibold tracking-wider uppercase mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            Official B2B Procurement Tender
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-white font-medium">
            Request Certified Export Quotation
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Direct sovereign origin contracts • SGS/Eurofins calibrated specifications • CIF/FOB terms
          </p>
        </div>

        {/* Step Indicator */}
        {!isSuccess && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            {[
              { num: 1, label: "Commodity & Grade" },
              { num: 2, label: "Logistics & Berths" },
              { num: 3, label: "Buyer Credentials" },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2 text-xs font-medium ${
                  step === s.num
                    ? "text-[#E6C687]"
                    : step > s.num
                    ? "text-emerald-400"
                    : "text-slate-500"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s.num
                      ? "bg-[#E6C687] text-black"
                      : step > s.num
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-white/5 text-slate-400 border border-white/10"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Commodity Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Commodity & Specification Grade
              </label>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#E6C687] transition-colors"
              >
                <option value="High-Curcumin Alleppey Turmeric (5.0%+)">High-Curcumin Alleppey Turmeric (5.0%+ Curcumin)</option>
                <option value="Malabar Bold Black Pepper (TGSEB Grade)">Malabar Bold Black Pepper (TGSEB 4.75mm+)</option>
                <option value="Guntur Teja S17 Stemless Chilli (75,000+ SHU)">Guntur Teja S17 Stemless Red Chilli (75,000+ SHU)</option>
                <option value="Nashik Export-Grade Fresh Red Onions (55mm+)">Nashik Export-Grade Fresh Red Onions (55mm+ Hydro-Cooled)</option>
                <option value="G4 Fresh Green Chillies (Controlled Atmosphere)">G4 Fresh Green Chillies (CA Reefer Export)</option>
                <option value="Fresh Cavendish Bananas (Class AAA 39-47 Calibration)">Fresh Cavendish Bananas (Class AAA 39-47 Calibration)</option>
                <option value="GI-Tagged Ratnagiri Alphonso Mangoes">GI-Tagged Ratnagiri Alphonso Mangoes (Hot Water Treated)</option>
                <option value="Kesar Mangoes (Gujarat Provenance)">Kesar Mangoes (Gujarat Provenance Export)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Packaging Configuration
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#E6C687] transition-colors"
              >
                <option value="25kg Double Food-Grade PP Bags">25kg Double Food-Grade PP Bags with Inner Poly Liner</option>
                <option value="50kg Jute Bags (Machine Stitched)">50kg Natural Jute Bags (Machine Stitched & Fumigated)</option>
                <option value="10kg Pre-Cooled Ventilated Corrugated Cartons">10kg Pre-Cooled Ventilated Corrugated Cartons</option>
                <option value="25kg High-Barrier Nitrogen Flushed Vacuum Bricks">25kg High-Barrier Nitrogen Flushed Vacuum Bricks</option>
                <option value="Custom Private Label Importer Packaging">Custom Private Label Importer Packaging</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E6C687] to-[#C29B4D] text-black font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity cursor-pointer"
              >
                Next: Logistics & Berths
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Logistics & Incoterms */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Incoterms Preference
                </label>
                <select
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687] transition-colors"
                >
                  <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance & Freight)</option>
                  <option value="FOB JNPT / Nhava Sheva (India)">FOB JNPT / Nhava Sheva (India)</option>
                  <option value="FOB Mundra Port (Gujarat, India)">FOB Mundra Port (Gujarat, India)</option>
                  <option value="CFR (Cost & Freight)">CFR (Cost & Freight)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Container Equipment
                </label>
                <select
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687] transition-colors"
                >
                  <option value="40ft High-Cube CA Reefer">40ft High-Cube Controlled Atmosphere Reefer</option>
                  <option value="20ft Heavy FCL Dry Container">20ft Heavy FCL Dry Box (Up to 28 MT)</option>
                  <option value="40ft Standard FCL Dry Container">40ft Standard FCL Dry Container</option>
                  <option value="Air Freight Temperature-Controlled Pallets">Air Freight Temperature-Controlled Pallets</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Destination Seaport of Discharge
                </label>
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687] transition-colors"
                >
                  <option value="Rotterdam (Netherlands)">Rotterdam (Netherlands) — Gateway EU</option>
                  <option value="Jebel Ali (Dubai, UAE)">Jebel Ali (Dubai, UAE) — Gateway GCC</option>
                  <option value="Singapore (PSA)">Singapore (PSA) — Gateway SE Asia</option>
                  <option value="New York / New Jersey (USA)">New York / New Jersey (USA) — US FDA Berth</option>
                  <option value="Dammam / King Abdulaziz (Saudi Arabia)">Dammam (Saudi Arabia) — SFDA Berth</option>
                  <option value="Hamburg (Germany)">Hamburg (Germany)</option>
                  <option value="Felixstowe / London Gateway (UK)">Felixstowe (United Kingdom)</option>
                  <option value="Other International Seaport">Other International Seaport</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Target Monthly Volume
                </label>
                <select
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687] transition-colors"
                >
                  <option value="Trial Order (1 x 20ft / 40ft FCL)">Trial Order (1 x 20ft / 40ft FCL)</option>
                  <option value="2 x 40ft FCL / Month">2 x 40ft FCL / Month (Regular Supply)</option>
                  <option value="5-10 x 40ft FCL / Month">5-10 x 40ft FCL / Month (Contract)</option>
                  <option value="Seasonal Block Booking (20+ FCL)">Seasonal Block Booking (20+ FCL)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E6C687] to-[#C29B4D] text-black font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity cursor-pointer"
              >
                Next: Buyer Credentials
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Corporate Buyer Profile */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EuroFoods Wholesale GmbH"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Procurement Officer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Buyer Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Germany, UAE, USA"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="procurement@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+49 170 1234567"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Special Quality Parameters or Chemical Assay Limits (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Specify required curcumin %, piperine %, pesticide MRL constraints, or target delivery window..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#0D1424] border border-white/15 rounded-2xl px-4 py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-[#E6C687]"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-full text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity cursor-pointer shadow-lg shadow-emerald-500/25"
              >
                {isSubmitting ? "Locking & Encrypting Tender..." : "Submit Formal Tender & Lock Spot Rate"}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Success & Instant Value Delivery */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-display text-2xl text-white font-medium">
                Tender Successfully Registered
              </h4>
              <p className="text-slate-400 text-sm max-w-md mx-auto mt-2">
                Your B2B procurement docket for <span className="text-[#E6C687] font-semibold">{commodity}</span> to <span className="text-white font-semibold">{destinationPort}</span> has been dispatched directly to the JILO Sovereign Export Trade Desk.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                Open 24/7 WhatsApp Desk
              </button>

              <a
                href="/documents/jilo-spec-index-2026.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#E6C687]" />
                Download Batch COA (PDF)
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Guaranteed Trade Desk Proforma turnaround within 4 business hours.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

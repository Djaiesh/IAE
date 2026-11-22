"use client";

import React, { useState, useEffect } from "react";
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
  RotateCcw,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";

export interface TenderPreFill {
  commodity?: string;
  category?: string;
  packaging?: string;
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

const COMMODITY_CATALOG = [
  { value: "Alleppey Finger Turmeric (Curcumin 5.0%+)", label: "Alleppey Finger Turmeric (Curcumin 5.0%+ HPLC)", category: "Spices" },
  { value: "Malabar Bold Black Pepper (TGSEB Grade)", label: "Malabar Bold Black Pepper (TGSEB 4.75mm+)", category: "Spices" },
  { value: "Guntur Teja S17 Stemless Chilli (75,000+ SHU)", label: "Guntur Teja S17 Stemless Red Chilli (75,000+ SHU)", category: "Spices" },
  { value: "Nashik Fresh Red Onions (55mm+ Caliber)", label: "Nashik Fresh Red Onions (55mm+ Hydro-Cooled)", category: "Vegetables" },
  { value: "G4 Fresh Green Chillies (Stem-On Class AAA)", label: "G4 Fresh Green Chillies (Stem-On Class AAA)", category: "Vegetables" },
  { value: "Tender Export Okra (8-12cm Fresh)", label: "Tender Export Okra (8-12cm Pre-Cooled)", category: "Vegetables" },
  { value: "Ratnagiri Alphonso Mangoes (GI-Tagged)", label: "Ratnagiri Alphonso Mangoes (GI-Tagged VHT Treated)", category: "Fruits" },
  { value: "Bhagwa Deep Red Pomegranates (Super A)", label: "Bhagwa Deep Red Pomegranates (Super A Grade)", category: "Fruits" },
  { value: "Cavendish Green Bananas (Class AAA 39-47)", label: "Fresh Cavendish Green Bananas (Class AAA)", category: "Fruits" },
  { value: "Scheduled Reefer Freight Allocation", label: "Scheduled Reefer Freight (Mundra / JNPT Berths)", category: "Logistics" },
];

export function ProcurementTenderModal({
  isOpen,
  onClose,
  preFill,
}: ProcurementTenderModalProps) {
  const [step, setStep] = useState(1);
  const [commodity, setCommodity] = useState("Alleppey Finger Turmeric (Curcumin 5.0%+)");
  const [packaging, setPackaging] = useState("25kg Double Food-Grade PP Bags");
  const [incoterm, setIncoterm] = useState("CIF (Cost, Insurance & Freight)");
  const [containerType, setContainerType] = useState("40ft High-Cube CA Reefer");
  const [destinationPort, setDestinationPort] = useState("Rotterdam (Netherlands)");
  const [monthlyVolume, setMonthlyVolume] = useState("1 x 40ft Reefer FCL");

  const [companyName, setCompanyName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 01. Reset and pre-fill form dynamically whenever modal opens or preFill changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
      setIsSuccess(false);

      if (preFill?.commodity) {
        setCommodity(preFill.commodity);
      }
      if (preFill?.packaging) {
        setPackaging(preFill.packaging);
      }
      if (preFill?.volume) {
        setMonthlyVolume(preFill.volume);
      }
      if (preFill?.destinationPort) {
        setDestinationPort(preFill.destinationPort);
      }
      if (preFill?.incoterm) {
        setIncoterm(preFill.incoterm);
      }
      if (preFill?.containerType) {
        setContainerType(preFill.containerType);
      }
    }
  }, [isOpen, preFill]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-speed B2B dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setStep(4);
    }, 700);
  };

  const handleResetForAnother = () => {
    setStep(1);
    setIsSuccess(false);
    setIsSubmitting(false);
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
        className="fixed inset-0 bg-[#061820]/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div className="relative z-10 w-full max-w-2xl bg-[#0E333C] border border-white/20 rounded-3xl sm:rounded-4xl shadow-2xl p-6 sm:p-8 overflow-hidden my-8">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#C17B58]/20 to-transparent blur-2xl pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C17B58]/10 border border-[#C17B58]/25 text-[#C17B58] text-xs font-semibold tracking-wider uppercase mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            Official B2B Procurement Tender
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-white font-medium">
            Request Certified Export Quotation
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Direct origin contracts • SGS/Eurofins calibrated specifications • CIF/FOB terms
          </p>

          {/* Active Pre-Filled Category Badge */}
          {preFill?.category && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] font-sans uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#C17B58]/15 text-[#C17B58] border border-[#C17B58]/30">
                Category: {preFill.category}
              </span>
              {preFill.volume && (
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                  Target MOQ: {preFill.volume}
                </span>
              )}
            </div>
          )}
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
                    ? "text-[#C17B58]"
                    : step > s.num
                    ? "text-emerald-400"
                    : "text-slate-500"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s.num
                      ? "bg-[#C17B58] text-white"
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
                Commodity &amp; Specification Grade
              </label>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#C17B58] transition-colors"
              >
                {/* Dynamically include pre-filled custom item if not in default catalog */}
                {commodity && !COMMODITY_CATALOG.some((c) => c.value === commodity) && (
                  <option value={commodity}>{commodity}</option>
                )}
                {COMMODITY_CATALOG.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Packaging Configuration
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#C17B58] transition-colors"
              >
                {packaging && !["25kg Double Food-Grade PP Bags", "50kg Natural Jute Bags (Machine Stitched)", "10kg Pre-Cooled Ventilated Corrugated Cartons", "25kg High-Barrier Nitrogen Vacuum Sacks", "Custom Private Label Importer Packaging"].includes(packaging) && (
                  <option value={packaging}>{packaging}</option>
                )}
                <option value="25kg Double Food-Grade PP Bags">25kg Double Food-Grade PP Bags with Inner Poly Liner</option>
                <option value="50kg Natural Jute Bags (Machine Stitched)">50kg Natural Jute Bags (Machine Stitched &amp; Fumigated)</option>
                <option value="10kg Pre-Cooled Ventilated Corrugated Cartons">10kg Pre-Cooled Ventilated Corrugated Cartons</option>
                <option value="25kg High-Barrier Nitrogen Vacuum Sacks">25kg High-Barrier Nitrogen Vacuum Sacks</option>
                <option value="Custom Private Label Importer Packaging">Custom Private Label Importer Packaging</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C17B58] to-[#A66342] text-white font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#C17B58]/25"
              >
                Next: Logistics &amp; Berths
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
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#C17B58] transition-colors"
                >
                  <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance &amp; Freight)</option>
                  <option value="FOB (Free On Board - Indian Seaport)">FOB (Free On Board - JNPT/Mundra)</option>
                  <option value="CFR (Cost and Freight)">CFR (Cost and Freight)</option>
                  <option value="DAP (Delivered at Place - Cold Hub)">DAP (Delivered at Place)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Container Equipment Type
                </label>
                <select
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value)}
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#C17B58] transition-colors"
                >
                  <option value="40ft High-Cube CA Reefer">40ft High-Cube CA Reefer (Controlled Atmosphere)</option>
                  <option value="20ft Standard Dry Container">20ft Standard Dry FCL (Spices &amp; Dry Food)</option>
                  <option value="40ft Standard Dry Container">40ft Standard Dry FCL</option>
                  <option value="Direct Air Freight Pallet Allocation">Direct Air Freight Pallet Allocation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Destination Seaport / Berth
                </label>
                <input
                  type="text"
                  required
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  placeholder="e.g. Rotterdam, Jebel Ali, New York"
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C17B58]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Monthly / Contract Volume
                </label>
                <input
                  type="text"
                  required
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  placeholder="e.g. 2 x 40ft FCL / Month"
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C17B58]"
                />
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C17B58] to-[#A66342] text-white font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#C17B58]/25"
              >
                Next: Buyer Credentials
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Buyer Details & Submit */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Corporate / Trading Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Global Foods Trading BV"
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C17B58]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Procurement Officer Name *
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C17B58]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Country of Import *
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Netherlands"
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C17B58]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trade@company.com"
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C17B58]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+31 6 12345678"
                  className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C17B58]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                Special Quality Parameters or Phytosanitary Requirements
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific curcumin assay, mesh sizes, palletizing requirements, or phytosanitary guidelines..."
                className="w-full bg-[#164A55] border border-white/15 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C17B58]"
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
                Your B2B procurement docket for <span className="text-[#C17B58] font-semibold">{commodity}</span> to <span className="text-white font-semibold">{destinationPort}</span> has been dispatched directly to the JILO Sovereign Export Trade Desk.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <PhoneCall className="w-4 h-4" />
                Open 24/7 WhatsApp Desk
              </button>

              <a
                href={SITE_CONFIG.portfolioPdfUrl}
                download="JILO-Agro-Portfolio.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C17B58]" />
                Download Portfolio (PDF)
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleResetForAnother}
                className="inline-flex items-center gap-2 text-xs text-[#C17B58] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Request Quote for Another Commodity</span>
              </button>
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

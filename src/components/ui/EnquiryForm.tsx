"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Info } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";

interface EnquiryFormProps {
  initialProduct?: string;
  initialType?: "quote" | "sample" | "contract";
  initialPort?: string;
  className?: string;
}

interface FormState {
  name: string;
  company: string;
  email: string;
  country: string;
  destinationPort: string;
  selectedProduct: string;
  estimatedVolume: string;
  enquiryType: "quote" | "sample" | "contract";
  incoTerm: string;
  message: string;
}

export function EnquiryForm({
  initialProduct = "",
  initialType = "quote",
  initialPort = "",
  className,
}: EnquiryFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    country: "",
    destinationPort: initialPort || "",
    selectedProduct: initialProduct || (PRODUCTS[0]?.name || ""),
    estimatedVolume: "1 x 20ft FCL Container",
    enquiryType: initialType,
    incoTerm: "CIF",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Contact name required.";
    if (!form.company.trim()) e.company = "Company name required.";
    if (!form.email.trim()) {
      e.email = "Business email required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid business email required.";
    }
    if (!form.country.trim()) e.country = "Destination country required.";
    if (!form.destinationPort.trim()) e.destinationPort = "Discharge port required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 700);
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === "success") {
    return (
      <div className={cn("glass rounded-4xl p-8 sm:p-10 text-center border border-white/10", className)}>
        <div className="w-16 h-16 rounded-3xl bg-saffron/15 border border-saffron/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-saffron" />
        </div>
        <h3 className="font-display text-2xl text-cream mb-3">Inquiry Logged</h3>
        <p className="font-sans text-sm text-foam/80 max-w-md mx-auto font-light leading-relaxed mb-6">
          Thank you, <span className="text-cream font-medium">{form.name}</span>. Your commercial trade inquiry from{" "}
          <span className="text-cream font-medium">{form.company}</span> for{" "}
          <span className="text-saffron font-medium">{form.selectedProduct}</span> has been received by our maritime dispatch desk.
        </p>
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-left max-w-sm mx-auto text-xs font-sans space-y-2 text-foam/80 mb-6">
          <div>
            <span className="text-saffron font-semibold">Commodity: </span>
            {form.selectedProduct}
          </div>
          <div>
            <span className="text-saffron font-semibold">Discharge Port: </span>
            {form.destinationPort} ({form.country})
          </div>
          <div>
            <span className="text-saffron font-semibold">Delivery Basis: </span>
            {form.incoTerm} IncoTerms 2020
          </div>
          <div>
            <span className="text-saffron font-semibold">Turnaround: </span>
            Official quotation within 24 business hours
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost text-xs px-6 py-3 min-h-[44px]"
        >
          Submit Another Commercial Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className={cn("glass rounded-4xl p-6 sm:p-10 border border-white/10", className)}>
      {/* Simulation Info Pill */}
      <div className="mb-8 p-4 rounded-2xl bg-teal/10 border border-teal/20 flex items-start gap-3 text-xs font-sans text-foam/75">
        <Info className="w-4 h-4 text-teal shrink-0 mt-0.5" />
        <div>
          <span className="text-saffron font-semibold block mb-0.5">Commercial Export Desk</span>
          Direct B2B quotes for full container loads (FCL), multi-temperature reefers, and commercial lab samples.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Enquiry Type Toggle */}
        <div>
          <span className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
            Inquiry Type *
          </span>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "quote" as const, label: "FCL Quote" },
              { id: "sample" as const, label: "Lab Sample" },
              { id: "contract" as const, label: "Annual Contract" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleInputChange("enquiryType", t.id)}
                className={cn(
                  "py-3 px-3 rounded-2xl border text-xs font-sans font-medium transition-all min-h-[44px] flex items-center justify-center cursor-pointer",
                  form.enquiryType === t.id
                    ? "bg-saffron text-white border-saffron shadow-saffron font-bold"
                    : "border-white/10 bg-white/5 text-foam/70 hover:border-white/20 hover:text-cream"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Contact Name */}
          <div>
            <label htmlFor="name" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Contact Person *
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Henrik van der Meer"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn(
                "w-full px-5 py-3.5 rounded-2xl bg-white/5 border font-sans text-base sm:text-sm text-cream placeholder-foam/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px] transition-all",
                errors.name ? "border-red-500/70" : "border-white/10 hover:border-white/20"
              )}
            />
            {errors.name && <p className="font-sans text-[11px] text-red-400 mt-1.5">{errors.name}</p>}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Company / Importer *
            </label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Baltic Spice B.V."
              value={form.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className={cn(
                "w-full px-5 py-3.5 rounded-2xl bg-white/5 border font-sans text-base sm:text-sm text-cream placeholder-foam/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px] transition-all",
                errors.company ? "border-red-500/70" : "border-white/10 hover:border-white/20"
              )}
            />
            {errors.company && <p className="font-sans text-[11px] text-red-400 mt-1.5">{errors.company}</p>}
          </div>

          {/* Business Email */}
          <div>
            <label htmlFor="email" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Business Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="procurement@importer.com"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={cn(
                "w-full px-5 py-3.5 rounded-2xl bg-white/5 border font-sans text-base sm:text-sm text-cream placeholder-foam/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px] transition-all",
                errors.email ? "border-red-500/70" : "border-white/10 hover:border-white/20"
              )}
            />
            {errors.email && <p className="font-sans text-[11px] text-red-400 mt-1.5">{errors.email}</p>}
          </div>

          {/* Destination Country */}
          <div>
            <label htmlFor="country" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Destination Country *
            </label>
            <input
              id="country"
              type="text"
              placeholder="e.g. Netherlands / UAE / United States"
              value={form.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className={cn(
                "w-full px-5 py-3.5 rounded-2xl bg-white/5 border font-sans text-base sm:text-sm text-cream placeholder-foam/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px] transition-all",
                errors.country ? "border-red-500/70" : "border-white/10 hover:border-white/20"
              )}
            />
            {errors.country && <p className="font-sans text-[11px] text-red-400 mt-1.5">{errors.country}</p>}
          </div>

          {/* Discharge Port */}
          <div>
            <label htmlFor="destinationPort" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Discharge Port *
            </label>
            <input
              id="destinationPort"
              type="text"
              placeholder="e.g. Port of Rotterdam / Jebel Ali"
              value={form.destinationPort}
              onChange={(e) => handleInputChange("destinationPort", e.target.value)}
              className={cn(
                "w-full px-5 py-3.5 rounded-2xl bg-white/5 border font-sans text-base sm:text-sm text-cream placeholder-foam/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px] transition-all",
                errors.destinationPort ? "border-red-500/70" : "border-white/10 hover:border-white/20"
              )}
            />
            {errors.destinationPort && (
              <p className="font-sans text-[11px] text-red-400 mt-1.5">{errors.destinationPort}</p>
            )}
          </div>

          {/* IncoTerm */}
          <div>
            <label htmlFor="incoTerm" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Preferred IncoTerm (2020)
            </label>
            <select
              id="incoTerm"
              value={form.incoTerm}
              onChange={(e) => handleInputChange("incoTerm", e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-navy border border-white/15 font-sans text-base sm:text-sm text-cream focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px] transition-all"
            >
              <option value="CIF">CIF — Cost, Insurance & Freight (Recommended)</option>
              <option value="FOB">FOB — Free on Board (JNPT / Mundra)</option>
              <option value="CFR">CFR — Cost and Freight</option>
              <option value="Air">Air Freight (Perishable / Urgent)</option>
            </select>
          </div>
        </div>

        {/* Commodity and Volume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="selectedProduct" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Commodity of Interest
            </label>
            <select
              id="selectedProduct"
              value={form.selectedProduct}
              onChange={(e) => handleInputChange("selectedProduct", e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-navy border border-white/15 font-sans text-base sm:text-sm text-cream focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px]"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.name}>
                  [{p.category.toUpperCase()}] {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="estimatedVolume" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
              Estimated Volume
            </label>
            <select
              id="estimatedVolume"
              value={form.estimatedVolume}
              onChange={(e) => handleInputChange("estimatedVolume", e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-navy border border-white/15 font-sans text-base sm:text-sm text-cream focus:outline-none focus:ring-2 focus:ring-saffron/40 min-h-[44px]"
            >
              <option value="Sample Pack (500g–2kg)">Commercial Sample Pack (500g–2kg)</option>
              <option value="1 x 20ft FCL Container">1 x 20ft FCL Container (~14–18 MT)</option>
              <option value="1 x 40ft High Cube Reefer">1 x 40ft High Cube Reefer (~22–28 MT)</option>
              <option value="Multiple Containers / Month">Annual Supply / Multiple Reefers Per Month</option>
              <option value="Air Freight Pallet">Air Freight Pallet (Urgent Shipments)</option>
            </select>
          </div>
        </div>

        {/* Message / Specifications */}
        <div>
          <label htmlFor="message" className="font-sans text-[11px] uppercase tracking-eyebrow text-foam/60 block mb-2 font-semibold">
            Specific Requirements / Quality Tolerances
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Specify destination pesticide MRL tolerances, target delivery date, private labeling, or bulk packaging needs..."
            className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 font-sans text-base sm:text-sm text-cream placeholder-foam/30 focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full justify-center text-xs py-4 min-h-[48px] disabled:opacity-50"
        >
          {status === "submitting" ? (
            "Validating Export Inquiry..."
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Commercial Inquiry to Trade Desk</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

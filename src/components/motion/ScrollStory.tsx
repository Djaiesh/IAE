"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site";
import { CheckCircle2, Sprout, Microscope, PackageCheck, FileCheck2, Truck, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  Sprout: <Sprout className="w-5 h-5" />,
  Microscope: <Microscope className="w-5 h-5" />,
  PackageCheck: <PackageCheck className="w-5 h-5" />,
  FileCheck2: <FileCheck2 className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Anchor: <Anchor className="w-5 h-5" />,
};

const STEP_IMAGES = [
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
];

export function ScrollStory() {
  const steps = SITE_CONFIG.exportProcessSteps;
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-32 overflow-hidden bg-abyss">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-navy to-abyss pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16" data-reveal="up">
          <span className="eyebrow block mb-3 text-saffron">
            Ocean & Overland Narrative
          </span>
          <h2 className="section-title text-cream">
            From Origin to Port:
            <span className="text-saffron italic font-normal block mt-1">
              Six-Stage Pipeline
            </span>
          </h2>
          <div className="saffron-line mt-6 w-28 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stage Selector (Left Column) */}
          <div className="lg:col-span-5 space-y-3" data-stagger>
            {steps.map((step, i) => (
              <button
                key={step.stepNumber}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full text-left p-5 rounded-3xl border transition-all duration-300 flex items-start gap-4 cursor-pointer",
                  i === active
                    ? "glass-saffron border-saffron/60 shadow-saffron"
                    : "glass border-white/5 hover:bg-white/5 hover:border-white/15"
                )}
              >
                {/* Number & Icon Container with guaranteed alignment */}
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300",
                  i === active 
                    ? "bg-saffron text-white border-saffron shadow-md" 
                    : "bg-deep/80 text-foam/50 border-white/10"
                )}>
                  {ICONS[step.iconName]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-saffron">
                      Stage {step.stepNumber}
                    </span>
                    {i === active && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-saffron/20 text-saffron-light border border-saffron/30">
                        Active Inspect
                      </span>
                    )}
                  </div>
                  <h3 className={cn(
                    "font-display text-base sm:text-lg leading-snug transition-colors",
                    i === active ? "text-cream font-medium" : "text-foam/70"
                  )}>
                    {step.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Visual Panel (Right Column) */}
          <div className="lg:col-span-7" data-reveal="left">
            <div className="relative rounded-4xl overflow-hidden border border-white/10 shadow-float min-h-[540px] flex flex-col justify-end">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url('${STEP_IMAGES[active]}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/70 to-transparent" />

              {/* Info Overlay */}
              <div className="relative z-10 p-8 sm:p-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/20 backdrop-blur-xl border border-saffron/40 text-saffron-light text-xs font-sans font-semibold mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5 text-saffron" />
                  <span>Protocol: {steps[active].verificationCheck}</span>
                </div>

                <h4 className="font-display text-2xl sm:text-3xl text-cream font-normal mb-3">
                  {steps[active].title}
                </h4>

                <p className="font-sans text-sm sm:text-base text-foam/85 font-light leading-relaxed max-w-xl">
                  {steps[active].details}
                </p>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <button
                    disabled={active === 0}
                    onClick={() => setActive(p => Math.max(p - 1, 0))}
                    className="px-5 py-2 rounded-full border border-white/15 text-xs font-sans text-foam/70 hover:border-saffron hover:text-saffron disabled:opacity-20 transition-all cursor-pointer"
                  >
                    ← Prev Phase
                  </button>

                  <span className="text-xs font-mono text-saffron font-bold">
                    0{active + 1} / 0{steps.length}
                  </span>

                  <button
                    disabled={active === steps.length - 1}
                    onClick={() => setActive(p => Math.min(p + 1, steps.length - 1))}
                    className="px-5 py-2 rounded-full border border-white/15 text-xs font-sans text-foam/70 hover:border-saffron hover:text-saffron disabled:opacity-20 transition-all cursor-pointer"
                  >
                    Next Phase →
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

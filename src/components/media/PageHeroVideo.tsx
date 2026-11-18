"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowRight, Sparkles } from "lucide-react";

export interface PageHeroMetric {
  value: string;
  label: string;
}

export interface PageHeroVideoProps {
  videoSrc: string;
  badgeIcon?: React.ReactNode;
  badgeText: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
  metrics?: PageHeroMetric[];
  primaryCtaText?: string;
  primaryCtaHref?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function PageHeroVideo({
  videoSrc,
  badgeIcon,
  badgeText,
  title,
  highlightedTitle,
  description,
  breadcrumbs,
  metrics,
  primaryCtaText,
  primaryCtaHref,
  onPrimaryCtaClick,
  secondaryCtaText,
  secondaryCtaHref,
}: PageHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-white/10">
      {/* ── Background Cinematic Video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Sophisticated Multilayer Overlays for Text Contrast & Luxury Mood */}
        <div className="absolute inset-0 bg-navy/70 dark:bg-black/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-black/60 dark:from-navy dark:via-black/40 dark:to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(6,16,29,0.7)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Breadcrumb Trail */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div className="max-w-4xl" data-reveal="up">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron/40 bg-saffron/15 text-saffron mb-6 backdrop-blur-md shadow-sm">
            {badgeIcon || <Sparkles className="w-3.5 h-3.5" />}
            <span className="eyebrow text-[11px] font-semibold tracking-wider uppercase text-saffron">
              {badgeText}
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-title text-cream font-normal leading-[1.05] tracking-tight drop-shadow-md">
            {title}
            {highlightedTitle && (
              <span className="text-saffron italic block mt-1">
                {highlightedTitle}
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-foam/90 font-light mt-5 leading-relaxed max-w-3xl drop-shadow">
            {description}
          </p>

          {/* Optional Action CTAs */}
          {(primaryCtaText || secondaryCtaText) && (
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {primaryCtaText && (
                primaryCtaHref ? (
                  <Link
                    href={primaryCtaHref}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-sm font-semibold tracking-wide uppercase shadow-saffron transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span>{primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onPrimaryCtaClick}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-sm font-semibold tracking-wide uppercase shadow-saffron transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>{primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )
              )}

              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border border-white/20 hover:border-saffron/50 text-cream font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/10"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}

          {/* Optional Metrics Grid */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/15">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl glass border border-white/10 backdrop-blur-md">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-cream mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-foam/75">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

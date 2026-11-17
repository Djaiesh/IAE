"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Subtitles, Compass, CheckCircle2, Film } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandFilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: "Farmgate Handover", time: "00:00", caption: "Direct sourcing from calibrated grower clusters at dawn." },
    { title: "Precision Grading", time: "00:12", caption: "Optical sortation, brix measurement, and zero-defect culling." },
    { title: "Cold Packing", time: "00:24", caption: "Controlled-atmosphere packaging with ethylene scrubbers." },
    { title: "Container Sealing", time: "00:36", caption: "High-security bolt seals applied alongside digital quarantine clearance." },
    { title: "Ocean Voyage", time: "00:48", caption: "Uninterrupted reefer transit to international destination berths." },
  ];

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative py-28 sm:py-36 bg-deep/50 text-cream overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-abyss to-deep pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-reveal="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-saffron/30 bg-deep/80 backdrop-blur-xl mb-4">
            <Film className="w-3.5 h-3.5 text-saffron" />
            <span className="eyebrow text-[10px] text-saffron tracking-widest font-semibold">
              Cinematic Logistics Documentary
            </span>
          </div>

          <h2 className="section-title text-cream">
            The Journey of Care:
            <span className="text-saffron italic font-normal block mt-1">
              From Harvest to High Seas
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed">
            Follow the physical sequence of care that safeguards perishable horticultural cargo and high-value spices across thousands of nautical miles.
          </p>
        </div>

        {/* Video Player Showcase Frame with Soft 4xl Curvature & Frosted Glass Border */}
        <div 
          className="relative rounded-4xl overflow-hidden border border-white/10 bg-abyss shadow-float aspect-[16/9] max-h-[620px]"
          data-reveal="scale"
        >
          
          <video
            ref={videoRef}
            playsInline
            loop
            muted={isMuted}
            poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-sailing-in-the-open-sea-43098-large.mp4"
              type="video/mp4"
            />
          </video>

          {/* Scrim Overlay when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-abyss/65 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center">
              <button
                onClick={handlePlayToggle}
                className="w-20 h-20 rounded-full bg-saffron hover:bg-saffron-light text-white flex items-center justify-center shadow-2xl shadow-saffron/40 transition-transform duration-300 hover:scale-110 active:scale-95 mb-5 focus:outline-none focus:ring-4 focus:ring-saffron/40 cursor-pointer"
                aria-label="Play brand documentary film"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <h3 className="font-display text-2xl sm:text-3xl text-cream font-normal">
                Watch the Brand Film (52s)
              </h3>
              <p className="text-xs text-foam/70 font-mono mt-1.5">
                Visualizing our unbroken chain of quality custody
              </p>
            </div>
          )}

          {/* Captions Overlay Bar */}
          {showCaptions && (
            <div className="absolute bottom-16 left-6 right-6 z-20 pointer-events-none flex justify-center">
              <div className="bg-abyss/90 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans text-cream/95 text-center max-w-xl shadow-xl">
                <span className="text-[10px] uppercase font-mono text-saffron mr-2 font-semibold">
                  Protocol:
                </span>
                {chapters[activeChapter].caption}
              </div>
            </div>
          )}

          {/* Interactive Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-abyss via-abyss/85 to-transparent p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayToggle}
                className="p-2.5 rounded-full bg-navy/80 hover:bg-deep text-foam hover:text-saffron transition-colors focus:outline-none cursor-pointer border border-white/10"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={handleMuteToggle}
                className="p-2.5 rounded-full bg-navy/80 hover:bg-deep text-foam hover:text-saffron transition-colors focus:outline-none cursor-pointer border border-white/10"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={cn(
                  "px-3 py-1.5 rounded-full transition-colors text-xs font-mono flex items-center gap-1.5 focus:outline-none cursor-pointer border",
                  showCaptions
                    ? "bg-saffron/20 text-saffron border-saffron/40"
                    : "bg-navy/80 text-foam/50 border-white/10"
                )}
                aria-label="Toggle captions"
              >
                <Subtitles className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">CC</span>
              </button>
            </div>

            {/* Chapter Indicators */}
            <div className="hidden md:flex items-center gap-2">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChapter(idx)}
                  className={cn(
                    "text-[10px] font-mono px-3 py-1 rounded-full transition-all cursor-pointer border",
                    activeChapter === idx
                      ? "bg-saffron text-white border-saffron font-semibold shadow-saffron"
                      : "bg-navy/80 text-foam/70 hover:text-cream border-white/5"
                  )}
                >
                  {ch.title}
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono text-foam/60">
              00:52 / Full HD
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function CinematicHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;

    const startPlaybackFromBeginning = () => {
      if (!video) return;
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          setIsVideoLoaded(true);
        })
        .catch(() => {
          setIsVideoLoaded(true);
        });
    };

    // Check if intro is already dismissed or will be played
    let introSeen = false;
    try {
      introSeen = Boolean(sessionStorage.getItem("jilo_intro_seen"));
    } catch {}

    if (introSeen) {
      // Intro already finished in past navigation: start immediately from 00:00
      startPlaybackFromBeginning();
    } else {
      // Intro loader is active: wait for it to dismiss before starting hero video from 00:00
      const onIntroComplete = () => {
        startPlaybackFromBeginning();
      };
      window.addEventListener("jilo_intro_complete", onIntroComplete, { once: true });

      // Fallback in case intro doesn't trigger
      const fallbackTimer = setTimeout(() => {
        startPlaybackFromBeginning();
      }, 5000);

      return () => {
        window.removeEventListener("jilo_intro_complete", onIntroComplete);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  const handleScrollDown = () => {
    if (sectionRef.current) {
      const nextElem = sectionRef.current.nextElementSibling;
      if (nextElem) {
        nextElem.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Background Video Layer: Pure, Fullscreen, Starts at 00:00 & Loops Seamlessly ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Scroll Down Indicator Arrow Button at the Bottom ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll down to explore contents"
          className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/25 hover:border-[#E50914] backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg animate-bounce">
            <ChevronDown className="w-5 h-5 text-white group-hover:text-[#E50914] transition-colors" />
          </div>
        </button>
      </div>
    </section>
  );
}

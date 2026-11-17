"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollMetrics {
  scrollY: number;
  progress: number;
  direction: -1 | 0 | 1;
  velocity: number;
  isScrolled: boolean;
}

/**
 * useScrollMetrics — Centralized 60fps scroll telemetry hook
 * Synchronized with Lenis and GSAP ScrollTrigger for buttery smooth parallax
 */
export function useScrollMetrics(): ScrollMetrics {
  const [metrics, setMetrics] = useState<ScrollMetrics>({
    scrollY: 0,
    progress: 0,
    direction: 0,
    velocity: 0,
    isScrolled: false,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(typeof performance !== "undefined" ? performance.now() : 0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let rafId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 16);
      const dy = currentScrollY - lastScrollY.current;
      const velocity = dy / dt;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentScrollY / docHeight, 0), 1) : 0;
      const direction: -1 | 0 | 1 = dy > 0 ? 1 : dy < 0 ? -1 : 0;

      setMetrics({
        scrollY: currentScrollY,
        progress,
        direction,
        velocity,
        isScrolled: currentScrollY > 40,
      });

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
    };

    const onScrollThrottled = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    // Initialize immediately
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScrollThrottled);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return metrics;
}

/**
 * useCard3DTilt — Spring-interpolated 3D card perspective tilt
 * Used for luxury glass cards and commodity showcases
 */
export function useCard3DTilt(maxTilt = 8) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

    setTilt({ rotateX, rotateY });
  };

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return {
    tiltStyle: {
      transform: isHovered
        ? `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateZ(12px)`
        : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: isHovered ? "transform 0.12s ease-out" : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
    },
    eventHandlers: {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    },
    isHovered,
  };
}

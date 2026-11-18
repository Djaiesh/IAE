"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyMountOnScrollProps {
  children: React.ReactNode;
  minHeight?: string | number;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  revealAnimation?: "up" | "fade" | "scale" | "none";
}

/**
 * LazyMountOnScroll
 * Ensures that heavy content (WebGL 3D canvases, interactive marquees, media galleries)
 * only loads and mounts into DOM when the user scrolls near or directly into that specific location.
 */
export function LazyMountOnScroll({
  children,
  minHeight = "400px",
  className,
  rootMargin = "120px 0px 120px 0px",
  threshold = 0.05,
  revealAnimation = "up",
}: LazyMountOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMount(true);
            setTimeout(() => {
              setIsRevealed(true);
            }, 50);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: shouldMount ? undefined : minHeight }}
      className={cn(
        "transition-all duration-700 ease-out",
        !shouldMount && "opacity-0 pointer-events-none",
        shouldMount && isRevealed && "opacity-100 pointer-events-auto",
        revealAnimation === "up" && (!isRevealed ? "translate-y-8" : "translate-y-0"),
        revealAnimation === "scale" && (!isRevealed ? "scale-[0.97]" : "scale-100"),
        className
      )}
    >
      {shouldMount ? children : null}
    </div>
  );
}

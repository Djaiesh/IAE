"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth lerp coordinates
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest("[role='button']") ||
          target.closest(".cursor-pointer") ||
          target.tagName === "CANVAS")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth animation loop for the outer ring
    const renderLoop = () => {
      // Lerp outer ring
      const ease = 0.2;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (outerCircleRef.current) {
        outerCircleRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (innerDotRef.current) {
        // Inner dot follows with zero lag
        innerDotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Outer Circle (Hollow ring with smooth inertia lag) ── */}
      <div
        ref={outerCircleRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[999999] rounded-full transition-[width,height,border-color,background-color] duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? "w-14 h-14 border-2 border-white/90 bg-white/5 backdrop-blur-[1px]"
            : "w-9 h-9 border-[1.5px] border-white/70 bg-transparent"
        }`}
      />

      {/* ── Inner Center Dot (Follows mouse strictly) ── */}
      <div
        ref={innerDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[999999] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
      />
    </>
  );
}

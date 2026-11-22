"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function FullScreenNavigationTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const animStartTimeRef = useRef<number>(0);
  const currentPathRef = useRef(pathname);

  useEffect(() => {
    currentPathRef.current = pathname;

    // Keep loading animation visible for at least 1.1s so circular waves are fully experienced
    if (isAnimating) {
      const elapsed = Date.now() - animStartTimeRef.current;
      const minDuration = 1100;
      const remainingTime = Math.max(150, minDuration - elapsed);

      const dismissTimer = setTimeout(() => {
        setIsAnimating(false);
      }, remainingTime);

      return () => clearTimeout(dismissTimer);
    }
  }, [pathname, isAnimating]);

  // Intercept all internal navigation link clicks
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      if (
        !href ||
        targetAttr === "_blank" ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("https://wa.me") ||
        href.startsWith("#") ||
        href === currentPathRef.current
      ) {
        return;
      }

      if (href.startsWith("/")) {
        e.preventDefault();
        animStartTimeRef.current = Date.now();
        setIsAnimating(true);

        setTimeout(() => {
          router.push(href);
        }, 360);
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      {isAnimating && (
        <motion.div
          key="fullscreen-nav-curtain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] pointer-events-auto bg-[#0A2E5C] flex items-center justify-center select-none overflow-hidden"
        >
          {/* Deep Ambient Golden Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.18)_0%,_transparent_70%)] blur-3xl animate-pulse"
          />

          {/* ── Circular Moving Ocean Waves Animation (Zero Words) ── */}
          <div className="relative flex items-center justify-center w-80 h-80">
            {/* Concentric Pulsating Circular Ripple Waves */}
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="absolute rounded-full border border-[#E6C687]"
                initial={{ width: 36, height: 36, opacity: 0.85 }}
                animate={{
                  width: [36, 320],
                  height: [36, 320],
                  opacity: [0.85, 0.4, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: index * 0.48,
                  ease: "easeOut",
                }}
                style={{
                  boxShadow: "0 0 24px rgba(230, 198, 135, 0.35)",
                }}
              />
            ))}

            {/* Rotating Circular Wave Ring 1 */}
            <motion.div
              className="absolute w-48 h-48 rounded-full border border-dashed border-[#E6C687]/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#E6C687] shadow-[0_0_12px_#E6C687]" />
            </motion.div>

            {/* Counter-Rotating Circular Wave Ring 2 */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-dotted border-[#FFE6A6]/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFE6A6] shadow-[0_0_10px_#FFE6A6]" />
            </motion.div>

            {/* Glowing Golden Core Sphere */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFE6A6] shadow-[0_0_30px_#E6C687] animate-pulse z-10" />
          </div>

          {/* Delicate Edge Light Trims */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E6C687]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E6C687]/60 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

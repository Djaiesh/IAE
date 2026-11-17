"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Drop this in the root layout to activate scroll-reveal across all pages */
export function ScrollRevealProvider() {
  useScrollReveal();
  return null;
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useScrollReveal — integrates Lenis 60fps smooth scrolling with GSAP ScrollTrigger
 * and an IntersectionObserver that triggers `data-revealed` transitions.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced-motion is requested, reveal everything immediately and disable custom smooth scroll
    if (prefersReduced) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]")
        .forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // IntersectionObserver for data-reveal and data-stagger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed]), [data-stagger]:not([data-revealed])")
        .forEach((el) => observer.observe(el));
    };

    observe();

    const mutation = new MutationObserver(observe);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}

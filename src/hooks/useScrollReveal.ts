"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useScrollReveal — integrates Lenis smooth scrolling with GSAP ScrollTrigger
 * and an IntersectionObserver that triggers dynamic word raise-up and image reveal animations
 * as the user scrolls into view.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced-motion is requested, reveal everything immediately
    if (prefersReduced) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal], [data-stagger], [data-reveal-img]")
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

    // Dedicated IntersectionObserver for triggering word raises, card reveals, and images
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            // If the element has word-raise-items inside, trigger them
            entry.target.querySelectorAll<HTMLElement>(".word-mask").forEach((wm) => {
              wm.classList.add("revealed");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px", // triggers when actively scrolled into view
      }
    );

    const setupWordsAndImages = () => {
      // 1. Word Raise-Up enhancement on major section headlines
      document
        .querySelectorAll<HTMLElement>(
          "h2:not([data-words-split]), h3.split-words:not([data-words-split]), .section-title:not([data-words-split])"
        )
        .forEach((heading) => {
          // Skip headings inside navbar, footer, or 3D canvas overlay
          if (
            heading.closest("nav") ||
            heading.closest("footer") ||
            heading.closest("#hero-section") ||
            heading.closest(".no-word-split")
          ) {
            return;
          }

          heading.setAttribute("data-words-split", "true");
          heading.setAttribute("data-reveal", "up");

          // Wrap individual words into .word-mask > .word-raise
          const childNodes = Array.from(heading.childNodes);
          let wordIndex = 0;

          childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent || "";
              if (!text.trim()) return;

              const words = text.split(/(\s+)/);
              const fragment = document.createDocumentFragment();

              words.forEach((part) => {
                if (/^\s+$/.test(part)) {
                  fragment.appendChild(document.createTextNode(part));
                } else if (part.length > 0) {
                  const mask = document.createElement("span");
                  mask.className = "word-mask";
                  const inner = document.createElement("span");
                  inner.className = "word-raise";
                  inner.style.setProperty("--word-idx", String(wordIndex++));
                  inner.textContent = part;
                  mask.appendChild(inner);
                  fragment.appendChild(mask);
                }
              });

              node.replaceWith(fragment);
            }
          });

          observer.observe(heading);
        });

      // 2. Observe images across the site for smooth scale & blur reveal
      document
        .querySelectorAll<HTMLElement>(
          "main img:not([data-reveal-img]), .commodity-card img:not([data-reveal-img]), .trust-card img:not([data-reveal-img]), article img:not([data-reveal-img])"
        )
        .forEach((img) => {
          if (img.closest("nav") || img.closest("#hero-section")) return;
          img.setAttribute("data-reveal-img", "true");
          observer.observe(img);
        });

      // 3. Observe cards and section containers
      document
        .querySelectorAll<HTMLElement>(
          "main > section:not(:first-child), .grid > div, article, .commodity-card, .trust-card"
        )
        .forEach((el) => {
          if (
            !el.hasAttribute("data-reveal") &&
            !el.hasAttribute("data-revealed") &&
            !el.closest("#hero-section") &&
            !el.closest("#global-reach-map")
          ) {
            el.setAttribute("data-reveal", "up");
            observer.observe(el);
          }
        });

      // 4. Explicit data-reveal and data-stagger elements
      document
        .querySelectorAll<HTMLElement>(
          "[data-reveal]:not([data-revealed]), [data-stagger]:not([data-revealed])"
        )
        .forEach((el) => observer.observe(el));
    };

    setupWordsAndImages();

    const mutation = new MutationObserver(setupWordsAndImages);
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

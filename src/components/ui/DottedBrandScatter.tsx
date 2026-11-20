"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface DottedBrandScatterProps {
  text?: string;
  className?: string;
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export function DottedBrandScatter({
  text = "JILO EXPORTS",
  className = "",
}: DottedBrandScatterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const animFrameId = useRef<number | null>(null);

  // ─── Generate Particle Grid from Offscreen Text Render ────────────────────
  const generateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Calculate responsive font size to span width with ideal proportions
    let fontSize = Math.round((width * dpr) / (text.length * 0.72));
    fontSize = Math.max(36 * dpr, Math.min(130 * dpr, fontSize));

    // Tight canvas height matching the text bounding box (removes empty vertical void)
    const cssHeight = Math.round((fontSize / dpr) * 0.95);
    const canvasHeight = Math.round(cssHeight * dpr);

    canvas.width = Math.round(width * dpr);
    canvas.height = canvasHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${cssHeight}px`;

    // Offscreen canvas to rasterize text
    const offscreen = document.createElement("canvas");
    offscreen.width = Math.round(width * dpr);
    offscreen.height = canvasHeight;
    const octx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    octx.fillStyle = "#ffffff";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.font = `900 ${fontSize}px 'Oxanium', 'Space Grotesk', -apple-system, sans-serif`;

    const textX = (width * dpr) / 2;
    const textY = canvasHeight / 2;
    octx.fillText(text, textX, textY);

    // Read rasterized alpha values
    const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imgData.data;

    // Sampling step (smaller = denser matrix)
    const step = Math.max(4, Math.round(5 * dpr));
    const newParticles: Particle[] = [];

    for (let y = 0; y < offscreen.height; y += step) {
      for (let x = 0; x < offscreen.width; x += step) {
        const index = (y * offscreen.width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 120) {
          // Normalize to CSS display coordinates
          const cssX = x / dpr;
          const cssY = y / dpr;

          newParticles.push({
            originX: cssX,
            originY: cssY,
            x: cssX,
            y: cssY,
            vx: 0,
            vy: 0,
            radius: (alpha / 255) * 1.35 + 0.35,
            baseAlpha: Math.min(0.7, (alpha / 255) * 0.65 + 0.15),
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, [text]);

  // ─── Initialize & Resize Observer ─────────────────────────────────────────
  useEffect(() => {
    generateParticles();

    // Small delay to ensure web fonts have loaded
    const fontTimer = setTimeout(generateParticles, 300);

    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(fontTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [generateParticles]);

  // ─── Physics Simulation & Render Loop ─────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mouse = mousePosRef.current;

    const repulsionRadius = 90; // Interaction radius (matching the circular cursor)
    const repulsionStrength = 13.5;
    const springStrength = 0.085;
    const friction = 0.81;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      const particles = particlesRef.current;
      const count = particles.length;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // 1. Repulsion from Mouse Cursor (Scatter Effect)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius && dist > 0) {
            const force = (repulsionRadius - dist) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            const push = force * repulsionStrength;

            p.vx -= Math.cos(angle) * push;
            p.vy -= Math.sin(angle) * push;
          }
        }

        // 2. Spring force returning to original matrix coordinates
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * springStrength;
        p.vy += homeDy * springStrength;

        // 3. Velocity damping / friction
        p.vx *= friction;
        p.vy *= friction;

        // 4. Update position
        p.x += p.vx;
        p.y += p.vy;

        // 5. Render particle dot
        // Slight color brightening when scattered
        const isDisplaced = Math.abs(homeDx) > 2 || Math.abs(homeDy) > 2;
        ctx.fillStyle = isDisplaced
          ? "rgba(230, 198, 135, 0.9)"
          : `rgba(255, 255, 255, ${p.baseAlpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // ─── Mouse Movement Listeners ─────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mousePosRef.current.x = e.clientX - rect.left;
    mousePosRef.current.y = e.clientY - rect.top;
    mousePosRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mousePosRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden select-none cursor-pointer py-1 ${className}`}
      title="Hover and drag to scatter letters"
    >
      <canvas
        ref={canvasRef}
        aria-label={`${text} interactive dotted particle graphic`}
        className="block mx-auto will-change-transform pointer-events-none"
      />
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";

/**
 * CinematicOceanCanvas
 * 
 * An award-winning, interactive 60FPS procedural ocean atmosphere engine:
 * 1. Volumetric God Rays: Sunlight shafts filtering through oceanic swells
 * 2. Aquatic Caustic Refraction: Procedural caustic waves shimmering across the depths
 * 3. Bioluminescent & Gold Marine Particles: Reacts to mouse movement
 * 4. Deep Oceanic Color Grading: Radiant cerulean to deep sapphire
 */
export function CinematicOceanCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Mouse tracking for subtle interactive fluid parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ── Floating Bioluminescent Marine Particles ──
    const PARTICLE_COUNT = 45;
    interface Particle {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      speedY: number;
      speedX: number;
      pulseSpeed: number;
      phase: number;
      color: string;
    }

    const colors = [
      "rgba(56, 189, 248,",  // Cyan / Sky
      "rgba(125, 211, 252,", // Ice Blue
      "rgba(229, 9, 20,",   // Radiant Crimson Red
      "rgba(14, 165, 233,",  // Marine Azure
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.25,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // ── Volumetric Light Rays (God Rays) Definition ──
    interface LightRay {
      baseAngle: number;
      widthAtOrigin: number;
      widthAtBase: number;
      swaySpeed: number;
      swayAmount: number;
      alpha: number;
      length: number;
      originX: number;
    }

    const rays: LightRay[] = [
      { baseAngle: 0.15, widthAtOrigin: 20, widthAtBase: 380, swaySpeed: 0.0008, swayAmount: 0.08, alpha: 0.16, length: 1.2, originX: 0.2 },
      { baseAngle: 0.28, widthAtOrigin: 30, widthAtBase: 480, swaySpeed: 0.0006, swayAmount: 0.06, alpha: 0.20, length: 1.35, originX: 0.35 },
      { baseAngle: -0.12, widthAtOrigin: 25, widthAtBase: 420, swaySpeed: 0.0009, swayAmount: 0.07, alpha: 0.18, length: 1.15, originX: 0.65 },
      { baseAngle: -0.25, widthAtOrigin: 35, widthAtBase: 520, swaySpeed: 0.0007, swayAmount: 0.09, alpha: 0.15, length: 1.25, originX: 0.82 },
      { baseAngle: 0.05, widthAtOrigin: 15, widthAtBase: 320, swaySpeed: 0.0011, swayAmount: 0.05, alpha: 0.14, length: 1.05, originX: 0.5 },
    ];

    let time = 0;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // ── Main Render Loop (60 FPS) ──
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const mouseParallaxX = ((mouseX / width) - 0.5) * 40;
      const mouseParallaxY = ((mouseY / height) - 0.5) * 20;

      // ── 01. Base Multi-Stop Radiant Ocean Depth Gradient ──
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + mouseParallaxX * 0.5,
        -height * 0.1,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 1.1
      );
      bgGrad.addColorStop(0, "#1F6BC2");   // Sunlit Ocean Surface
      bgGrad.addColorStop(0.25, "#145199"); // Radiant Cerulean
      bgGrad.addColorStop(0.55, "#0E3970"); // Royal Sapphire
      bgGrad.addColorStop(0.85, "#08244D"); // Midnight Marine Depth
      bgGrad.addColorStop(1, "#04142E");   // Abyssal Floor

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ── 02. Volumetric Sun Rays (God Rays from ocean surface) ──
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      rays.forEach((ray, i) => {
        const sway = Math.sin(time * ray.swaySpeed * 1000 + i) * ray.swayAmount;
        const currentAngle = ray.baseAngle + sway;
        const originX = width * ray.originX + mouseParallaxX * 0.6;
        const originY = -30;
        const rayLen = height * ray.length;

        const endX = originX + Math.sin(currentAngle) * rayLen;
        const endY = originY + Math.cos(currentAngle) * rayLen;

        const leftX = endX - ray.widthAtBase / 2;
        const rightX = endX + ray.widthAtBase / 2;

        const rayGrad = ctx.createLinearGradient(originX, originY, endX, endY);
        const rayPulse = Math.sin(time * 1.2 + i * 2) * 0.04;
        const currentAlpha = Math.max(0.04, ray.alpha + rayPulse);

        rayGrad.addColorStop(0, `rgba(186, 230, 253, ${currentAlpha * 1.2})`);
        rayGrad.addColorStop(0.3, `rgba(56, 189, 248, ${currentAlpha * 0.9})`);
        rayGrad.addColorStop(0.7, `rgba(14, 165, 233, ${currentAlpha * 0.4})`);
        rayGrad.addColorStop(1, "rgba(2, 132, 199, 0)");

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(originX - ray.widthAtOrigin / 2, originY);
        ctx.lineTo(originX + ray.widthAtOrigin / 2, originY);
        ctx.lineTo(rightX, endY);
        ctx.lineTo(leftX, endY);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();

      // ── 03. Water Caustic Shimmer Wave Layer ──
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const causticPulse = Math.sin(time * 0.8) * 0.05 + 0.12;

      // Caustic Node 1 (Upper Left Swell)
      const c1X = width * 0.35 + Math.sin(time * 0.5) * 60 + mouseParallaxX;
      const c1Y = height * 0.3 + Math.cos(time * 0.4) * 40 + mouseParallaxY;
      const c1Grad = ctx.createRadialGradient(c1X, c1Y, 10, c1X, c1Y, width * 0.45);
      c1Grad.addColorStop(0, `rgba(125, 211, 252, ${causticPulse * 1.3})`);
      c1Grad.addColorStop(0.4, `rgba(56, 189, 248, ${causticPulse * 0.7})`);
      c1Grad.addColorStop(1, "rgba(14, 165, 233, 0)");
      ctx.fillStyle = c1Grad;
      ctx.fillRect(0, 0, width, height);

      // Caustic Node 2 (Mid-Right Swell)
      const c2X = width * 0.75 + Math.cos(time * 0.45) * 70;
      const c2Y = height * 0.6 + Math.sin(time * 0.35) * 50;
      const c2Grad = ctx.createRadialGradient(c2X, c2Y, 20, c2X, c2Y, width * 0.5);
      c2Grad.addColorStop(0, `rgba(56, 189, 248, ${causticPulse * 1.1})`);
      c2Grad.addColorStop(0.5, `rgba(37, 99, 235, ${causticPulse * 0.5})`);
      c2Grad.addColorStop(1, "rgba(2, 132, 199, 0)");
      ctx.fillStyle = c2Grad;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      // ── 04. Floating Bioluminescent & Gold Marine Particles ──
      ctx.save();
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.phase) * 0.3;

        // Reset particle when it floats past top
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Mouse avoidance impulse
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          p.x += (dx / dist) * 1.8;
          p.y += (dy / dist) * 1.8;
        }

        const alpha = p.baseAlpha + Math.sin(time * 3 + p.phase) * 0.18;
        ctx.fillStyle = `${p.color}${Math.max(0.05, alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Delicate glow halo around larger particles
        if (p.size > 1.8) {
          ctx.fillStyle = `${p.color}${Math.max(0.02, alpha * 0.25)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none w-full h-full"
    />
  );
}

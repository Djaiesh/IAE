"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2, FlaskConical, Thermometer, ShieldCheck, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommodityCategory {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  threeColor: number;
  specs: { label: string; value: string; detail: string }[];
  featuredItems: { name: string; grade: string; packaging: string }[];
  link: string;
}

const COMMODITIES: CommodityCategory[] = [
  {
    id: "spices",
    badge: "01 · Spices & Aromatics",
    title: "Laboratory-Calibrated Bio-Active Potency",
    subtitle: "High-Curcumin Turmeric & High-Piperine Malabar Pepper",
    description: "Sourced directly from audited farmer collectives across the Western Ghats and Deccan Plateau. Every consignment undergoes dual HPLC testing for bio-active curcumin (up to 5.5%) and essential oils before vacuum export packing.",
    accentColor: "#FF6B00",
    threeColor: 0xff8833,
    specs: [
      { label: "Active Curcumin", value: "4.5% – 5.5%", detail: "HPLC Assayed Lot Purity" },
      { label: "Moisture Content", value: "< 10.0%", detail: "Vacuum-Sealed Protection" },
      { label: "Shelf Stability", value: "24 Months", detail: "Multi-Wall Barrier Bags" },
    ],
    featuredItems: [
      { name: "Alleppey Finger Turmeric", grade: "Premium Export Grade · Polished", packaging: "25kg / 50kg Multi-Wall Jute / PP" },
      { name: "Tellicherry Black Pepper", grade: "TGSEB Extra Bold · High Piperine", packaging: "25kg Vacuum Export Sacks" },
      { name: "Guntur S17 Teja Chilli", grade: "High ASTA Red · Stemless", packaging: "10kg / 25kg Corrugated Bales" },
    ],
    link: "/products/spices",
  },
  {
    id: "vegetables",
    badge: "02 · Fresh Vegetables",
    title: "Hydro-Cooled Within 3 Hours of Harvest",
    subtitle: "Cellular Density Preserved for Sea Freight",
    description: "Perishability is defeated by rapid thermal core extraction. Field heat is pulled from Nasik red onions, tender okra, and G4 chillies within 180 minutes of harvest, preventing ethylene buildup and dehydration during ocean transit.",
    accentColor: "#22879D",
    threeColor: 0x1b6b7c,
    specs: [
      { label: "Pre-Cool Window", value: "< 3 Hours", detail: "Farmgate Hydro-Cooling" },
      { label: "Reefer Temp", value: "0°C – 4°C", detail: "Continuous Setpoint Log" },
      { label: "Transit Life", value: "21 – 35 Days", detail: "Micro-Perforated Ventilation" },
    ],
    featuredItems: [
      { name: "Nasik Red Onions", grade: "45mm – 60mm Caliber · Firm Flesh", packaging: "10kg / 25kg Leno Mesh Bags" },
      { name: "G4 Green Chillies", grade: "Export Fresh Stem-On · Zero MRL", packaging: "4.5kg Corrugated Export Boxes" },
      { name: "Tender Export Okra", grade: "8cm – 12cm Bright Green", packaging: "5kg Ventilated Telescopic Cartons" },
    ],
    link: "/products/vegetables",
  },
  {
    id: "fruits",
    badge: "03 · Exotic Orchard Fruits",
    title: "Controlled-Atmosphere Tropical Harvest",
    subtitle: "GI-Tagged Ratnagiri Alphonso & Bhagwa Pomegranates",
    description: "Sovereign orchards certified under Global-GAP protocols. Each fruit is picked at calibrated physiological maturity, hot-water or vapor-heat treated against quarantine pests, and packed in nitrogen-flushed reefer containers.",
    accentColor: "#C17B58",
    threeColor: 0xc17b58,
    specs: [
      { label: "Sweetness Brix", value: "16° – 19°+", detail: "Calibrated Refractometer" },
      { label: "Ethylene Scrubbing", value: "Active Gas", detail: "Nitrogen Atmosphere 12°C" },
      { label: "Traceability", value: "100% Farmgate", detail: "Global-GAP Orchard Chain" },
    ],
    featuredItems: [
      { name: "Ratnagiri Alphonso Mango", grade: "GI-Tagged · Hot Water / VHT Treated", packaging: "3kg / 12-Piece Master Cartons" },
      { name: "Bhagwa Pomegranates", grade: "Deep Ruby Arils · Brix 16°+", packaging: "3.5kg Net Foam-Sleeved Boxes" },
      { name: "Cavendish G9 Bananas", grade: "39mm – 46mm Caliber · Class 1", packaging: "13.5kg / 18.5kg Telescopic Boxes" },
    ],
    link: "/products/fruits",
  },
];

export function LuxuryCommodity3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("spices");
  const activeCommodity = COMMODITIES.find((c) => c.id === activeTab) || COMMODITIES[0];
  const crystalMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const accentLightRef = useRef<THREE.PointLight | null>(null);
  const particleMatRef = useRef<THREE.PointsMaterial | null>(null);

  // Smooth color update without tearing down WebGL context
  useEffect(() => {
    if (crystalMatRef.current) {
      crystalMatRef.current.color.setHex(activeCommodity.threeColor);
    }
    if (accentLightRef.current) {
      accentLightRef.current.color.setHex(activeCommodity.threeColor);
    }
    if (particleMatRef.current) {
      particleMatRef.current.color.setHex(activeCommodity.threeColor);
    }
  }, [activeCommodity]);

  // Three.js interactive 3D Holographic Pedestal & Crystal Lattice
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 48;
    camera.position.y = 8;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x071525, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    dirLight.position.set(40, 50, 40);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(activeCommodity.threeColor, 4.0, 100);
    accentLight.position.set(-20, 20, 25);
    scene.add(accentLight);
    accentLightRef.current = accentLight;

    // 3D Master Exhibition Group
    const showGroup = new THREE.Group();
    scene.add(showGroup);

    // Central Faceted Holographic Crystal (Octahedron / Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(11, 1);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: activeCommodity.threeColor,
      emissive: 0x071525,
      roughness: 0.15,
      metalness: 0.85,
      transmission: 0.55,
      thickness: 3.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    showGroup.add(crystalMesh);
    crystalMatRef.current = crystalMat;

    // Inner Glowing Core
    const innerGeo = new THREE.OctahedronGeometry(6, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    showGroup.add(innerMesh);

    // Outer Floating Orbit Rings (Toruses)
    const ring1Geo = new THREE.TorusGeometry(18, 0.4, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xc17b58,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    showGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(22, 0.3, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x22879d,
      metalness: 0.8,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    showGroup.add(ring2);

    // Floating Specimen Particles Cloud
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 14 + Math.random() * 16;
      particlePos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = rad * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: activeCommodity.threeColor,
      size: 1.2,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    particleMatRef.current = particleMat;
    const particles = new THREE.Points(particleGeo, particleMat);
    showGroup.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) * 0.001;
      mouseY = (e.clientY - halfH) * 0.001;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReduced) {
        // Continuous organic 3D rotations
        crystalMesh.rotation.y = t * 0.45;
        crystalMesh.rotation.x = Math.sin(t * 0.3) * 0.25;

        innerMesh.rotation.y = -t * 0.6;
        innerMesh.rotation.z = t * 0.3;

        ring1.rotation.z = t * 0.25;
        ring2.rotation.z = -t * 0.2;

        particles.rotation.y = t * 0.15;

        // Interactive mouse tilt
        showGroup.rotation.y += (mouseX * 0.8 - showGroup.rotation.y) * 0.05;
        showGroup.rotation.x += (-mouseY * 0.8 - showGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      crystalGeo.dispose();
      crystalMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative py-28 sm:py-36 bg-abyss overflow-hidden border-t border-white/5">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-abyss to-deep pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-reveal="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-saffron/40 bg-deep/80 backdrop-blur-xl mb-4 shadow-glow">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span className="eyebrow text-[10px] text-saffron tracking-widest font-semibold">
              Sovereign Agricultural Commodities
            </span>
          </div>

          <h2 className="section-title text-cream">
            The Three Commodity Crowns:
            <span className="text-saffron italic font-normal block mt-1">
              Spices, Horticulture &amp; GI Fruits
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed">
            Select any flagship portfolio to inspect active chemical potency assay metrics, post-harvest hydro-cooling protocols, and container packaging specifications.
          </p>
        </div>

        {/* ── 3D COMMODITY TABS ── */}
        <div className="flex flex-wrap gap-2.5 mb-10" data-stagger>
          {COMMODITIES.map((c) => {
            const isCurrent = c.id === activeTab;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={cn(
                  "px-6 py-3.5 rounded-full border font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer",
                  isCurrent
                    ? "bg-saffron text-white border-saffron shadow-saffron scale-[1.02]"
                    : "glass border-white/10 text-foam/75 hover:border-white/25 hover:text-cream"
                )}
              >
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  isCurrent ? "bg-white animate-pulse" : "bg-white/30"
                )} />
                <span>{c.badge}</span>
              </button>
            );
          })}
        </div>

        {/* ── 3D EXHIBITION STAGE & SPECIFICATIONS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Interactive 3D WebGL Holographic Pedestal */}
          <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[540px] rounded-5xl border border-white/10 bg-gradient-to-b from-deep/70 via-navy/90 to-abyss backdrop-blur-2xl shadow-float overflow-hidden flex items-center justify-center">
            
            {/* The 3D Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab" />

            {/* Overlay Hologram Badges */}
            <div className="absolute top-5 left-6 pointer-events-none flex items-center gap-2 bg-abyss/85 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-saffron">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span>3D Holographic Lattice · {activeCommodity.subtitle}</span>
            </div>

            <div className="absolute bottom-5 right-6 pointer-events-none text-[10px] font-mono text-foam/50">
              Interactive Specimen Refraction
            </div>
          </div>

          {/* Right Column: Deep Specifications & Commodity Inspection */}
          <div className="lg:col-span-6 space-y-6">

            <div className="glass rounded-4xl p-6 sm:p-10 border border-white/15 shadow-float">
              
              <div className="flex items-center gap-2 mb-3">
                <span className="eyebrow text-saffron text-[11px] font-semibold">
                  {activeCommodity.badge}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-cream font-normal leading-snug mb-3">
                {activeCommodity.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-foam/80 font-light leading-relaxed mb-6">
                {activeCommodity.description}
              </p>

              {/* 3 Metric Badges */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pb-6 border-b border-white/10 mb-6">
                {activeCommodity.specs.map((s, idx) => (
                  <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-foam/50 block font-mono uppercase mb-1">
                      {s.label}
                    </span>
                    <span className="font-display text-base sm:text-xl text-cream font-bold block tabular-nums">
                      {s.value}
                    </span>
                    <span className="text-[10px] text-saffron-light block font-sans font-light mt-0.5 truncate">
                      {s.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Flagship Commodities List */}
              <div className="space-y-3 mb-8">
                <span className="font-sans text-xs uppercase tracking-wider text-foam/50 font-semibold block">
                  Export Calibrated Commodities:
                </span>
                {activeCommodity.featuredItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-sans font-semibold text-cream block truncate">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-foam/60 font-light block truncate">
                        {item.grade}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-deep border border-white/10 text-saffron-light shrink-0">
                      {item.packaging}
                    </span>
                  </div>
                ))}
              </div>

              {/* Link CTA */}
              <div className="pt-2">
                <Link
                  href={activeCommodity.link}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
                >
                  <span>Explore Full {activeCommodity.badge.split("·")[1]} Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

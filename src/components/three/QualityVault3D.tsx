"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShieldCheck, FlaskConical, Award, CheckCircle2, ArrowRight, Dna, Microscope } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";

export function QualityVault3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeAssay, setActiveAssay] = useState<number>(0);

  const assays = [
    {
      title: "HPLC Active Compound Assay",
      spec: "Curcumin 4.5%–5.5% · Piperine 6.0%+",
      method: "High-Performance Liquid Chromatography (ISO 17025)",
      desc: "Each spice batch is extracted and quantified through calibrated column chromatography to verify bio-active therapeutic compound density before export release.",
      color: "#FF6B00",
      threeColor: 0xff6b00,
    },
    {
      title: "Pesticide MRL Multi-Residue Screen",
      spec: "Zero Tolerance · 0.00ppm Defect",
      method: "Dual GC-MS/MS & LC-MS/MS Tandem Mass Spectrometry",
      desc: "Comprehensive screen across 450+ chemical pesticide compounds, heavy metals (Lead, Cadmium, Arsenic), and aflatoxins to assure total EU and US FDA compliance.",
      color: "#22879D",
      threeColor: 0x22879d,
    },
    {
      title: "Phytosanitary & Plant Quarantine",
      spec: "Consignment-Wise Verified PSC",
      method: "Methyl Bromide / Phosphine / Vapor Heat Treatment",
      desc: "Inspected and certified by the National Plant Protection Organization (NPPO). All fresh horticulture is cleared free of quarantine pests and soil pathogens.",
      color: "#C17B58",
      threeColor: 0xc17b58,
    },
  ];

  const currentAssay = assays[activeAssay];
  const pointLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    if (pointLightRef.current) {
      pointLightRef.current.color.setHex(currentAssay.threeColor);
    }
  }, [currentAssay]);

  // 3D Molecular Lattice / Crystal Structure
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
    camera.position.z = 46;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f2035, 2.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(currentAssay.threeColor, 4.5, 90);
    pointLight.position.set(20, 20, 30);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    const rimLight = new THREE.DirectionalLight(0xc17b58, 2.0);
    rimLight.position.set(-30, -20, -20);
    scene.add(rimLight);

    // Molecular Model Group (Full 3D Ball-and-Stick Lattice)
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Atoms (Spheres)
    const atomGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const atomMatPrimary = new THREE.MeshStandardMaterial({
      color: currentAssay.threeColor,
      metalness: 0.8,
      roughness: 0.2,
    });
    const atomMatSecondary = new THREE.MeshStandardMaterial({
      color: 0xf4efe6,
      metalness: 0.5,
      roughness: 0.3,
    });

    // 12 Symmetric Vertices of an Icosahedron as Molecular Nodes
    const icoGeo = new THREE.IcosahedronGeometry(13, 0);
    const icoPositions = icoGeo.attributes.position;
    const atomPositions: THREE.Vector3[] = [];

    for (let i = 0; i < icoPositions.count; i++) {
      const pos = new THREE.Vector3(
        icoPositions.getX(i),
        icoPositions.getY(i),
        icoPositions.getZ(i)
      );
      atomPositions.push(pos);

      const atom = new THREE.Mesh(atomGeo, i % 2 === 0 ? atomMatPrimary : atomMatSecondary);
      atom.position.copy(pos);
      moleculeGroup.add(atom);
    }

    // Bonds (Cylinders connecting atoms)
    const bondMat = new THREE.MeshStandardMaterial({
      color: 0x1b6b7c,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < atomPositions.length; i++) {
      for (let j = i + 1; j < atomPositions.length; j++) {
        const dist = atomPositions[i].distanceTo(atomPositions[j]);
        // Connect adjacent nodes
        if (dist < 15) {
          const p1 = atomPositions[i];
          const p2 = atomPositions[j];
          const mid = p1.clone().add(p2).multiplyScalar(0.5);

          const bondGeo = new THREE.CylinderGeometry(0.35, 0.35, dist, 8);
          const bond = new THREE.Mesh(bondGeo, bondMat);
          bond.position.copy(mid);

          // Orient cylinder between the two points
          bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p2.clone().sub(p1).normalize());
          moleculeGroup.add(bond);
        }
      }
    }

    // Outer Gyroscope Rings
    const gyroGeo = new THREE.TorusGeometry(19, 0.25, 16, 80);
    const gyroMat = new THREE.MeshBasicMaterial({ color: 0xc17b58, transparent: true, opacity: 0.4 });
    const gyro = new THREE.Mesh(gyroGeo, gyroMat);
    scene.add(gyro);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) * 0.0008;
      mouseY = (e.clientY - halfH) * 0.0008;
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
        moleculeGroup.rotation.y = t * 0.35 + mouseX * 2;
        moleculeGroup.rotation.x = Math.sin(t * 0.25) * 0.2 - mouseY * 2;
        moleculeGroup.rotation.z = Math.cos(t * 0.2) * 0.15;

        gyro.rotation.z = -t * 0.15;
        gyro.rotation.x = Math.PI / 4 + Math.sin(t * 0.1) * 0.2;
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
      atomGeo.dispose();
      atomMatPrimary.dispose();
      atomMatSecondary.dispose();
      bondMat.dispose();
      gyroGeo.dispose();
      gyroMat.dispose();
      renderer.dispose();
      pointLightRef.current = null;
    };
  }, []);

  return (
    <section className="relative py-28 sm:py-36 bg-abyss overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-abyss to-deep pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-reveal="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-saffron/40 bg-deep/80 backdrop-blur-xl mb-4 shadow-glow">
            <FlaskConical className="w-3.5 h-3.5 text-saffron" />
            <span className="eyebrow text-[10px] text-saffron tracking-widest font-semibold">
              3D Scientific Laboratory Assay
            </span>
          </div>

          <h2 className="section-title text-cream">
            Zero-Tolerance Chemical
            <span className="text-saffron italic font-normal block mt-1">
              Purity &amp; Quality Vault
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed">
            Every export lot is tested at NABL and ISO/IEC 17025 accredited laboratories. We enforce strict international threshold screenings across active bio-active compounds, multi-residue pesticides, and heavy metals.
          </p>
        </div>

        {/* ── 3D MOLECULAR STAGE & SCIENTIFIC AUDIT DECK ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: 3D Molecular Lattice WebGL */}
          <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[530px] rounded-5xl border border-white/10 bg-gradient-to-b from-navy/90 via-deep/80 to-abyss backdrop-blur-2xl shadow-float overflow-hidden flex items-center justify-center">
            
            {/* 3D Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab" />

            {/* Assay Overlay Badges */}
            <div className="absolute top-5 left-6 pointer-events-none flex items-center gap-2 bg-abyss/85 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-saffron">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span>3D HPLC Molecular Lattice · {currentAssay.spec}</span>
            </div>

            <div className="absolute bottom-5 right-6 pointer-events-none text-[10px] font-mono text-foam/50">
              ISO 17025 Accredited Purity Assay
            </div>
          </div>

          {/* Right Column: Interactive Assay Switcher & Certification Badges */}
          <div className="lg:col-span-6 space-y-4">

            {/* 3 Assay Selectors */}
            <div className="space-y-3">
              {assays.map((a, idx) => {
                const isSelected = idx === activeAssay;
                return (
                  <button
                    key={a.title}
                    onClick={() => setActiveAssay(idx)}
                    className={cn(
                      "w-full text-left p-4 sm:p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex items-start gap-4",
                      isSelected
                        ? "glass-saffron border-saffron shadow-saffron border-l-4"
                        : "glass border-white/5 hover:border-white/20 text-foam/80"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0 transition-colors mt-0.5",
                      isSelected ? "bg-saffron text-white border-saffron shadow-md" : "bg-deep text-foam/40 border-white/10"
                    )}>
                      {idx === 0 ? <FlaskConical className="w-4 h-4" /> : idx === 1 ? <ShieldCheck className="w-4 h-4" /> : <Microscope className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={cn(
                          "font-display text-lg block truncate",
                          isSelected ? "text-cream font-medium" : "text-foam/80"
                        )}>
                          {a.title}
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-deep border border-white/10 text-saffron-light shrink-0">
                          {a.spec}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-foam/65 font-light leading-relaxed">
                        {a.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Verified Accreditations Bar */}
            <div className="glass rounded-3xl p-5 border border-white/10">
              <span className="font-sans text-[11px] uppercase tracking-wider text-foam/50 block mb-3 font-semibold">
                Government &amp; International Food Safety Accreditations:
              </span>
              <div className="flex flex-wrap gap-2">
                {SITE_CONFIG.complianceCertifications.map((c) => (
                  <span
                    key={c.code}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-foam/90 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-saffron" />
                    <span>{c.code}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Link */}
            <div className="pt-2">
              <a
                href="/quality"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
              >
                <span>Inspect Full Laboratory Assay Methodologies</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

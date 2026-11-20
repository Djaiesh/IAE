"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Thermometer, Navigation, ShieldCheck, Ship, Wind, Clock, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";

export function ColdChainMarine3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [telemetryMode, setTelemetryMode] = useState<"frozen" | "chilled" | "controlled">("chilled");

  const telemetryProfiles = {
    frozen: {
      name: "Deep Frozen Spices & Purees",
      temp: "-18.0°C",
      humidity: "45% RH",
      oxygen: "Ambient",
      co2: "Normal",
      status: "Super-Chilled Cryo Safe",
      color: "#22879D",
      threeColor: 0x22879d,
    },
    chilled: {
      name: "Horticulture Cold Reefer",
      temp: "+2.5°C",
      humidity: "88% RH",
      oxygen: "Controlled 5%",
      co2: "3.5%",
      status: "Hydro-Cooled Moisture Seal",
      color: "#FF8833",
      threeColor: 0xff8833,
    },
    controlled: {
      name: "Controlled Atmosphere Tropical",
      temp: "+12.0°C",
      humidity: "90% RH",
      oxygen: "3% Scrubbed",
      co2: "5% Enriched",
      status: "Ethylene Scrubbed Active",
      color: "#D4AF37",
      threeColor: 0xd4af37,
    },
  };

  const currentProfile = telemetryProfiles[telemetryMode];
  const accentLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    if (accentLightRef.current) {
      accentLightRef.current.color.setHex(currentProfile.threeColor);
    }
  }, [currentProfile]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 01. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040d18, 0.012);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 18, 52);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 02. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a2238, 2.5);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xaad5ee, 2.0);
    moonLight.position.set(-30, 45, 20);
    scene.add(moonLight);

    const accentLight = new THREE.PointLight(currentProfile.threeColor, 4.0, 80);
    accentLight.position.set(0, 10, 10);
    scene.add(accentLight);
    accentLightRef.current = accentLight;

    // 03. Animated Oceanic Surface Plane (Waves)
    const oceanWidth = 140;
    const oceanHeight = 140;
    const oceanSegments = 70;
    const oceanGeo = new THREE.PlaneGeometry(oceanWidth, oceanHeight, oceanSegments, oceanSegments);
    oceanGeo.rotateX(-Math.PI / 2);

    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x071b2e,
      emissive: 0x040d18,
      specular: 0x1b6b7c,
      shininess: 65,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    scene.add(oceanMesh);

    // Keep reference to initial positions for wave animation
    const posAttribute = oceanGeo.attributes.position;
    const originalPositions = posAttribute.array.slice() as Float32Array;

    // 04. Stylized 3D Container Vessel Model
    const shipGroup = new THREE.Group();
    scene.add(shipGroup);

    // Hull (V-shaped container ship hull)
    const hullGeo = new THREE.BoxGeometry(14, 4.5, 34);
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x0b1a2a,
      metalness: 0.8,
      roughness: 0.3,
    });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.position.y = 2.2;
    shipGroup.add(hull);

    // Keel / Bow wedge
    const bowGeo = new THREE.ConeGeometry(5, 10, 4);
    bowGeo.rotateZ(Math.PI / 2);
    bowGeo.rotateY(Math.PI / 4);
    const bowMat = new THREE.MeshStandardMaterial({ color: 0x081522, metalness: 0.9, roughness: 0.2 });
    const bow = new THREE.Mesh(bowGeo, bowMat);
    bow.position.set(0, 2.2, -18);
    shipGroup.add(bow);

    // Glowing Containers Stack
    const containerColors = [0xff6b00, 0x1b6b7c, 0xd4af37, 0x0f3a5c];
    for (let x = -4; x <= 4; x += 4) {
      for (let y = 5; y <= 9; y += 2.5) {
        for (let z = -10; z <= 8; z += 6) {
          const cGeo = new THREE.BoxGeometry(3.6, 2.2, 5.5);
          const cMat = new THREE.MeshStandardMaterial({
            color: containerColors[Math.floor(Math.random() * containerColors.length)],
            metalness: 0.7,
            roughness: 0.35,
          });
          const cBox = new THREE.Mesh(cGeo, cMat);
          cBox.position.set(x, y, z);
          shipGroup.add(cBox);
        }
      }
    }

    // Bridge / Wheelhouse at aft
    const bridgeGeo = new THREE.BoxGeometry(10, 8, 5);
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xf4efe6, roughness: 0.5 });
    const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
    bridge.position.set(0, 8, 12);
    shipGroup.add(bridge);

    // Glowing Navigation Mast Beacon
    const beaconGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 14, 12);
    shipGroup.add(beacon);

    // 05. Cold Mist Particles (Reefer cooling vapor)
    const mistCount = 180;
    const mistGeo = new THREE.BufferGeometry();
    const mistPos = new Float32Array(mistCount * 3);
    for (let i = 0; i < mistCount; i++) {
      mistPos[i * 3] = (Math.random() - 0.5) * 22;
      mistPos[i * 3 + 1] = 4 + Math.random() * 8;
      mistPos[i * 3 + 2] = (Math.random() - 0.5) * 32;
    }
    mistGeo.setAttribute("position", new THREE.BufferAttribute(mistPos, 3));
    const mistMat = new THREE.PointsMaterial({
      color: 0xcae8f5,
      size: 1.6,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const mist = new THREE.Points(mistGeo, mistMat);
    shipGroup.add(mist);

    // Mouse Interaction
    let mouseX = 0;
    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      mouseX = (e.clientX - halfW) * 0.0006;
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

    // 06. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReduced) {
        // Displace ocean vertex heights using mathematical sine wave combinations
        const positions = posAttribute.array;
        for (let i = 0; i < positions.length; i += 3) {
          const ox = originalPositions[i];
          const oz = originalPositions[i + 2];
          // Wave height formula
          positions[i + 1] =
            Math.sin(ox * 0.12 + t * 1.6) * 1.6 +
            Math.cos(oz * 0.08 + t * 1.2) * 1.4;
        }
        posAttribute.needsUpdate = true;

        // Gentle ship pitching and rolling on the waves
        shipGroup.position.y = Math.sin(t * 1.5) * 0.5;
        shipGroup.rotation.z = Math.sin(t * 1.1) * 0.035;
        shipGroup.rotation.x = Math.cos(t * 0.9) * 0.025;

        // Mouse pan on ship
        shipGroup.rotation.y = Math.sin(t * 0.2) * 0.08 + mouseX;

        // Animate mist
        const mPos = mistGeo.attributes.position.array as Float32Array;
        for (let j = 1; j < mPos.length; j += 3) {
          mPos[j] += 0.03;
          if (mPos[j] > 14) mPos[j] = 4;
        }
        mistGeo.attributes.position.needsUpdate = true;
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
      oceanGeo.dispose();
      oceanMat.dispose();
      hullGeo.dispose();
      hullMat.dispose();
      bowGeo.dispose();
      bowMat.dispose();
      bridgeGeo.dispose();
      bridgeMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      mistGeo.dispose();
      mistMat.dispose();
      renderer.dispose();
      accentLightRef.current = null;
    };
  }, []);

  return (
    <section className="relative py-28 sm:py-36 bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-navy to-abyss pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-reveal="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-saffron/40 bg-deep/80 backdrop-blur-xl mb-4 shadow-glow">
            <Ship className="w-3.5 h-3.5 text-saffron" />
            <span className="eyebrow text-[10px] text-saffron tracking-widest font-semibold">
              3D High-Seas Ocean Freight Simulation
            </span>
          </div>

          <h2 className="section-title text-cream">
            Unbroken Marine Reefer
            <span className="text-saffron italic font-normal block mt-1">
              Cold Chain Telemetry
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed">
            Real-time interactive WebGL maritime vessel navigation. Every container is coupled to the ship&apos;s 440V auxiliary marine circuit with satellite GPS loggers reporting core temperature, relative humidity, and ethylene levels every 15 minutes.
          </p>
        </div>

        {/* ── 3D SHIP SIMULATION & TELEMETRY DASHBOARD ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: 3D Ocean Vessel Canvas */}
          <div className="lg:col-span-7 relative w-full h-[450px] sm:h-[550px] rounded-5xl border border-white/10 bg-abyss/90 backdrop-blur-2xl shadow-float overflow-hidden flex items-center justify-center">
            
            {/* The 3D Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Vessel HUD Overlays */}
            <div className="absolute top-5 left-6 pointer-events-none flex items-center gap-2 bg-abyss/85 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-saffron">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span>3D Ocean Wave Simulation · High Seas Sea Lanes</span>
            </div>

            <div className="absolute bottom-5 left-6 pointer-events-none flex items-center gap-3 text-[11px] font-mono text-foam/70 bg-navy/80 px-3 py-1 rounded-full border border-white/5">
              <span>Speed: 19.4 Knots</span>
              <span>·</span>
              <span>Berth ETA: On Schedule</span>
            </div>
          </div>

          {/* Right Column: Dynamic Reefer Profile Selector & Telemetry Readouts */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Telemetry Mode Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "chilled" as const, label: "Fresh Chilled", icon: "0°C - 4°C" },
                { id: "controlled" as const, label: "Tropical CA", icon: "+12°C" },
                { id: "frozen" as const, label: "Deep Frozen", icon: "-18°C" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setTelemetryMode(m.id)}
                  className={cn(
                    "p-3 rounded-2xl border text-center transition-all duration-300 cursor-pointer",
                    telemetryMode === m.id
                      ? "bg-saffron text-white border-saffron shadow-saffron font-bold"
                      : "glass border-white/10 text-foam/70 hover:border-white/20 hover:text-cream"
                  )}
                >
                  <span className="font-sans text-xs block">{m.label}</span>
                  <span className="font-mono text-[10px] opacity-75 block mt-0.5">{m.icon}</span>
                </button>
              ))}
            </div>

            {/* Active Telemetry Gauge Card */}
            <div className="glass rounded-4xl p-6 sm:p-8 border border-white/15 shadow-float">
              
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="eyebrow text-saffron text-[10px] block mb-1">
                    Live Marine Telemetry Node
                  </span>
                  <h3 className="font-display text-2xl text-cream font-medium">
                    {currentProfile.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-saffron/15 border border-saffron/40 text-saffron text-xs font-mono font-bold shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentProfile.status}</span>
                </div>
              </div>

              {/* 4 Telemetry Gauges Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-foam/50 block mb-1">CORE PULP TEMP</span>
                  <span className="font-display text-2xl sm:text-3xl text-saffron font-bold tabular-nums block">
                    {currentProfile.temp}
                  </span>
                  <span className="text-[10px] font-sans text-foam/60 mt-1 block">Continuous 15-min log</span>
                </div>

                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-foam/50 block mb-1">RELATIVE HUMIDITY</span>
                  <span className="font-display text-2xl sm:text-3xl text-teal font-bold tabular-nums block">
                    {currentProfile.humidity}
                  </span>
                  <span className="text-[10px] font-sans text-foam/60 mt-1 block">Moisture equilibrium</span>
                </div>

                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-foam/50 block mb-1">OXYGEN REGULATION</span>
                  <span className="font-display text-lg sm:text-xl text-cream font-semibold tabular-nums block">
                    {currentProfile.oxygen}
                  </span>
                  <span className="text-[10px] font-sans text-foam/60 mt-1 block">Nitrogen displacement</span>
                </div>

                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-foam/50 block mb-1">ETHYLENE &amp; CO2</span>
                  <span className="font-display text-lg sm:text-xl text-gold font-semibold tabular-nums block">
                    {currentProfile.co2}
                  </span>
                  <span className="text-[10px] font-sans text-foam/60 mt-1 block">Active catalytic scrubber</span>
                </div>
              </div>

              {/* IncoTerm & Booking Notice */}
              <div className="p-4 rounded-2xl bg-deep/80 border border-white/10 text-xs font-sans text-foam/75 mb-6 flex items-center gap-3">
                <Clock className="w-4 h-4 text-saffron shrink-0" />
                <span>
                  FCL 20ft &amp; 40ft High Cube Reefers backed by Lloyd&apos;s Register marine cargo insurance.
                </span>
              </div>

              {/* Action Button */}
              <a
                href="/contact?type=quote"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-saffron hover:bg-saffron-light text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-saffron"
              >
                <span>Book Direct Reefer Booking for This Profile</span>
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

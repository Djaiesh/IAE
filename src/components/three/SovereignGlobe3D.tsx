"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Anchor, Navigation, Clock, Ship, ShieldCheck, ArrowRight, Globe } from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { cn } from "@/lib/utils";

// Latitude & Longitude mapped to 3D Sphere (radius R)
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// 3D Port Coordinates (Real geographic latitude & longitude)
const PORT_GEO_COORDS: Record<string, { lat: number; lon: number }> = {
  "origin-india":   { lat: 18.95,  lon: 72.85 }, // Mumbai / JNPT Gateway
  "port-rotterdam": { lat: 51.92,  lon: 4.47 },
  "port-jebelali":  { lat: 25.01,  lon: 55.06 },
  "port-singapore": { lat: 1.29,   lon: 103.85 },
  "port-newyork":   { lat: 40.71,  lon: -74.00 },
  "port-london":    { lat: 51.50,  lon: -0.12 },
};

export function SovereignGlobe3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const ports = SITE_CONFIG.destinationPorts;
  const [selectedId, setSelectedId] = useState(ports[0].id);
  const selectedPort = ports.find((p) => p.id === selectedId) || ports[0];

  // Callback to target rotation
  const targetRotationRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 01. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 260;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 02. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f2d48, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    dirLight.position.set(150, 80, 100);
    scene.add(dirLight);

    const goldPointLight = new THREE.PointLight(0xff8833, 3.5, 300);
    goldPointLight.position.set(-80, 50, 120);
    scene.add(goldPointLight);

    // 03. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 70;

    // Ocean Core Sphere with deep abyss gradient
    const oceanGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const oceanMaterial = new THREE.MeshPhongMaterial({
      color: 0x071525,
      emissive: 0x040d18,
      specular: 0x1b6b7c,
      shininess: 35,
      transparent: true,
      opacity: 0.95,
    });
    const oceanSphere = new THREE.Mesh(oceanGeometry, oceanMaterial);
    globeGroup.add(oceanSphere);

    // Atmospheric Glow Shell
    const atmoGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 48, 48);
    const atmoMaterial = new THREE.MeshBasicMaterial({
      color: 0x1b6b7c,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeometry, atmoMaterial);
    globeGroup.add(atmoMesh);

    // Latitude & Longitude Coordinate Wireframe Rings
    const wireframeGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.002, 24, 18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x0f3a5c,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeMesh);

    // 04. Procedural Continental Clusters (Point Cloud)
    // Generates high-density continental clusters on Earth coordinates
    const landPointCount = 2800;
    const landPositions = new Float32Array(landPointCount * 3);
    const landColors = new Float32Array(landPointCount * 3);
    const cTeal = new THREE.Color(0x22879d);
    const cGold = new THREE.Color(0xd4af37);

    // Approximate major continental bounds (minLat, maxLat, minLon, maxLon)
    const continents = [
      { minLat: 8, maxLat: 36, minLon: 68, maxLon: 92 },    // India / South Asia
      { minLat: 35, maxLat: 70, minLon: -10, maxLon: 40 },  // Europe
      { minLat: 12, maxLat: 35, minLon: 35, maxLon: 60 },   // Middle East
      { minLat: -10, maxLat: 25, minLon: 95, maxLon: 140 }, // Southeast Asia
      { minLat: 25, maxLat: 55, minLon: -125, maxLon: -70 },// North America
      { minLat: -35, maxLat: 37, minLon: -18, maxLon: 52 }, // Africa
      { minLat: -40, maxLat: -10, minLon: 110, maxLon: 155 },// Australia
      { minLat: -55, maxLat: 12, minLon: -80, maxLon: -35 },// South America
    ];

    let pIdx = 0;
    for (let i = 0; i < landPointCount; i++) {
      const c = continents[Math.floor(Math.random() * continents.length)];
      const lat = c.minLat + Math.random() * (c.maxLat - c.minLat);
      const lon = c.minLon + Math.random() * (c.maxLon - c.minLon);
      const v = latLongToVector3(lat, lon, GLOBE_RADIUS * 1.008);

      landPositions[pIdx * 3] = v.x;
      landPositions[pIdx * 3 + 1] = v.y;
      landPositions[pIdx * 3 + 2] = v.z;

      // Color variation between sea-teal and subtle harvest-gold
      const col = Math.random() > 0.3 ? cTeal : cGold;
      landColors[pIdx * 3] = col.r;
      landColors[pIdx * 3 + 1] = col.g;
      landColors[pIdx * 3 + 2] = col.b;
      pIdx++;
    }

    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute("position", new THREE.BufferAttribute(landPositions, 3));
    landGeo.setAttribute("color", new THREE.BufferAttribute(landColors, 3));

    const landMat = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const landPoints = new THREE.Points(landGeo, landMat);
    globeGroup.add(landPoints);

    // 05. 3D Beacons and Curved Maritime Trade Arcs
    const originVec = latLongToVector3(
      PORT_GEO_COORDS["origin-india"].lat,
      PORT_GEO_COORDS["origin-india"].lon,
      GLOBE_RADIUS * 1.01
    );

    // Origin Gateway Pin (JNPT / Mundra)
    const originPinGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const originPinMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
    const originPin = new THREE.Mesh(originPinGeo, originPinMat);
    originPin.position.copy(originVec);
    globeGroup.add(originPin);

    // Trade Arcs and Moving Light Pulses
    interface ArcData {
      curve: THREE.CubicBezierCurve3;
      pulseMesh: THREE.Mesh;
      lineMesh: THREE.Line;
      portId: string;
      speed: number;
      progress: number;
    }

    const arcsData: ArcData[] = [];

    const pulseGeo = new THREE.SphereGeometry(1.2, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    ports.forEach((port) => {
      const geo = PORT_GEO_COORDS[port.id];
      if (!geo) return;

      const destVec = latLongToVector3(geo.lat, geo.lon, GLOBE_RADIUS * 1.01);

      // Destination Port Marker
      const portPinGeo = new THREE.SphereGeometry(1.3, 16, 16);
      const portPinMat = new THREE.MeshBasicMaterial({ color: 0xd4af37 });
      const portPin = new THREE.Mesh(portPinGeo, portPinMat);
      portPin.position.copy(destVec);
      globeGroup.add(portPin);

      // High Arc Cubic Bezier
      const distance = originVec.distanceTo(destVec);
      const altitude = distance * 0.38 + 8; // Arch height based on distance

      const mid1 = originVec.clone().lerp(destVec, 0.33).normalize().multiplyScalar(GLOBE_RADIUS + altitude);
      const mid2 = originVec.clone().lerp(destVec, 0.66).normalize().multiplyScalar(GLOBE_RADIUS + altitude);

      const curve = new THREE.CubicBezierCurve3(originVec, mid1, mid2, destVec);
      const curvePoints = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xff8833,
        transparent: true,
        opacity: 0.5,
      });
      const lineMesh = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(lineMesh);

      // Animated Light Pulse
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(originVec);
      globeGroup.add(pulseMesh);

      arcsData.push({
        curve,
        pulseMesh,
        lineMesh,
        portId: port.id,
        speed: 0.0035 + Math.random() * 0.002,
        progress: Math.random(),
      });
    });

    // 06. Cosmic Stardust Background
    const starCount = 450;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 500;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 500;
      starPos[i * 3 + 2] = -120 + (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x88bbdd, size: 1.1, transparent: true, opacity: 0.4 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Initial globe orientation to highlight India and Europe
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.25;

    // 07. Mouse Drag Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;

      // Clamp vertical rotation
      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
      targetRotationRef.current = null; // Clear auto target when user drags
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Support for Mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;
      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      targetRotationRef.current = null;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // 08. Render Animation Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth auto-rotation when user is not dragging
      if (!isDragging && !targetRotationRef.current && !prefersReduced) {
        globeGroup.rotation.y += 0.0042;
      }

      // Smooth lerp to target port coordinates if clicked
      if (targetRotationRef.current) {
        globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.05;
        globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.05;
      }

      // Animate Light Pulses along 3D Arcs
      arcsData.forEach((arc) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;

        const pos = arc.curve.getPoint(arc.progress);
        arc.pulseMesh.position.copy(pos);

        // Highlight selected port arc
        if (arc.portId === selectedId) {
          (arc.lineMesh.material as THREE.LineBasicMaterial).opacity = 0.95;
          (arc.lineMesh.material as THREE.LineBasicMaterial).color.setHex(0xff6b00);
          arc.pulseMesh.scale.set(1.4, 1.4, 1.4);
        } else {
          (arc.lineMesh.material as THREE.LineBasicMaterial).opacity = 0.35;
          (arc.lineMesh.material as THREE.LineBasicMaterial).color.setHex(0x1b6b7c);
          arc.pulseMesh.scale.set(0.9, 0.9, 0.9);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      oceanGeometry.dispose();
      oceanMaterial.dispose();
      atmoGeometry.dispose();
      atmoMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      landGeo.dispose();
      landMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, [selectedId]);

  // Click handler to rotate globe to port
  const handleSelectPort = (portId: string) => {
    setSelectedId(portId);
    const geo = PORT_GEO_COORDS[portId];
    if (geo) {
      // Calculate target globe rotation in radians to face camera
      const targetY = -((geo.lon * Math.PI) / 180) - Math.PI / 2;
      const targetX = ((geo.lat * Math.PI) / 180) * 0.3;
      targetRotationRef.current = { x: targetX, y: targetY };
    }
  };

  return (
    <section className="relative py-28 sm:py-36 bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-abyss to-navy pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-reveal="up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-saffron/40 bg-deep/80 backdrop-blur-xl mb-4 shadow-glow">
            <Globe className="w-3.5 h-3.5 text-saffron" />
            <span className="eyebrow text-[10px] text-saffron tracking-widest font-semibold">
              Interactive 3D Sovereign Globe
            </span>
          </div>

          <h2 className="section-title text-cream">
            Intercontinental Maritime
            <span className="text-saffron italic font-normal block mt-1">
              Trade Arcs &amp; Berths
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-foam/80 font-light mt-4 leading-relaxed">
            Drag to rotate our live 3D planetary freight model. Unbroken cold-chain routes radiate from Indian deepwater berths (JNPT &amp; Mundra) directly to major European, Arabian Gulf, Asian, and American sea terminals.
          </p>
        </div>

        {/* ── 3D GLOBE SHOWCASE & TELEMETRY COCKPIT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: 3D WebGL Canvas Globe (Borderless, Pure Floating Planetary Model) */}
          <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[520px] lg:h-[700px] flex items-center justify-center">
            {/* The 3D Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          </div>

          {/* Right Column: Active Port Telemetry & Direct Corridor Console */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Port Selection Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              {ports.map((p) => {
                const isCurrent = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPort(p.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-2.5 cursor-pointer font-sans",
                      isCurrent
                        ? "bg-[#E6C687] text-black border-[#E6C687] shadow-[0_0_20px_rgba(230,198,135,0.3)] font-semibold"
                        : "bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300 font-medium"
                    )}
                  >
                    <Anchor className={cn("w-3.5 h-3.5 shrink-0", isCurrent ? "text-black" : "text-[#E6C687]")} />
                    <span className="text-xs truncate">
                      {p.city}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Port Detailed Console */}
            <div className="bg-[#07070B] rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl relative overflow-hidden font-sans">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10 mb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E6C687] font-semibold block mb-1">
                    Direct Maritime Discharge Corridor
                  </span>
                  <h3 className="text-xl sm:text-2xl text-white font-bold tracking-tight">
                    {selectedPort.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedPort.city}, {selectedPort.country} · Direct lane from Chennai &amp; West Coast berths
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-semibold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Direct Line</span>
                </div>
              </div>

              {/* Transit & Handling Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#E6C687]" /> Sea Transit
                  </div>
                  <div className="text-base sm:text-lg text-white font-bold">
                    {selectedPort.typicalTransitDays}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Ship className="w-3.5 h-3.5 text-sky-400" /> Liner Frequency
                  </div>
                  <div className="text-xs sm:text-sm text-white font-semibold truncate mt-1">
                    {selectedPort.handlingVolume}
                  </div>
                </div>
              </div>

              {/* Cleared Commodities */}
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2.5 font-semibold">
                  Primary Cleared Commodities at Berth:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPort.primaryCommodities.map((c, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full text-slate-200 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6C687] shrink-0" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Link */}
              <a
                href={`/contact?port=${encodeURIComponent(selectedPort.name)}&type=quote`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-gradient-to-r from-[#E6C687] to-[#C29B4D] hover:opacity-95 text-black text-xs uppercase tracking-wider font-bold transition-all shadow-lg"
              >
                <span>Inquire Freight Schedule to {selectedPort.city}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { ProcurementTenderModal } from "@/components/leads/ProcurementTenderModal";

// ─── 01. Precise Coordinates for Key Global Hubs (Matching Reference Image) ───
interface GlobalHub {
  id: string;
  name: string;
  lat: number;
  lon: number;
  isOrigin?: boolean;
}

const GLOBAL_HUBS: GlobalHub[] = [
  { id: "china", name: "CHINA", lat: 31.23, lon: 121.47 },
  { id: "hong-kong", name: "HONG KONG", lat: 22.31, lon: 114.16 },
  { id: "japan", name: "JAPAN", lat: 35.67, lon: 139.65 },
  { id: "qatar", name: "QATAR", lat: 25.28, lon: 51.53 },
  { id: "turkey", name: "TURKEY", lat: 41.00, lon: 28.97 },
  { id: "italy", name: "ITALY", lat: 41.87, lon: 12.56 },
  { id: "germany", name: "GERMANY", lat: 51.16, lon: 10.45 },
  { id: "spain", name: "SPAIN", lat: 40.41, lon: -3.70 },
  { id: "uk", name: "UK", lat: 51.50, lon: -0.12 },
  { id: "india-origin", name: "INDIA (JNPT)", lat: 18.95, lon: 72.85, isOrigin: true },
];

function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// ─── 02. Realistic Continental Polygons (Ray-Casting Land Classification) ─────
const CONTINENTAL_POLYGONS: [number, number][][] = [
  // Europe & Scandinavia
  [
    [-9, 36], [-9, 43], [3, 43], [7, 47], [18, 47], [16, 38], [24, 38], [28, 41],
    [32, 46], [40, 48], [42, 60], [30, 71], [15, 71], [5, 62], [-5, 52], [-9, 36],
  ],
  // UK & Ireland
  [[-10, 51], [-6, 58], [2, 58], [1, 50], [-10, 51]],
  // Iberian Peninsula
  [[-9, 36], [-1, 36], [3, 42], [-2, 43], [-9, 43], [-9, 36]],
  // Italy Boot
  [[8, 45], [13, 46], [18, 41], [16, 38], [12, 38], [8, 45]],
  // Africa & Madagascar
  [
    [-17, 15], [-17, 28], [-5, 36], [12, 37], [32, 32], [42, 14], [51, 12],
    [41, -10], [36, -26], [28, -34], [18, -34], [12, -22], [9, 4], [0, 6], [-17, 15],
  ],
  [[43, -12], [50, -14], [47, -25], [43, -25], [43, -12]], // Madagascar
  // Middle East & Arabian Peninsula
  [[34, 28], [36, 37], [45, 38], [52, 30], [60, 25], [56, 16], [44, 12], [34, 28]],
  // Turkey & Levant
  [[26, 36], [36, 36], [44, 37], [44, 42], [30, 42], [26, 36]],
  // Indian Subcontinent
  [[68, 23], [72, 32], [77, 35], [88, 28], [92, 22], [85, 18], [80, 13], [77, 8], [74, 15], [68, 20], [68, 23]],
  // China, East Asia & Siberia
  [
    [75, 36], [85, 45], [100, 54], [135, 54], [132, 42], [122, 30], [118, 22],
    [108, 18], [100, 22], [88, 28], [75, 36],
  ],
  // Japan Archipelago
  [[129, 31], [131, 34], [137, 35], [141, 38], [145, 44], [141, 45], [134, 38], [130, 32], [129, 31]],
  // Korean Peninsula
  [[124, 34], [129, 35], [130, 41], [125, 41], [124, 34]],
  // Southeast Asia (Indochina, Malaysia, Indonesia)
  [[98, 20], [108, 18], [109, 10], [104, 1], [96, 5], [98, 20]],
  [[95, 5], [105, -5], [120, -8], [140, -4], [130, 2], [105, 5], [95, 5]],
  // Australia
  [[113, -22], [122, -14], [136, -12], [142, -10], [153, -28], [150, -38], [140, -38], [115, -35], [113, -22]],
  // North America
  [
    [-168, 66], [-140, 70], [-95, 72], [-60, 50], [-70, 42], [-80, 25],
    [-97, 26], [-105, 20], [-117, 32], [-125, 48], [-140, 60], [-168, 66],
  ],
  // South America
  [[-77, 8], [-60, 8], [-35, -5], [-38, -15], [-55, -35], [-65, -55], [-75, -45], [-70, -20], [-80, -5], [-77, 8]],
];

function isPointInPolygon(point: [number, number], vs: [number, number][]): boolean {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

interface UnitedGlobeSectionProps {
  className?: string;
}

export const UnitedGlobeSection = React.forwardRef<HTMLElement, UnitedGlobeSectionProps>(
  function UnitedGlobeSection({ className }, ref) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isTenderOpen, setIsTenderOpen] = useState(false);

    // Refs for 3D projected badges
    const pinElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
      const container = mountRef.current;
      if (!container) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Safe dimension getter preventing 0-height collapses
      const getDimensions = () => {
        const w = container.clientWidth || (window.innerWidth >= 1024 ? Math.round(window.innerWidth * 0.55) : window.innerWidth);
        const h = container.clientHeight || (window.innerWidth >= 1024 ? window.innerHeight : 560);
        return { w: Math.max(300, w), h: Math.max(300, h) };
      };

      const { w: initW, h: initH } = getDimensions();

      // ── 01. Scene, Camera, High-Performance WebGL Renderer ──
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, initW / initH, 0.1, 1000);
      camera.position.z = 245;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(initW, initH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);

      // ── 02. Globe Master Group ──
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Clean Oceanic & Vibrant Red Scene Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      scene.add(ambientLight);

      const celestialDirLight = new THREE.DirectionalLight(0xd0e8ff, 1.2);
      celestialDirLight.position.set(-60, 80, 100);
      scene.add(celestialDirLight);

      const redRimLight = new THREE.PointLight(0xe50914, 3.5, 480);
      redRimLight.position.set(120, -40, 80);
      scene.add(redRimLight);

      const GLOBE_RADIUS = 68;

      const updateGlobePosition = () => {
        if (window.innerWidth >= 1024) {
          // Compact globe (r=68) sits comfortably on right half with breathing room from left text
          globeGroup.position.set(24, 0, 0);
        } else {
          globeGroup.position.set(0, -8, 0); // Centered on mobile
        }
      };
      updateGlobePosition();

      // ── 03. Gradient Fade Border Base Sphere (No Hard Circle Edge) ──
      const sphereVertexShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const sphereFragmentShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float dotP = max(0.0, dot(vNormal, viewDir));
          
          // Deep oceanic black core (#061820)
          vec3 centerColor = vec3(0.024, 0.094, 0.125);
          vec3 edgeGlow = vec3(0.757, 0.482, 0.345); // Muted Copper #C17B58
          
          // Gradient fade border: smooth opacity reduction toward silhouette
          float edgeAlpha = smoothstep(0.02, 0.60, dotP);
          float rimSheen = pow(1.0 - dotP, 3.0);
          
          vec3 finalColor = mix(centerColor, edgeGlow, rimSheen * 0.4);
          float alpha = edgeAlpha * 0.85 + rimSheen * 0.3;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `;

      const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
      const sphereMat = new THREE.ShaderMaterial({
        vertexShader: sphereVertexShader,
        fragmentShader: sphereFragmentShader,
        transparent: true,
        depthWrite: false,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      globeGroup.add(sphereMesh);

      // ── 04. Soft Atmospheric Copper Glow (Smooth Gradient Falloff, No Hard Ring) ──
      const atmoVertexShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const atmoFragmentShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float dotProduct = max(0.0, dot(vNormal, viewDir));
          float fresnel = 1.0 - dotProduct;
          // Smooth volumetric haze with gentle exponential falloff
          float glow = pow(fresnel, 2.8);

          vec3 pureCopper = vec3(0.757, 0.482, 0.345); // #C17B58 Muted Copper
          vec3 deepCopper = vec3(0.651, 0.388, 0.259); // #A66342 Dark Muted Copper

          vec3 atmosphereColor = mix(deepCopper, pureCopper, clamp(vNormal.y + 0.5, 0.0, 1.0));
          gl_FragColor = vec4(atmosphereColor, glow * 0.65);
        }
      `;

      const atmoGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 64, 64);
      const atmoMat = new THREE.ShaderMaterial({
        vertexShader: atmoVertexShader,
        fragmentShader: atmoFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
      globeGroup.add(atmoMesh);

      // ── 05. Realistic Dotted Continents (Equidistant Matrix from Land Polygons) ──
      const landPositions: number[] = [];
      const landColors: number[] = [];

      const colWhite = new THREE.Color(0xf4f1ea);
      const colCopper = new THREE.Color(0xc17b58);

      for (let lat = -70; lat <= 75; lat += 1.8) {
        // Equidistant longitude spacing on sphere using cos(lat)
        const numLon = Math.round(200 * Math.cos((lat * Math.PI) / 180));
        for (let i = 0; i < numLon; i++) {
          const lon = -180 + (i / numLon) * 360;
          const isLand = CONTINENTAL_POLYGONS.some((poly) => isPointInPolygon([lon, lat], poly));

          if (isLand) {
            const vec = latLongToVector3(lat, lon, GLOBE_RADIUS * 1.008);
            landPositions.push(vec.x, vec.y, vec.z);

            // Subtle copper highlight for trade hubs
            const isTradeZone = (lat > 10 && lat < 45 && lon > 40 && lon < 145);
            const col = (isTradeZone && Math.random() < 0.25) ? colCopper : colWhite;
            landColors.push(col.r, col.g, col.b);
          }
        }
      }

      const landGeo = new THREE.BufferGeometry();
      landGeo.setAttribute("position", new THREE.Float32BufferAttribute(landPositions, 3));
      landGeo.setAttribute("color", new THREE.Float32BufferAttribute(landColors, 3));

      const landMat = new THREE.PointsMaterial({
        size: 1.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.94,
      });
      const landPoints = new THREE.Points(landGeo, landMat);
      globeGroup.add(landPoints);

      // ── 06. Location Pins & 3D Vector Positions ──
      const hubVectors: { hub: GlobalHub; vec: THREE.Vector3 }[] = [];
      const pinGeo = new THREE.SphereGeometry(1.2, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xc17b58 });

      GLOBAL_HUBS.forEach((hub) => {
        const vec = latLongToVector3(hub.lat, hub.lon, GLOBE_RADIUS * 1.012);
        hubVectors.push({ hub, vec });

        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.position.copy(vec);
        globeGroup.add(pin);
      });

      // ── 07. Luminous Copper Curved Trade Arc ──
      // Long sweeping high arc from China/Japan across Eurasia to Middle East & Europe
      const startVec = hubVectors.find((h) => h.hub.id === "china")?.vec || hubVectors[0].vec;
      const endVec = hubVectors.find((h) => h.hub.id === "turkey")?.vec || hubVectors[4].vec;

      const dist = startVec.distanceTo(endVec);
      const alt = dist * 0.38 + 12;

      const mid1 = startVec.clone().lerp(endVec, 0.33).normalize().multiplyScalar(GLOBE_RADIUS + alt);
      const mid2 = startVec.clone().lerp(endVec, 0.66).normalize().multiplyScalar(GLOBE_RADIUS + alt);

      const mainArc = new THREE.CubicBezierCurve3(startVec, mid1, mid2, endVec);
      const arcPoints = mainArc.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xc17b58,
        transparent: true,
        opacity: 0.85,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Secondary arc connecting Japan to India
      const japanVec = hubVectors.find((h) => h.hub.id === "japan")?.vec;
      const indiaVec = hubVectors.find((h) => h.hub.id === "india-origin")?.vec;
      if (japanVec && indiaVec) {
        const d2 = japanVec.distanceTo(indiaVec);
        const a2 = d2 * 0.32 + 8;
        const m1 = japanVec.clone().lerp(indiaVec, 0.33).normalize().multiplyScalar(GLOBE_RADIUS + a2);
        const m2 = japanVec.clone().lerp(indiaVec, 0.66).normalize().multiplyScalar(GLOBE_RADIUS + a2);
        const c2 = new THREE.CubicBezierCurve3(japanVec, m1, m2, indiaVec);
        const g2 = new THREE.BufferGeometry().setFromPoints(c2.getPoints(45));
        const l2 = new THREE.Line(g2, arcMat);
        globeGroup.add(l2);
      }

      // Animated traveling light pulse along main arc
      const pulseGeo = new THREE.SphereGeometry(1.6, 14, 14);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(startVec);
      globeGroup.add(pulseMesh);

      let pulseProgress = 0;

      // Initial Globe Rotation: Show Japan, China, Asia, Middle East prominently like reference
      globeGroup.rotation.y = -1.95;
      globeGroup.rotation.x = 0.28;

      // ── 08. Smooth Mouse/Touch Drag & Parallax Interaction ──
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;
      let targetRotY = globeGroup.rotation.y;
      let targetRotX = globeGroup.rotation.x;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.005;
        targetRotX += deltaY * 0.005;
        targetRotX = Math.max(-0.6, Math.min(0.8, targetRotX));
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      let touchStartX = 0;
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const deltaX = e.touches[0].clientX - touchStartX;
          touchStartX = e.touches[0].clientX;
          targetRotY += deltaX * 0.005;
        }
      };
      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchmove", onTouchMove, { passive: true });

      // ── 09. 3D-to-2D Badge Projection (Matching Reference Black Badges) ──
      const tempVec = new THREE.Vector3();
      const cameraDir = new THREE.Vector3();

      const updateLabels = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        hubVectors.forEach(({ hub, vec }) => {
          const el = pinElementsRef.current.get(hub.id);
          if (!el) return;

          tempVec.copy(vec);
          tempVec.applyMatrix4(globeGroup.matrixWorld);

          cameraDir.copy(camera.position).sub(tempVec).normalize();
          const normal = tempVec.clone().sub(globeGroup.position).normalize();
          const dot = normal.dot(cameraDir);

          // Visible only when on the front hemisphere facing camera
          if (dot > 0.08) {
            tempVec.project(camera);
            const x = (tempVec.x * 0.5 + 0.5) * width;
            const y = (-(tempVec.y * 0.5) + 0.5) * height;

            el.style.display = "flex";
            el.style.transform = `translate(${x}px, ${y}px)`;
            el.style.opacity = `${Math.min(1, Math.max(0, (dot - 0.08) * 4)).toFixed(2)}`;
          } else {
            el.style.display = "none";
          }
        });
      };

      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth || (window.innerWidth >= 1024 ? Math.round(window.innerWidth * 0.54) : window.innerWidth);
        const h = container.clientHeight || (window.innerWidth >= 1024 ? window.innerHeight : 560);
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          updateGlobePosition();
        }
      };
      window.addEventListener("resize", onResize);

      // Dedicated ResizeObserver ensuring immediate accurate sizing as soon as DOM mounts
      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            if (width > 50 && height > 50) {
              camera.aspect = width / height;
              camera.updateProjectionMatrix();
              renderer.setSize(width, height);
              updateGlobePosition();
            }
          }
        });
        resizeObserver.observe(container);
      }

      // ── 10. Animation Loop ──
      let animId: number;
      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (!isDragging && !prefersReduced) {
          targetRotY += 0.0012; // Natural subtle orbit
        }

        globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.05;
        globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.05;

        // Pulse motion along arc
        pulseProgress += 0.005;
        if (pulseProgress > 1) pulseProgress = 0;
        pulseMesh.position.copy(mainArc.getPoint(pulseProgress));

        updateLabels();
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animId);
        container.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("resize", onResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }

        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        sphereGeo.dispose();
        sphereMat.dispose();
        atmoGeo.dispose();
        atmoMat.dispose();
        landGeo.dispose();
        landMat.dispose();
        arcGeo.dispose();
        arcMat.dispose();
        renderer.dispose();
      };
    }, []);

    return (
      <section
        ref={ref}
        id="global-reach-map"
        className={cn(
          "relative min-h-screen w-full bg-transparent text-white overflow-hidden flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 select-none",
          className
        )}
      >
        {/* ── Luminous Ambient Corner Glows (Petrol Blue + Sea Mist Accents) ── */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] bg-[radial-gradient(circle,_rgba(22,74,85,0.35)_0%,_transparent_70%)] blur-3xl z-0" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 w-[520px] h-[520px] bg-[radial-gradient(circle,_rgba(184,208,206,0.12)_0%,_transparent_70%)] blur-3xl z-0" />

        {/* ── Left Content (Text & Actions) ── */}
        <div className="relative z-10 w-full lg:w-[46vw] max-w-xl lg:max-w-2xl px-6 sm:px-12 lg:pl-16 lg:pr-4 flex flex-col justify-center text-left py-6 lg:py-0 pointer-events-auto">
          {/* Clean Section Eyebrow */}
          <div className="mb-3">
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.28em] text-[#C17B58]">
              ONE OPERATOR
            </span>
          </div>

          {/* Giant Chamfered Industrial Headline */}
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.94] text-white">
            EVERY<br />
            LEG OF THE<br />
            JOURNEY
          </h2>

          {/* Clean Modern Subtitle */}
          <p className="font-sans text-sm sm:text-base text-slate-200 font-normal mt-7 max-w-md leading-relaxed">
            Freight forwarding, land transport, and customs brokerage, unified across international sea lanes under one accountable team.
          </p>

          {/* Dual Action Pill Buttons (Muted Copper + Frosted Glass) */}
          <div className="mt-9 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsTenderOpen(true)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D68C66] to-[#C17B58] hover:brightness-110 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(193,123,88,0.4)] cursor-pointer active:scale-95"
            >
              TALK WITH US
            </button>

            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-white/10 border border-[#B8D0CE]/30 hover:bg-white/20 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            >
              OUR SERVICES
            </Link>
          </div>
        </div>

        {/* ── Right Column: 3D Globe Canvas Mount (Guaranteed Height & Zero Right Margin) ── */}
        <div className="relative z-10 w-full lg:w-[54vw] h-[520px] sm:h-[620px] lg:h-screen flex items-center justify-center lg:justify-end pointer-events-auto overflow-hidden">
          {/* Soft Atmospheric Copper & Petrol Radial Glow Behind Globe */}
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-[radial-gradient(circle,rgba(193,123,88,0.20)_0%,rgba(22,74,85,0.25)_50%,transparent_72%)] blur-3xl pointer-events-none rounded-full" />

          {/* 3D WebGL Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing relative"
            title="Click and drag to rotate global trade routes"
          />

          {/* 3D-Projected DOM Badges */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {GLOBAL_HUBS.map((hub) => (
              <div
                key={hub.id}
                ref={(el) => {
                  if (el) pinElementsRef.current.set(hub.id, el);
                  else pinElementsRef.current.delete(hub.id);
                }}
                className="absolute top-0 left-0 items-center gap-1.5 transition-opacity duration-150 will-change-transform select-none"
                style={{ display: "none" }}
              >
                {/* Glowing Muted Copper Marker Dot */}
                <span className="w-2.5 h-2.5 rounded-sm bg-[#C17B58] shadow-[0_0_12px_#C17B58] shrink-0" />

                {/* Clean Petrol Blue Badge with Monospace Text */}
                <span className="bg-[#164A55]/90 border border-[#B8D0CE]/25 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-white shadow-xl whitespace-nowrap">
                  {hub.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global RFQ Tender Modal */}
        <ProcurementTenderModal
          isOpen={isTenderOpen}
          onClose={() => setIsTenderOpen(false)}
        />
      </section>
    );
  }
);

UnitedGlobeSection.displayName = "UnitedGlobeSection";

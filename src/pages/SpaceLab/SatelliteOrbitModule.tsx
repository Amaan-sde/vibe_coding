import React, { useState, useEffect } from "react";
import { 
  Orbit, 
  Globe, 
  Radio, 
  CloudSun, 
  Navigation, 
  Eye, 
  Sparkles, 
  Info, 
  RotateCcw,
  Sliders
} from "lucide-react";
import { motion } from "motion/react";

interface OrbitProfile {
  id: "leo" | "meo" | "geo" | "sso";
  name: string;
  shortName: string;
  altitudeRange: string;
  nominalAltitudeKm: number;
  speedKmS: number;
  periodDescription: string;
  primaryApplications: string[];
  realExamples: string[];
  description: string;
  color: string;
  illustrativeRadiusPx: number; // for SVG display
}

const ORBIT_PROFILES: OrbitProfile[] = [
  {
    id: "leo",
    name: "Low Earth Orbit (LEO)",
    shortName: "LEO (160 – 2,000 km)",
    altitudeRange: "160 to 2,000 km",
    nominalAltitudeKm: 400,
    speedKmS: 7.67,
    periodDescription: "~90 to 120 minutes (16 orbits/day)",
    primaryApplications: ["Human Spaceflight", "Earth Observation & High-Res Imaging", "Low-Latency Broadband (Starlink)"],
    realExamples: ["International Space Station (ISS)", "Hubble Space Telescope", "Chandrayaan-3 Parking Orbit"],
    description: "Close to Earth's surface. Satellites must travel at extreme speeds (~27,600 km/h) to maintain orbit. Experiences atmospheric drag and requires occasional re-boosts.",
    color: "#3b82f6",
    illustrativeRadiusPx: 80
  },
  {
    id: "sso",
    name: "Sun-Synchronous / Polar Orbit (SSO)",
    shortName: "SSO (600 – 800 km)",
    altitudeRange: "600 to 800 km (Polar inclination ~98°)",
    nominalAltitudeKm: 700,
    speedKmS: 7.50,
    periodDescription: "~98 minutes",
    primaryApplications: ["Environmental Monitoring", "Disaster Mapping", "Spy Reconnaissance & Agriculture Tracking"],
    realExamples: ["ISRO Cartosat & Oceansat series", "Landsat 9", "Sentinel-2"],
    description: "Orbits over Earth's north and south poles. As Earth rotates beneath it, the satellite scans the entire planet every few days under consistent local solar lighting angles.",
    color: "#10b981",
    illustrativeRadiusPx: 110
  },
  {
    id: "meo",
    name: "Medium Earth Orbit (MEO)",
    shortName: "MEO (2,000 – 35,786 km)",
    altitudeRange: "2,000 to 35,786 km",
    nominalAltitudeKm: 20200,
    speedKmS: 3.87,
    periodDescription: "~12 hours (2 orbits/day)",
    primaryApplications: ["Global Navigation Satellite Systems (GNSS)", "Medium-delay telecom relays"],
    realExamples: ["GPS (USA, ~20,200 km)", "Galileo (Europe, ~23,222 km)", "GLONASS (Russia, ~19,100 km)"],
    description: "Home of global positioning satellites. Requires crossing through the harsh Van Allen radiation belts, demanding radiation-hardened electronics.",
    color: "#f59e0b",
    illustrativeRadiusPx: 150
  },
  {
    id: "geo",
    name: "Geostationary Earth Orbit (GEO)",
    shortName: "GEO (35,786 km)",
    altitudeRange: "35,786 km above Equator (0° inclination)",
    nominalAltitudeKm: 35786,
    speedKmS: 3.07,
    periodDescription: "Exactly 23 hours, 56 minutes, 4 seconds (1 Sidereal Day)",
    primaryApplications: ["Direct-to-Home (DTH) TV", "Cyclone & Weather Forecasting", "Global Defense Telecommunications"],
    realExamples: ["ISRO INSAT-3DR / GSAT-24", "GOES Weather Satellites", "Intelsat"],
    description: "The satellite's orbital period matches Earth's rotation exactly. To ground antennas, the satellite appears permanently frozen in the exact same spot in the sky!",
    color: "#ec4899",
    illustrativeRadiusPx: 195
  }
];

export const SatelliteOrbitModule: React.FC = () => {
  const [selectedOrbit, setSelectedOrbit] = useState<OrbitProfile>(ORBIT_PROFILES[0]);
  const [interactiveAltitude, setInteractiveAltitude] = useState<number>(400); // km
  const [satelliteTypeFilter, setSatelliteTypeFilter] = useState<string>("all");
  const [orbitAngle, setOrbitAngle] = useState<number>(0);

  // Exact Keplerian Orbital Mechanics:
  // r = R_earth + altitude
  // v = sqrt( G * M_earth / r )
  // T = 2 * pi * sqrt( r^3 / (G * M_earth) )
  const R_EARTH_KM = 6371; // km
  const GM_EARTH = 398600.4418; // km^3 / s^2 (Standard gravitational parameter)

  const currentRadius = R_EARTH_KM + interactiveAltitude;
  const calculatedVelocityKmS = Math.sqrt(GM_EARTH / currentRadius);
  const calculatedVelocityKmh = calculatedVelocityKmS * 3600;
  const calculatedPeriodSec = 2 * Math.PI * Math.sqrt(Math.pow(currentRadius, 3) / GM_EARTH);
  const calculatedPeriodMin = calculatedPeriodSec / 60;
  const calculatedPeriodHours = calculatedPeriodMin / 60;

  // Animation loop for orbiting satellite
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Slower rotation at higher altitudes (Kepler's Law)
      const speedScale = calculatedVelocityKmS * 15;
      setOrbitAngle(prev => (prev + delta * speedScale) % 360);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [calculatedVelocityKmS]);

  const handleSelectOrbit = (profile: OrbitProfile) => {
    setSelectedOrbit(profile);
    setInteractiveAltitude(profile.nominalAltitudeKm);
  };

  const angleRad = (orbitAngle * Math.PI) / 180;
  // Scaled illustrative radius
  const minAltitude = 160;
  const maxAltitude = 36000;
  const logProgress = Math.log(interactiveAltitude / minAltitude) / Math.log(maxAltitude / minAltitude);
  const currentVisualRadius = 60 + logProgress * 140;

  const satX = Math.cos(angleRad) * currentVisualRadius;
  const satY = Math.sin(angleRad) * currentVisualRadius;

  return (
    <div className="w-full flex flex-col gap-6 text-white">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse" />
            <span>MODULE D // ORBITAL MECHANICS & SATELLITE APPLICATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
            Satellite Orbit Explorer
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mt-1">
            Understand how altitude dictates satellite velocity, orbital period, and mission applications—from Low Earth Orbit (LEO) down to Geostationary Orbit (GEO).
          </p>
        </div>

        {/* Orbit Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-900 border border-white/10 rounded-full p-1.5 font-mono text-xs">
          {ORBIT_PROFILES.map(orbit => (
            <button
              key={orbit.id}
              onClick={() => handleSelectOrbit(orbit)}
              className={`px-3 py-1 rounded-full transition cursor-pointer flex items-center gap-1.5 ${
                selectedOrbit.id === orbit.id
                  ? "bg-teal-brand text-black font-bold shadow-md shadow-teal-brand/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: orbit.color }} />
              <span>{orbit.id.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Interactive Orbital Simulation Canvas */}
        <div className="lg:col-span-7 bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-2xl">
          
          {/* Top HUD */}
          <div className="flex justify-between items-center z-10 font-mono text-[10px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-brand animate-ping" />
              <span className="text-white font-bold">ORBITAL VIEW: {selectedOrbit.name}</span>
            </div>
            <span className="text-teal-brand">KEPLERIAN TWO-BODY EQUATION</span>
          </div>

          {/* Central Earth & Orbit Canvas */}
          <div className="relative w-full aspect-square max-w-[420px] mx-auto my-auto flex items-center justify-center z-10">
            
            {/* Concentric Orbit Paths */}
            {ORBIT_PROFILES.map(p => (
              <div
                key={p.id}
                className={`absolute rounded-full border pointer-events-none transition-all duration-300 ${
                  selectedOrbit.id === p.id 
                    ? "border-2 border-dashed shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                    : "border-white/10"
                }`}
                style={{
                  width: `${p.illustrativeRadiusPx * 2}px`,
                  height: `${p.illustrativeRadiusPx * 2}px`,
                  borderColor: selectedOrbit.id === p.id ? p.color : undefined
                }}
              />
            ))}

            {/* Current Active Custom Dynamic Orbit Track */}
            <div
              className="absolute rounded-full border border-teal-brand/80 pointer-events-none"
              style={{
                width: `${currentVisualRadius * 2}px`,
                height: `${currentVisualRadius * 2}px`,
              }}
            />

            {/* Earth in the Center */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-400 border-2 border-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center text-center font-mono text-[9px] font-bold text-white z-20">
              <div className="flex flex-col items-center">
                <Globe size={22} className="text-blue-200 mb-0.5 animate-pulse" />
                <span>EARTH</span>
                <span className="text-[7px] text-blue-200">R=6,371 km</span>
              </div>
            </div>

            {/* Orbiting Satellite Marker */}
            <div
              className="absolute z-30"
              style={{
                transform: `translate(${satX}px, ${satY}px)`,
              }}
            >
              <div className="relative group flex items-center justify-center">
                {/* Satellite Icon & Wings */}
                <div 
                  className="w-5 h-5 rounded-md flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: selectedOrbit.color }}
                >
                  <Radio size={12} className="text-black" />
                </div>
                {/* Solar wings */}
                <div className="absolute w-9 h-1.5 bg-cyan-400 border border-white rounded-full -z-10" />

                {/* Floating Telemetry Tag */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 rounded px-1.5 py-0.5 font-mono text-[8px] text-white whitespace-nowrap pointer-events-none">
                  {calculatedVelocityKmS.toFixed(2)} km/s
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Altitude Scrub Slider */}
          <div className="z-10 flex flex-col gap-2 border-t border-white/10 pt-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">CUSTOM ALTITUDE SLIDER:</span>
              <span className="text-teal-brand font-bold bg-teal-brand/10 px-2 py-0.5 rounded border border-teal-brand/30">
                {interactiveAltitude.toLocaleString()} KM
              </span>
            </div>
            <input
              type="range"
              min={160}
              max={35786}
              step={100}
              value={interactiveAltitude}
              onChange={(e) => {
                const val = Number(e.target.value);
                setInteractiveAltitude(val);
                // Snap selected preset if close
                if (val < 1500) setSelectedOrbit(ORBIT_PROFILES[0]);
                else if (val < 10000) setSelectedOrbit(ORBIT_PROFILES[2]);
                else setSelectedOrbit(ORBIT_PROFILES[3]);
              }}
              className="w-full accent-teal-brand cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-zinc-500">
              <span>LEO (160 km)</span>
              <span>SSO (700 km)</span>
              <span>GPS MEO (20,200 km)</span>
              <span>GEO (35,786 km)</span>
            </div>
          </div>

        </div>

        {/* Right 5 Cols: In-Depth Orbital Telemetry & Application Guide */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[9px] text-teal-brand uppercase tracking-widest font-bold">
                  ORBIT PROFILE SPECIFICATIONS
                </span>
                <h3 className="font-display font-bold text-2xl text-white mt-0.5">
                  {selectedOrbit.name}
                </h3>
              </div>
              <div 
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: selectedOrbit.color }} 
              />
            </div>

            <p className="text-zinc-300 text-xs font-sans leading-relaxed">
              {selectedOrbit.description}
            </p>

            {/* Real-time Math Physics Calculations Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-zinc-500 uppercase block">Orbital Velocity</span>
                <span className="text-white font-bold text-sm">{calculatedVelocityKmS.toFixed(2)} km/s</span>
                <span className="text-[8px] text-teal-brand block">({calculatedVelocityKmh.toLocaleString(undefined, { maximumFractionDigits: 0 })} km/h)</span>
              </div>

              <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-zinc-500 uppercase block">Orbital Period</span>
                <span className="text-white font-bold text-sm">
                  {calculatedPeriodHours >= 2 
                    ? `${calculatedPeriodHours.toFixed(1)} hours` 
                    : `${calculatedPeriodMin.toFixed(0)} minutes`}
                </span>
                <span className="text-[8px] text-zinc-400 block">per revolution</span>
              </div>

              <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-zinc-500 uppercase block">Altitude Above Ground</span>
                <span className="text-white font-bold text-sm">{interactiveAltitude.toLocaleString()} km</span>
                <span className="text-[8px] text-zinc-400 block">Radius: {currentRadius.toLocaleString()} km</span>
              </div>

              <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-[8px] text-zinc-500 uppercase block">Orbits Per Day</span>
                <span className="text-white font-bold text-sm">
                  {(24 / calculatedPeriodHours).toFixed(1)}
                </span>
                <span className="text-[8px] text-emerald-400 block">Daily revolutions</span>
              </div>
            </div>

            {/* Primary Applications */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">
                Primary Mission Applications
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedOrbit.primaryApplications.map((app, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-white/10 text-[10px] font-mono text-zinc-300"
                  >
                    • {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Real Spacecraft Examples */}
            <div className="space-y-1.5 border-t border-white/5 pt-3">
              <span className="text-[9px] font-mono text-teal-brand uppercase tracking-wider block font-bold">
                Real Satellite Examples in this Orbit
              </span>
              <ul className="space-y-1 text-xs text-zinc-300 font-sans">
                {selectedOrbit.realExamples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-brand" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Educational Law callout */}
            <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5 text-[11px] text-zinc-400 font-sans">
              <strong className="text-white font-mono uppercase text-[9px] block mb-0.5">
                Kepler's Law Observation:
              </strong>
              Notice that as altitude increases, orbital speed <em>decreases</em>! In LEO at 400 km, the ISS travels at 7.7 km/s; whereas in GEO at 35,786 km, the satellite only needs to travel at 3.07 km/s to balance Earth's gravity.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


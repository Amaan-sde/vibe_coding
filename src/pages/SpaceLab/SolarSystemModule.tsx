import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Info, 
  AlertCircle, 
  Sparkles, 
  Compass, 
  Thermometer, 
  Globe, 
  ChevronRight,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SOLAR_SYSTEM_BODIES, PlanetData } from "../../data/planets";

export const SolarSystemModule: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData>(
    SOLAR_SYSTEM_BODIES.find(p => p.id === "earth") || SOLAR_SYSTEM_BODIES[3]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Animation frame loop for continuous orbital revolution
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isPlaying) {
        setRotationAngle(prev => (prev + delta * 20 * speedMultiplier) % 360000);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, speedMultiplier]);

  const planetsOnly = SOLAR_SYSTEM_BODIES.filter(b => b.id !== "sun");
  const sunData = SOLAR_SYSTEM_BODIES.find(b => b.id === "sun")!;

  return (
    <div className="w-full flex flex-col gap-6 text-white">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse" />
            <span>MODULE A // CELESTIAL ORBITAL MECHANICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
            Solar System Explorer
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mt-1">
            Interact with our heliocentric planetary system. Inspect orbital periods, rotational speeds, atmospheric compositions, and planetary scale comparisons.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 bg-neutral-900/90 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-brand text-black font-mono font-bold text-xs hover:bg-white transition cursor-pointer active:scale-95"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "PAUSE" : "RESUME"}</span>
          </button>

          <div className="flex items-center gap-1 text-[11px] font-mono px-2 text-zinc-400">
            <span>SPEED:</span>
            {[1, 2, 5].map(s => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-0.5 rounded transition ${
                  speedMultiplier === s 
                    ? "bg-white/20 text-white font-bold" 
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setRotationAngle(0);
              setSelectedPlanet(SOLAR_SYSTEM_BODIES.find(p => p.id === "earth")!);
            }}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-zinc-400 hover:text-white transition cursor-pointer"
            title="Reset Simulation View"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Scientific Accuracy Scale Disclaimer Banner */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-950/40 border border-teal-brand/30 rounded-xl p-3.5 flex items-start justify-between gap-3 text-xs font-sans text-zinc-300"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle size={16} className="text-teal-brand shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-mono text-[11px] uppercase tracking-wider block mb-0.5">
                  Scientific Educational Note: Illustrative Scale Model
                </strong>
                Planetary distances and diameters are rendered on an illustrative logarithmic scale for visual clarity on screen. In real space, distances are colossal: if the Sun were the size of a basketball, Earth would be a 2-millimeter bead located 26 meters away, and Neptune would be over 700 meters away!
              </div>
            </div>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="text-zinc-500 hover:text-white transition shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Simulation Viewport & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Heliocentric Canvas (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-black border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[460px] shadow-2xl">
          
          {/* Subtle Starfield & Coordinate Grid */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{
            backgroundImage: "radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 100px 150px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 250px 80px, #3b82f6, rgba(0,0,0,0)), radial-gradient(1px 1px at 400px 300px, #ffffff, rgba(0,0,0,0))",
            backgroundSize: "500px 500px"
          }} />

          {/* Top HUD Telemetry */}
          <div className="flex justify-between items-center z-10 font-mono text-[10px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-brand animate-ping" />
              <span>HELIOCENTRIC FRAME: 0.00 AU // SOL</span>
            </div>
            <span className="text-teal-brand font-bold">CLICK ANY PLANET TO INSPECT</span>
          </div>

          {/* Interactive SVG / Canvas Orbit Map */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto my-auto flex items-center justify-center z-10">
            
            {/* The Sun in the center */}
            <button
              onClick={() => setSelectedPlanet(sunData)}
              className={`absolute z-20 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                selectedPlanet.id === "sun" ? "ring-2 ring-amber-400 ring-offset-4 ring-offset-black" : ""
              }`}
              style={{
                width: `${sunData.illustrativeSize}px`,
                height: `${sunData.illustrativeSize}px`,
                backgroundColor: sunData.color,
                boxShadow: `0 0 40px ${sunData.glowColor}, 0 0 80px ${sunData.glowColor}`
              }}
              title="The Sun (Star)"
            >
              <span className="text-[9px] font-black text-black font-mono">SOL</span>
            </button>

            {/* Orbit rings and revolving planets */}
            {planetsOnly.map((planet, index) => {
              // Calculate relative orbital period angle
              // Inner planets orbit faster according to Kepler's 3rd law: T^2 = a^3
              const speedFactor = 1 / Math.sqrt(planet.distanceAU || 1);
              const planetAngle = (rotationAngle * speedFactor * 0.4 + index * 45) % 360;
              const angleRad = (planetAngle * Math.PI) / 180;
              const radius = 35 + index * 26; // concentric radius spacing

              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              const isSelected = selectedPlanet.id === planet.id;

              return (
                <React.Fragment key={planet.id}>
                  {/* Orbit Track Ring */}
                  <div
                    className={`absolute rounded-full border pointer-events-none transition-colors duration-300 ${
                      isSelected ? "border-teal-brand/60 border-dashed" : "border-white/10"
                    }`}
                    style={{
                      width: `${radius * 2}px`,
                      height: `${radius * 2}px`,
                    }}
                  />

                  {/* Revolving Planet Marker */}
                  <div
                    className="absolute z-20"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      transition: isPlaying ? "none" : "transform 0.3s ease-out"
                    }}
                  >
                    <button
                      onClick={() => setSelectedPlanet(planet)}
                      className={`relative rounded-full transition-all group flex items-center justify-center cursor-pointer ${
                        isSelected 
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-125" 
                          : "hover:scale-125"
                      }`}
                      style={{
                        width: `${Math.max(planet.illustrativeSize, 12)}px`,
                        height: `${Math.max(planet.illustrativeSize, 12)}px`,
                        backgroundColor: planet.color,
                        boxShadow: `0 0 10px ${planet.glowColor}`
                      }}
                      title={`${planet.name} (${planet.type})`}
                    >
                      {/* Saturn's Rings effect */}
                      {planet.id === "saturn" && (
                        <div className="absolute w-[22px] h-[7px] border border-amber-300/80 rounded-full -rotate-12 pointer-events-none" />
                      )}

                      {/* Tooltip hover tag */}
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono whitespace-nowrap bg-black/80 px-1 rounded text-zinc-300 border border-white/10 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        {planet.name}
                      </span>
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom Quick-Select Planet Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-3 z-10 border-t border-white/5 scrollbar-thin">
            {SOLAR_SYSTEM_BODIES.map(body => (
              <button
                key={body.id}
                onClick={() => setSelectedPlanet(body)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedPlanet.id === body.id
                    ? "bg-teal-brand text-black font-bold shadow-md shadow-teal-brand/20"
                    : "bg-neutral-900/80 text-zinc-400 border border-neutral-800 hover:text-white hover:border-zinc-700"
                }`}
              >
                <span 
                  className="w-2 h-2 rounded-full inline-block" 
                  style={{ backgroundColor: body.color }} 
                />
                <span>{body.name.toUpperCase()}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: In-Depth Scientific Telemetry Panel (5 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
          
          <motion.div
            key={selectedPlanet.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-950 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4"
          >
            {/* Header Badge & Name */}
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-teal-brand font-bold">
                  {selectedPlanet.type}
                </span>
                <h3 className="font-display font-black text-3xl text-white mt-0.5">
                  {selectedPlanet.name}
                </h3>
              </div>
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-black text-sm shadow-lg"
                style={{ backgroundColor: selectedPlanet.color }}
              >
                {selectedPlanet.name.substring(0, 2).toUpperCase()}
              </div>
            </div>

            <p className="text-zinc-300 text-xs font-sans leading-relaxed">
              {selectedPlanet.summary}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-neutral-900/70 border border-white/5 rounded-xl p-2.5">
                <span className="text-[9px] text-zinc-500 uppercase block">Mean Diameter</span>
                <span className="text-white font-bold">{selectedPlanet.diameterKm.toLocaleString()} km</span>
                <span className="text-[9px] text-teal-brand block">({selectedPlanet.diameterRelative}x Earth)</span>
              </div>

              <div className="bg-neutral-900/70 border border-white/5 rounded-xl p-2.5">
                <span className="text-[9px] text-zinc-500 uppercase block">Distance to Sun</span>
                <span className="text-white font-bold">{selectedPlanet.distanceAU} AU</span>
                <span className="text-[9px] text-zinc-400 block">({selectedPlanet.distanceFromSunKm}M km)</span>
              </div>

              <div className="bg-neutral-900/70 border border-white/5 rounded-xl p-2.5">
                <span className="text-[9px] text-zinc-500 uppercase block">Orbital Period</span>
                <span className="text-white font-bold text-[11px]">{selectedPlanet.orbitalPeriodEarthYears}</span>
                {selectedPlanet.orbitalSpeedKmS > 0 && (
                  <span className="text-[9px] text-zinc-400 block">{selectedPlanet.orbitalSpeedKmS} km/s speed</span>
                )}
              </div>

              <div className="bg-neutral-900/70 border border-white/5 rounded-xl p-2.5">
                <span className="text-[9px] text-zinc-500 uppercase block">Surface Gravity</span>
                <span className="text-white font-bold">{selectedPlanet.gravityMps2} m/s²</span>
                <span className="text-[9px] text-teal-brand block">({selectedPlanet.gravityRelative}g)</span>
              </div>

              <div className="bg-neutral-900/70 border border-white/5 rounded-xl p-2.5">
                <span className="text-[9px] text-zinc-500 uppercase block">Rotation Period</span>
                <span className="text-white font-bold text-[10px] leading-tight block">{selectedPlanet.rotationDescription}</span>
              </div>

              <div className="bg-neutral-900/70 border border-white/5 rounded-xl p-2.5">
                <span className="text-[9px] text-zinc-500 uppercase block">Mean Temp</span>
                <span className={`font-bold ${selectedPlanet.meanTemperatureC > 100 ? "text-amber-400" : selectedPlanet.meanTemperatureC < 0 ? "text-cyan-400" : "text-emerald-400"}`}>
                  {selectedPlanet.meanTemperatureC > 0 ? `+${selectedPlanet.meanTemperatureC}` : selectedPlanet.meanTemperatureC}°C
                </span>
                <span className="text-[9px] text-zinc-400 block">{selectedPlanet.moonsCount} known moons</span>
              </div>
            </div>

            {/* Atmosphere Pills */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                Atmospheric Composition
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedPlanet.atmosphere.map((gas, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-mono"
                  >
                    {gas}
                  </span>
                ))}
              </div>
            </div>

            {/* Mind-Blowing Facts */}
            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-teal-brand uppercase tracking-wider">
                <Sparkles size={12} />
                <span>Planetary Science Insight</span>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-sans leading-relaxed">
                {selectedPlanet.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-brand font-bold font-mono">›</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Educational takeaway */}
            <div className="bg-neutral-900/50 rounded-xl p-3 border border-white/5 text-[11px] text-zinc-400 font-sans">
              <strong className="text-white font-mono uppercase text-[9px] block mb-1">
                Why Astrophysicists Study {selectedPlanet.name}:
              </strong>
              {selectedPlanet.scientificSignificance}
            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};


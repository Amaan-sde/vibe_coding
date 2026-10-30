import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  RotateCcw, 
  Scale, 
  Sparkles, 
  Activity, 
  HelpCircle, 
  Layers, 
  Sliders, 
  ChevronRight 
} from "lucide-react";
import { motion } from "motion/react";
import { GRAVITY_BODIES, DROPPABLE_OBJECTS, GravityBody, DroppableObject } from "../../data/planets";

export const GravitySimulatorModule: React.FC = () => {
  const [selectedBodyA, setSelectedBodyA] = useState<GravityBody>(GRAVITY_BODIES[2]); // Earth
  const [selectedBodyB, setSelectedBodyB] = useState<GravityBody>(GRAVITY_BODIES[0]); // Moon
  const [selectedObject, setSelectedObject] = useState<DroppableObject>(DROPPABLE_OBJECTS[0]); // Apple
  const [dropHeightMeters, setDropHeightMeters] = useState<number>(20); // 20m drop tower
  
  // Simulation physics state
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [simTime, setSimTime] = useState<number>(0);
  const [hasFinishedA, setHasFinishedA] = useState<boolean>(false);
  const [hasFinishedB, setHasFinishedB] = useState<boolean>(false);

  // Exact vacuum free-fall calculations: t = sqrt(2*h / g), v = sqrt(2*g*h)
  const timeA = Math.sqrt((2 * dropHeightMeters) / selectedBodyA.gravityMps2);
  const velocityA = Math.sqrt(2 * selectedBodyA.gravityMps2 * dropHeightMeters); // m/s
  const velocityAKmh = velocityA * 3.6;

  const timeB = Math.sqrt((2 * dropHeightMeters) / selectedBodyB.gravityMps2);
  const velocityB = Math.sqrt(2 * selectedBodyB.gravityMps2 * dropHeightMeters);
  const velocityBKmh = velocityB * 3.6;

  // Real-time animation loop
  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;

    if (isDropping) {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;
        setSimTime(elapsed);

        const doneA = elapsed >= timeA;
        const doneB = elapsed >= timeB;

        setHasFinishedA(doneA);
        setHasFinishedB(doneB);

        if (doneA && doneB) {
          setIsDropping(false);
        } else {
          animId = requestAnimationFrame(step);
        }
      };
      animId = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(animId);
  }, [isDropping, timeA, timeB]);

  const handleStartDrop = () => {
    setSimTime(0);
    setHasFinishedA(false);
    setHasFinishedB(false);
    setIsDropping(true);
  };

  const handleReset = () => {
    setIsDropping(false);
    setSimTime(0);
    setHasFinishedA(false);
    setHasFinishedB(false);
  };

  // Calculate current object position percentage (0% at top, 100% at impact)
  const currentDistA = Math.min(dropHeightMeters, 0.5 * selectedBodyA.gravityMps2 * simTime * simTime);
  const percentA = (currentDistA / dropHeightMeters) * 100;
  const currentVelA = Math.min(velocityA, selectedBodyA.gravityMps2 * simTime);

  const currentDistB = Math.min(dropHeightMeters, 0.5 * selectedBodyB.gravityMps2 * simTime * simTime);
  const percentB = (currentDistB / dropHeightMeters) * 100;
  const currentVelB = Math.min(velocityB, selectedBodyB.gravityMps2 * simTime);

  return (
    <div className="w-full flex flex-col gap-6 text-white">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse" />
            <span>MODULE B // GRAVITATIONAL DYNAMICS SIMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
            Planetary Gravity Comparison
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mt-1">
            Drop identical objects under different celestial gravity fields. Observe how surface gravity directly dictates acceleration, free-fall drop time, and terminal impact velocity.
          </p>
        </div>

        {/* Global Drop Controls */}
        <div className="flex items-center gap-2 bg-neutral-900/90 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          <button
            onClick={handleStartDrop}
            disabled={isDropping}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 ${
              isDropping
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-teal-brand text-black hover:bg-white shadow-lg shadow-teal-brand/20"
            }`}
          >
            <Play size={12} />
            <span>{isDropping ? "FALLING..." : "RELEASE OBJECT"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-zinc-400 hover:text-white transition cursor-pointer"
            title="Reset Free Fall Chamber"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Control Strip: Object Selection & Drop Height Slider */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-neutral-950/80 border border-white/10 rounded-2xl p-4">
        
        {/* Object Selector (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            1. Select Test Payload (Vacuum Chamber)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DROPPABLE_OBJECTS.map(obj => (
              <button
                key={obj.id}
                onClick={() => {
                  setSelectedObject(obj);
                  handleReset();
                }}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                  selectedObject.id === obj.id
                    ? "bg-teal-brand/15 border-teal-brand text-white shadow-md shadow-teal-brand/10"
                    : "bg-neutral-900/70 border-neutral-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <span className="text-xl">{obj.icon}</span>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-xs truncate leading-tight text-white">{obj.name}</span>
                  <span className="font-mono text-[9px] text-zinc-500">{obj.massKg} kg</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Drop Height Slider (5 Cols) */}
        <div className="md:col-span-5 flex flex-col justify-between gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              2. Drop Tower Height
            </span>
            <span className="font-mono text-xs font-bold text-teal-brand bg-teal-brand/10 px-2 py-0.5 rounded border border-teal-brand/30">
              {dropHeightMeters} METERS
            </span>
          </div>

          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={dropHeightMeters}
            onChange={(e) => {
              setDropHeightMeters(Number(e.target.value));
              handleReset();
            }}
            className="w-full accent-teal-brand cursor-pointer"
          />

          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>5m (2 Stories)</span>
            <span>50m</span>
            <span>100m (30-Story Skyscraper)</span>
          </div>
        </div>

      </div>

      {/* Side-by-Side Dual Gravity Chambers Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CHAMBER A */}
        <div className="bg-black border border-white/10 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-2xl">
          {/* Header & Body Selector */}
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedBodyA.color }} />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">CHAMBER A:</span>
            </div>
            
            <select
              value={selectedBodyA.id}
              onChange={(e) => {
                const found = GRAVITY_BODIES.find(b => b.id === e.target.value);
                if (found) {
                  setSelectedBodyA(found);
                  handleReset();
                }
              }}
              className="bg-neutral-900 border border-neutral-700 text-white font-mono text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-teal-brand cursor-pointer"
            >
              {GRAVITY_BODIES.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.gravityMps2} m/s²)
                </option>
              ))}
            </select>
          </div>

          {/* Telemetry Strip A */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="bg-neutral-900/60 p-2 rounded-lg border border-white/5">
              <span className="text-[8px] text-zinc-500 uppercase block">Gravity Accel</span>
              <span className="font-bold text-white">{selectedBodyA.gravityMps2} m/s²</span>
            </div>
            <div className="bg-neutral-900/60 p-2 rounded-lg border border-white/5">
              <span className="text-[8px] text-zinc-500 uppercase block">Total Fall Time</span>
              <span className="font-bold text-teal-brand">{timeA.toFixed(2)} s</span>
            </div>
            <div className="bg-neutral-900/60 p-2 rounded-lg border border-white/5">
              <span className="text-[8px] text-zinc-500 uppercase block">Impact Velocity</span>
              <span className="font-bold text-amber-400">{velocityAKmh.toFixed(1)} km/h</span>
            </div>
          </div>

          {/* Physics Drop Well Animation Stage */}
          <div className="relative w-full h-72 bg-gradient-to-b from-neutral-950 to-neutral-900 border border-white/10 rounded-xl overflow-hidden p-3 flex flex-col justify-between">
            {/* Height meter ticks along the left side */}
            <div className="absolute left-2 inset-y-3 flex flex-col justify-between font-mono text-[8px] text-zinc-600 pointer-events-none">
              <span>{dropHeightMeters}m (Top)</span>
              <span>{(dropHeightMeters * 0.75).toFixed(0)}m</span>
              <span>{(dropHeightMeters * 0.5).toFixed(0)}m</span>
              <span>{(dropHeightMeters * 0.25).toFixed(0)}m</span>
              <span className="text-zinc-400 font-bold">0m (Impact Ground)</span>
            </div>

            {/* Dropping Object Element */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 transition-transform duration-75"
              style={{
                top: `${Math.min(percentA * 0.8 + 8, 88)}%`
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                  {selectedObject.icon}
                </span>
                {hasFinishedA && (
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/80 px-1 rounded border border-emerald-500/40 animate-bounce mt-1">
                    IMPACT!
                  </span>
                )}
              </div>
            </div>

            {/* Current Real-Time Readout Floater */}
            <div className="absolute right-3 top-3 bg-black/80 border border-white/10 rounded-lg p-2 font-mono text-[9px] text-right space-y-0.5">
              <div className="text-zinc-400">Current Velocity:</div>
              <div className="text-white font-bold text-xs">{(currentVelA * 3.6).toFixed(1)} km/h</div>
              <div className="text-zinc-500">Distance Fallen: {currentDistA.toFixed(1)}m</div>
            </div>

            {/* Ground line */}
            <div className="w-full border-t-2 border-white/30 h-2 mt-auto" />
          </div>

          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            <strong className="text-white">{selectedBodyA.name}:</strong> {selectedBodyA.funFact}
          </p>
        </div>

        {/* CHAMBER B */}
        <div className="bg-black border border-white/10 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-2xl">
          {/* Header & Body Selector */}
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedBodyB.color }} />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">CHAMBER B:</span>
            </div>
            
            <select
              value={selectedBodyB.id}
              onChange={(e) => {
                const found = GRAVITY_BODIES.find(b => b.id === e.target.value);
                if (found) {
                  setSelectedBodyB(found);
                  handleReset();
                }
              }}
              className="bg-neutral-900 border border-neutral-700 text-white font-mono text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-teal-brand cursor-pointer"
            >
              {GRAVITY_BODIES.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.gravityMps2} m/s²)
                </option>
              ))}
            </select>
          </div>

          {/* Telemetry Strip B */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="bg-neutral-900/60 p-2 rounded-lg border border-white/5">
              <span className="text-[8px] text-zinc-500 uppercase block">Gravity Accel</span>
              <span className="font-bold text-white">{selectedBodyB.gravityMps2} m/s²</span>
            </div>
            <div className="bg-neutral-900/60 p-2 rounded-lg border border-white/5">
              <span className="text-[8px] text-zinc-500 uppercase block">Total Fall Time</span>
              <span className="font-bold text-teal-brand">{timeB.toFixed(2)} s</span>
            </div>
            <div className="bg-neutral-900/60 p-2 rounded-lg border border-white/5">
              <span className="text-[8px] text-zinc-500 uppercase block">Impact Velocity</span>
              <span className="font-bold text-amber-400">{velocityBKmh.toFixed(1)} km/h</span>
            </div>
          </div>

          {/* Physics Drop Well Animation Stage */}
          <div className="relative w-full h-72 bg-gradient-to-b from-neutral-950 to-neutral-900 border border-white/10 rounded-xl overflow-hidden p-3 flex flex-col justify-between">
            {/* Height meter ticks along the left side */}
            <div className="absolute left-2 inset-y-3 flex flex-col justify-between font-mono text-[8px] text-zinc-600 pointer-events-none">
              <span>{dropHeightMeters}m (Top)</span>
              <span>{(dropHeightMeters * 0.75).toFixed(0)}m</span>
              <span>{(dropHeightMeters * 0.5).toFixed(0)}m</span>
              <span>{(dropHeightMeters * 0.25).toFixed(0)}m</span>
              <span className="text-zinc-400 font-bold">0m (Impact Ground)</span>
            </div>

            {/* Dropping Object Element */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 transition-transform duration-75"
              style={{
                top: `${Math.min(percentB * 0.8 + 8, 88)}%`
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                  {selectedObject.icon}
                </span>
                {hasFinishedB && (
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/80 px-1 rounded border border-emerald-500/40 animate-bounce mt-1">
                    IMPACT!
                  </span>
                )}
              </div>
            </div>

            {/* Current Real-Time Readout Floater */}
            <div className="absolute right-3 top-3 bg-black/80 border border-white/10 rounded-lg p-2 font-mono text-[9px] text-right space-y-0.5">
              <div className="text-zinc-400">Current Velocity:</div>
              <div className="text-white font-bold text-xs">{(currentVelB * 3.6).toFixed(1)} km/h</div>
              <div className="text-zinc-500">Distance Fallen: {currentDistB.toFixed(1)}m</div>
            </div>

            {/* Ground line */}
            <div className="w-full border-t-2 border-white/30 h-2 mt-auto" />
          </div>

          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            <strong className="text-white">{selectedBodyB.name}:</strong> {selectedBodyB.funFact}
          </p>
        </div>

      </div>

      {/* Educational Deep Dive: Newton's Law of Universal Gravitation */}
      <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-wider mb-2">
          <Sparkles size={14} />
          <span>Core STEM Concept: Newton's Law of Universal Gravitation</span>
        </div>
        
        <h3 className="text-xl font-display font-bold text-white mb-3">
          Why Does Gravity Differ from Planet to Planet?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300 font-sans leading-relaxed">
          <div className="space-y-2">
            <strong className="text-white font-mono uppercase text-[10px] block">1. Mass and Radius Determine $g$</strong>
            <p>
              Sir Isaac Newton proved that every particle of matter attracts every other particle with a gravitational force:
            </p>
            <div className="p-2 bg-neutral-900 rounded font-mono text-center text-teal-brand font-bold text-sm">
              F = G · (m₁ · m₂) / r²
            </div>
            <p>
              Surface gravitational acceleration $g$ simplifies to $g = G \\cdot M / R^2$, where $M$ is planetary mass and $R$ is planetary radius.
            </p>
          </div>

          <div className="space-y-2">
            <strong className="text-white font-mono uppercase text-[10px] block">2. The Apollo 15 Vacuum Proof</strong>
            <p>
              In our simulation, notice that whether you drop an Apple or a 5-gram Feather, in a vacuum they hit the ground at the <em>exact same millisecond</em>!
            </p>
            <p>
              In 1971, Apollo 15 Commander David Scott dropped a 1.3 kg falcon feather and a 1.3 kg aluminum geology hammer on the Moon simultaneously. With no air resistance, both hit the lunar dust at the exact same instant, validating Galileo's 400-year-old law!
            </p>
          </div>

          <div className="space-y-2">
            <strong className="text-white font-mono uppercase text-[10px] block">3. Mass vs Weight: What's the Difference?</strong>
            <p>
              <strong>Mass</strong> is the amount of matter in your body (measured in kilograms) and never changes anywhere in the universe.
            </p>
            <p>
              <strong>Weight</strong> is the gravitational pull on that mass ($W = m \\cdot g$), measured in Newtons. If your mass is 60 kg, your weight on Earth is ~588 N, but on the Moon you weigh only ~97 N!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};


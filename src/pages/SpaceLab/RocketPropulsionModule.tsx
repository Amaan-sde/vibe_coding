import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Flame, 
  Cpu, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  Layers, 
  Compass, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type LaunchPhase = 
  | "STANDBY"
  | "COUNTDOWN"
  | "IGNITION_LIFTOFF"
  | "MAX_Q_BOOSTER_SEP"
  | "STAGE_2_BURN"
  | "FAIRING_JETTISON"
  | "UPPER_STAGE_INSERTION"
  | "PAYLOAD_DEPLOYMENT";

interface StageInfo {
  phase: LaunchPhase;
  stepNumber: number;
  label: string;
  altitudeKm: number;
  velocityKmS: number;
  machNumber: string;
  fuelRemainingPct: number;
  propellantType: string;
  description: string;
  physicsInsight: string;
}

const LAUNCH_STAGES: StageInfo[] = [
  {
    phase: "STANDBY",
    stepNumber: 0,
    label: "Launchpad Standby (T-00:10)",
    altitudeKm: 0,
    velocityKmS: 0,
    machNumber: "Mach 0.0",
    fuelRemainingPct: 100,
    propellantType: "Solid + Semi-Cryogenic + Cryogenic",
    description: "Rocket is pressurized on the launch mount. Umbilical towers vent cryogenic boil-off gases. Automated flight computers initiate terminal countdown.",
    physicsInsight: "Over 88% of total liftoff weight is propellant. The payload represents merely 2% to 4% of the vehicle's initial mass."
  },
  {
    phase: "COUNTDOWN",
    stepNumber: 1,
    label: "Terminal Countdown (T-00:03)",
    altitudeKm: 0,
    velocityKmS: 0,
    machNumber: "Mach 0.0",
    fuelRemainingPct: 100,
    propellantType: "All systems internal",
    description: "Launch sequencer confirms flight avionics on internal battery power. Water deluge sound suppression system activated to absorb acoustic shockwaves.",
    physicsInsight: "Acoustic deluge pumps thousands of gallons of water per second to prevent sound waves reflecting off the pad from tearing the rocket skin apart."
  },
  {
    phase: "IGNITION_LIFTOFF",
    stepNumber: 2,
    label: "Engine Ignition & Liftoff (T+00:15)",
    altitudeKm: 4.2,
    velocityKmS: 0.45,
    machNumber: "Mach 1.3",
    fuelRemainingPct: 91,
    propellantType: "Solid Rocket Boosters (High Thrust)",
    description: "Solid strap-on boosters ignite with colossal thrust! The vehicle overcomes Earth's surface gravity ($F_{\\text{thrust}} > m \\cdot g$), clearing the launch umbilical tower.",
    physicsInsight: "Newton's Third Law in action: High-pressure combustion gas rushing out the bell nozzle at supersonic speed produces equal upward reaction thrust."
  },
  {
    phase: "MAX_Q_BOOSTER_SEP",
    stepNumber: 3,
    label: "Max Q & Booster Separation (T+02:10)",
    altitudeKm: 58.5,
    velocityKmS: 2.15,
    machNumber: "Mach 6.8",
    fuelRemainingPct: 68,
    propellantType: "Liquid Core Stage Burn",
    description: "The vehicle punches through Max Q (maximum aerodynamic pressure). Empty solid strap-on boosters burn out and are cleanly jettisoned using pyrotechnic thrusters.",
    physicsInsight: "Jettisoning empty solid casings sheds tens of tons of dead weight, dramatically increasing the vehicle's thrust-to-weight ratio according to Tsiolkovsky's equation."
  },
  {
    phase: "STAGE_2_BURN",
    stepNumber: 4,
    label: "Core Stage Burn & Gravity Turn (T+03:45)",
    altitudeKm: 115.0,
    velocityKmS: 4.60,
    machNumber: "Mach 14.2",
    fuelRemainingPct: 42,
    propellantType: "Twin Liquid Vikas / Liquid Engines",
    description: "Operating in the upper mesosphere and thermosphere above the dense atmosphere. The rocket executes a planned gravity turn to build horizontal orbital velocity.",
    physicsInsight: "Orbit is not just about going high; it is about going fast horizontally ($v \\ge 7.8\\text{ km/s}$) so the ground curves away as fast as the rocket falls!"
  },
  {
    phase: "FAIRING_JETTISON",
    stepNumber: 5,
    label: "Payload Fairing Jettison (T+04:15)",
    altitudeKm: 165.0,
    velocityKmS: 5.80,
    machNumber: "Mach 18.0",
    fuelRemainingPct: 30,
    propellantType: "Liquid Core Stage",
    description: "In the vacuum of space, aerodynamic friction and atmospheric heating are gone. The protective clamshell nose cone fairings split in half and tumble away into space, exposing the satellite.",
    physicsInsight: "Discarding the 1,500 kg fairing halves eliminates useless parasitic mass that would otherwise rob precious orbital insertion energy."
  },
  {
    phase: "UPPER_STAGE_INSERTION",
    stepNumber: 6,
    label: "Cryogenic Upper Stage Burn (T+08:30)",
    altitudeKm: 280.0,
    velocityKmS: 7.65,
    machNumber: "Mach 23.5",
    fuelRemainingPct: 12,
    propellantType: "Cryogenic Liquid Hydrogen + Liquid Oxygen",
    description: "The core stage detaches. The cryogenic upper stage ignites its high-efficiency CE-20 engine, accelerating the payload into a precise stable Earth parking orbit.",
    physicsInsight: "Cryogenic LOX/LH2 delivers the highest specific impulse ($I_{sp} \\approx 450\\text{ s}$), delivering maximum delta-v per kilogram of propellant burned."
  },
  {
    phase: "PAYLOAD_DEPLOYMENT",
    stepNumber: 7,
    label: "Mission Success: Satellite Deployment (T+16:20)",
    altitudeKm: 350.0,
    velocityKmS: 7.82,
    machNumber: "Orbital Velocity",
    fuelRemainingPct: 0,
    propellantType: "Spacecraft Autonomous Cold Gas / Mono-propellant",
    description: "Upper stage engine cuts off (SECO). Pyrotechnic clamp bands fire, and calibrated release springs gently push the satellite into free orbit. Solar arrays unfurl!",
    physicsInsight: "The satellite is now in perpetual free fall around Earth at 28,150 km/h, achieving stable orbit without requiring ongoing propulsion!"
  }
];

export const RocketPropulsionModule: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"simulator" | "principles" | "anatomy">("simulator");
  const timerRef = useRef<number | null>(null);

  const stage = LAUNCH_STAGES[currentStageIndex];

  // Auto-advance through launch stages when playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStageIndex((prev) => {
          if (prev < LAUNCH_STAGES.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStageIndex(0);
  };

  const handleStartLaunch = () => {
    if (currentStageIndex === LAUNCH_STAGES.length - 1) {
      setCurrentStageIndex(0);
    }
    setIsPlaying(true);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-white">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse" />
            <span>MODULE C // INTERACTIVE AEROSPACE LAUNCH SIMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
            Rocket Propulsion & Staging
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mt-1">
            Experience an orbital multistage rocket launch from pad countdown to satellite deployment. Master Newton's Third Law, thrust generation, staging mechanics, and fuel chemistry.
          </p>
        </div>

        {/* Navigation Tabs (Simulator vs Principles vs Anatomy) */}
        <div className="flex items-center gap-1 bg-neutral-900 border border-white/10 rounded-full p-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
              activeTab === "simulator" ? "bg-teal-brand text-black font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            LAUNCH SIMULATOR
          </button>
          <button
            onClick={() => setActiveTab("principles")}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
              activeTab === "principles" ? "bg-teal-brand text-black font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            PROPULSION PHYSICS
          </button>
          <button
            onClick={() => setActiveTab("anatomy")}
            className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
              activeTab === "anatomy" ? "bg-teal-brand text-black font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            ROCKET ANATOMY
          </button>
        </div>
      </div>

      {/* TAB 1: LAUNCH SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="flex flex-col gap-6">
          
          {/* Main Visual Stage & HUD Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 8 Cols: Interactive Rocket Ascent Animation Viewport */}
            <div className="lg:col-span-8 bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-2xl">
              
              {/* Dynamic Sky Gradient according to altitude */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000"
                style={{
                  background: currentStageIndex <= 1 
                    ? "radial-gradient(ellipse at bottom, #1e293b 0%, #030712 100%)" 
                    : currentStageIndex <= 3 
                    ? "radial-gradient(ellipse at bottom, #0f172a 0%, #000000 100%)" 
                    : "radial-gradient(ellipse at bottom, #020617 0%, #000000 100%)"
                }}
              />

              {/* Background Stars (Visible in high altitude stages) */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-30 transition-opacity duration-1000"
                style={{
                  opacity: currentStageIndex >= 3 ? 0.8 : 0.15,
                  backgroundImage: "radial-gradient(1px 1px at 30px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 180px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 280px 100px, #ffffff, rgba(0,0,0,0))",
                  backgroundSize: "300px 300px"
                }}
              />

              {/* Top Status Header */}
              <div className="flex justify-between items-center z-10 font-mono text-[10px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-teal-brand animate-ping" : "bg-zinc-600"}`} />
                  <span className="font-bold text-white uppercase">SEQUENCE: {stage.phase}</span>
                </div>
                <div className="flex items-center gap-2 bg-neutral-900/80 px-2.5 py-1 rounded border border-white/10">
                  <span className="text-zinc-500">STAGE {currentStageIndex + 1} OF {LAUNCH_STAGES.length}</span>
                </div>
              </div>

              {/* Central Rocket Graphic & Physical State Visualization */}
              <div className="relative w-full h-64 flex items-center justify-center z-10 my-auto">
                
                {/* 1. Launchpad base (Only visible at standby/countdown) */}
                {currentStageIndex <= 1 && (
                  <div className="absolute bottom-4 flex flex-col items-center">
                    <div className="w-48 h-4 bg-zinc-800 border-t-2 border-zinc-600 rounded" />
                    <div className="w-64 h-6 bg-zinc-900 border-t border-zinc-700 flex justify-around">
                      <div className="w-3 h-full bg-zinc-700" />
                      <div className="w-3 h-full bg-zinc-700" />
                    </div>
                  </div>
                )}

                {/* 2. Rocket Vehicle Assembly Visual */}
                <motion.div 
                  className="flex flex-col items-center relative"
                  animate={{
                    y: currentStageIndex === 0 ? 30 : currentStageIndex === 1 ? 28 : currentStageIndex === 2 ? 0 : currentStageIndex === 3 ? -30 : currentStageIndex === 4 ? -50 : -60,
                    scale: currentStageIndex >= 6 ? 0.9 : 1
                  }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                >
                  {/* Fairing or Deployed Satellite */}
                  {currentStageIndex >= 5 ? (
                    /* DEPLOYED SATELLITE (Fairings gone) */
                    <div className="flex flex-col items-center mb-1">
                      {/* Satellite Bus */}
                      <div className="w-10 h-10 bg-amber-400/90 border border-amber-300 rounded-lg flex items-center justify-center shadow-lg shadow-amber-400/20">
                        <Cpu size={18} className="text-black" />
                      </div>
                      {/* Deployed Solar Wings */}
                      <div className="flex gap-1 -mt-2">
                        <div className="w-8 h-3 bg-blue-500 border border-blue-300 rounded-sm animate-pulse" />
                        <div className="w-2 h-3 bg-zinc-700" />
                        <div className="w-8 h-3 bg-blue-500 border border-blue-300 rounded-sm animate-pulse" />
                      </div>
                      {currentStageIndex === 7 && (
                        <div className="text-[9px] font-mono text-emerald-400 font-bold mt-2 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 animate-bounce">
                          MISSION SUCCESS: IN ORBIT
                        </div>
                      )}
                    </div>
                  ) : (
                    /* NOSE CONE / PAYLOAD FAIRING INTACT */
                    <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[36px] border-b-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                  )}

                  {/* Upper Cryogenic Stage */}
                  <div className={`w-7 h-12 border-x border-zinc-400 flex items-center justify-center text-[7px] font-mono font-bold ${
                    currentStageIndex >= 6 ? "bg-teal-brand text-black" : "bg-neutral-200 text-neutral-800"
                  }`}>
                    C25
                  </div>

                  {/* Interstage Ring */}
                  <div className="w-8 h-2 bg-zinc-800 border-y border-zinc-600" />

                  {/* Core Liquid Stage (L110) */}
                  {currentStageIndex < 6 && (
                    <div className="w-8 h-24 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 border-x border-zinc-400 flex flex-col justify-around items-center text-[8px] font-mono font-bold text-neutral-800 relative">
                      <span>LVM3</span>
                      <div className="w-full h-1 bg-teal-brand" />
                      <span>ISRO</span>

                      {/* Solid Boosters strapped to sides (Jettisoned after stage 3) */}
                      {currentStageIndex <= 2 && (
                        <>
                          {/* Left Booster (S200) */}
                          <div className="absolute -left-4 w-3.5 h-20 bg-zinc-300 border border-zinc-500 rounded-t-full flex flex-col justify-end items-center pb-1">
                            <span className="text-[5px] text-zinc-700 rotate-90">S200</span>
                            {/* Booster flame */}
                            {currentStageIndex === 2 && (
                              <div className="absolute -bottom-6 w-3 h-7 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent rounded-full animate-pulse filter blur-[1px]" />
                            )}
                          </div>

                          {/* Right Booster (S200) */}
                          <div className="absolute -right-4 w-3.5 h-20 bg-zinc-300 border border-zinc-500 rounded-t-full flex flex-col justify-end items-center pb-1">
                            <span className="text-[5px] text-zinc-700 rotate-90">S200</span>
                            {/* Booster flame */}
                            {currentStageIndex === 2 && (
                              <div className="absolute -bottom-6 w-3 h-7 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent rounded-full animate-pulse filter blur-[1px]" />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Core Rocket Engine Bell & Flaming Exhaust Plume */}
                  {currentStageIndex >= 2 && currentStageIndex < 7 && (
                    <div className="flex flex-col items-center">
                      {/* Engine Nozzle */}
                      <div className="w-4 h-3 bg-zinc-700 border-b border-zinc-500 clip-path-trapezoid" />

                      {/* Supersonic Shock Diamond Plume */}
                      <div className="relative flex flex-col items-center">
                        <div className="w-5 h-16 bg-gradient-to-b from-cyan-300 via-amber-400 to-transparent rounded-full filter blur-[1px] animate-pulse" />
                        <div className="absolute top-1 w-2.5 h-10 bg-white rounded-full filter blur-[0.5px]" />
                        <div className="absolute top-3 w-3.5 h-1 bg-cyan-200 rounded-full animate-ping" />
                      </div>
                    </div>
                  )}
                </motion.div>

              </div>

              {/* Interactive Stage Scrub Bar along bottom */}
              <div className="z-10 flex flex-col gap-2 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>FLIGHT STAGE SELECTOR</span>
                  <span className="text-teal-brand font-bold">{stage.label}</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
                  {LAUNCH_STAGES.map((s, idx) => (
                    <button
                      key={s.phase}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStageIndex(idx);
                      }}
                      className={`px-1.5 py-1 rounded text-[9px] font-mono uppercase transition cursor-pointer ${
                        currentStageIndex === idx
                          ? "bg-teal-brand text-black font-bold shadow-md shadow-teal-brand/30"
                          : idx < currentStageIndex
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                          : "bg-neutral-900 text-zinc-500 border border-neutral-800 hover:text-white"
                      }`}
                    >
                      {idx === 0 ? "PAD" : idx === 2 ? "LIFTOFF" : idx === 3 ? "MAX Q" : idx === 5 ? "FAIRING" : idx === 7 ? "ORBIT" : `S${idx}`}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Real-Time Telemetry HUD & Stage Insight */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              
              {/* Telemetry Dashboard Card */}
              <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
                
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-teal-brand font-bold">
                    LAUNCH VEHICLE TELEMETRY
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    NOMINAL
                  </span>
                </div>

                {/* Telemetry Numbers Grid */}
                <div className="grid grid-cols-2 gap-3 font-mono">
                  
                  <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[8px] text-zinc-500 uppercase block">Altitude</span>
                    <span className="text-lg font-bold text-white font-display">
                      {stage.altitudeKm.toFixed(1)} <span className="text-xs font-mono text-zinc-400">km</span>
                    </span>
                    <span className="text-[8px] text-teal-brand block">
                      {stage.altitudeKm > 100 ? "Kármán Line Exceeded (Space)" : "Troposphere / Stratosphere"}
                    </span>
                  </div>

                  <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[8px] text-zinc-500 uppercase block">Orbital Velocity</span>
                    <span className="text-lg font-bold text-teal-brand font-display">
                      {stage.velocityKmS.toFixed(2)} <span className="text-xs font-mono text-zinc-400">km/s</span>
                    </span>
                    <span className="text-[8px] text-zinc-400 block">{stage.machNumber}</span>
                  </div>

                  <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[8px] text-zinc-500 uppercase block">Fuel Remaining</span>
                    <span className="text-lg font-bold text-amber-400 font-display">
                      {stage.fuelRemainingPct}%
                    </span>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${stage.fuelRemainingPct}%` }} 
                      />
                    </div>
                  </div>

                  <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[8px] text-zinc-500 uppercase block">Target Orbit</span>
                    <span className="text-xs font-bold text-white block mt-1">LEO 350 KM</span>
                    <span className="text-[8px] text-emerald-400 block">Inc: 51.6° circular</span>
                  </div>

                </div>

                {/* Propulsion System in use */}
                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">
                    Active Propulsion Chemistry
                  </span>
                  <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    <Flame size={14} className="text-orange-400" />
                    <span>{stage.propellantType}</span>
                  </div>
                </div>

                {/* Stage Description & Physical Logic */}
                <div className="space-y-2 border-t border-white/10 pt-3">
                  <span className="text-[9px] font-mono text-teal-brand uppercase tracking-wider block font-bold">
                    Aerospace Flight Director Commentary:
                  </span>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {stage.description}
                  </p>
                  <div className="bg-teal-950/30 border border-teal-brand/20 rounded-lg p-2.5 text-[11px] text-zinc-300 font-sans">
                    <strong className="text-teal-brand font-mono text-[9px] uppercase block mb-0.5">
                      Why It Happens Mechanically:
                    </strong>
                    {stage.physicsInsight}
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={isPlaying ? () => setIsPlaying(false) : handleStartLaunch}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-brand hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-lg shadow-teal-brand/20"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlaying ? "PAUSE SIM" : "RUN LAUNCH"}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-zinc-300 hover:text-white transition cursor-pointer"
                    title="Reset to Launchpad"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: PROPULSION PHYSICS & EQUATIONS */}
      {activeTab === "principles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Newton's Third Law */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-xl">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-teal-brand uppercase tracking-widest font-bold">
                CORE FUNDAMENTAL LAW
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Newton's Third Law of Motion
              </h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                "For every action, there is an equal and opposite reaction." A rocket does NOT push against the ground or air! It accelerates by expelling burning gas at thousands of meters per second out of the exhaust nozzle.
              </p>
              <div className="p-3 bg-neutral-900 rounded-xl font-mono text-center text-teal-brand font-bold text-xs">
                F_thrust = ṁ · v_e + (p_e - p_0) · A_e
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                Where ṁ is the propellant mass burn rate, v_e is exit gas velocity, p_e is nozzle exit pressure, and A_e is nozzle exit area.
              </p>
            </div>
          </div>

          {/* Card 2: Tsiolkovsky Rocket Equation */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-xl">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-teal-brand uppercase tracking-widest font-bold">
                THE TYRANNY OF THE ROCKET EQUATION
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Tsiolkovsky's Rocket Equation
              </h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Formulated by Russian pioneer Konstantin Tsiolkovsky in 1903, this mathematical equation defines the delta-v ($\Delta v$) velocity budget required to reach orbit:
              </p>
              <div className="p-3 bg-neutral-900 rounded-xl font-mono text-center text-teal-brand font-bold text-xs">
                Δv = v_e · ln( m_0 / m_f )
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                Because of the natural logarithm ($ln$), to gain twice as much speed, you must carry exponentially more fuel! This is why Multistage rockets are strictly mandatory.
              </p>
            </div>
          </div>

          {/* Card 3: Fuel vs Oxidizer */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-xl">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-teal-brand uppercase tracking-widest font-bold">
                COMBUSTION IN VACUUM
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Why Rockets Carry Their Own Oxygen
              </h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Jet planes suck in air from the atmosphere to burn kerosene fuel. But space is a complete vacuum—there are zero oxygen molecules to sustain fire!
              </p>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Therefore, every orbital rocket carries both a <strong>Fuel</strong> (liquid hydrogen, kerosene, or methane) and a dense <strong>Oxidizer</strong> (liquid oxygen, LOX) to generate fire in outer space.
              </p>
            </div>
          </div>

          {/* Card 4: Solid vs Liquid vs Cryogenic Propulsion Table */}
          <div className="md:col-span-2 lg:col-span-3 bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="font-display font-bold text-lg text-white mb-4">
              Comparison of Rocket Propulsion Types (As Used by ISRO)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-zinc-300">
                <thead>
                  <tr className="border-b border-white/10 text-teal-brand uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Propulsion Type</th>
                    <th className="pb-3">Typical Propellants</th>
                    <th className="pb-3">Specific Impulse (Isp)</th>
                    <th className="pb-3">Thrust Capability</th>
                    <th className="pb-3">ISRO Real Example</th>
                    <th className="pb-3">Pros & Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 font-bold text-white">Solid Propulsion</td>
                    <td>HTPB (Hydroxyl-terminated polybutadiene) + Ammonium Perchlorate</td>
                    <td>250 – 275 seconds</td>
                    <td className="text-emerald-400 font-bold">Massive instantaneous liftoff thrust</td>
                    <td>S200 strap-on boosters on LVM3</td>
                    <td className="font-sans text-[11px] text-zinc-400">High thrust, simple storage; Cannot be turned off once ignited!</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Liquid Propulsion</td>
                    <td>UDMH (Unsymmetrical dimethylhydrazine) + N2O4</td>
                    <td>300 – 320 seconds</td>
                    <td className="text-yellow-400">Moderate throttleable thrust</td>
                    <td>Vikas Engine (L110 core stage)</td>
                    <td className="font-sans text-[11px] text-zinc-400">Can be throttled and restarted; Toxic, hypergolic handling.</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Cryogenic Propulsion</td>
                    <td>Liquid Hydrogen (-253°C) + Liquid Oxygen (-183°C)</td>
                    <td className="text-teal-brand font-bold">440 – 460 seconds (Highest efficiency!)</td>
                    <td className="text-zinc-300">High efficiency for orbital insertion</td>
                    <td>CE-20 Cryogenic Engine (C25 Upper Stage)</td>
                    <td className="font-sans text-[11px] text-zinc-400">Cleanest burn ($H_2O$ exhaust); Extreme deep-freeze storage complexity.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: ROCKET ANATOMY & STRUCTURAL CUTAWAY */}
      {activeTab === "anatomy" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl">
          
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-black/60 rounded-xl border border-white/5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-teal-brand mb-4">
              MULTISTAGE LAUNCH VEHICLE ANATOMY (LVM3 ARCHITECTURE)
            </span>

            {/* Exploded Architecture Cards */}
            <div className="w-full max-w-xs space-y-2 text-center font-mono text-xs">
              <div className="p-3 bg-neutral-900 border border-teal-brand/40 rounded-xl text-teal-brand font-bold shadow-lg">
                1. Aerodynamic Payload Fairing (Nose Cone)
                <span className="block text-[9px] text-zinc-400 font-normal">Protects satellite from heat & dynamic pressure</span>
              </div>
              <div className="p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-300 font-bold">
                2. Satellite Payload (Spacecraft)
                <span className="block text-[9px] text-zinc-400 font-normal">Chandrayaan-3 or Communication Satellite</span>
              </div>
              <div className="p-3 bg-neutral-900 border border-white/20 rounded-xl text-white font-bold">
                3. Cryogenic Upper Stage (C25)
                <span className="block text-[9px] text-zinc-400 font-normal">Liquid Hydrogen (-253°C) & LOX (-183°C)</span>
              </div>
              <div className="p-4 bg-neutral-900/90 border border-white/20 rounded-xl text-white font-bold">
                4. Core Liquid Stage (L110)
                <span className="block text-[9px] text-zinc-400 font-normal">Twin Vikas engines with gimballed steering</span>
              </div>
              <div className="p-3 bg-neutral-900/60 border border-zinc-700 rounded-xl text-zinc-300 font-bold">
                5. Solid Rocket Boosters (2x S200)
                <span className="block text-[9px] text-zinc-400 font-normal">Provides 80% of initial liftoff thrust</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-teal-brand uppercase tracking-widest font-bold">
                Subsystem Engineering Guide
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                How Modern Rocket Subsystems Work Together
              </h3>
              
              <div className="space-y-3 text-xs text-zinc-300 font-sans leading-relaxed">
                <div className="p-3 bg-neutral-900/70 rounded-xl border border-white/5">
                  <strong className="text-white font-mono uppercase text-[10px] block mb-1">
                    • Gimballed Engine Nozzles for Thrust Vector Control (TVC)
                  </strong>
                  Rockets do not steer using rudders like boats. Instead, hydraulic or electromechanical actuators swivel the entire rocket engine nozzle by a few degrees. By tilting the thrust vector, the rocket rotates and steers through space.
                </div>

                <div className="p-3 bg-neutral-900/70 rounded-xl border border-white/5">
                  <strong className="text-white font-mono uppercase text-[10px] block mb-1">
                    • Turbopumps: The Super-Heart of Rocket Engines
                  </strong>
                  To generate thousands of tons of thrust, rocket engines must feed propellant at staggering rates—pumping a family swimming pool of fuel into the combustion chamber in under 60 seconds! Turbopumps spin at over 30,000 RPM under immense pressures.
                </div>

                <div className="p-3 bg-neutral-900/70 rounded-xl border border-white/5">
                  <strong className="text-white font-mono uppercase text-[10px] block mb-1">
                    • Regenerative Cooling
                  </strong>
                  Combustion temperatures exceed 3,300°C—hot enough to melt any metal! Engineers route freezing cryogenic fuel (-253°C) through hundreds of microscopic tubes lining the engine wall before it enters the burner. The fuel cools the metal while warming itself for better combustion!
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

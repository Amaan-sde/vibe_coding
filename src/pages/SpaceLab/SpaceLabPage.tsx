import React, { useState } from "react";
import { 
  Orbit, 
  Scale, 
  Rocket, 
  Globe, 
  Sparkles, 
  FlaskConical, 
  Layers, 
  BookOpen 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SolarSystemModule } from "./SolarSystemModule";
import { GravitySimulatorModule } from "./GravitySimulatorModule";
import { RocketPropulsionModule } from "./RocketPropulsionModule";
import { SatelliteOrbitModule } from "./SatelliteOrbitModule";

interface SpaceLabPageProps {
  initialModule?: "solar" | "gravity" | "rocket" | "satellite";
}

export const SpaceLabPage: React.FC<SpaceLabPageProps> = ({ initialModule = "rocket" }) => {
  const [activeModule, setActiveModule] = useState<"solar" | "gravity" | "rocket" | "satellite">(initialModule);

  const modules = [
    {
      id: "rocket" as const,
      title: "Rocket Propulsion",
      badge: "Interview Priority",
      icon: Rocket,
      description: "Interactive multistage launch, staging mechanics, thrust physics & fuel chemistry."
    },
    {
      id: "solar" as const,
      title: "Solar System",
      badge: "Heliocentric Orbits",
      icon: Globe,
      description: "Sun and 8 planets, orbital periods, rotation resonance, scale comparison."
    },
    {
      id: "gravity" as const,
      title: "Gravity Simulator",
      badge: "Newtonian Physics",
      icon: Scale,
      description: "Drop tests on Earth, Moon, Mars, Jupiter, & Saturn; Apollo 15 vacuum proof."
    },
    {
      id: "satellite" as const,
      title: "Satellite Orbits",
      badge: "Keplerian Mechanics",
      icon: Orbit,
      description: "LEO, SSO, MEO, GEO orbits; speed vs altitude, GPS & communication relays."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest">
          <FlaskConical size={14} />
          <span>SPACE LABORATORY // INTERACTIVE STEM SIMULATION LAB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
          Explore. Experiment. Understand.
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Step inside our virtual aerospace laboratory. Manipulate physics variables in real time to understand rocket propulsion, celestial gravity, orbital mechanics, and planetary motions through interactive simulations.
        </p>
      </div>

      {/* Module Selector Capsule Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                isActive
                  ? "bg-teal-brand/10 border-teal-brand shadow-xl shadow-teal-brand/10 scale-[1.02]"
                  : "bg-neutral-950/80 border-white/10 hover:border-zinc-700 hover:bg-neutral-900/60"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isActive ? "bg-teal-brand text-black" : "bg-neutral-900 text-teal-brand border border-white/5"
                }`}>
                  <Icon size={18} />
                </div>
                <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full ${
                  isActive 
                    ? "bg-teal-brand/20 text-teal-brand border border-teal-brand/40 font-bold" 
                    : "text-zinc-500 bg-neutral-900"
                }`}>
                  {m.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-white">{m.title}</h3>
                <p className="text-[11px] text-zinc-400 font-sans mt-0.5 line-clamp-2">
                  {m.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Module Content Viewport */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeModule === "rocket" && <RocketPropulsionModule />}
            {activeModule === "solar" && <SolarSystemModule />}
            {activeModule === "gravity" && <GravitySimulatorModule />}
            {activeModule === "satellite" && <SatelliteOrbitModule />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};


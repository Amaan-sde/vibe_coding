import React from "react";
import { 
  Rocket, 
  Orbit, 
  Globe, 
  Scale, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Play, 
  CheckCircle2, 
  Atom, 
  Activity,
  Layers,
  ChevronRight,
  Award
} from "lucide-react";
import { motion } from "motion/react";

interface HomePageProps {
  onNavigate: (page: "home" | "explore" | "isro" | "laboratory" | "knowledge" | "quiz" | "educator") => void;
  onSelectLabModule?: (module: "solar" | "gravity" | "rocket" | "satellite") => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectLabModule }) => {
  return (
    <div className="w-full flex flex-col gap-16 text-white overflow-hidden pb-12">
      
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-10 sm:pt-16 pb-8 flex flex-col items-center text-center">
        
        {/* Glow backdrop effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Top Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-teal-brand text-xs font-mono font-semibold uppercase tracking-widest mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-teal-brand animate-ping" />
          <span>ADVANCED SPACE EXPLORATION & STEM EDUCATION PLATFORM</span>
        </motion.div>

        {/* Hero Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-5xl text-white"
        >
          Explore Beyond Earth.{" "}
          <span className="bg-gradient-to-r from-teal-brand via-cyan-300 to-white bg-clip-text text-transparent">
            Discover the Universe.
          </span>
        </motion.h1>

        {/* Supporting Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-zinc-300 text-base sm:text-lg md:text-xl max-w-2xl font-sans leading-relaxed"
        >
          An interactive journey through space science, aerospace technology, and the wonders of the cosmos—crafted to educate, demonstrate, and inspire the next generation of space explorers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs"
        >
          <button
            onClick={() => onNavigate("laboratory")}
            className="px-6 sm:px-8 py-3.5 rounded-full bg-teal-brand hover:bg-white text-black font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-xl shadow-teal-brand/20 flex items-center gap-2"
          >
            <Rocket size={15} />
            <span>OPEN SPACE LABORATORY</span>
          </button>

          <button
            onClick={() => onNavigate("isro")}
            className="px-6 sm:px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <span>ISRO MISSIONS EXPLORER</span>
            <ChevronRight size={15} className="text-teal-brand" />
          </button>

          <button
            onClick={() => onNavigate("educator")}
            className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-2"
          >
            <GraduationCap size={15} className="text-teal-brand" />
            <span>EDUCATOR MODE</span>
          </button>
        </motion.div>

        {/* Live Key Space Telemetry Metric Counter Bar */}
        <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl font-mono text-left">
          <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase block">Lunar Touchdown</span>
            <span className="text-xl font-display font-black text-white block mt-0.5">23 Aug 2023</span>
            <span className="text-[9px] text-teal-brand block">Shiv Shakti Point (ISRO)</span>
          </div>

          <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase block">LEO Orbital Speed</span>
            <span className="text-xl font-display font-black text-white block mt-0.5">27,600 km/h</span>
            <span className="text-[9px] text-emerald-400 block">7.67 km/s Free Fall</span>
          </div>

          <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase block">Sun-Earth L1 Perch</span>
            <span className="text-xl font-display font-black text-white block mt-0.5">1.5M km</span>
            <span className="text-[9px] text-amber-400 block">Aditya-L1 Halo Orbit</span>
          </div>

          <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <span className="text-[10px] text-zinc-500 uppercase block">Classroom Activities</span>
            <span className="text-xl font-display font-black text-white block mt-0.5">6 Hands-On</span>
            <span className="text-[9px] text-teal-brand block">STEM Educator Guides</span>
          </div>
        </div>

      </section>

      {/* ----------------- 2. ACCESS TO ORIGINAL PROTECTED TELEMETRY DECK ----------------- */}
      <section className="w-full max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-neutral-950 via-blue-950/30 to-neutral-950 border border-teal-brand/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest font-bold">
              <Orbit size={15} />
              <span>CORE INTERACTIVE ORBITAL TELEMETRY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight">
              Original Mission Telemetry Deck & Asteroid Matrix
            </h2>

            <p className="text-zinc-300 text-sm font-sans leading-relaxed">
              Launch into the original WHY SPACE telemetry hub featuring the active looped spacecraft videos, live cockpit ambient synthesizer audio, orbital voyage selectors (Cosmos, Settlements, Prospecting), and the hyper-burn meteor matrix tracking bolide friction.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
              <button
                onClick={() => onNavigate("explore")}
                className="px-6 py-3 rounded-full bg-teal-brand hover:bg-white text-black font-bold uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-lg shadow-teal-brand/20 flex items-center gap-2"
              >
                <span>LAUNCH TELEMETRY DECK</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Graphical Telemetry Badge Preview */}
          <div className="bg-black/80 border border-white/15 rounded-2xl p-5 max-w-xs w-full font-mono text-xs space-y-3 shrink-0">
            <div className="flex justify-between items-center text-[10px] text-zinc-400 border-b border-white/10 pb-2">
              <span className="text-teal-brand font-bold">VOYAGE_RGL_01</span>
              <span className="text-emerald-400">ONLINE</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between text-zinc-400">
                <span>Vessel:</span>
                <span className="text-white font-bold">Artemis III</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Distance:</span>
                <span className="text-white font-bold">384,400 KM</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Bolide Node:</span>
                <span className="text-teal-brand font-bold">Sec 9X Hyper-Burn</span>
              </div>
            </div>
            <div className="p-2 bg-neutral-900 rounded text-[9px] text-zinc-400 text-center border border-white/5">
              Two Original Cloudinary Videos Protected
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- 3. ISRO MISSION SPOTLIGHT ----------------- */}
      <section className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
              <Rocket size={14} />
              <span>ISRO MISSION EXPLORER</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              India's Journey Beyond Earth
            </h2>
          </div>

          <button
            onClick={() => onNavigate("isro")}
            className="flex items-center gap-1.5 text-xs font-mono text-teal-brand hover:text-white transition cursor-pointer"
          >
            <span>VIEW ALL 3 MISSIONS & TIMELINES</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Chandrayaan-3 */}
          <div 
            onClick={() => onNavigate("isro")}
            className="bg-neutral-950 border border-white/10 hover:border-teal-brand/50 rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all cursor-pointer group shadow-xl"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-brand/10 border border-teal-brand/30 text-teal-brand text-[9px] font-mono font-bold uppercase">
                Historic Lunar South Pole Landing
              </span>
              <h3 className="font-display font-bold text-2xl text-white group-hover:text-teal-brand transition-colors">
                Chandrayaan-3
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                India became the 1st nation ever to land near the Lunar South Pole on 23 August 2023. Pragyan rover proved the presence of Sulphur on the lunar surface.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="text-white font-bold">LVM3-M4</span>
              </div>
              <div className="flex justify-between">
                <span>Landing Point:</span>
                <span className="text-teal-brand font-bold">Shiv Shakti Point</span>
              </div>
            </div>
          </div>

          {/* Card 2: Mangalyaan */}
          <div 
            onClick={() => onNavigate("isro")}
            className="bg-neutral-950 border border-white/10 hover:border-teal-brand/50 rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all cursor-pointer group shadow-xl"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[9px] font-mono font-bold uppercase">
                Maiden Interplanetary Success
              </span>
              <h3 className="font-display font-bold text-2xl text-white group-hover:text-teal-brand transition-colors">
                Mangalyaan (MOM)
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                First country in the world to reach Mars on its maiden attempt, traversing ~680 million km on a lean budget of just $74 million USD!
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="text-white font-bold">PSLV-C25</span>
              </div>
              <div className="flex justify-between">
                <span>Trajectory:</span>
                <span className="text-teal-brand font-bold">Hohmann Transfer</span>
              </div>
            </div>
          </div>

          {/* Card 3: Aditya-L1 */}
          <div 
            onClick={() => onNavigate("isro")}
            className="bg-neutral-950 border border-white/10 hover:border-teal-brand/50 rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all cursor-pointer group shadow-xl"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-[9px] font-mono font-bold uppercase">
                First Solar Observatory
              </span>
              <h3 className="font-display font-bold text-2xl text-white group-hover:text-teal-brand transition-colors">
                Aditya-L1
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Stationed at Lagrange Point 1 (1.5M km from Earth) in a Halo orbit, continuously tracking Coronal Mass Ejections (CMEs) and solar weather 24/7.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="text-white font-bold">PSLV-C57</span>
              </div>
              <div className="flex justify-between">
                <span>Orbit:</span>
                <span className="text-teal-brand font-bold">Halo Orbit @ L1</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ----------------- 4. INTERACTIVE SPACE LABORATORY SHOWCASE ----------------- */}
      <section className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
              <Layers size={14} />
              <span>SPACE LABORATORY // INTERACTIVE SIMULATORS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Explore. Experiment. Understand.
            </h2>
          </div>

          <button
            onClick={() => onNavigate("laboratory")}
            className="flex items-center gap-1.5 text-xs font-mono text-teal-brand hover:text-white transition cursor-pointer"
          >
            <span>ENTER SIMULATION LAB</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Module A */}
          <div 
            onClick={() => {
              if (onSelectLabModule) onSelectLabModule("solar");
              onNavigate("laboratory");
            }}
            className="bg-neutral-950 border border-white/10 hover:border-teal-brand/40 rounded-2xl p-5 flex flex-col justify-between gap-4 transition cursor-pointer shadow-xl"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Globe size={20} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Solar System Explorer</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Interact with the Sun and all 8 planets. Inspect diameters, orbital periods, rotation periods, and atmospheric gases.
              </p>
            </div>
            <span className="text-[10px] font-mono text-teal-brand uppercase font-bold flex items-center gap-1">
              <span>EXPLORE ORBITS</span>
              <ChevronRight size={12} />
            </span>
          </div>

          {/* Module B */}
          <div 
            onClick={() => {
              if (onSelectLabModule) onSelectLabModule("gravity");
              onNavigate("laboratory");
            }}
            className="bg-neutral-950 border border-white/10 hover:border-teal-brand/40 rounded-2xl p-5 flex flex-col justify-between gap-4 transition cursor-pointer shadow-xl"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Scale size={20} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Gravity Simulator</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Compare Earth (9.81 m/s²) vs Moon (1.62 m/s²) vs Mars vs Jupiter. Watch identical objects fall in real-time!
              </p>
            </div>
            <span className="text-[10px] font-mono text-teal-brand uppercase font-bold flex items-center gap-1">
              <span>RUN DROP TESTS</span>
              <ChevronRight size={12} />
            </span>
          </div>

          {/* Module C */}
          <div 
            onClick={() => {
              if (onSelectLabModule) onSelectLabModule("rocket");
              onNavigate("laboratory");
            }}
            className="bg-neutral-950 border border-teal-brand/40 rounded-2xl p-5 flex flex-col justify-between gap-4 transition cursor-pointer shadow-xl bg-teal-brand/5"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-brand/20 border border-teal-brand/40 flex items-center justify-center text-teal-brand">
                <Rocket size={20} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">Rocket Propulsion</h3>
                <span className="text-[8px] font-mono text-teal-brand bg-teal-brand/20 px-1.5 py-0.5 rounded font-bold">KEY</span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Full multistage launch demo: countdown, ignition, Max Q, solid booster staging, fairing jettison, and orbital payload deployment.
              </p>
            </div>
            <span className="text-[10px] font-mono text-teal-brand uppercase font-bold flex items-center gap-1">
              <span>SIMULATE LAUNCH</span>
              <ChevronRight size={12} />
            </span>
          </div>

          {/* Module D */}
          <div 
            onClick={() => {
              if (onSelectLabModule) onSelectLabModule("satellite");
              onNavigate("laboratory");
            }}
            className="bg-neutral-950 border border-white/10 hover:border-teal-brand/40 rounded-2xl p-5 flex flex-col justify-between gap-4 transition cursor-pointer shadow-xl"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Orbit size={20} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Satellite Orbit Explorer</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Master Kepler's laws. Compare LEO (400 km), MEO (20,200 km), and GEO (35,786 km). Calculate orbital velocity and periods.
              </p>
            </div>
            <span className="text-[10px] font-mono text-teal-brand uppercase font-bold flex items-center gap-1">
              <span>EXPLORE ORBITS</span>
              <ChevronRight size={12} />
            </span>
          </div>

        </div>

      </section>

      {/* ----------------- 5. EDUCATOR MODE TEASER (CRITICAL FOR INTERVIEW) ----------------- */}
      <section className="w-full max-w-7xl mx-auto px-4">
        <div className="bg-neutral-950 border border-teal-brand/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest font-bold">
              <GraduationCap size={16} />
              <span>STEM & AEROSPACE EDUCATOR CURRICULUM</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight">
              Teach. Demonstrate. Inspire.
            </h2>

            <p className="text-zinc-300 text-sm font-sans leading-relaxed">
              Designed specifically to demonstrate pedagogical mastery in an Aerospace Educator interview. Contains 6 structured, hands-on classroom STEM activities—complete with required materials, step-by-step teacher tips, physics formulas, real spaceflight connections, student discussion prompts, and safety guidelines.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "1. Balloon Rocket (Newton's 3rd Law)",
                "2. Aerodynamic Paper Rocket",
                "3. Spacecraft Electrical Circuit",
                "4. Satellite Communication & Delay",
                "5. Intro to Space Robotics",
                "6. Rocker-Bogie Rover Suspension"
              ].map((act, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs font-mono text-zinc-300">
                  {act}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate("educator")}
                className="px-6 py-3 rounded-full bg-teal-brand hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-xl shadow-teal-brand/20 flex items-center gap-2"
              >
                <span>EXPLORE EDUCATOR ACTIVITIES</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Pedagogy Pillar Badge */}
          <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-3 font-mono text-xs shrink-0">
            <div className="flex items-center gap-2 text-teal-brand font-bold border-b border-white/10 pb-2">
              <Award size={16} />
              <span>EDUCATOR COMPETENCIES</span>
            </div>
            <ul className="space-y-2 text-zinc-300 text-[11px] font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Simplifies complex astrophysics for students aged 10–16</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Hands-on experiments using low-cost safe classroom items</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Directly links theory to ISRO and global space missions</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

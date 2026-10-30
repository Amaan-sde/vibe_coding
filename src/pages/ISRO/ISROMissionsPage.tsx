import React, { useState } from "react";
import { 
  Rocket, 
  Orbit, 
  Globe, 
  Activity, 
  Sparkles, 
  Compass, 
  Cpu, 
  CheckCircle2, 
  Atom, 
  Sun, 
  ChevronRight, 
  Calendar, 
  Award,
  Layers,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ISRO_MISSIONS, ISROMission, MissionStage } from "../../data/isroMissions";

export const ISROMissionsPage: React.FC = () => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>("chandrayaan-3");
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"timeline" | "modules" | "science" | "l1-visualizer">("timeline");

  const currentMission: ISROMission = ISRO_MISSIONS.find(m => m.id === selectedMissionId) || ISRO_MISSIONS[0];
  const currentStage: MissionStage = currentMission.timeline.find(s => s.id === activeStageId) || currentMission.timeline[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 text-white">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest">
          <Rocket size={14} />
          <span>ISRO MISSION EXPLORER // INDIGENOUS DEEP-SPACE PIONEERS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
          India's Journey Beyond Earth
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          From launching sounding rockets from a fishing village church in Thumba to conquering the Lunar South Pole and stationing observatories at Lagrange Point L1. Explore India's most historic scientific triumphs.
        </p>
      </div>

      {/* Mission Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ISRO_MISSIONS.map((mission) => {
          const isSelected = selectedMissionId === mission.id;
          return (
            <button
              key={mission.id}
              onClick={() => {
                setSelectedMissionId(mission.id);
                setActiveStageId(1);
                setActiveTab(mission.id === "aditya-l1" ? "l1-visualizer" : "timeline");
              }}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between gap-4 transition-all cursor-pointer ${
                isSelected
                  ? "bg-teal-brand/10 border-teal-brand shadow-xl shadow-teal-brand/10 scale-[1.02]"
                  : "bg-neutral-950/80 border-white/10 hover:border-zinc-700 hover:bg-neutral-900/60"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-brand font-bold">
                  {mission.status}
                </span>
                <span className="text-xs font-mono text-zinc-500">{mission.launchDate.split(",")[0]}</span>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-white">{mission.name}</h3>
                <p className="text-xs text-zinc-400 font-sans mt-1 line-clamp-2">
                  {mission.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-400">
                <span>Vehicle: <strong className="text-white">{mission.launchVehicle.split("(")[0]}</strong></span>
                <ChevronRight size={14} className={isSelected ? "text-teal-brand" : "text-zinc-600"} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Mission Overview Hero Card */}
      <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-brand/20 border border-teal-brand/40 text-teal-brand text-xs font-mono font-bold uppercase">
                {currentMission.name}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono">
                {currentMission.orbitDestination}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                Cost: {currentMission.missionCost}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight">
              {currentMission.heroSummary}
            </h2>

            <p className="text-zinc-300 text-sm leading-relaxed font-sans">
              {currentMission.overview}
            </p>

            {/* Quick Milestones Checklist */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-brand font-bold block">
                Historical Milestones Achieved:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-zinc-300">
                {currentMission.keyMilestones.slice(0, 4).map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-teal-brand shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Launch Vehicle Specification Card */}
          <div className="lg:col-span-4 bg-black/60 border border-white/10 rounded-xl p-5 flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-teal-brand border-b border-white/10 pb-2">
              <Rocket size={16} />
              <span className="font-bold uppercase tracking-wider">LAUNCH VEHICLE TELEMETRY</span>
            </div>

            <div className="space-y-2 text-zinc-300">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Vehicle</span>
                <span className="text-white font-bold text-sm">{currentMission.vehicleDetails.name}</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Stage Stacking</span>
                <span className="text-xs font-sans text-zinc-300">{currentMission.vehicleDetails.stages}</span>
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block">Payload Capacity</span>
                <span className="text-teal-brand font-bold">{currentMission.vehicleDetails.liftCapacity}</span>
              </div>
              <div className="pt-2 border-t border-white/5 font-sans text-[11px] text-zinc-400">
                {currentMission.vehicleDetails.significance}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
            activeTab === "timeline" ? "bg-teal-brand text-black font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          {currentMission.id === "chandrayaan-3" ? "9-Stage Lunar Timeline" : "Mission Trajectory Timeline"}
        </button>

        <button
          onClick={() => setActiveTab("modules")}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
            activeTab === "modules" ? "bg-teal-brand text-black font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          Spacecraft Modules & Payloads
        </button>

        {currentMission.id === "aditya-l1" && (
          <button
            onClick={() => setActiveTab("l1-visualizer")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "l1-visualizer" ? "bg-teal-brand text-black font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sparkles size={13} />
            <span>Lagrange Point L1 Simulator</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab("science")}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
            activeTab === "science" ? "bg-teal-brand text-black font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          Discoveries & STEM Notes
        </button>
      </div>

      {/* TAB 1: INTERACTIVE MISSION TIMELINE */}
      {activeTab === "timeline" && (
        <div className="flex flex-col gap-6">
          
          {/* Horizontal Scroller of Stages */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {currentMission.timeline.map((stage) => {
              const isSelected = activeStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`px-3 py-2.5 rounded-xl border text-left shrink-0 font-mono transition-all cursor-pointer ${
                    isSelected
                      ? "bg-teal-brand text-black border-teal-brand shadow-lg shadow-teal-brand/20 font-bold"
                      : "bg-neutral-950/80 text-zinc-400 border-neutral-800 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <span className="text-[9px] block uppercase opacity-80">Stage 0{stage.id}</span>
                  <span className="text-xs whitespace-nowrap">{stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Card Viewport */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl">
            
            <div className="lg:col-span-8 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-teal-brand uppercase tracking-widest mb-1">
                  <span>STAGE 0{currentStage.id} // {currentStage.phase}</span>
                  <span>•</span>
                  <span>{currentStage.date}</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {currentStage.title}
                </h3>

                <p className="text-zinc-300 text-sm font-sans leading-relaxed mt-3">
                  {currentStage.description}
                </p>
              </div>

              {/* Scientific Mechanism Box */}
              <div className="bg-neutral-900/80 border border-teal-brand/30 rounded-xl p-4 space-y-1">
                <span className="text-[10px] font-mono text-teal-brand uppercase tracking-wider font-bold block">
                  Orbital Physics & Engineering Breakdown:
                </span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {currentStage.scientificDetail}
                </p>
              </div>

              {/* Next/Prev Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-xs">
                <button
                  disabled={currentStage.id <= 1}
                  onClick={() => setActiveStageId(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
                >
                  ← PREVIOUS STAGE
                </button>

                <span className="text-zinc-500">
                  {currentStage.id} OF {currentMission.timeline.length}
                </span>

                <button
                  disabled={currentStage.id >= currentMission.timeline.length}
                  onClick={() => setActiveStageId(prev => Math.min(currentMission.timeline.length, prev + 1))}
                  className="px-4 py-2 rounded-lg bg-teal-brand text-black font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition"
                >
                  NEXT STAGE →
                </button>
              </div>
            </div>

            {/* Right Telemetry Snapshot */}
            <div className="lg:col-span-4 bg-black/60 border border-white/10 rounded-xl p-5 flex flex-col justify-between gap-4 font-mono text-xs">
              <div className="space-y-3">
                <span className="text-[10px] text-teal-brand uppercase tracking-widest font-bold block border-b border-white/10 pb-2">
                  FLIGHT PARAMETERS
                </span>

                <div className="bg-neutral-900/60 p-3 rounded-lg border border-white/5">
                  <span className="text-[8px] text-zinc-500 uppercase block">Altitude / Orbit</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{currentStage.altitude}</span>
                </div>

                <div className="bg-neutral-900/60 p-3 rounded-lg border border-white/5">
                  <span className="text-[8px] text-zinc-500 uppercase block">Velocity Telemetry</span>
                  <span className="text-teal-brand font-bold text-sm block mt-0.5">{currentStage.speed}</span>
                </div>

                <div className="bg-neutral-900/60 p-3 rounded-lg border border-white/5">
                  <span className="text-[8px] text-zinc-500 uppercase block">Flight Phase</span>
                  <span className="text-white font-bold text-xs block mt-0.5">{currentStage.phase}</span>
                </div>
              </div>

              {/* Graphical Icon Badge */}
              <div className="text-center py-4 bg-neutral-900/30 rounded-xl border border-dashed border-white/10">
                <Orbit size={32} className="mx-auto text-teal-brand animate-spin" style={{ animationDuration: "25s" }} />
                <span className="text-[9px] text-zinc-500 uppercase block mt-2">TELEMETRY LOCK ACTIVE</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: SPACECRAFT MODULES & INSTRUMENTS */}
      {activeTab === "modules" && (
        <div className="flex flex-col gap-6">
          
          {/* Lander vs Rover Educational Feature Box for Chandrayaan-3 */}
          {currentMission.id === "chandrayaan-3" && (
            <div className="bg-blue-950/30 border border-teal-brand/40 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-wider mb-2 font-bold">
                <HelpCircle size={15} />
                <span>Aerospace Concept: Lander vs Rover — What's the Difference?</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-zinc-300 leading-relaxed">
                <div className="p-3 bg-neutral-900/70 rounded-xl border border-white/5">
                  <strong className="text-white font-mono text-sm block mb-1">VIKRAM (The Lander)</strong>
                  A 1,752 kg stationary spacecraft platform. It uses throttleable rocket engines to slow down from orbital speeds and land softly on four shock-absorbing legs. It acts as the command base station, power generator, and long-distance communications link to Earth and the lunar orbiter.
                </div>
                <div className="p-3 bg-neutral-900/70 rounded-xl border border-white/5">
                  <strong className="text-white font-mono text-sm block mb-1">PRAGYAN (The Rover)</strong>
                  A 26 kg mobile wheeled robotic vehicle housed inside Vikram. After landing, it rolls down a ramp onto the lunar surface using a 6-wheel Rocker-Bogie suspension to drive across craters, zapping rocks with lasers and sensors to analyze soil chemistry.
                </div>
              </div>
            </div>
          )}

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {currentMission.spacecraftModules.map((module, i) => (
              <div 
                key={i} 
                className="bg-neutral-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <h3 className="font-display font-bold text-xl text-white">{module.name}</h3>
                    <span className="font-mono text-[9px] text-teal-brand bg-teal-brand/10 px-2 py-0.5 rounded border border-teal-brand/30 font-bold">
                      {module.mass}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {module.role}
                  </p>

                  <div className="font-mono text-[10px] text-zinc-400 bg-neutral-900/60 p-2.5 rounded-lg border border-white/5">
                    <span>Power Generation: <strong className="text-white">{module.power}</strong></span>
                  </div>

                  {/* Scientific Instruments List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-teal-brand uppercase tracking-wider font-bold block">
                      Scientific Payloads Onboard:
                    </span>
                    <div className="space-y-2">
                      {module.payloads.map((payload, idx) => (
                        <div key={idx} className="bg-neutral-900/40 p-2.5 rounded-xl border border-white/5">
                          <div className="flex items-center gap-1.5 font-mono text-xs">
                            <span className="font-bold text-white text-teal-brand">{payload.acronym}</span>
                            <span className="text-[10px] text-zinc-400 font-sans truncate">({payload.fullName})</span>
                          </div>
                          <p className="text-[11px] text-zinc-300 font-sans mt-1 leading-snug">
                            {payload.scientificPurpose}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: ADITYA-L1 INTERACTIVE LAGRANGE POINT L1 SIMULATOR */}
      {activeTab === "l1-visualizer" && currentMission.id === "aditya-l1" && (
        <div className="flex flex-col gap-6">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-teal-brand uppercase tracking-widest font-bold">
                  INTERACTIVE GRAVITATIONAL SIMULATOR
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  Why Lagrange Point 1 (L1) is the Perfect Solar Perch
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-brand/10 border border-teal-brand text-teal-brand text-xs font-mono font-bold">
                Distance: 1.5 Million KM from Earth
              </span>
            </div>

            {/* Interactive Graphic Representation of Sun-Earth L1 System */}
            <div className="relative w-full h-80 bg-black border border-white/10 rounded-2xl overflow-hidden p-4 flex items-center justify-between">
              
              {/* Sun on Left */}
              <div className="flex flex-col items-center z-10 pl-4 sm:pl-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.5)] flex items-center justify-center text-black font-black font-mono text-sm animate-pulse">
                  SUN
                </div>
                <span className="text-[9px] font-mono text-amber-300 mt-2">150 Million km to Earth</span>
              </div>

              {/* Connecting Gravitational Neutral Axis */}
              <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-white/20 z-0" />

              {/* Lagrange Point 1 (L1) Marker & Halo Orbit */}
              <div className="absolute left-[65%] sm:left-[70%] z-20 flex flex-col items-center">
                {/* Halo Orbit Loop */}
                <div className="w-16 h-28 sm:w-20 sm:h-36 border-2 border-dashed border-teal-brand/70 rounded-full animate-spin" style={{ animationDuration: "12s" }}>
                  {/* Aditya-L1 Satellite Marker on Halo Ring */}
                  <div className="w-4 h-4 rounded-full bg-white border border-teal-brand shadow-[0_0_10px_#38bdf8] -mt-2 mx-auto" />
                </div>
                <div className="bg-black/80 px-2 py-0.5 rounded border border-teal-brand text-[9px] font-mono text-teal-brand font-bold mt-2">
                  ADITYA-L1 @ L1
                </div>
                <span className="text-[8px] font-mono text-zinc-400">Gravitational Balance</span>
              </div>

              {/* Earth on Right */}
              <div className="flex flex-col items-center z-10 pr-4 sm:pr-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center text-white font-bold font-mono text-[10px]">
                  EARTH
                </div>
                <span className="text-[9px] font-mono text-blue-300 mt-2">Observer Base</span>
              </div>

            </div>

            {/* Deep Scientific Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-xs text-zinc-300 font-sans leading-relaxed">
              <div className="space-y-1.5 p-3 bg-neutral-900/60 rounded-xl border border-white/5">
                <strong className="text-white font-mono text-xs uppercase block">1. Gravitational Equilibrium</strong>
                <p>
                  At L1, the inward gravitational pull of the Sun and the backward gravitational pull of Earth precisely cancel out, balancing the centripetal force required for a satellite to orbit the Sun in 365 days alongside Earth.
                </p>
              </div>

              <div className="space-y-1.5 p-3 bg-neutral-900/60 rounded-xl border border-white/5">
                <strong className="text-white font-mono text-xs uppercase block">2. 24/7 Uninterrupted Sun View</strong>
                <p>
                  Satellites in Low Earth Orbit experience night every 45 minutes as they pass behind Earth's shadow. Stationed 1.5 million km toward the Sun at L1, Aditya-L1 never experiences an eclipse or occultation—viewing solar flares 24 hours a day!
                </p>
              </div>

              <div className="space-y-1.5 p-3 bg-neutral-900/60 rounded-xl border border-white/5">
                <strong className="text-white font-mono text-xs uppercase block">3. Early Space Weather Warnings</strong>
                <p>
                  When a massive Coronal Mass Ejection (CME) erupts from the Sun, Aditya-L1 intercepts the plasma cloud 15 to 45 minutes before it strikes Earth's magnetosphere, giving ground power grids time to prepare!
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: SCIENTIFIC DISCOVERIES & EDUCATIONAL NOTES */}
      {activeTab === "science" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Verified Scientific Discoveries */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest font-bold">
              <Atom size={16} />
              <span>Groundbreaking Scientific Discoveries</span>
            </div>

            <h3 className="text-xl font-display font-bold text-white">
              Empirical Findings from {currentMission.name}
            </h3>

            <ul className="space-y-3 text-xs text-zinc-300 font-sans leading-relaxed">
              {currentMission.scientificDiscoveries.map((disc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-neutral-900/50 rounded-xl border border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{disc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Classroom STEM Concepts */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest font-bold">
              <Sparkles size={16} />
              <span>STEM Educator Explanations</span>
            </div>

            <h3 className="text-xl font-display font-bold text-white">
              How to Explain This to School Students
            </h3>

            <div className="space-y-4">
              {currentMission.educationalNotes.map((note, idx) => (
                <div key={idx} className="p-4 bg-neutral-900/70 rounded-xl border border-teal-brand/20 space-y-1.5">
                  <span className="text-[9px] font-mono text-teal-brand uppercase tracking-wider font-bold block">
                    {note.concept}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white">
                    {note.title}
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {note.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};


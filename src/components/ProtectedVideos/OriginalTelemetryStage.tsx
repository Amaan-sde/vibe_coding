// ============================================================================
// PROTECTED COMPONENT BOUNDARY — IMMUTABLE PROJECT ASSET
//
// DO NOT MODIFY THE TWO ORIGINAL VIDEOS OR THEIR ANIMATION LOGIC:
// Video 1: "https://res.cloudinary.com/dtgsgtkh4/video/upload/v1781166119/kling_20260611_%E4%BD%9C%E5%93%81_create_a_s_4062_0_kdjudz.mp4"
// Video 2: "https://res.cloudinary.com/dtgsgtkh4/video/upload/v1781169294/Generate_smooth_loop_video_202606111444_umpopp.mp4"
//
// All video sources, autoPlay, loop, muted, playsInline, scale, aspect ratio,
// overlays, and telemetry logic are preserved EXACTLY as in original WHY SPACE.
// ============================================================================

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  ArrowUpRight, 
  X, 
  Heart, 
  Activity, 
  Cpu, 
  Volume2, 
  VolumeX, 
  Rocket, 
  CheckCircle2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MISSIONS, TRANSLATIONS, MissionInfo } from "../../data";

interface OriginalTelemetryStageProps {
  onNavigateISRO?: () => void;
  onNavigateLab?: () => void;
  onNavigateKnowledge?: () => void;
}

export const OriginalTelemetryStage: React.FC<OriginalTelemetryStageProps> = ({
  onNavigateISRO,
  onNavigateLab,
  onNavigateKnowledge
}) => {
  const [activeTab, setActiveTab] = useState<"01" | "02" | "03">("01");
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCardDetail, setActiveCardDetail] = useState<{
    type: "earth" | "planets" | "meteors" | null;
    title: string;
    tag: string;
    desc: string;
    metrics: string[];
  }>({ type: null, title: "", tag: "", desc: [], metrics: [] });
  
  // Custom dialogs & modals
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [showDiscoverModal, setShowDiscoverModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState<{isOpen: boolean; contentId: string | null}>({
    isOpen: false,
    contentId: null
  });
  const [launchStep, setLaunchStep] = useState(0);
  const [searchResultToast, setSearchResultToast] = useState<string | null>(null);

  // Audio references for cockpit synth rumble
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const visualizerTimerRef = useRef<number | null>(null);
  const [audioBars, setAudioBars] = useState<number[]>([15, 25, 10, 40, 20, 30, 15]);

  // Dynamic heart rate for astronaut badge
  const [heartRate, setHeartRate] = useState(72);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 60 ? 60 : next > 95 ? 95 : next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Simulating live telemetry coordinates for HUD grid
  const [coordinates, setCoordinates] = useState({ lat: "28.5721° N", lng: "80.6480° W", altitude: "408.2 KM" });
  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates((prev) => {
        const latVal = parseFloat(prev.lat) + (Math.random() * 0.001 - 0.0005);
        const lngVal = parseFloat(prev.lng) + (Math.random() * 0.001 - 0.0005);
        const altVal = parseFloat(prev.altitude) + (Math.random() * 0.2 - 0.1);
        return {
          lat: `${latVal.toFixed(4)}° N`,
          lng: `${lngVal.toFixed(4)}° W`,
          altitude: `${altVal.toFixed(1)} KM`
        };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio synth synthesizer for spacecraft ambient cockpit rumble
  const toggleAmbientSynth = () => {
    if (isPlaying) {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
      setIsPlaying(false);
      if (visualizerTimerRef.current) {
        window.clearInterval(visualizerTimerRef.current);
        visualizerTimerRef.current = null;
      }
      setAudioBars([15, 25, 10, 40, 20, 30, 15]);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = "sawtooth";
        osc2.frequency.setValueAtTime(55.4, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);

        osc1.connect(gainNode);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainNodeRef.current = gainNode;
        setIsPlaying(true);

        visualizerTimerRef.current = window.setInterval(() => {
          setAudioBars(Array.from({ length: 7 }, () => Math.floor(Math.random() * 35) + 5));
        }, 120);

      } catch (err) {
        console.error("Synthesizer could not boot:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (osc1Ref.current) osc1Ref.current.disconnect();
      if (osc2Ref.current) osc2Ref.current.disconnect();
      if (gainNodeRef.current) gainNodeRef.current.disconnect();
      if (visualizerTimerRef.current) window.clearInterval(visualizerTimerRef.current);
    };
  }, []);

  const activeMission: MissionInfo = MISSIONS[activeTab] || MISSIONS["01"];
  const t = TRANSLATIONS[language];

  const handleLaunchStepNext = () => {
    if (launchStep < 3) {
      setLaunchStep(prev => prev + 1);
    } else {
      setShowLaunchModal(false);
      setLaunchStep(0);
      setSearchResultToast("Voyage Reserved! Ticket credentials transmitted to your secure Moyorh terminal.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-white" id="original-telemetry-protected-container">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {searchResultToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#16212b]/95 border border-teal-brand/50 text-white rounded-lg px-6 py-4 shadow-2xl shadow-teal-brand/10 max-w-md backdrop-blur-md flex items-center gap-3 font-mono text-xs"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-teal-brand animate-ping" />
            <p>{searchResultToast}</p>
            <button onClick={() => setSearchResultToast(null)} className="ml-auto hover:text-teal-brand pointer-events-auto">
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub-Header Orbit Bar & Cockpit Synth Control */}
      <div className="w-full border-b border-white/5 pb-2">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-teal-brand font-bold">TELEMETRY SYSTEM:</span> 
            <span className="text-white">ONLINE</span>
            <span className="text-zinc-700">|</span>
            <span>ALTITUDE: <span className="text-white font-bold">{coordinates.altitude}</span></span>
            <span className="text-zinc-700">|</span>
            <span>COORDS: <span className="text-white">{coordinates.lat}, {coordinates.lng}</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Audio synth switch button */}
            <button
              onClick={toggleAmbientSynth}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono transition-all ${
                isPlaying 
                  ? "bg-teal-brand/20 border-teal-brand text-teal-brand" 
                  : "bg-neutral-900 border-neutral-800 text-zinc-400 hover:text-white"
              }`}
              title="Toggle Spacecraft Cockpit Engine Audio"
            >
              {isPlaying ? <Volume2 size={12} className="animate-pulse" /> : <VolumeX size={12} />}
              <span>{isPlaying ? "COCKPIT AUDIO ON" : "AUDIO MUTED"}</span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 ml-1">
                  {audioBars.map((height, i) => (
                    <span 
                      key={i} 
                      className="w-0.5 bg-teal-brand rounded-full transition-all duration-100" 
                      style={{ height: `${Math.min(height, 12)}px` }} 
                    />
                  ))}
                </div>
              )}
            </button>

            {/* Language toggle */}
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
              <button 
                onClick={() => setLanguage("EN")} 
                className={`transition ${language === "EN" ? "text-teal-brand font-bold" : "hover:text-white"}`}
              >
                EN
              </button>
              <span>|</span>
              <button 
                onClick={() => setLanguage("FR")} 
                className={`transition ${language === "FR" ? "text-teal-brand font-bold" : "hover:text-white"}`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- CENTRAL STAGE SECTION (VIDEO 1 IMMUTABLE BOUNDARY) ----------------- */}
      <section 
        id="orbital-hud-sandbox"
        className="relative w-full h-[280px] sm:h-[400px] lg:h-[460px] bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-6 transition-all duration-500 shadow-2xl"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgb(15, 23, 30) 0%, rgb(0,0,0) 100%)"
        }}
      >
        {/* ==================================================================== */}
        {/* VIDEO 1 — PROTECTED, ORIGINAL CLOUDINARY ASSET. DO NOT ALTER! */}
        {/* ==================================================================== */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.2] origin-center pointer-events-none z-0 opacity-80"
          src="https://res.cloudinary.com/dtgsgtkh4/video/upload/v1781166119/kling_20260611_%E4%BD%9C%E5%93%81_create_a_s_4062_0_kdjudz.mp4"
        />

        {/* Subtle Vector grid over background (stark structural elements) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <div className="w-full h-full" style={{ 
            backgroundImage: "linear-gradient(to right, rgb(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255,255,255,0.05) 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }} />
          
          {/* Center concentric vector circle orbits to signify coordinate tracking */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-brand/10 w-96 h-96 animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/5 w-[500px] h-[500px] animate-[spin_180s_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-brand/5 w-[650px] h-[650px] animate-[spin_120s_reverse_infinite]" />

          {/* Glowing vector anchor dots */}
          <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-teal-brand/40" />
          <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-teal-brand/40" />
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Core UI text overlays and floating cards inside the HUD bounds */}
        <div className="absolute top-4 left-4 sm:left-6 z-10 font-mono text-[9px] text-zinc-500 flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse" />
          <span>MISSION ID: VOYAGE_RGL_{activeMission.number}</span>
          <span>|</span>
          <span className="hidden sm:inline">VESSEL SPEC: {activeMission.stats.vessel}</span>
        </div>

        <div className="absolute top-4 right-4 sm:right-6 z-10 font-mono text-[9px] text-zinc-500 flex items-center gap-2">
          <span>GRID MATRIX RESOLUTION: CALIBRATED</span>
        </div>

        {/* Left vertical floaters: 01, 02, 03 capsules exactly like original wireframe */}
        <div className="z-10 flex flex-col justify-center h-full gap-2 sm:gap-4 max-w-fit" id="mission-step-indicators">
          {(["01", "02", "03"] as const).map((step) => (
            <button
              key={step}
              id={`indicator-${step}`}
              onClick={() => {
                setActiveTab(step);
                setActiveCardDetail({ type: null, title: "", tag: "", desc: "", metrics: [] });
              }}
              className={`relative px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold rounded-md sm:rounded-lg transition-all duration-300 w-9 h-11 sm:w-12 sm:h-14 flex items-center justify-center border ${
                activeTab === step
                  ? "bg-teal-brand text-black border-teal-brand shadow-lg shadow-teal-brand/20 scale-105"
                  : "bg-neutral-900/80 text-zinc-400 border-neutral-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              <span>{step}</span>
              {activeTab === step && (
                <motion.div 
                  layoutId="activeIndicatorDot"
                  className="absolute -right-1 w-2 h-2 rounded-full bg-teal-brand"
                  style={{ right: "-4px" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Floating Structural Cards - Only visible inside HUD on desktop (lg) screens */}
        <div className="hidden lg:flex absolute right-6 bottom-6 z-10 flex-col sm:flex-row gap-4 max-w-[500px] w-full" id="hud-right-floater-cards">
          
          {/* CARD 1: Astronauts Tracker Badge */}
          <motion.div 
            id="astronauts-telemetry-badge"
            whileHover={{ scale: 1.02 }}
            className="bg-transparent border border-white/10 rounded-2xl p-3.5 shadow-xl flex flex-col gap-2.5 relative flex-1"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Activity size={13} className="text-teal-brand animate-pulse" />
                <span className="font-mono text-[10px] font-semibold text-zinc-400 uppercase tracking-widest leading-none">{t.crew}</span>
              </div>
              <div className="px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 font-mono text-[7px] font-bold">
                TELEMETRY
              </div>
            </div>

            {/* Dynamic Astronaut profiles rotating inside the widget based on active mission */}
            <div className="space-y-2.5">
              {activeMission.astronauts.slice(0, 2).map((member, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] font-mono font-bold text-white uppercase">
                      {member.avatarInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-200 text-[10px] leading-tight font-display">{member.name}</span>
                      <span className="text-[8px] text-zinc-500 font-mono">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono text-zinc-400">
              <div className="flex items-center gap-1">
                <Heart size={10} className="text-rose-500 fill-rose-500 animate-ping" />
                <span>CRUM_BPM: <strong className="text-white">{heartRate}</strong></span>
              </div>
              <span className="text-green-500">LIFE_S_OK</span>
            </div>
          </motion.div>

          {/* CARD 2: Universal Stars Indicator */}
          <motion.div 
            id="stars-telemetry-badge"
            whileHover={{ scale: 1.02 }}
            className="bg-transparent border border-white/10 rounded-2xl p-3.5 shadow-xl flex flex-col gap-1.5 flex-1"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 tracking-wider">
              <span className="flex items-center gap-1.5 uppercase font-semibold text-white">
                <Sparkles size={11} className="text-white" />
                {t.stars}
              </span>
              <span className="text-teal-brand font-bold text-[8px] font-mono">SEC_9X</span>
            </div>

            <div className="space-y-1 mt-1 text-xs font-mono">
              <div className="flex justify-between text-zinc-400 text-[10px]">
                <span>MAPPED SECTORS:</span>
                <span className="text-white font-bold">14,204</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-[10px]">
                <span>CO-CHART SPEED:</span>
                <span className="text-white font-bold">Warp 3.4</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-[10px]">
                <span>RADIAL INDEX:</span>
                <span className="text-white font-bold">98.2%</span>
              </div>
            </div>
            
            <div className="border-t border-white/5 pt-1 mt-1">
              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div className="bg-teal-brand h-full rounded-full transition-all duration-1000" style={{ width: activeTab === "01" ? "42%" : activeTab === "02" ? "79%" : "91%" }} />
              </div>
              <div className="flex justify-between text-[7px] font-mono text-zinc-500 mt-1 uppercase">
                <span>SENSORS STABLE</span>
                <span>SYNC OK</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* LOWER-MIDDLE ROTATING CALL TO ACTION BAR */}
        <div className="absolute bottom-[-12px] sm:bottom-[-16px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <button 
            id="center-flight-launch-btn"
            onClick={() => setShowLaunchModal(true)}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-brand text-black hover:bg-white flex items-center justify-center transition-all duration-300 relative group shadow-2xl shadow-teal-brand/20 border-[3px] sm:border-4 border-black cursor-pointer"
            title="Initiate Launch Protocol Alignment"
          >
            {/* Rotating outer curved badge with custom text along path SVG */}
            <div className="absolute inset-0 -m-8 sm:-m-10 pointer-events-none">
              <svg className="w-28 h-28 sm:w-36 sm:h-36 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text className="font-mono text-[6.2px] uppercase tracking-[0.22em] fill-teal-brand font-bold">
                  <textPath href="#circlePath" startOffset="0%">
                    • {t.ready} • {t.ready}
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Diagonal up arrow inside */}
            <ArrowUpRight size={18} strokeWidth={2.5} className="sm:hidden group-hover:rotate-45 transition-transform duration-300" />
            <ArrowUpRight size={24} strokeWidth={2.5} className="hidden sm:flex group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>

      </section>

      {/* Responsive Telemetry Badges - Visible on mobile/tablet, hidden on desktop (lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mt-2" id="mobile-viewport-telemetry-badges">
        {/* CARD 1: Mobile Astronauts Tracker Badge */}
        <motion.div 
          id="mobile-astronauts-telemetry-badge"
          whileHover={{ scale: 1.01 }}
          className="bg-neutral-950/80 border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col gap-3 relative"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5">
              <Activity size={13} className="text-teal-brand animate-pulse" />
              <span className="font-mono text-[10px] font-semibold text-zinc-400 uppercase tracking-widest leading-none">{t.crew}</span>
            </div>
            <div className="px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 font-mono text-[7px] font-bold">
              TELEMETRY
            </div>
          </div>

          <div className="space-y-2.5">
            {activeMission.astronauts.slice(0, 2).map((member, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] font-mono font-bold text-white uppercase">
                    {member.avatarInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-200 text-[10px] leading-tight font-display">{member.name}</span>
                    <span className="text-[8px] text-zinc-500 font-mono">{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[9px] font-mono text-zinc-400">
            <div className="flex items-center gap-1">
              <Heart size={10} className="text-rose-500 fill-rose-500 animate-ping" />
              <span>CRUM_BPM: <strong className="text-white">{heartRate}</strong></span>
            </div>
            <span className="text-green-500">LIFE_S_OK</span>
          </div>
        </motion.div>

        {/* CARD 2: Mobile Universal Stars Indicator */}
        <motion.div 
          id="mobile-stars-telemetry-badge"
          whileHover={{ scale: 1.01 }}
          className="bg-neutral-950/80 border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col gap-2"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 tracking-wider">
            <span className="flex items-center gap-1.5 uppercase font-semibold text-white">
              <Sparkles size={11} className="text-white" />
              {t.stars}
            </span>
            <span className="text-teal-brand font-bold text-[8px] font-mono">SEC_9X</span>
          </div>

          <div className="space-y-1 mt-1 text-xs font-mono">
            <div className="flex justify-between text-zinc-400 text-[10px]">
              <span>MAPPED SECTORS:</span>
              <span className="text-white font-bold">14,204</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-[10px]">
              <span>CO-CHART SPEED:</span>
              <span className="text-white font-bold">Warp 3.4</span>
            </div>
            <div className="flex justify-between text-zinc-400 text-[10px]">
              <span>RADIAL INDEX:</span>
              <span className="text-white font-bold">98.2%</span>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-1.5 mt-1">
            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-teal-brand h-full rounded-full transition-all duration-1000" style={{ width: activeTab === "01" ? "42%" : activeTab === "02" ? "79%" : "91%" }} />
            </div>
            <div className="flex justify-between text-[7px] font-mono text-zinc-500 mt-1 uppercase">
              <span>SENSORS STABLE</span>
              <span>SYNC OK</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ----------------- LOWER INFORMATION & NAVIGATION FOOTER GRID ----------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2 mb-4" id="footer-details-grid">
        
        {/* COLUMN LEFT (Span 5 of 12) - Primary Headings */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6" id="footer-left-content">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-teal-brand font-semibold">
              {activeMission.title}
            </span>
            
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">
              {activeMission.headline}
            </h2>
            
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              {activeMission.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              id="btn-discover"
              onClick={() => setShowDiscoverModal(true)}
              className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-teal-brand hover:text-white px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-300 transition-all cursor-pointer active:scale-95"
            >
              <span>{t.discover}</span>
              <ArrowUpRight size={14} className="text-teal-brand" />
            </button>
          </div>
        </div>

        {/* COLUMN MIDDLE (Span 3 of 12) - Astronauts & Planet Pills */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-6" id="footer-middle-content">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase text-zinc-500 tracking-wider block">
              {t.astronauts}
            </span>
            <div className="flex items-center gap-0 mt-1" id="avatar-container">
              {activeMission.astronauts.map((astro, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-neutral-900 border-2 border-black flex items-center justify-center text-xs font-mono font-bold text-zinc-200 -ml-2 first:ml-0 shadow-lg hover:z-10 hover:scale-110 transition-transform"
                  title={`${astro.name} — ${astro.role}`}
                >
                  {astro.avatarInitials}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-teal-brand/10 border-2 border-black flex items-center justify-center text-xs font-mono font-bold text-teal-brand -ml-2">
                +{activeMission.astronauts.length > 3 ? activeMission.astronauts.length - 3 : 2}
              </div>
            </div>
          </div>

          {/* Planet Pills (Earth, Planets, Meteors) */}
          <div className="grid grid-cols-3 gap-2" id="destination-pill-tabs">
            {(["earth", "planets", "meteors"] as const).map((key) => {
              const data = activeMission.solarSystem[key];
              const isSelected = activeCardDetail.type === key;
              return (
                <button
                  key={key}
                  id={`btn-tab-${key}`}
                  onClick={() => {
                    if (isSelected) {
                      setActiveCardDetail({ type: null, title: "", tag: "", desc: "", metrics: [] });
                    } else {
                      setActiveCardDetail({
                        type: key,
                        title: data.name,
                        tag: data.tag,
                        desc: data.desc,
                        metrics: data.metrics
                      });
                    }
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-teal-brand/10 border-teal-brand shadow-lg shadow-teal-brand/10" 
                      : "bg-neutral-900/60 border-neutral-800 hover:border-zinc-700"
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-teal-brand font-semibold">
                    {key.toUpperCase()}
                  </span>
                  <span className="font-display font-bold text-xs text-white truncate mt-1">
                    {data.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUMN RIGHT (Span 4 of 12) - NASA & Forbes Cards */}
        <div className="lg:col-span-4 flex flex-col gap-4" id="footer-right-content">
          {/* Card 1: NASA Info */}
          <div 
            id="card-nasa-info"
            className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5 flex flex-col justify-between gap-3 relative overflow-hidden"
          >
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-teal-brand uppercase tracking-widest font-bold">AGENCY CERTIFICATE</span>
              <p className="text-xs text-zinc-300 font-sans">
                Official telemetry confirms orbital pathways comply with deep space safety protocols.
              </p>
            </div>
            <button 
              id="btn-more-info-1"
              onClick={() => setShowMoreModal({ isOpen: true, contentId: "nasa-intel" })}
              className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 self-start transition cursor-pointer"
            >
              <span>VIEW REGULATORY SPECS</span>
              <ArrowUpRight size={12} className="text-teal-brand" />
            </button>
          </div>

          {/* Card 2: Space Economy */}
          <div 
            id="card-forbes-info"
            className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5 flex flex-col justify-between gap-3 relative overflow-hidden"
          >
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-teal-brand uppercase tracking-widest font-bold">ECONOMIC PROJECTIONS</span>
              <p className="text-xs text-zinc-300 font-sans">
                Space infrastructure investments are unlocking multi-trillion dollar clean manufacturing in orbit.
              </p>
            </div>
            <button 
              id="btn-more-info-2"
              onClick={() => setShowMoreModal({ isOpen: true, contentId: "forbes-intel" })}
              className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 self-start transition cursor-pointer"
            >
              <span>ACCESS VALUATION INDEX</span>
              <ArrowUpRight size={12} className="text-teal-brand" />
            </button>
          </div>
        </div>

      </section>

      {/* Dynamic planetary sub-info accordion when key cards are highlighted */}
      <AnimatePresence>
        {activeCardDetail.type && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-teal-brand/35 bg-neutral-950/80 rounded-2xl p-5 mb-4 z-10 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <span className="font-mono text-[9px] text-teal-brand uppercase tracking-widest">ORBIT SUB-TARGET SPECIFICATIONS</span>
                <h3 className="font-display font-bold text-xl text-white">{activeCardDetail.title} — {activeCardDetail.tag}</h3>
              </div>
              <button 
                onClick={() => setActiveCardDetail({ type: null, title: "", tag: "", desc: "", metrics: [] })}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 hover:text-teal-brand flex items-center justify-center text-zinc-400 self-end md:self-start cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
              <div className="md:col-span-2">
                <p className="text-zinc-300 leading-relaxed text-sm font-sans">
                  {activeCardDetail.desc}
                </p>
              </div>
              <div className="bg-neutral-900/50 p-4 rounded-xl border border-white/5 font-mono">
                <span className="text-[9px] text-zinc-500 block uppercase mb-2">TELEMETRY STATS</span>
                <ul className="space-y-1 text-zinc-300 text-[11px]">
                  {activeCardDetail.metrics.map((m, i) => (
                    <li key={i} className="flex justify-between">
                      <span className="text-zinc-500">M_{i+1}:</span>
                      <span className="text-white font-bold">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- SECOND SECTION: ASTEROID PROXIMITY TRACKING STATION (VIDEO 2 IMMUTABLE BOUNDARY) ----------------- */}
      <section className="w-full mt-4 mb-4" id="meteor-proximity-tracker-section">
        <div className="w-full bg-black border border-white/10 rounded-3xl py-7 px-6 lg:px-8 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl" id="meteor-black-terminal-card">
          
          {/* ==================================================================== */}
          {/* VIDEO 2 — PROTECTED, ORIGINAL CLOUDINARY ASSET. DO NOT ALTER! */}
          {/* ==================================================================== */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            src="https://res.cloudinary.com/dtgsgtkh4/video/upload/v1781169294/Generate_smooth_loop_video_202606111444_umpopp.mp4"
          />

          {/* Core telemetry details */}
          <div className="space-y-5 max-w-2xl mt-2 relative z-10">
            <div className="space-y-1">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-white font-extrabold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse" />
                METEOR DETECTION MATRIX
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
                HYPER-BURN ASTEROID TRAJECTORY OBSERVATION
              </h2>
            </div>

            <p className="text-white opacity-90 text-sm leading-relaxed max-w-xl font-sans">
              An active hypervelocity bolide has entered low planetary atmosphere over Sector 9X. 
              Continuous plasma friction generates extremely high-purity rare mineral compounds 
              along its thermofusion track, creating premium prospecting opportunities in real time.
            </p>

            {/* Highly compact stats list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="border-l border-white/30 pl-3">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Mass Index</span>
                <span className="text-white font-black text-sm font-display">4.8 Mt</span>
              </div>
              <div className="border-l border-white/30 pl-3">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Entry Velocity</span>
                <span className="text-white font-black text-sm font-display">72.4 km/s</span>
              </div>
              <div className="border-l border-white/30 pl-3">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Yield Confidence</span>
                <span className="text-white font-black text-sm font-display">99.4%</span>
              </div>
              <div className="border-l border-white/30 pl-3">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Target Node</span>
                <span className="text-white font-black text-sm font-display">Sec 9X Bolide</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-8 relative z-10">
            <button
              id="btn-visit-meteor-site"
              onClick={() => {
                setSearchResultToast("Aetherius Database Synchronized. Connecting you to asteroid coordinates...");
                setShowDiscoverModal(true);
              }}
              className="flex items-center gap-2.5 bg-neutral-900/95 border border-neutral-800 rounded-full px-5 py-2.5 text-xs text-white hover:bg-neutral-800 hover:border-neutral-700 transition cursor-pointer active:scale-95 font-sans"
            >
              <ArrowUpRight size={14} className="text-white animate-[pulse_10s_ease-in-out_infinite]" />
              <span className="font-semibold tracking-wider">Visit site</span>
            </button>

            <button
              id="btn-terminal-perspective"
              onClick={() => {
                setSearchResultToast("Display calibrated. HUD vectors optimized.");
              }}
              className="w-10 h-10 rounded-full bg-neutral-900/95 border border-neutral-800 hover:border-neutral-500 hover:text-white text-white flex items-center justify-center transition cursor-pointer active:scale-95"
              title="Recalibrate Perspective View"
            >
              <Sparkles size={14} className="text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* ----------------- DIALOG OVERLAYS & MODALS ----------------- */}

      {/* 1. Launch Protocol Modal ("Get ready with us") */}
      <AnimatePresence>
        {showLaunchModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0e11] border border-teal-brand/40 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative font-mono text-xs max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => { setShowLaunchModal(false); setLaunchStep(0); }}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="mb-4 border-b border-white/5 pb-2">
                <span className="text-teal-brand font-bold uppercase tracking-widest text-[9px]">STEP_GUIDE 0{launchStep + 1} // RESERVATION ENGINE</span>
                <h2 className="font-display font-bold text-lg text-white mt-1 uppercase">ORBITAL FLIGHT ALIGNMENT</h2>
              </div>

              {launchStep === 0 && (
                <div className="space-y-3">
                  <p className="text-zinc-300 font-sans text-sm">
                    Initiating standard passenger licensing sequence. Secure sub-orbit travel requires health diagnostic checkouts and zero-gravity clearance.
                  </p>
                  <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">SELECTED ORBIT:</span>
                      <span className="text-white font-bold">{activeMission.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">EST_DEPARTURE:</span>
                      <span className="text-teal-brand text-right text-white">AUGUST 14, 2026 // KENNEDY DOCK-3</span>
                    </div>
                  </div>
                </div>
              )}

              {launchStep === 1 && (
                <div className="space-y-3">
                  <p className="text-zinc-300 font-sans text-sm">
                    Input your space agency clearance certificate credentials. Non-licensed astronauts will undergo emergency 3-day centrifuge preparation.
                  </p>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-400 uppercase">ASTRONAUT PORT_ID CODE</label>
                    <input 
                      type="text" 
                      defaultValue="COSMOS-MOYORH-987X-L" 
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white font-bold tracking-widest uppercase focus:outline-none focus:border-teal-brand"
                    />
                  </div>
                </div>
              )}

              {launchStep === 2 && (
                <div className="space-y-3">
                  <p className="text-zinc-300 font-sans text-sm">
                    Select your custom cabin category and atmospheric weight bounds. Note: pressurized cargo limits are tight.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                    <div className="p-3 bg-teal-brand/10 border border-teal-brand text-teal-brand rounded-lg cursor-pointer">
                      <Cpu size={14} className="mx-auto mb-1" />
                      <span>COSMIC COCKPIT (1.0G)</span>
                    </div>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 text-zinc-400 hover:border-zinc-700 hover:text-white rounded-lg cursor-pointer">
                      <Rocket size={14} className="mx-auto mb-1" />
                      <span>ZEROG SLEEPER SUITE</span>
                    </div>
                  </div>
                </div>
              )}

              {launchStep === 3 && (
                <div className="space-y-3 text-center py-4">
                  <CheckCircle2 size={38} className="text-teal-brand mx-auto animate-bounce" />
                  <h3 className="font-bold text-white uppercase text-base">PROTOCOL MATCH VERIFIED</h3>
                  <p className="text-zinc-400 text-xs font-sans">
                    Vessel routing is optimized. Passenger Moyorh Vance registration is fully processed for flight <strong className="text-white">{activeMission.stats.vessel}</strong>.
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3 border-t border-white/5 pt-4">
                <button 
                  onClick={() => { setShowLaunchModal(false); setLaunchStep(0); }}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white rounded uppercase text-[10px] tracking-wider cursor-pointer"
                >
                  ABORT
                </button>
                <button 
                  onClick={handleLaunchStepNext}
                  className="px-6 py-2 bg-teal-brand hover:bg-white text-black font-bold rounded uppercase text-[10px] tracking-wider cursor-pointer"
                >
                  {launchStep === 3 ? "TRANSMIT RECEIPT" : "NEXT PHASE"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Discover Overlay Modal */}
      <AnimatePresence>
        {showDiscoverModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 border border-white/10 max-w-2xl w-full rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowDiscoverModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="border-b border-white/10 pb-3 mb-4">
                <span className="font-mono text-[9px] text-[#3A8E94] uppercase tracking-widest">COSMOS DISCOVERY ENCYCLOPEDIA</span>
                <h2 className="font-display font-bold text-2xl text-white mt-1">{activeMission.title}</h2>
              </div>

              <div className="space-y-4 text-sm text-zinc-300 font-sans leading-relaxed max-h-[380px] overflow-y-auto pr-2">
                <p>
                  You are viewing active celestial pathways mapped directly inside our structural system dashboard. The design provides zero visual fluff, strictly outputting dynamic mathematical alignment for spacecraft crews, flight instructors, and tourist reservations.
                </p>
                
                <h4 className="font-display font-semibold text-white mt-4 uppercase text-xs tracking-wider font-mono text-teal-brand">1. Target Fleet Alignment</h4>
                <p>
                  Every mission flight coordinates directly with heavy interplanetary rocket boosters like the <strong className="text-white">{activeMission.stats.vessel}</strong>. These ships utilize continuous thermofusion engines to yield stellar travel benchmarks.
                </p>

                <h4 className="font-display font-semibold text-white mt-4 uppercase text-xs tracking-wider font-mono text-teal-brand">2. Crew Allocations</h4>
                <p>
                  We catalog over <strong className="text-white">{activeMission.stats.crewCount}</strong> individuals active across this mission cohort. These cataloged entities include registered crew pilots, maintenance robots, and civilian tourists traversing the void.
                </p>

                <h4 className="font-display font-semibold text-white mt-4 uppercase text-xs tracking-wider font-mono text-teal-brand">3. Life Support Parameters</h4>
                <p>
                  Atmospheric parameters fluctuate between extremely volatile bands, from frozen subzero dark surfaces to stellar-facing solar wind hazards. All registered tourists must remain locked in electromagnetic protective shields while exploring these sectors.
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>INTEL STATUS: DISTRIBUTED</span>
                <button 
                  onClick={() => setShowDiscoverModal(false)}
                  className="bg-white hover:bg-teal-brand text-black font-extrabold px-6 py-2 rounded-full uppercase cursor-pointer"
                >
                  LOG_OUT_INFO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. More Info Modal (for NASA and Forbes stats cards) */}
      <AnimatePresence>
        {showMoreModal.isOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0e11] border border-white/15 max-w-md w-full rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowMoreModal({ isOpen: false, contentId: null })}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="border-b border-white/5 pb-2 mb-4">
                <span className="font-mono text-[9px] text-[#3A8E94] uppercase tracking-widest">DETAILED MISSION LOGS EXCERPT</span>
                <h3 className="font-display font-bold text-base text-white mt-1 uppercase">
                  {showMoreModal.contentId?.startsWith("nasa-") ? "FEDERAL HOVER RECOGNITION" : "FISCAL SPACE OUTCOMES"}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-400 font-sans leading-relaxed">
                {showMoreModal.contentId?.startsWith("nasa-") ? (
                  <>
                    <p>
                      Official telemetry confirms that space programs have drastically lowered gravity launch friction, opening lunar and planetary orbits to private commercial enterprises safely.
                    </p>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px] space-y-1">
                      <div className="flex justify-between text-zinc-500">
                        <span>LAUNCH AGENCY:</span>
                        <span className="text-white font-bold">NASA-COSPAR REGS</span>
                      </div>
                      <div className="flex justify-between text-zinc-500">
                        <span>EST. CERTIFICATE:</span>
                        <span className="text-white font-bold">CLASS-08 PASSENGER</span>
                      </div>
                      <div className="flex justify-between text-zinc-500">
                        <span>COMPLIANCE INDEX:</span>
                        <span className="text-emerald-400 font-bold">99.8% READY</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      According to research journals, investments into aerospace infrastructure have produced staggering wealth outcomes. Mining near-Earth celestial bodies allows processing high-purity minerals with zero biosphere destruction.
                    </p>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px] space-y-1">
                      <div className="flex justify-between text-zinc-500">
                        <span>FINANCE TRACK:</span>
                        <span className="text-white font-bold">FORBES COSMIC INDEX</span>
                      </div>
                      <div className="flex justify-between text-zinc-500">
                        <span>ANNUAL GROWTH:</span>
                        <span className="text-teal-brand font-bold">+18.4% YEARLY</span>
                      </div>
                      <div className="flex justify-between text-zinc-500">
                        <span>MARKET RATIO:</span>
                        <span className="text-yellow-500 font-bold">$1.2T LIQUIDITY</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end border-t border-white/5 pt-4">
                <button 
                  onClick={() => setShowMoreModal({ isOpen: false, contentId: null })}
                  className="px-6 py-2.5 bg-white hover:bg-teal-brand text-black font-semibold font-mono text-[9px] uppercase rounded-full tracking-widest transition cursor-pointer"
                >
                  ACKNOWLEDGE LOGS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};


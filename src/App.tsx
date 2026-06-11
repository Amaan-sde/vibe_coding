import React, { useState, useEffect, useRef } from "react";
import { 
  Globe, 
  Orbit, 
  Sparkles, 
  Search, 
  Menu, 
  Play, 
  Pause, 
  ChevronDown, 
  ArrowUpRight, 
  X, 
  Map, 
  Heart, 
  Activity, 
  Compass, 
  Cpu, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Dna,
  Database,
  Rocket,
  Atom,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Send,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MISSIONS, TRANSLATIONS, MissionInfo } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<"01" | "02" | "03">("01");
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);
  const [searchResultToast, setSearchResultToast] = useState<string | null>(null);

  // Audio references
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
      // Simulate slight orbital drift
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
      // Stop the synthesizer
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
      // Reset visualizer bars
      setAudioBars([15, 25, 10, 40, 20, 30, 15]);
    } else {
      // Initialize synth
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Sub bass hum oscillator (Spacecraft engine rumble)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A

        // Secondary detuned sawtooth with lowpass filter (Cosmic soundscape)
        const osc2 = ctx.createOscillator();
        osc2.type = "sawtooth";
        osc2.frequency.setValueAtTime(55.4, ctx.currentTime); // detached frequency for phasing

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, ctx.currentTime); // Muffled heavy hum
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
        // Fade in volume to avoid sharp clicks
        gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);

        // Hook up network
        osc1.connect(gainNode);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        // Store references
        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainNodeRef.current = gainNode;
        setIsPlaying(true);

        // Simulated visualizer animation
        visualizerTimerRef.current = window.setInterval(() => {
          setAudioBars(Array.from({ length: 7 }, () => Math.floor(Math.random() * 35) + 5));
        }, 120);

      } catch (err) {
        console.error("Synthesizer could not boot:", err);
      }
    }
  };

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (osc1Ref.current) osc1Ref.current.disconnect();
      if (osc2Ref.current) osc2Ref.current.disconnect();
      if (gainNodeRef.current) gainNodeRef.current.disconnect();
      if (visualizerTimerRef.current) window.clearInterval(visualizerTimerRef.current);
    };
  }, []);

  const activeMission: MissionInfo = MISSIONS[activeTab];
  const t = TRANSLATIONS[language];

  // Search filter and auto tab jump
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    
    // Let's analyze query keywords and snap UI tab to corresponding orbit profiles
    if (query.includes("mars") || query.includes("settle") || query.includes("aetherius") || query.includes("red") || query.includes("biodome")) {
      setActiveTab("02");
      setSearchResultToast("Identified Match: Aetherius Settlement Dome (Martian Territory). Snapping orbital focus...");
    } else if (query.includes("asteroid") || query.includes("mine") || query.includes("prospect") || query.includes("psyche") || query.includes("gold") || query.includes("metal")) {
      setActiveTab("03");
      setSearchResultToast("Identified Match: Asteroid Core Harvesting Belt. Snapping orbital focus...");
    } else if (query.includes("earth") || query.includes("artemis") || query.includes("lunar") || query.includes("moon") || query.includes("tourism") || query.includes("cosmos")) {
      setActiveTab("01");
      setSearchResultToast("Identified Match: Intergalactic Cosmos & Lunar Cruises. Snapping orbital focus...");
    } else {
      setSearchResultToast(`Telemetry lookup failed for "${searchQuery}". Showing global catalog...`);
    }

    setSearchQuery("");
    
    // Clear search toast after 4 seconds
    setTimeout(() => {
      setSearchResultToast(null);
    }, 4500);
  };

  const currentYear = new Date().getFullYear();

  const handleLaunchStepNext = () => {
    if (launchStep < 4) {
      setLaunchStep(prev => prev + 1);
    } else {
      setShowLaunchModal(false);
      setLaunchStep(0);
      setSearchResultToast("Voyage Reserved! Ticket credentials transmitted to your secure Moyorh terminal.");
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#000000] text-white font-sans flex flex-col justify-between overflow-x-hidden selection:bg-teal-brand selection:text-black"
      id="app-container"
    >
      {/* Search Result Toast */}
      <AnimatePresence>
        {searchResultToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
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

      {/* ----------------- TOP NAV/HEADER BAR ----------------- */}
      <header className="w-full max-w-7xl mx-auto px-4 pt-6 lg:pt-8 bg-transparent" id="header-section">
        <nav className="flex items-center justify-between gap-4 border-b border-white/5 pb-6 bg-transparent">
          
          {/* Logo on Left */}
          <div className="flex items-center gap-3 select-none" id="logo-branding">
            <div className="w-8 h-8 rounded-lg bg-teal-brand flex items-center justify-center text-black font-extrabold text-sm shadow-md shadow-teal-brand/20">
              S
            </div>
            <span className="font-display font-black text-lg tracking-wider text-white">SPACECRAFT</span>
          </div>

          {/* Centered Navigation Menu Options in DM Sans - Custom styled capsule with transparent background overlay */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-zinc-400 uppercase bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 shadow-lg shadow-black/30" id="nav-options-middle">
            <button 
              onClick={() => setActiveTab("01")} 
              className={`hover:text-white transition-all duration-300 cursor-pointer ${activeTab === "01" ? "text-teal-brand font-bold border-b-2 border-teal-brand pb-1" : ""}`}
            >
              COSMOS
            </button>
            <button 
              onClick={() => setActiveTab("02")} 
              className={`hover:text-white transition-all duration-300 cursor-pointer ${activeTab === "02" ? "text-teal-brand font-bold border-b-2 border-teal-brand pb-1" : ""}`}
            >
              SETTLEMENTS
            </button>
            <button 
              onClick={() => setActiveTab("03")} 
              className={`hover:text-white transition-all duration-300 cursor-pointer ${activeTab === "03" ? "text-teal-brand font-bold border-b-2 border-teal-brand pb-1" : ""}`}
            >
              PROSPECTING
            </button>
            <button 
              onClick={() => setShowDiscoverModal(true)} 
              className="hover:text-white transition-all duration-300 cursor-pointer"
            >
              ENCYCLOPEDIA
            </button>
          </div>

          {/* Simple Clean Menu capsule button on the right (No search or music play widgets) */}
          <div className="flex items-center gap-4" id="nav-right-actions">
            
            {/* Language Switchers as pure text options */}
            <div className="flex items-center gap-2 text-xs font-mono" id="nav-language-switcher">
              <button 
                onClick={() => setLanguage("EN")} 
                className={`font-semibold transition-colors cursor-pointer ${language === "EN" ? "text-teal-brand" : "text-zinc-500 hover:text-white"}`}
              >
                EN
              </button>
              <span className="text-zinc-800">|</span>
              <button 
                onClick={() => setLanguage("FR")} 
                className={`font-semibold transition-colors cursor-pointer ${language === "FR" ? "text-teal-brand" : "text-zinc-500 hover:text-white"}`}
              >
                FR
              </button>
            </div>

            {/* Menu Capsule Button - No other icons besides this */}
            <button 
              id="nav-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-full pl-5 pr-1.5 py-1.5 text-xs tracking-widest uppercase hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300"
            >
              <span className="text-zinc-300 font-medium tracking-wider">{t.menu}</span>
              <div className="w-6 h-6 rounded-full bg-teal-brand hover:bg-teal-brand-hover flex items-center justify-center text-black">
                <Menu size={12} strokeWidth={2.5} />
              </div>
            </button>

          </div>

        </nav>
      </header>

      {/* ----------------- SUB-NAV SEARCH / ORBIT PATH BAR ----------------- */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-2">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 py-2 border-b border-white/5 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="text-teal-brand">SYSTEM STATE:</span> 
            <span className="text-white">COSMOS STACK STABLE</span>
            <span className="text-zinc-700">|</span>
            <span>ALTITUDE: <span className="text-white font-bold">{coordinates.altitude}</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span>COSMIC TELEMETRY NODE : <span className="text-white font-bold">{activeMission.stats.distance}</span></span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span className="hidden md:inline">SYSTEM TEMP: <span className="text-white font-bold">{activeMission.stats.temperature}</span></span>
          </div>
        </div>
      </div>

      {/* ----------------- CENTRAL STAGE SECTION (No Background Visuals) ----------------- */}
      <main className="w-full max-w-7xl mx-auto px-4 mt-4 lg:mt-6 flex-1 flex flex-col gap-6" id="main-telemetry-panel">
        
        {/* Main telemetry sandbox frame representing the primary viewport */}
        <section 
          id="orbital-hud-sandbox"
          className="relative w-full h-[400px] lg:h-[460px] bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-6 transition-all duration-500"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgb(15, 23, 30) 0%, rgb(0,0,0) 100%)"
          }}
        >
          {/* Zoomed Background Video - Looped and Muted */}
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
            {/* Grid overlay */}
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
          <div className="absolute top-4 left-6 z-10 font-mono text-[9px] text-zinc-500 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse" />
            <span>MISSION ID: VOYAGE_RGL_{activeMission.number}</span>
            <span>|</span>
            <span>VESSEL SPEC: {activeMission.stats.vessel}</span>
          </div>

          <div className="absolute top-4 right-6 z-10 font-mono text-[9px] text-zinc-500">
            <span>GRID MATRIX RESOLUTION: CALIBRATED</span>
          </div>

          {/* Left vertical floaters: 01, 02, 03 capsules exactly like the reference wireframe */}
          <div className="z-10 flex flex-col justify-center h-full gap-4 max-w-fit" id="mission-step-indicators">
            {(["01", "02", "03"] as const).map((step) => (
              <button
                key={step}
                id={`indicator-${step}`}
                onClick={() => {
                  setActiveTab(step);
                  setActiveCardDetail({ type: null, title: "", tag: "", desc: [], metrics: [] });
                }}
                className={`relative px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all duration-300 w-12 h-14 flex items-center justify-center border ${
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

          {/* Right Floating Structural Cards */}
          <div className="absolute right-6 bottom-6 z-10 flex flex-col sm:flex-row gap-4 max-w-[92%] sm:max-w-[500px] w-full" id="hud-right-floater-cards">
            
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

          {/* LOWER-MIDDLE ROTATING CALL TO ACTION BAR (As requested, keeping this structural component) */}
          <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            
            <button 
              id="center-flight-launch-btn"
              onClick={() => setShowLaunchModal(true)}
              className="w-16 h-16 rounded-full bg-teal-brand text-black hover:bg-white flex items-center justify-center transition-all duration-300 relative group shadow-2xl shadow-teal-brand/20 border-4 border-black"
              title="Initiate Launch Protocol Alignment"
            >
              {/* Rotating outer curved badge with custom text along path SVG */}
              <div className="absolute inset-0 -m-10 pointer-events-none">
                <svg className="w-36 h-36 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                  <text className="font-mono text-[6.2px] uppercase tracking-[0.22em] fill-teal-brand font-bold">
                    <textPath href="#circlePath" startOffset="0%">
                      • {t.ready} • {t.ready}
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Diagonal up arrow inside */}
              <ArrowUpRight size={24} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-300" />
            </button>

          </div>

        </section>

        {/* ----------------- LOWER INFORMATION & NAVIGATION FOOTER GRID ----------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2 mb-8" id="footer-details-grid">
          
          {/* COLUMN LEFT (Span 5 of 12) - Primary Headings */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6" id="footer-left-content">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-teal-brand">
                {activeMission.title}
              </span>
              
              <h1 className="font-display text-[28px] md:text-[52px] font-bold tracking-tight text-white leading-[1.1] md:leading-[56px]" style={{ fontSize: '52px', lineHeight: '56px' }}>
                {activeMission.headline}
              </h1>
              
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                {activeMission.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              {/* Hollow rounded-full "Discover" button */}
              <button 
                id="btn-discover"
                onClick={() => setShowDiscoverModal(true)}
                className="px-8 py-3 bg-transparent hover:bg-white hover:text-black text-white border-2 border-white rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 active:scale-95 cursor-pointer"
              >
                {t.discover}
              </button>

              {/* Under-social media circular button links */}
              <div className="flex items-center gap-2" id="social-links">
                <button className="w-10 h-10 rounded-full border border-neutral-800 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer">
                  <Facebook size={14} />
                </button>
                <button className="w-10 h-10 rounded-full border border-neutral-800 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer">
                  <Instagram size={14} />
                </button>
                <button className="w-10 h-10 rounded-full border border-neutral-800 hover:border-zinc-500 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-neutral-900 transition-all cursor-pointer">
                  <Twitter size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* COLUMN MIDDLE (Span 3 of 12) - Dynamic Social Proof and Small Grid Pill Buttons */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6" id="footer-middle-content">
            
            {/* Top part: Metric and overlapping avatars exactly key visual representation */}
            <div className="bg-neutral-950/40 p-4 border border-zinc-900 rounded-2xl flex flex-col gap-3">
              <div className="space-y-1">
                <span className="font-mono text-teal-brand font-bold text-xs block">{activeMission.stats.crewCount}</span>
                <span className="font-bold text-xs text-white block font-display leading-tight">{t.travelWithUs}</span>
                <p className="text-[10px] text-zinc-500 leading-tight font-mono">{t.travelSub}</p>
              </div>

              {/* Overlapping User Portraits representation */}
              <div className="flex items-center gap-0 mt-1" id="avatar-container">
                {[
                  { name: "John", bg: "from-purple-500 to-indigo-500", init: "JD" },
                  { name: "Sarah", bg: "from-emerald-500 to-teal-500", init: "SC" },
                  { name: "Alex", bg: "from-rose-500 to-orange-500", init: "AL" },
                  { name: "Chen", bg: "from-blue-500 to-sky-500", init: "YC" },
                ].map((av, idx) => (
                  <div 
                    key={idx}
                    className="w-7 h-7 rounded-full bg-gradient-to-tr border-2 border-black flex items-center justify-center text-[8px] font-bold text-black font-mono -ml-2 first:ml-0"
                    title={av.name}
                  >
                    {av.init}
                  </div>
                ))}
                <div className="h-7 px-2.5 rounded-full bg-teal-brand/20 border border-teal-brand/40 text-[9px] font-mono text-teal-brand flex items-center justify-center -ml-2 font-bold select-none cursor-pointer hover:bg-teal-brand hover:text-black transition">
                  +91k
                </div>
              </div>
            </div>

            {/* Bottom part: Horizontal structural tabs Earth, Planets, Meteors */}
            <div className="grid grid-cols-3 gap-2" id="destination-pill-tabs">
              {(["earth", "planets", "meteors"] as const).map((key) => {
                const isSelected = activeCardDetail.type === key;
                const valueObj = activeMission.solarSystem[key];
                
                return (
                  <button
                    key={key}
                    id={`btn-tab-${key}`}
                    onClick={() => {
                      setActiveCardDetail({
                        type: isSelected ? null : key,
                        title: valueObj.name,
                        tag: valueObj.tag,
                        desc: valueObj.desc,
                        metrics: valueObj.metrics
                      });
                    }}
                    className={`p-3 rounded-2xl flex flex-col justify-between items-center text-center transition-all duration-300 hover:scale-103 cursor-pointer min-h-[96px] ${
                      isSelected 
                        ? "bg-teal-brand text-black" 
                        : "bg-zinc-900/80 border border-zinc-800 text-white"
                    }`}
                  >
                    {/* Tiny Vector Sphere representing the Celestial entity */}
                    <div className="mb-2">
                      {key === "earth" && <Globe size={18} className={isSelected ? "text-black" : "text-sky-400"} />}
                      {key === "planets" && <Orbit size={18} className={isSelected ? "text-black" : "text-amber-400"} />}
                      {key === "meteors" && <Sparkles size={18} className={isSelected ? "text-black" : "text-rose-400"} />}
                    </div>

                    <span className="font-display font-medium text-xs tracking-tight">
                      {key === "earth" ? t.earth : key === "planets" ? t.planets : t.meteors}
                    </span>

                    {/* Circular dark Arrow indicators at bottom of each pill */}
                    <div className={`mt-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isSelected ? "bg-black text-teal-brand" : "bg-neutral-950 text-zinc-400"
                    }`}>
                      <ArrowUpRight size={10} className={`transition-transform ${isSelected ? "rotate-45" : ""}`} />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* COLUMN RIGHT (Span 4 of 12) - Dynamic informational panels styled in black container cards */}
          <div className="lg:col-span-4 flex flex-col gap-4" id="footer-right-content">
            
            {/* Card 1: NASA Space organization records */}
            <motion.div 
              id="card-nasa-info"
              whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
              className="bg-neutral-950/60 rounded-2xl p-5 border border-zinc-900 flex flex-col justify-between gap-4 relative min-h-[125px] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-brand/5 rounded-full blur-2xl pointer-events-none" />
              <p className="text-xs text-zinc-300 leading-relaxed font-sans z-10">
                {activeTab === "01" && "It's recorded that approximately over 70 men have officially set foot on the moon courtesy of NASA Space organization."}
                {activeTab === "02" && "Martian ice sheets represent crucial oxygen generation reservoirs, guaranteeing life-support redundancy for decades."}
                {activeTab === "03" && "A single standard heavy asteroid can contain enough rare-earth precious compounds to fuel Earth's complete silicon infrastructure."}
              </p>
              
              <div className="flex items-center justify-between z-10">
                <button 
                  id="btn-more-info-1"
                  onClick={() => setShowMoreModal({ isOpen: true, contentId: `nasa-spec-${activeTab}` })}
                  className="bg-white hover:bg-teal-brand text-black hover:text-black font-semibold font-mono text-[9px] uppercase px-5 py-2.5 rounded-full tracking-widest transition cursor-pointer"
                >
                  {t.more}
                </button>
                <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-wider">
                  CLASSIFIED // COGNITIVE
                </div>
              </div>
            </motion.div>

            {/* Card 2: FORBES Space statistics records */}
            <motion.div 
              id="card-forbes-info"
              whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
              className="bg-neutral-950/60 rounded-2xl p-5 border border-zinc-900 flex flex-col justify-between gap-4 relative min-h-[125px] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <p className="text-xs text-zinc-300 leading-relaxed font-sans z-10">
                {activeTab === "01" && "According to statistics and information gathered from FORBES, over 20million scientists wish to see the solar system and its universe."}
                {activeTab === "02" && "Martian colony pre-orders received over $184B in research pledges, making it the most well-funded autonomous program details history."}
                {activeTab === "03" && "Economic forecasts rate private asteroidal mining values at 400x total worldwide gross global GDP by the start of next quarter."}
              </p>

              <div className="flex items-center justify-between z-10">
                <button 
                  id="btn-more-info-2"
                  onClick={() => setShowMoreModal({ isOpen: true, contentId: `forbes-spec-${activeTab}` })}
                  className="bg-white hover:bg-teal-brand text-black hover:text-black font-semibold font-mono text-[9px] uppercase px-5 py-2.5 rounded-full tracking-widest transition cursor-pointer"
                >
                  {t.more}
                </button>
                <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-wider">
                  ECON ANALYSIS // STABLE
                </div>
              </div>
            </motion.div>

          </div>

        </section>

        {/* ----------------- SECOND SECTION: ASTEROID PROXIMITY TRACKING STATION (FROM REFERENCE) ----------------- */}
        <section className="w-full mt-12 mb-12" id="meteor-proximity-tracker-section">
          <div className="w-full bg-black border border-white/10 rounded-3xl py-7 px-6 lg:px-8 relative overflow-hidden flex flex-col justify-between min-h-[380px]" id="meteor-black-terminal-card">
            
            {/* Smooth loop background video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              src="https://res.cloudinary.com/dtgsgtkh4/video/upload/v1781169294/Generate_smooth_loop_video_202606111444_umpopp.mp4"
            />

            {/* Core telemetry details - All in DM Sans format, using pure white typography */}
            <div className="space-y-5 max-w-2xl mt-2 relative z-10">
              <div className="space-y-1">
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-white font-extrabold">
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

              {/* Highly compact stats list using DM Sans and pure white style */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/10 font-sans">
                <div className="py-1 px-3 border-l border-white/20">
                  <span className="text-white opacity-60 block text-[9px] uppercase tracking-wider font-semibold">CURRENT ALTITUDE</span>
                  <span className="text-white font-black block text-sm sm:text-base mt-0.5">240.8 KM</span>
                </div>
                <div className="py-1 px-3 border-l border-white/20">
                  <span className="text-white opacity-60 block text-[9px] uppercase tracking-wider font-semibold">PLASMA DECELERATION</span>
                  <span className="text-white font-black block text-sm sm:text-base mt-0.5">-12.4 G</span>
                </div>
                <div className="py-1 px-3 border-l border-white/20">
                  <span className="text-white opacity-60 block text-[9px] uppercase tracking-wider font-semibold">CORE VELOCITY</span>
                  <span className="text-white font-black block text-sm sm:text-base mt-0.5">72,400 KM/H</span>
                </div>
                <div className="py-1 px-3 border-l border-white/20">
                  <span className="text-white opacity-60 block text-[9px] uppercase tracking-wider font-semibold">METAL DENSITY RATIO</span>
                  <span className="text-white font-black block text-sm sm:text-base mt-0.5">98.2% SOLID</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex justify-between items-center mt-8 pt-5 border-t border-white/10 relative z-10">
              
              {/* Bottom Left Button Capsule: "Visit site" pill exact design with white icons/elements */}
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

              {/* Bottom Right Button with pure white icon */}
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

        {/* Dynamic planetary sub-info accordion when key cards are highlighted */}
        <AnimatePresence>
          {activeCardDetail.type && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-teal-brand/35 bg-neutral-950/80 rounded-2xl p-5 mb-8 z-10 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-teal-brand uppercase tracking-widest">ORBIT SUB-TARGET SPECIFICATIONS</span>
                  <h3 className="font-display font-bold text-xl text-white">{activeCardDetail.title} — {activeCardDetail.tag}</h3>
                </div>
                <button 
                  onClick={() => setActiveCardDetail({ type: null, title: "", tag: "", desc: [], metrics: [] })}
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 hover:text-teal-brand flex items-center justify-center text-zinc-400 self-end md:self-start"
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

      </main>

      {/* ----------------- DIALOG OVERLAYS & MODALS ----------------- */}

      {/* 1. Launch Protocol Modal ("Get ready with us") */}
      <AnimatePresence>
        {showLaunchModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0e11] border border-teal-brand/40 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative font-mono text-xs"
            >
              <button 
                onClick={() => { setShowLaunchModal(false); setLaunchStep(0); }}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
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
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white rounded uppercase text-[10px] tracking-wider"
                >
                  ABORT
                </button>
                <button 
                  onClick={handleLaunchStepNext}
                  className="px-6 py-2 bg-teal-brand hover:bg-white text-black font-bold rounded uppercase text-[10px] tracking-wider"
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
              className="bg-neutral-950 border border-white/10 max-w-2xl w-full rounded-2xl p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowDiscoverModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
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
                  className="bg-white hover:bg-teal-brand text-black font-extrabold px-6 py-2 rounded-full uppercase"
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
              className="bg-[#0b0e11] border border-white/15 max-w-md w-full rounded-2xl p-6 shadow-2xl relative"
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
                      Official telemetry confirm that space programs have drastically lowered gravity launch friction, opening lunar and planetary orbits to private commercial enterprises safely.
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

      {/* 4. Large Interactive Navigation Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-6 md:p-12">
            <div>
              {/* Menu Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-brand animate-pulse" />
                  <span className="text-zinc-400 uppercase tracking-widest">MISSION DIRECTORY CONTROL</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-5 py-2 rounded-full text-xs hover:bg-neutral-800 text-zinc-300 font-mono"
                >
                  <span>CLOSE</span>
                  <X size={14} className="text-teal-brand" />
                </button>
              </div>

              {/* Menu Categories */}
              <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 md:mt-20">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-teal-brand uppercase tracking-[0.2em] block">01 / ORBITAL INVENTORIES</span>
                  <ul className="space-y-3 font-display font-medium text-2xl md:text-3xl tracking-tight text-zinc-300">
                    <li>
                      <button 
                        onClick={() => { setActiveTab("01"); setIsMenuOpen(false); }} 
                        className="hover:text-white transition flex items-center gap-4 text-left"
                      >
                        <span className="font-mono text-xs text-zinc-600">01.</span>
                        <span>INTERGALACTIC COSMOS</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setActiveTab("02"); setIsMenuOpen(false); }} 
                        className="hover:text-white transition flex items-center gap-4 text-left"
                      >
                        <span className="font-mono text-xs text-zinc-600">02.</span>
                        <span>AETHERIUS SETTLEMENT DOME</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setActiveTab("03"); setIsMenuOpen(false); }} 
                        className="hover:text-white transition flex items-center gap-4 text-left"
                      >
                        <span className="font-mono text-xs text-zinc-600">03.</span>
                        <span>STELLAR ASTEROID CORING</span>
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-teal-brand uppercase tracking-[0.2em] block">02 / CORE INFRASTRUCTURE</span>
                  <ul className="space-y-3 font-display font-medium text-xl text-zinc-400">
                    <li className="hover:text-white transition cursor-pointer flex justify-between items-center font-mono text-xs border-b border-white/5 pb-2">
                      <span>THE SPACECRAFT FLEET STATUS</span>
                      <span className="text-emerald-400">ONLINE</span>
                    </li>
                    <li className="hover:text-white transition cursor-pointer flex justify-between items-center font-mono text-xs border-b border-white/5 pb-2">
                      <span>BIOLOGY SPHERE REPLICATORS</span>
                      <span className="text-emerald-400">98% OPTIMAL</span>
                    </li>
                    <li className="hover:text-white transition cursor-pointer flex justify-between items-center font-mono text-xs border-b border-white/5 pb-2">
                      <span>QUANTUM INTERNET ROUTE TRANSITS</span>
                      <span className="text-yellow-500">DELAY 4M</span>
                    </li>
                    <li className="hover:text-white transition cursor-pointer flex justify-between items-center font-mono text-xs select-none">
                      <span>CENTRIFUGE DRILLS SYSTEMS</span>
                      <span className="text-[#3A8E94]">SECURED</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Menu Footer Grid */}
            <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
              <div className="flex gap-4">
                <span>SYSTEM VERSION 8.4.1</span>
                <span>•</span>
                <span>SECURITY LEVEL: EXTREME CLASSIFIED</span>
              </div>
              <span>CURRENT DATE: {coordinates.lat ? currentYear : "2026"} VESTA SYSTEM</span>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- SIMPLE STARK PAGE FOOTER BRAND ----------------- */}
      <footer className="w-full max-w-7xl mx-auto px-4 py-6 mt-auto border-t border-white/5 z-10" id="footer-section">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>© {currentYear} SPACECRAFT OPERATIONS SYSTEM</span>
            <span>•</span>
            <span className="text-white">PURE WIREFRAME FLUID GRID</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white transition cursor-pointer" onClick={() => window.open("", "_self")}>TERMS SECURE</span>
            <span>|</span>
            <span className="hover:text-white transition cursor-pointer" onClick={() => window.open("", "_self")}>COGNITIVE TELEMETRY</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

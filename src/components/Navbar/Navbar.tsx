import React, { useState } from "react";
import { 
  Orbit, 
  Menu, 
  X, 
  Rocket, 
  FlaskConical, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Globe,
  Sparkles,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type NavPage = 
  | "home" 
  | "explore" 
  | "isro" 
  | "laboratory" 
  | "knowledge" 
  | "quiz" 
  | "educator";

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavPage; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home", icon: Globe },
    { id: "explore", label: "Explore Space", icon: Orbit },
    { id: "isro", label: "ISRO Missions", icon: Rocket },
    { id: "laboratory", label: "Space Laboratory", icon: FlaskConical },
    { id: "knowledge", label: "Knowledge Hub", icon: BookOpen },
    { id: "quiz", label: "Space Quiz", icon: Trophy },
    { id: "educator", label: "Educator Mode", icon: GraduationCap }
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-brand flex items-center justify-center text-black font-extrabold shadow-lg shadow-teal-brand/20 group-hover:scale-105 transition-transform">
            <Orbit size={20} className="animate-spin" style={{ animationDuration: "20s" }} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-black text-sm sm:text-lg tracking-wider text-white">WHY SPACE</span>
              <span className="text-[8px] font-mono bg-teal-brand/20 text-teal-brand px-1.5 py-0.5 rounded font-bold uppercase">
                STEM
              </span>
            </div>
            <span className="text-[8px] font-mono text-zinc-400 tracking-widest hidden sm:inline-block">
              AEROSPACE & SCIENCE COMMUNICATOR
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/30 text-xs font-mono">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-teal-brand text-black font-bold shadow-md shadow-teal-brand/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
                {item.id === "educator" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Quick Jump to Educator Mode + Mobile Hamburger */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => handleNavClick("educator")}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-brand/10 border border-teal-brand/30 hover:bg-teal-brand hover:text-black text-teal-brand text-xs font-mono font-bold uppercase transition cursor-pointer"
          >
            <GraduationCap size={14} />
            <span>TEACH MODE</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-zinc-300 hover:text-white transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-neutral-950 border-b border-white/10 px-4 py-6 font-mono text-xs flex flex-col gap-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                    isActive
                      ? "bg-teal-brand text-black font-bold border-teal-brand"
                      : "bg-neutral-900/60 border-neutral-800 text-zinc-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span className="uppercase tracking-wider">{item.label}</span>
                  </div>
                  {item.id === "educator" && (
                    <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-bold">
                      INTERVIEW
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};


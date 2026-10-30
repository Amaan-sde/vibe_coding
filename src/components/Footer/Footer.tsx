import React from "react";
import { 
  Orbit, 
  Rocket, 
  Globe, 
  GraduationCap, 
  BookOpen, 
  Heart,
  ExternalLink
} from "lucide-react";
import { NavPage } from "../Navbar/Navbar";

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/10 text-white font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-10">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          
          {/* Brand Info (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div 
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-brand flex items-center justify-center text-black font-extrabold shadow-md shadow-teal-brand/20">
                <Orbit size={18} />
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">WHY SPACE</span>
            </div>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-sm">
              Interactive space exploration and STEM education platform designed for students, educators, and space communicators. Demonstrating aerospace rocketry, orbital mechanics, and ISRO deep space achievements.
            </p>

            <div className="p-3 bg-neutral-950 border border-white/5 rounded-xl font-mono text-[11px] text-zinc-400 max-w-sm">
              <span className="text-teal-brand font-bold block mb-0.5">"Somewhere, something incredible is waiting to be known."</span>
              <span className="text-zinc-500">— Dr. Carl Sagan</span>
            </div>
          </div>

          {/* Quick Links Columns (Span 7) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* Column 1: Exploration */}
            <div className="space-y-3">
              <span className="text-teal-brand uppercase tracking-wider font-bold text-[10px] block">
                EXPLORATION
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button onClick={() => onNavigate("home")} className="hover:text-white transition">
                    Home Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("explore")} className="hover:text-white transition">
                    Telemetry Stage & Videos
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("isro")} className="hover:text-white transition">
                    ISRO Missions
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("isro")} className="hover:text-white transition">
                    Chandrayaan-3 Timeline
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Interactive Lab */}
            <div className="space-y-3">
              <span className="text-teal-brand uppercase tracking-wider font-bold text-[10px] block">
                SPACE LABORATORY
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button onClick={() => onNavigate("laboratory")} className="hover:text-white transition">
                    Rocket Propulsion Sim
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("laboratory")} className="hover:text-white transition">
                    Solar System Explorer
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("laboratory")} className="hover:text-white transition">
                    Planetary Gravity Sim
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("laboratory")} className="hover:text-white transition">
                    Satellite Orbit Explorer
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: STEM Pedagogy */}
            <div className="space-y-3">
              <span className="text-teal-brand uppercase tracking-wider font-bold text-[10px] block">
                STEM EDUCATION
              </span>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button onClick={() => onNavigate("educator")} className="hover:text-white transition font-bold text-teal-brand">
                    Educator Mode
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("educator")} className="hover:text-white transition">
                    6 Classroom Activities
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("knowledge")} className="hover:text-white transition">
                    Knowledge Hub
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("quiz")} className="hover:text-white transition">
                    Space Quiz Challenge
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Scientific References & Accuracy Attribution */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>SCIENTIFIC REFERENCES:</span>
            <span className="text-zinc-400">ISRO (isro.gov.in)</span>
            <span>•</span>
            <span className="text-zinc-400">NASA Science</span>
            <span>•</span>
            <span className="text-zinc-400">ESA Education</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Designed for STEM & Aerospace Educator Demonstrations</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          <div>
            © {currentYear} WHY SPACE // INTERACTIVE STEM SPACE PLATFORM
          </div>
          <div>
            TWO ORIGINAL PROTECTED CLOUDINARY VIDEOS PRESERVED
          </div>
        </div>

      </div>
    </footer>
  );
};


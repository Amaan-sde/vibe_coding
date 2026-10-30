import React from "react";
import { 
  Orbit, 
  Sparkles, 
  Compass, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  ChevronRight,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { OriginalTelemetryStage } from "../../components/ProtectedVideos/OriginalTelemetryStage";

interface ExploreSpacePageProps {
  onNavigateISRO: () => void;
  onNavigateLab: () => void;
  onNavigateKnowledge: () => void;
}

export const ExploreSpacePage: React.FC<ExploreSpacePageProps> = ({
  onNavigateISRO,
  onNavigateLab,
  onNavigateKnowledge
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 text-white">
      
      {/* Page Orientation Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
            <Orbit size={14} />
            <span>ORBITAL TELEMETRY STATION // DEEP SPACE EXPLORATION DECK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            Explore Beyond Earth
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
            Live interactive telemetry interface monitoring orbital voyages, interplanetary settlement domes, and near-Earth hyper-burn asteroid prospecting corridors.
          </p>
        </div>

        {/* Quick jumps to scientific modules */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={onNavigateISRO}
            className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-teal-brand text-zinc-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>ISRO Missions</span>
            <ArrowUpRight size={12} className="text-teal-brand" />
          </button>
          <button
            onClick={onNavigateLab}
            className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-teal-brand text-zinc-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Physics Lab</span>
            <ArrowUpRight size={12} className="text-teal-brand" />
          </button>
        </div>
      </div>

      {/* RENDER THE IMMUTABLE ORIGINAL TELEMETRY STAGE (CONTAINING BOTH PROTECTED VIDEOS) */}
      <div className="w-full">
        <OriginalTelemetryStage 
          onNavigateISRO={onNavigateISRO}
          onNavigateLab={onNavigateLab}
          onNavigateKnowledge={onNavigateKnowledge}
        />
      </div>

    </div>
  );
};


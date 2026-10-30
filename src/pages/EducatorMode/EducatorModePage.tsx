import React, { useState } from "react";
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  Rocket, 
  Cpu, 
  Radio, 
  Zap, 
  ChevronRight,
  Printer,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EDUCATOR_ACTIVITIES, EducatorActivity } from "../../data/educatorActivities";

export const EducatorModePage: React.FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>("balloon-rocket");

  const currentActivity: EducatorActivity = 
    EDUCATOR_ACTIVITIES.find(a => a.id === selectedActivityId) || EDUCATOR_ACTIVITIES[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 text-white">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest mb-1">
            <GraduationCap size={15} />
            <span>EDUCATOR MODE // STEM CLASSROOM PEDAGOGY & CURRICULUM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            Teach. Demonstrate. Inspire.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl mt-1 leading-relaxed">
            Turn complex aerospace physics into captivating hands-on classroom experiments for school students aged 10–16. Designed specifically for Aerospace Educators, Science Communicators, and STEM instructors.
          </p>
        </div>

        {/* Print / Save Lesson Plan Button */}
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-700 hover:border-teal-brand text-xs font-mono text-zinc-300 hover:text-white transition cursor-pointer"
        >
          <Printer size={13} />
          <span>PRINT LESSON PLAN</span>
        </button>
      </div>

      {/* Activity Selector Grid (6 Classroom Modules) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {EDUCATOR_ACTIVITIES.map((activity) => {
          const isSelected = selectedActivityId === activity.id;
          return (
            <button
              key={activity.id}
              onClick={() => setSelectedActivityId(activity.id)}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                isSelected
                  ? "bg-teal-brand/15 border-teal-brand shadow-xl shadow-teal-brand/15 scale-[1.02]"
                  : "bg-neutral-950/80 border-white/10 hover:border-zinc-700 hover:bg-neutral-900/60"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  isSelected ? "bg-teal-brand text-black" : "bg-neutral-900 text-teal-brand"
                }`}>
                  {activity.number}
                </span>
                <span className="text-[8px] font-mono text-zinc-500">{activity.durationMinutes}m</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xs text-white line-clamp-1">
                  {activity.title}
                </h3>
                <span className="text-[10px] text-zinc-400 font-sans block mt-0.5 line-clamp-1">
                  {activity.topic.split("&")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Activity Deep Dive Workspace */}
      <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-8 shadow-2xl">
        
        {/* Activity Top Banner */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-teal-brand/20 border border-teal-brand/40 text-teal-brand font-bold uppercase">
              ACTIVITY {currentActivity.number}: {currentActivity.title}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              {currentActivity.gradeLevel}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
              <Clock size={12} />
              <span>{currentActivity.durationMinutes} Minutes</span>
            </span>
            <div className="flex gap-1 ml-auto">
              {currentActivity.stemPillars.map((pillar, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-bold">
                  {pillar}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
              {currentActivity.heroSummary}
            </h2>
            <div className="mt-2 p-3 bg-neutral-900/70 border border-teal-brand/30 rounded-xl font-mono text-xs text-teal-brand">
              <strong>Core Aerospace Principle:</strong> {currentActivity.coreConcept}
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Materials & Preparation vs Learning Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5 Cols): Required Materials Checklist */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-wider font-bold">
              <Layers size={14} />
              <span>Classroom Materials Checklist (Low Cost & Safe)</span>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-xl divide-y divide-white/5 overflow-hidden font-sans text-xs">
              {currentActivity.materialsList.map((item, idx) => (
                <div key={idx} className="p-3 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-brand shrink-0 mt-1.5" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{item.item}</span>
                    <span className="text-[10px] font-mono text-zinc-400">Qty: {item.quantity} • {item.purpose}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Preparation Steps */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block">
                Educator Pre-Class Preparation:
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                {currentActivity.preparation.map((prep, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-teal-brand font-bold text-xs">{i+1}.</span>
                    <span>{prep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (7 Cols): Step-by-Step Instructions with Teacher Tips */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-wider font-bold">
              <Sparkles size={14} />
              <span>Step-by-Step Lesson Execution</span>
            </div>

            <div className="space-y-3">
              {currentActivity.stepByStepInstructions.map((step) => (
                <div 
                  key={step.stepNumber} 
                  className="bg-neutral-900/60 border border-white/10 rounded-xl p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-brand text-black flex items-center justify-center text-[10px] font-bold">
                        {step.stepNumber}
                      </span>
                      {step.title}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                    {step.action}
                  </p>

                  <div className="p-2 bg-black/40 rounded-lg border border-teal-brand/20 text-[11px] text-zinc-400 font-sans flex items-start gap-2">
                    <span className="text-teal-brand font-mono font-bold text-[10px] uppercase shrink-0">
                      💡 Pro Teacher Tip:
                    </span>
                    <span>{step.teacherTip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Scientific Explanation & Student Learning Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
          
          {/* Card A: How to Explain to Students */}
          <div className="bg-neutral-900/70 border border-white/10 rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-mono text-teal-brand uppercase tracking-widest font-bold block">
              1. Student-Friendly Scientific Explanation:
            </span>
            <p className="text-xs text-zinc-200 font-sans leading-relaxed">
              {currentActivity.scientificExplanation.studentFriendlyText}
            </p>
            {currentActivity.scientificExplanation.formula && (
              <div className="p-2.5 bg-black rounded-lg border border-teal-brand/30 font-mono text-center text-teal-brand text-xs font-bold">
                {currentActivity.scientificExplanation.formula}
              </div>
            )}
          </div>

          {/* Card B: Real Spaceflight Connection */}
          <div className="bg-neutral-900/70 border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-teal-brand uppercase tracking-widest font-bold">
                2. Real Spaceflight Connection:
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                {currentActivity.realSpaceflightConnection.agency}
              </span>
            </div>
            <strong className="text-white font-display text-sm block">
              {currentActivity.realSpaceflightConnection.mission}
            </strong>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              {currentActivity.realSpaceflightConnection.context}
            </p>
          </div>

        </div>

        {/* Classroom Discussion Questions & Teacher Answers */}
        <div className="border-t border-white/10 pt-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest font-bold">
            <HelpCircle size={15} />
            <span>Interactive Classroom Discussion Prompts & Teacher Guide</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentActivity.discussionQuestions.map((q, idx) => (
              <div key={idx} className="p-4 bg-neutral-900/50 rounded-xl border border-white/5 space-y-2">
                <span className="font-display font-bold text-xs text-white block">
                  Q{idx+1}: {q.question}
                </span>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed bg-black/40 p-2.5 rounded-lg border border-teal-brand/20">
                  <strong className="text-teal-brand font-mono text-[9px] uppercase block mb-0.5">Teacher Model Answer:</strong>
                  {q.suggestedAnswer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Precautions (Imperative for Aerospace Educator) */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-sans text-amber-200">
          <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="space-y-1">
            <strong className="font-mono text-[10px] uppercase tracking-wider block text-amber-300">
              Mandatory Classroom Safety Precautions:
            </strong>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-200/90">
              {currentActivity.safetyPrecautions.map((safe, i) => (
                <li key={i}>{safe}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};


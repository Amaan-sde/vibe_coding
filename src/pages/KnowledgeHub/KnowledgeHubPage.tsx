import React, { useState, useMemo } from "react";
import { 
  Search, 
  Sparkles, 
  Atom, 
  Rocket, 
  Orbit, 
  BookOpen, 
  X, 
  ChevronRight, 
  Clock, 
  Lightbulb, 
  HelpCircle,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  KNOWLEDGE_CATEGORIES, 
  KNOWLEDGE_TOPICS, 
  KnowledgeCategory, 
  KnowledgeTopic 
} from "../../data/knowledgeHub";

interface KnowledgeHubPageProps {
  initialTopicId?: string;
}

export const KnowledgeHubPage: React.FC<KnowledgeHubPageProps> = ({ initialTopicId }) => {
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTopic, setActiveTopic] = useState<KnowledgeTopic | null>(
    initialTopicId ? KNOWLEDGE_TOPICS.find(t => t.id === initialTopicId) || null : null
  );

  // Filter topics by category and search string
  const filteredTopics = useMemo(() => {
    return KNOWLEDGE_TOPICS.filter(topic => {
      const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        topic.title.toLowerCase().includes(q) ||
        topic.subtitle.toLowerCase().includes(q) ||
        topic.simpleIntroduction.toLowerCase().includes(q) ||
        topic.scientificExplanation.toLowerCase().includes(q) ||
        topic.badge.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 text-white">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest">
          <BookOpen size={14} />
          <span>KNOWLEDGE HUB // SPACE ENCYCLOPEDIA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
          Discover the Universe
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          An encyclopedia-style interactive library spanning Astronomy, Space Science, Aerospace Engineering, and Space Objects. Written in crystal-clear language suitable for students, curious minds, and space communicators.
        </p>
      </div>

      {/* Search Bar & Category Filter Pills */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-neutral-950 border border-white/10 rounded-2xl p-4">
        
        {/* Search Input Box */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search topics, laws, exoplanets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 font-sans focus:outline-none focus:border-teal-brand transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
              selectedCategory === "all"
                ? "bg-teal-brand text-black font-bold shadow-md shadow-teal-brand/20"
                : "bg-neutral-900 border border-neutral-800 text-zinc-400 hover:text-white"
            }`}
          >
            All Topics ({KNOWLEDGE_TOPICS.length})
          </button>

          {KNOWLEDGE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-teal-brand text-black font-bold shadow-md shadow-teal-brand/20"
                  : "bg-neutral-900 border border-neutral-800 text-zinc-400 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveTopic(topic)}
              className="bg-neutral-950 border border-white/10 hover:border-teal-brand/50 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-brand/10 border border-teal-brand/30 text-teal-brand text-[9px] font-mono font-bold uppercase tracking-wider">
                    {topic.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                    <Clock size={11} />
                    <span>{topic.readingTimeMin} min read</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-teal-brand transition-colors">
                    {topic.title}
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">
                    {topic.subtitle}
                  </span>
                </div>

                <p className="text-zinc-300 text-xs font-sans leading-relaxed line-clamp-3">
                  {topic.simpleIntroduction}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-teal-brand">
                <span className="text-[10px] uppercase font-bold tracking-wider">EXPLORE SCIENTIFIC DETAILS</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-950 border border-white/10 rounded-2xl p-8">
          <BookOpen size={36} className="mx-auto text-zinc-600 mb-3" />
          <h3 className="text-lg font-bold text-white">No Topics Found</h3>
          <p className="text-zinc-400 text-xs mt-1">
            Try adjusting your search query or switching category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-mono uppercase text-teal-brand hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Detailed Full Topic Modal / Reader Drawer */}
      <AnimatePresence>
        {activeTopic && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-950 border border-teal-brand/40 max-w-3xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans text-xs text-zinc-300"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveTopic(null)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white p-1 rounded-full bg-neutral-900 hover:bg-neutral-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-[10px] font-mono text-teal-brand uppercase tracking-widest font-bold mb-1">
                  <span>{activeTopic.category.toUpperCase()}</span>
                  <span>•</span>
                  <span>{activeTopic.badge}</span>
                  <span>•</span>
                  <span>{activeTopic.readingTimeMin} MIN READ</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                  {activeTopic.title}
                </h2>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  {activeTopic.subtitle}
                </p>
              </div>

              {/* Modal Body */}
              <div className="space-y-6">
                
                {/* 1. Simple Introduction */}
                <div className="p-4 bg-teal-950/20 border border-teal-brand/30 rounded-xl space-y-1">
                  <span className="font-mono text-[10px] text-teal-brand uppercase tracking-wider font-bold block">
                    Student-Friendly Introduction (Ages 10–16):
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                    {activeTopic.simpleIntroduction}
                  </p>
                </div>

                {/* 2. Deep Scientific Explanation */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-teal-brand uppercase tracking-wider font-bold block">
                    Astrophysical & Engineering Explanation:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {activeTopic.scientificExplanation}
                  </p>
                </div>

                {/* 3. Real-World Examples */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-teal-brand uppercase tracking-wider font-bold block">
                    Real-World Observational Examples:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {activeTopic.realWorldExamples.map((ex, i) => (
                      <div key={i} className="p-3 bg-neutral-900/60 rounded-xl border border-white/5 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-brand shrink-0 mt-1.5" />
                        <span className="text-xs text-zinc-300">{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Mind-Blowing Facts */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>Mind-Blowing Space Facts:</span>
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {activeTopic.mindBlowingFacts.map((fact, i) => (
                      <div key={i} className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-amber-200">
                        {fact}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Why It Matters */}
                <div className="p-4 bg-neutral-900/60 rounded-xl border border-white/5 space-y-1">
                  <span className="font-mono text-[10px] text-white uppercase tracking-wider font-bold block">
                    Why This Matters for Humanity & Future Exploration:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {activeTopic.whyItMatters}
                  </p>
                </div>

                {/* 6. Key Scientific Vocabulary Terms */}
                {activeTopic.keyTerms.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-teal-brand uppercase tracking-wider font-bold block">
                      Key Scientific Terms Glossary:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeTopic.keyTerms.map((kt, i) => (
                        <div key={i} className="p-2.5 bg-neutral-900/40 rounded-lg border border-white/5">
                          <strong className="text-white font-mono text-[11px] block">{kt.term}</strong>
                          <span className="text-[10px] text-zinc-400 font-sans mt-0.5 block">{kt.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-[10px] text-zinc-500">
                  WHY SPACE KNOWLEDGE REPOSITORY
                </span>
                <button
                  onClick={() => setActiveTopic(null)}
                  className="px-6 py-2 rounded-full bg-white text-black font-mono font-bold text-xs uppercase hover:bg-teal-brand transition cursor-pointer"
                >
                  CLOSE TOPIC
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};


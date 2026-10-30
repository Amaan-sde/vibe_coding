import React, { useState, useEffect, useMemo } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Layers, 
  ChevronRight, 
  HelpCircle,
  Trophy,
  History,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  QUIZ_QUESTIONS, 
  QUIZ_CATEGORIES, 
  QuizQuestion, 
  QuizCategory, 
  QuizDifficulty 
} from "../../data/quizQuestions";

interface SavedScore {
  date: string;
  category: string;
  difficulty: string;
  score: number;
  total: number;
  percent: number;
}

export const SpaceQuizPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | "all">("all");
  
  // Game session states
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [highScores, setHighScores] = useState<SavedScore[]>([]);

  // Load high scores from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("whyspace_quiz_scores");
      if (saved) {
        setHighScores(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load scores from LocalStorage", e);
    }
  }, []);

  // Filter questions for active game session
  const activeQuestions: QuizQuestion[] = useMemo(() => {
    return QUIZ_QUESTIONS.filter(q => {
      const matchCat = selectedCategory === "all" || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });
  }, [selectedCategory, selectedDifficulty]);

  const currentQ: QuizQuestion | undefined = activeQuestions[currentIndex];

  const handleStartQuiz = () => {
    if (activeQuestions.length === 0) return;
    setIsQuizActive(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted || !currentQ) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz Finished!
      const finalScore = selectedOption === currentQ?.correctIndex ? score : score;
      const percent = Math.round((finalScore / activeQuestions.length) * 100);
      setIsFinished(true);
      setIsQuizActive(false);

      // Save to LocalStorage
      try {
        const newRecord: SavedScore = {
          date: new Date().toLocaleDateString(),
          category: selectedCategory,
          difficulty: selectedDifficulty,
          score: finalScore,
          total: activeQuestions.length,
          percent
        };
        const updated = [newRecord, ...highScores.slice(0, 9)];
        setHighScores(updated);
        localStorage.setItem("whyspace_quiz_scores", JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not save score", e);
      }
    }
  };

  const getRankBadge = (pct: number) => {
    if (pct >= 90) return { title: "Chief Rocket Scientist", color: "text-amber-400", border: "border-amber-400" };
    if (pct >= 70) return { title: "Flight Director", color: "text-teal-brand", border: "border-teal-brand" };
    if (pct >= 50) return { title: "Space Science Specialist", color: "text-blue-400", border: "border-blue-400" };
    return { title: "Junior Space Cadet", color: "text-zinc-400", border: "border-zinc-500" };
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 text-white">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-brand uppercase tracking-widest">
          <Trophy size={14} />
          <span>INTERACTIVE SPACE QUIZ // STEM KNOWLEDGE CHALLENGE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
          Test Your Space Knowledge
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Challenge yourself across Solar System astronomy, ISRO missions, rocket science, satellite orbital mechanics, and space technology. Real-time scientific feedback included for every question!
        </p>
      </div>

      {/* QUIZ NOT ACTIVE: SETUP & LOBBY SCREEN */}
      {!isQuizActive && !isFinished && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 8 Cols: Category & Difficulty Selection */}
          <div className="lg:col-span-8 bg-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            
            {/* Category Selector */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-teal-brand font-bold block">
                1. Select Quiz Category:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {QUIZ_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border text-left font-mono text-xs transition cursor-pointer flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? "bg-teal-brand/15 border-teal-brand text-white font-bold shadow-md shadow-teal-brand/10"
                        : "bg-neutral-900/60 border-neutral-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && (
                      <span className="w-2 h-2 rounded-full bg-teal-brand" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-3 border-t border-white/5 pt-4">
              <span className="font-mono text-xs uppercase tracking-widest text-teal-brand font-bold block">
                2. Select Difficulty Tier:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                {(["all", "beginner", "intermediate", "advanced"] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`p-3 rounded-xl border text-center uppercase tracking-wider transition cursor-pointer ${
                      selectedDifficulty === diff
                        ? "bg-teal-brand text-black font-bold border-teal-brand shadow-md shadow-teal-brand/20"
                        : "bg-neutral-900/60 border-neutral-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    {diff === "all" ? "Mixed Levels" : diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="font-mono text-xs text-zinc-400">
                Selected Questions Pool: <strong className="text-white">{activeQuestions.length} questions</strong>
              </div>

              <button
                onClick={handleStartQuiz}
                disabled={activeQuestions.length === 0}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-teal-brand hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-xl shadow-teal-brand/20 disabled:opacity-40"
              >
                LAUNCH QUIZ CHALLENGE →
              </button>
            </div>

          </div>

          {/* Right 4 Cols: LocalStorage High Scores & Hall of Fame */}
          <div className="lg:col-span-4 bg-neutral-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-teal-brand uppercase tracking-wider font-bold border-b border-white/10 pb-2">
                <History size={14} />
                <span>LOCAL HIGH SCORE HISTORY</span>
              </div>

              {highScores.length > 0 ? (
                <div className="space-y-2">
                  {highScores.slice(0, 5).map((rec, i) => (
                    <div key={i} className="p-3 bg-neutral-900/50 rounded-xl border border-white/5 font-mono text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block capitalize">{rec.category}</span>
                        <span className="text-[10px] text-zinc-500">{rec.date} • {rec.difficulty}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-teal-brand text-sm">{rec.score}/{rec.total}</span>
                        <span className="text-[9px] text-zinc-400 block">{rec.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-500 font-mono text-xs">
                  <Award size={28} className="mx-auto text-zinc-700 mb-2" />
                  <span>No saved quiz records yet. Complete a challenge to log your score!</span>
                </div>
              )}
            </div>

            <div className="text-[10px] font-mono text-zinc-500 text-center border-t border-white/5 pt-3">
              100% Client-Side • Stored safely via browser LocalStorage
            </div>
          </div>

        </div>
      )}

      {/* QUIZ ACTIVE: QUESTION DISPLAY & ANSWER FLOW */}
      {isQuizActive && currentQ && (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          
          {/* Progress & Header Bar */}
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="flex justify-between items-center text-zinc-400">
              <span className="text-teal-brand font-bold uppercase">
                QUESTION {currentIndex + 1} OF {activeQuestions.length}
              </span>
              <span>
                CURRENT SCORE: <strong className="text-white">{score}</strong> / {currentIndex}
              </span>
            </div>

            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-teal-brand h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{currentQ.category}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{currentQ.difficulty}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((option, idx) => {
                const isChosen = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                
                let btnStyle = "bg-neutral-900/70 border-neutral-800 text-zinc-300 hover:border-zinc-600 hover:text-white";
                
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10";
                  } else if (isChosen && !isCorrect) {
                    btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 font-bold";
                  } else {
                    btnStyle = "bg-neutral-900/30 border-neutral-900 text-zinc-600";
                  }
                } else if (isChosen) {
                  btnStyle = "bg-teal-brand/20 border-teal-brand text-white font-bold shadow-md shadow-teal-brand/20";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between gap-4 font-sans text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-black/40 border border-white/10 flex items-center justify-center font-mono text-xs shrink-0 font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isChosen && !isCorrect && (
                      <XCircle size={18} className="text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scientific Explanation Feedback Box (Revealed after answering) */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-neutral-900/90 border border-teal-brand/30 space-y-2 text-xs font-sans text-zinc-300"
                >
                  <div className="flex items-center gap-1.5 text-teal-brand font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Scientific Educational Explanation:</span>
                  </div>
                  <p className="leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  {currentQ.funFact && (
                    <div className="pt-2 border-t border-white/5 text-[11px] text-amber-300">
                      <strong>Did You Know?</strong> {currentQ.funFact}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex justify-end pt-2 border-t border-white/5">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 rounded-full bg-teal-brand hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 disabled:opacity-40"
                >
                  CONFIRM ANSWER
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-full bg-teal-brand hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <span>{currentIndex < activeQuestions.length - 1 ? "NEXT QUESTION" : "VIEW RESULTS"}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* QUIZ FINISHED: RESULTS SUMMARY SCREEN */}
      {isFinished && (
        <div className="max-w-xl mx-auto w-full bg-neutral-950 border border-white/10 rounded-2xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
          
          <div className="w-16 h-16 rounded-full bg-teal-brand/10 border-2 border-teal-brand flex items-center justify-center text-teal-brand shadow-xl">
            <Trophy size={32} />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-teal-brand font-bold">
              QUIZ MISSION COMPLETED
            </span>
            <h2 className="text-3xl font-display font-black text-white">
              {score} / {activeQuestions.length} Correct
            </h2>
            <p className="text-zinc-400 text-xs font-mono">
              Score: {Math.round((score / activeQuestions.length) * 100)}% Accuracy
            </p>
          </div>

          {/* Rank Badge */}
          {(() => {
            const pct = Math.round((score / activeQuestions.length) * 100);
            const rank = getRankBadge(pct);
            return (
              <div className={`p-4 rounded-xl border ${rank.border} bg-neutral-900/60 max-w-sm w-full space-y-1`}>
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">AWARDED RANK:</span>
                <span className={`text-lg font-display font-bold ${rank.color} block`}>
                  {rank.title}
                </span>
                <p className="text-[11px] text-zinc-400 font-sans">
                  {pct >= 80 
                    ? "Outstanding space science and aerospace expertise!" 
                    : pct >= 50 
                    ? "Solid foundational space knowledge. Keep exploring!" 
                    : "Great first flight! Review the Knowledge Hub and retry."}
                </p>
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-4 border-t border-white/5">
            <button
              onClick={handleStartQuiz}
              className="flex-1 py-3 rounded-full bg-teal-brand hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              RETRY THIS QUIZ
            </button>
            <button
              onClick={() => {
                setIsFinished(false);
                setIsQuizActive(false);
              }}
              className="flex-1 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              CHANGE CATEGORY
            </button>
          </div>

        </div>
      )}

    </div>
  );
};


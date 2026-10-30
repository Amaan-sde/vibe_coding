import React, { useState, useEffect } from "react";
import { Navbar, NavPage } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { HomePage } from "./pages/Home/HomePage";
import { ExploreSpacePage } from "./pages/ExploreSpace/ExploreSpacePage";
import { ISROMissionsPage } from "./pages/ISRO/ISROMissionsPage";
import { SpaceLabPage } from "./pages/SpaceLab/SpaceLabPage";
import { KnowledgeHubPage } from "./pages/KnowledgeHub/KnowledgeHubPage";
import { SpaceQuizPage } from "./pages/Quiz/SpaceQuizPage";
import { EducatorModePage } from "./pages/EducatorMode/EducatorModePage";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>("home");
  const [labInitialModule, setLabInitialModule] = useState<"solar" | "gravity" | "rocket" | "satellite">("rocket");

  // Sync scroll on page transition
  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectLabModule = (module: "solar" | "gravity" | "rocket" | "satellite") => {
    setLabInitialModule(module);
    setCurrentPage("laboratory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      className="min-h-screen bg-[#000000] text-white font-sans flex flex-col justify-between overflow-x-hidden selection:bg-teal-brand selection:text-black"
      id="why-space-root"
    >
      {/* Universal Responsive Navbar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
      />

      {/* Main Page Viewport with Page Transitions */}
      <main className="flex-1 w-full" id="main-content-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {currentPage === "home" && (
              <HomePage 
                onNavigate={handleNavigate} 
                onSelectLabModule={handleSelectLabModule} 
              />
            )}

            {currentPage === "explore" && (
              <ExploreSpacePage 
                onNavigateISRO={() => handleNavigate("isro")}
                onNavigateLab={() => handleNavigate("laboratory")}
                onNavigateKnowledge={() => handleNavigate("knowledge")}
              />
            )}

            {currentPage === "isro" && (
              <ISROMissionsPage />
            )}

            {currentPage === "laboratory" && (
              <SpaceLabPage 
                initialModule={labInitialModule} 
              />
            )}

            {currentPage === "knowledge" && (
              <KnowledgeHubPage />
            )}

            {currentPage === "quiz" && (
              <SpaceQuizPage />
            )}

            {currentPage === "educator" && (
              <EducatorModePage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Professional STEM Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

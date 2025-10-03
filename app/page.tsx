'use client';

import { useState, useCallback } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Scene } from "@/components/canvas/Scene";
import { HorizontalScrollWithProgress } from "@/components/dom/HorizontalScrollWithProgress";
import { LoadingScreen } from "@/components/dom/LoadingScreen";
import { CursorTrail } from "@/components/dom/CursorTrail";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0); // Start at phase 0 (Phase 1 in UI)
  const [scrollProgress, setScrollProgress] = useState(0); // Will be set by HorizontalScroll initialization

  const handlePhaseChange = useCallback((phase: number) => {
    setCurrentPhase(phase);
  }, []);

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
  }, []);

  if (!hasEntered) {
    return <LoadingScreen onComplete={handleEnter} />;
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950">
      {/* Ambient background glow effects - more subtle for better contrast */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[120px]" />
      </div>
      
      {/* Fixed 3D Canvas with camera animation driven by scroll */}
      <Scene phase={currentPhase} scrollProgress={scrollProgress} />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Horizontal scrolling content */}
      <HorizontalScrollWithProgress 
        onPhaseChange={handlePhaseChange}
        onScrollProgress={handleScrollProgress}
      />

      {/* Cursor trail effect */}
      <CursorTrail />
    </main>
  );
}

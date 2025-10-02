'use client';

import { useState, useCallback } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Scene } from "@/components/canvas/Scene";
import { HorizontalScrollWithProgress } from "@/components/dom/HorizontalScrollWithProgress";
import { LoadingScreen } from "@/components/dom/LoadingScreen";

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
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Ambient background glow effects - full screen */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[100px]" />
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
    </main>
  );
}

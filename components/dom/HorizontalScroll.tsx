'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollBasedContent } from './ScrollBasedContent';

const totalPhases = 5;

interface HorizontalScrollProps {
  onPhaseChange: (phase: number) => void;
}

export function HorizontalScroll({ onPhaseChange }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Use deltaY (vertical scroll) for horizontal movement - moderate sensitivity
      const delta = (e.deltaY || e.deltaX) * 0.8; // Reduced from 2x to 0.8x
      
      // Direct scroll without gsap for immediate response
      container.scrollLeft += delta;
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // After scrolling stops, gently snap to nearest phase
      scrollTimeout = setTimeout(() => {
        const phaseWidth = container.scrollWidth / phases.length;
        const currentScroll = container.scrollLeft;
        const targetPhase = Math.round(currentScroll / phaseWidth);
        const targetScroll = phaseWidth * targetPhase;
        
        // Only snap if we're close to a phase boundary (within 15%)
        const distanceFromTarget = Math.abs(currentScroll - targetScroll);
        const threshold = phaseWidth * 0.15;
        
        if (distanceFromTarget < threshold) {
          gsap.to(container, {
            scrollLeft: targetScroll,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      }, 400); // Longer delay before snapping
    };

    const handleTouchStart = (e: TouchEvent) => {
      isScrolling = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isScrolling = false;
    };

    // Update current phase and scroll progress
    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const phaseWidth = container.scrollWidth / totalPhases;
      
      // Calculate overall scroll progress (0 to 1)
      const progress = maxScroll > 0 ? scrollPosition / maxScroll : 0;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
      
      // Update current phase
      const newPhase = Math.round(scrollPosition / phaseWidth);
      if (newPhase !== currentPhase && newPhase >= 0 && newPhase < totalPhases) {
        setCurrentPhase(newPhase);
        onPhaseChange(newPhase);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentPhase, onPhaseChange]);

  const scrollToPhase = (phaseIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const phaseWidth = container.scrollWidth / totalPhases;
    const targetScroll = phaseWidth * phaseIndex;

    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 1,
      ease: 'power3.inOut',
    });
  };

  return (
    <>
      {/* Scroll-based content with smooth fades */}
      <ScrollBasedContent containerRef={containerRef} currentPhase={currentPhase} />
      
      {/* Pass scroll progress to parent for camera control */}
      {typeof window !== 'undefined' && (
        <style dangerouslySetInnerHTML={{
          __html: `:root { --scroll-progress: ${scrollProgress}; }`
        }} />
      )}
      
      {/* Phase indicator at top */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {Array.from({ length: totalPhases }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPhase(index)}
            className="group relative"
            aria-label={`Go to phase ${index + 1}`}
          >
            {/* Dot */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentPhase
                  ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                  : index < currentPhase
                  ? 'bg-cyan-600/50'
                  : 'bg-gray-600/30'
              }`}
            />
            
            {/* Connecting line */}
            {index < totalPhases - 1 && (
              <div
                className={`absolute top-1/2 left-full -translate-y-1/2 w-12 h-0.5 transition-all duration-500 ${
                  index < currentPhase
                    ? 'bg-gradient-to-r from-cyan-600/50 to-cyan-600/30'
                    : 'bg-gray-600/20'
                }`}
              />
            )}

            {/* Hover label */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <span className="text-xs text-gray-400">Phase {index + 1}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Horizontal scroll container - invisible spacer */}
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-x-scroll overflow-y-hidden scrollbar-hide pointer-events-auto"
        style={{ scrollSnapType: 'none' }}
      >
        <div className="h-full" style={{ width: `${totalPhases * 100}vw` }} />
      </div>
    </>
  );
}


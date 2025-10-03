'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollBasedContent } from './ScrollBasedContent';

const totalPhases = 5;

interface HorizontalScrollWithProgressProps {
  onPhaseChange: (phase: number) => void;
  onScrollProgress: (progress: number) => void;
}

export function HorizontalScrollWithProgress({ onPhaseChange, onScrollProgress }: HorizontalScrollWithProgressProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize at Phase 0 (shows as "Phase 1" in UI) on first load
    if (!hasInitialized) {
      // Use setTimeout to ensure container is fully rendered
      setTimeout(() => {
        const phaseWidth = container.scrollWidth / totalPhases;
        container.scrollLeft = 0; // Start at phase 0 (first phase)
        
        // Calculate initial scroll progress
        const maxScroll = container.scrollWidth - container.clientWidth;
        const progress = 0; // Start at beginning
        
        setCurrentPhase(0);
        onPhaseChange(0);
        onScrollProgress(progress);
        setHasInitialized(true);
      }, 100);
    }

    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Improved sensitivity - respond to both deltaY and deltaX
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const scrollAmount = delta * 1.2; // Increased for better responsiveness
      
      container.scrollLeft += scrollAmount;
      
      clearTimeout(scrollTimeout);
      
      // Reduced delay for snappier response
      scrollTimeout = setTimeout(() => {
        const phaseWidth = container.scrollWidth / totalPhases;
        const currentScroll = container.scrollLeft;
        const targetPhase = Math.round(currentScroll / phaseWidth);
        const targetScroll = phaseWidth * targetPhase;
        
        const distanceFromTarget = Math.abs(currentScroll - targetScroll);
        const threshold = phaseWidth * 0.2; // Slightly larger threshold
        
        // Only snap if close to a phase boundary
        if (distanceFromTarget < threshold) {
          gsap.to(container, {
            scrollLeft: targetScroll,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      }, 300); // Reduced from 400ms
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

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const phaseWidth = container.scrollWidth / totalPhases;
      
      // Calculate overall scroll progress (0 to 1)
      const progress = maxScroll > 0 ? scrollPosition / maxScroll : 0;
      onScrollProgress(Math.max(0, Math.min(1, progress)));
      
      // Update current phase - use floor + threshold for accurate phase detection
      // Each phase occupies exactly phaseWidth of scroll space
      const exactPhase = scrollPosition / phaseWidth;
      const newPhase = Math.min(Math.floor(exactPhase + 0.5), totalPhases - 1); // Changed to 0.5 for midpoint switching
      
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

    // Initial scroll position check
    handleScroll();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentPhase, onPhaseChange, onScrollProgress, hasInitialized]);

  const scrollToPhase = (phaseIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const phaseWidth = container.scrollWidth / totalPhases;
    const targetScroll = phaseWidth * phaseIndex;

    // Update phase and progress immediately for instant text sync
    setCurrentPhase(phaseIndex);
    onPhaseChange(phaseIndex);
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? targetScroll / maxScroll : 0;
    onScrollProgress(Math.max(0, Math.min(1, progress)));

    // Then animate the scroll
    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 1,
      ease: 'power3.inOut',
      onUpdate: () => {
        // Update progress during animation for smooth camera movement
        const currentScroll = container.scrollLeft;
        const currentProgress = maxScroll > 0 ? currentScroll / maxScroll : 0;
        onScrollProgress(Math.max(0, Math.min(1, currentProgress)));
      },
    });
  };

  return (
    <>
      <ScrollBasedContent containerRef={containerRef} currentPhase={currentPhase} />
      
      {/* Phase indicator dots */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center">
        {Array.from({ length: totalPhases }).map((_, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => scrollToPhase(index)}
              className="group relative"
              aria-label={`Go to phase ${index + 1}`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-700 ease-in-out ${
                  index === currentPhase
                    ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                    : index < currentPhase
                    ? 'bg-cyan-600/50'
                    : 'bg-gray-600/30'
                }`}
              />

              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                <span className="text-xs text-gray-400">Phase {index + 1}</span>
              </div>
            </button>
            
            {/* Only show connecting line BETWEEN dots, not after the last dot */}
            {index < 4 && (
              <div
                className={`w-12 h-0.5 mx-3 transition-all duration-700 ease-in-out ${
                  index < currentPhase
                    ? 'bg-gradient-to-r from-cyan-600/50 to-cyan-600/30'
                    : 'bg-gray-600/20'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Invisible scroll container */}
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


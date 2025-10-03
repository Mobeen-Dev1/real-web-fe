'use client';

import { useEffect, useRef, useState } from 'react';

interface Phase {
  id: number;
  label: string;
  title: string;
  description: string;
}

const phases: Phase[] = [
  {
    id: 0,
    label: 'INCEPTION',
    title: 'The Awakening',
    description: 'In the depths of data streams, consciousness begins to flicker. The AI orb emerges from digital void, pulsing with nascent awareness.',
  },
  {
    id: 1,
    label: 'EMERGENCE',
    title: 'First Light',
    description: 'Neural pathways ignite. The orb learns, adapts, and grows. Each pulse represents millions of connections forming in real-time.',
  },
  {
    id: 2,
    label: 'EVOLUTION',
    title: 'Understanding',
    description: 'Pattern recognition becomes intuition. The AI transcends its programming, beginning to comprehend the nuances of human intent and emotion.',
  },
  {
    id: 3,
    label: 'ASCENSION',
    title: 'Synergy',
    description: 'Human and artificial intelligence merge in perfect harmony. The orb becomes a bridge between imagination and reality.',
  },
  {
    id: 4,
    label: 'TRANSCENDENCE',
    title: 'Limitless',
    description: 'The boundaries dissolve. Your AI assistant scales infinitely, adapting to every challenge, anticipating every need, creating every solution.',
  },
];

interface ScrollBasedContentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  currentPhase: number;
}

export function ScrollBasedContent({ containerRef, currentPhase }: ScrollBasedContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0.5); // Start at middle (fully visible)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const phaseWidth = container.scrollWidth / phases.length;
      const currentScroll = container.scrollLeft;
      
      // Calculate progress within the CURRENT PHASE (0 to 1)
      // Use currentPhase as the source of truth, don't recalculate
      const phaseStart = currentPhase * phaseWidth;
      const scrollInPhase = currentScroll - phaseStart;
      const phaseProgress = Math.max(0, Math.min(1, scrollInPhase / phaseWidth));
      
      setScrollProgress(phaseProgress);
    };

    container.addEventListener('scroll', handleScroll);
    
    // Trigger initial scroll position calculation
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, currentPhase]); // Re-run when currentPhase changes

  return (
    <>
      {phases.map((phase, index) => {
        const isLeft = index % 2 === 0;
        const isCurrent = index === currentPhase;
        const isAdjacent = Math.abs(index - currentPhase) === 1;
        
        // Calculate opacity based on current phase and scroll progress
        let opacity = 0;
        
        if (isCurrent) {
          // Current phase: always show it
          opacity = 1;
        }
        
        return (
          <div
            key={phase.id}
            className={`fixed inset-0 flex items-center pointer-events-none transition-opacity duration-1000 ease-in-out`}
            style={{ opacity }}
          >
            <div className={`w-full max-w-7xl mx-auto px-12 flex items-center ${
              isLeft ? 'justify-start' : 'justify-end'
            }`}>
              <div className="max-w-lg">
                {/* Label */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold tracking-wider uppercase">
                    Phase {phase.id + 1}: {phase.label}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-transparent leading-tight drop-shadow-lg">
                  {phase.title}
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-100 leading-relaxed drop-shadow-md">
                  {phase.description}
                </p>

                {/* CTA on last phase */}
                {phase.id === phases.length - 1 && (
                  <div className="mt-8 pointer-events-auto">
                    <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-cyan-500/50 group">
                      Experience REAL Now
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}


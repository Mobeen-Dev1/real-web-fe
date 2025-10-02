'use client';

interface PhaseIndicatorProps {
  currentPhase: number;
  totalPhases: number;
  onPhaseClick: (phase: number) => void;
}

export function PhaseIndicator({ currentPhase, totalPhases, onPhaseClick }: PhaseIndicatorProps) {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
      {Array.from({ length: totalPhases }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPhaseClick(index)}
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
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="text-xs text-gray-400">Phase {index + 1}</span>
          </div>
        </button>
      ))}
    </div>
  );
}


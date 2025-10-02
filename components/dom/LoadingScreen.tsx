'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showClickToEnter, setShowClickToEnter] = useState(false);

  useEffect(() => {
    // Simulate resource loading with progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          setTimeout(() => setShowClickToEnter(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Loading egg/orb animation */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Pulsing orb */}
          <motion.div
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Inner glow */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-500/40 blur-md" />
            
            {/* Core */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400" />
          </motion.div>

          {/* Orbiting particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                x: -4,
                y: -4,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
            >
              <div
                className="w-2 h-2 bg-cyan-400 rounded-full blur-sm"
                style={{
                  transform: `translateX(${60 + i * 10}px)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading text and progress */}
        {!showClickToEnter && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-light text-white/90 mb-4 tracking-wider">
              LOADING {Math.round(loadingProgress)}%
            </h2>
            
            {/* Progress bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <p className="mt-6 text-sm text-white/50 tracking-widest">
              PREPARING YOUR EXPERIENCE
            </p>
          </motion.div>
        )}

        {/* Click to enter */}
        {showClickToEnter && (
          <motion.div
            className="text-center cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleEnter}
          >
            <motion.h2
              className="text-3xl font-light text-white mb-6 tracking-wider"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CLICK TO ENTER
            </motion.h2>

            <motion.div
              className="w-16 h-16 mx-auto rounded-full border-2 border-white/30 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-8 h-8 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>

            <p className="mt-8 text-xs text-white/40 tracking-widest">
              HEADPHONES RECOMMENDED
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}


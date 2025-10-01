'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    }).from(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5'
    );
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-5xl mx-auto z-10">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent leading-tight"
        >
          AI That Awakens
          <br />
          Possibilities
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
        >
          Experience the future of intelligent assistance with our advanced AI platform
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}


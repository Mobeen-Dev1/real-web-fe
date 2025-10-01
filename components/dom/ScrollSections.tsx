'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 'problem',
    title: 'The Challenge',
    description: 'In a world of information overload, finding intelligent, personalized assistance that truly understands your needs is increasingly difficult.',
    gradient: 'from-red-500/20 to-orange-500/20',
  },
  {
    id: 'solution',
    title: 'Our Solution',
    description: 'REAL introduces LEA, an AI assistant that awakens to your unique requirements, learning and adapting to provide seamless, intelligent support.',
    gradient: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    id: 'benefits',
    title: 'Transform Your Workflow',
    description: 'Experience unprecedented productivity with an AI that scales with your ambitions, providing instant insights and automating complex tasks.',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
];

export function ScrollSections() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on background gradient
      gsap.to(section.querySelector('.gradient-bg'), {
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={addToRefs}
          className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        >
          {/* Animated gradient background */}
          <div
            className={`gradient-bg absolute inset-0 bg-gradient-to-br ${section.gradient} blur-3xl opacity-30`}
          ></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {section.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {section.description}
            </p>

            {index === sections.length - 1 && (
              <button className="mt-12 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-200 shadow-2xl hover:shadow-indigo-500/50">
                Get Started Now
              </button>
            )}
          </div>
        </section>
      ))}
    </>
  );
}


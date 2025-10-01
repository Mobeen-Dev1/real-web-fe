'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Scene } from "@/components/canvas/Scene";
import { HeroSection } from "@/components/dom/HeroSection";
import { ScrollSections } from "@/components/dom/ScrollSections";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed 3D Canvas Background */}
      <Scene />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <ScrollSections />
      </div>
    </main>
  );
}

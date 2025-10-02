'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AIOrb } from './AIOrb';
import { CameraRig } from './CameraRig';
import { Environment } from '@react-three/drei';

interface SceneProps {
  phase: number;
  scrollProgress: number; // 0 to 1 across all phases
}

export function Scene({ phase, scrollProgress }: SceneProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, -1, 7], fov: 50 }}
        className="w-full h-full"
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} />
          <AIOrb phase={phase} />
          <ambientLight intensity={0.3} />
          <Environment preset="night" />
          {/* Dramatic lighting that follows camera */}
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <directionalLight position={[-5, -5, 5]} intensity={0.3} color="#0099cc" />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
        </Suspense>
      </Canvas>
    </div>
  );
}


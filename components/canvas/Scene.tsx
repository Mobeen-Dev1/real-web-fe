'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AIOrb } from './AIOrb';
import { CameraController } from './CameraController';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      className="fixed inset-0 pointer-events-none"
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <CameraController />
        <AIOrb />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
      </Suspense>
    </Canvas>
  );
}


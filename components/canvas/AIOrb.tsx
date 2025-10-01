'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Mesh } from 'three';

export function AIOrb() {
  const meshRef = useRef<Mesh>(null);
  const pulseRef = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Pulsing animation
    pulseRef.current += 0.02;
    const scale = 1 + Math.sin(pulseRef.current) * 0.1;
    meshRef.current.scale.setScalar(scale);

    // Slow rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#4f46e5"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}


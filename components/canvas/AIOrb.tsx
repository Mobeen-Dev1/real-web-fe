'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Sparkles } from '@react-three/drei';
import { Mesh, Color } from 'three';
import * as THREE from 'three';

interface AIOrbProps {
  phase?: number;
}

export function AIOrb({ phase = 0 }: AIOrbProps) {
  const meshRef = useRef<Mesh>(null);
  const innerMeshRef = useRef<Mesh>(null);
  const outerRingRef = useRef<Mesh>(null);
  const pulseRef = useRef(0);

  // Phase-based colors (matching reference images)
  const phaseColors = useMemo(() => [
    { main: '#00d9ff', glow: '#0099cc', inner: '#006699' }, // Phase 0: Cyan
    { main: '#00ffcc', glow: '#00ccaa', inner: '#008877' }, // Phase 1: Teal
    { main: '#6366f1', glow: '#4f46e5', inner: '#3730a3' }, // Phase 2: Indigo
    { main: '#a855f7', glow: '#9333ea', inner: '#7e22ce' }, // Phase 3: Purple
    { main: '#ec4899', glow: '#db2777', inner: '#be185d' }, // Phase 4: Pink
  ], []);

  // Phase-based sizes - orb evolves/grows with each phase (starting small like Hatom's egg)
  const phaseSizes = useMemo(() => [
    { inner: 0.4, main: 0.7, ring1: 1.0, ring2: 1.2, ring3: 1.4 }, // Phase 0: Tiny egg/inception
    { inner: 0.6, main: 0.9, ring1: 1.3, ring2: 1.5, ring3: 1.7 }, // Phase 1: Hatching/growing
    { inner: 0.8, main: 1.1, ring1: 1.6, ring2: 1.8, ring3: 2.0 }, // Phase 2: Emerging
    { inner: 1.0, main: 1.3, ring1: 1.9, ring2: 2.1, ring3: 2.3 }, // Phase 3: Developing
    { inner: 1.2, main: 1.5, ring1: 2.2, ring2: 2.4, ring3: 2.6 }, // Phase 4: Fully evolved
  ], []);

  const currentColors = phaseColors[phase % phaseColors.length];
  const currentSizes = phaseSizes[phase % phaseSizes.length];

  useFrame((state) => {
    if (!meshRef.current || !innerMeshRef.current || !outerRingRef.current) return;

    // Pulsing animation - more dramatic
    pulseRef.current += 0.015;
    const scale = 1 + Math.sin(pulseRef.current) * 0.15;
    meshRef.current.scale.setScalar(scale);
    
    // Inner orb counter-pulse
    const innerScale = 1 + Math.sin(pulseRef.current + Math.PI) * 0.1;
    innerMeshRef.current.scale.setScalar(innerScale);

    // Slow rotation with varying speeds per phase
    const rotationSpeed = 0.1 + (phase * 0.02);
    meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
    meshRef.current.rotation.y = state.clock.elapsedTime * (rotationSpeed * 1.5);
    
    innerMeshRef.current.rotation.x = -state.clock.elapsedTime * rotationSpeed * 0.5;
    innerMeshRef.current.rotation.y = -state.clock.elapsedTime * rotationSpeed;

    // Ring rotation
    outerRingRef.current.rotation.z = state.clock.elapsedTime * 0.3;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Sparkles/particles around orb - scales with size */}
      <Sparkles
        count={50 + phase * 10}
        scale={currentSizes.ring3 * 2}
        size={2 + phase * 0.5}
        speed={0.3}
        color={currentColors.main}
        opacity={0.6}
      />

      {/* Inner core - grows with phase */}
      <Sphere ref={innerMeshRef} args={[currentSizes.inner, 64, 64]}>
        <meshStandardMaterial
          color={currentColors.inner}
          emissive={currentColors.inner}
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.9}
        />
      </Sphere>

      {/* Main orb - grows with phase */}
      <Sphere ref={meshRef} args={[currentSizes.main, 64, 64]}>
        <meshPhysicalMaterial
          color={currentColors.main}
          emissive={currentColors.glow}
          emissiveIntensity={1.5}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.5}
        />
      </Sphere>

      {/* Outer glow rings - grow with phase */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[currentSizes.ring1, 0.08, 16, 100]} />
        <meshBasicMaterial 
          color={currentColors.main} 
          transparent 
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Second ring at different angle */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[currentSizes.ring2, 0.06, 16, 100]} />
        <meshBasicMaterial 
          color={currentColors.glow} 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Third ring for extra drama */}
      <mesh rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[currentSizes.ring3, 0.05, 16, 100]} />
        <meshBasicMaterial 
          color={currentColors.main} 
          transparent 
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ambient point lights - stronger for bigger orb */}
      <pointLight position={[0, 0, 0]} intensity={3} color={currentColors.main} distance={15} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color={currentColors.glow} distance={12} />
      <pointLight position={[-3, -3, 3]} intensity={1.5} color={currentColors.glow} distance={12} />
      <pointLight position={[0, 4, 2]} intensity={1} color={currentColors.main} distance={10} />
    </group>
  );
}


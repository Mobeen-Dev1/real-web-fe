'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, MathUtils } from 'three';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number; // 0 to 1 across all phases
}

export function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3(0, 0, 0));
  
  // Define camera keyframes - multiple positions per phase for cinematic movement WITHIN each stage
  const cameraKeyframes = [
    // Phase 0: Initial Discovery - Front view with slow approach
    { position: new Vector3(0, -1.5, 9), lookAt: new Vector3(0, 0, 0), fov: 55 },
    { position: new Vector3(0, -1, 7.5), lookAt: new Vector3(0, -0.2, 0), fov: 52 },
    { position: new Vector3(0, -0.5, 7), lookAt: new Vector3(0, 0, 0), fov: 50 },
    
    // Phase 1: Awakening - Right side orbit with elevation
    { position: new Vector3(3, 0, 6), lookAt: new Vector3(0, 0, 0), fov: 49 },
    { position: new Vector3(5, 0.5, 5), lookAt: new Vector3(0, 0.2, 0), fov: 48 },
    { position: new Vector3(6, 1, 4.5), lookAt: new Vector3(0, 0, 0), fov: 47 },
    
    // Phase 2: Evolution - Top-down dramatic angles
    { position: new Vector3(5, 2, 5), lookAt: new Vector3(0, 0.3, 0), fov: 47 },
    { position: new Vector3(4, 3, 5), lookAt: new Vector3(0, 0.5, 0), fov: 46 },
    { position: new Vector3(3, 3.5, 5.5), lookAt: new Vector3(0, 0.5, 0), fov: 45 },
    
    // Phase 3: Transformation - Left side sweep
    { position: new Vector3(-3, 2.5, 6), lookAt: new Vector3(0, 0.3, 0), fov: 46 },
    { position: new Vector3(-5, 2, 5), lookAt: new Vector3(0, 0, 0), fov: 45 },
    { position: new Vector3(-6, 1.5, 4.5), lookAt: new Vector3(0, -0.2, 0), fov: 44 },
    
    // Phase 4: Ascension - Pull back reveal
    { position: new Vector3(-3, 2, 7), lookAt: new Vector3(0, 0, 0), fov: 48 },
    { position: new Vector3(0, 2.5, 8), lookAt: new Vector3(0, 0.2, 0), fov: 50 },
    { position: new Vector3(0, 2, 9), lookAt: new Vector3(0, 0, 0), fov: 52 },
  ];

  useEffect(() => {
    // Map scroll progress (0-1) to keyframe index
    const totalKeyframes = cameraKeyframes.length;
    const keyframeProgress = scrollProgress * (totalKeyframes - 1);
    const currentKeyframeIndex = Math.floor(keyframeProgress);
    const nextKeyframeIndex = Math.min(currentKeyframeIndex + 1, totalKeyframes - 1);
    const keyframeT = keyframeProgress - currentKeyframeIndex; // 0 to 1 between keyframes

    // Get current and next keyframes
    const current = cameraKeyframes[currentKeyframeIndex];
    const next = cameraKeyframes[nextKeyframeIndex];

    // Smooth interpolation with ease in-out for cinematic feel
    const t = MathUtils.smoothstep(keyframeT, 0, 1);

    // Interpolate position
    targetPosition.current.lerpVectors(current.position, next.position, t);
    
    // Interpolate lookAt
    targetLookAt.current.lerpVectors(current.lookAt, next.lookAt, t);

    // Interpolate FOV
    const targetFov = MathUtils.lerp(current.fov, next.fov, t);
    
    // Update camera FOV smoothly
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }
  }, [scrollProgress, camera]);

  useFrame(() => {
    // Smoothly move camera to target position (reduced lerp for smoother, more cinematic movement)
    camera.position.lerp(targetPosition.current, 0.04);
    
    // Smoothly rotate camera to look at target (reduced lerp for butter-smooth rotation)
    const currentLookAt = new Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    
    currentLookAt.lerp(targetLookAt.current, 0.04);
    camera.lookAt(currentLookAt);
  });

  return null;
}


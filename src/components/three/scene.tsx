"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense } from "react";

function SceneContent() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshStandardMaterial
            color="#2563EB"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </>
  );
}

interface ThreeSceneProps {
  className?: string;
}

/**
 * Base Three.js scene component.
 * Replace <SceneContent /> internals with your 3D scene.
 */
export function ThreeScene({ className }: ThreeSceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

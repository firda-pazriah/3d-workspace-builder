"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Room from "./Room";

export default function Workspace3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{
          position: [8, 7, 8],
          fov: 40,
        }}
      >
        <ambientLight intensity={0.7} />

        <directionalLight position={[5, 8, 5]} intensity={2} castShadow />

        <Room />

        <OrbitControls
          target={[0, 1, 0]}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}

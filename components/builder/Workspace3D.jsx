"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MOUSE } from "three";

import { DEFAULT_CAMERA } from "@/data/categories";

import Room from "./Room";
import WorkspaceObject from "./WorkspaceObject";
import EmptyFurnitureSlots from "./EmptyFurnitureSlots";
import CameraController from "./CameraController";

export default function Workspace3D() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: DEFAULT_CAMERA.position,
          fov: 40,
        }}
      >
        <color attach="background" args={["#dee4e8"]} />
        <ambientLight intensity={0.7} />

        <directionalLight
          position={[6, 12, 6]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={7}
          shadow-camera-bottom={-7}
        />

        <Room />

        <WorkspaceObject />

        <EmptyFurnitureSlots />

        <CameraController />

        <OrbitControls
          makeDefault
          target={DEFAULT_CAMERA.target}
          enableZoom
          minDistance={2}
          maxDistance={18}
          enableRotate
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          minPolarAngle={0.15}
          maxPolarAngle={Math.PI / 2.05}
          enablePan
          // Scroll-wheel drag pans (default is zoom); the wheel still zooms.
          mouseButtons={{
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.PAN,
            RIGHT: MOUSE.PAN,
          }}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

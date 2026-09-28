"use client";

import * as THREE from "three";

import { cm } from "@/data/units";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const WARM = "#ffd9a0";
const BULB_OFF = "#e4e4e7";
const BULB_ON = "#fff3d6";

// The walls are 7 units high; the lamp hangs from their top.
const CEILING = 7;

// Dome pendant in the middle of the room. It hangs high so it stays out of
// the left-wall camera view (LEFT_WALL_CAMERA), which sits just below it.
export function CeilingLamp() {
  const isNight = useWorkspaceStore((state) => state.isNight);

  const rim = CEILING - cm(20);

  return (
    <group>
      {/* CANOPY + STEM */}
      <mesh position={[0, CEILING - cm(0.75), 0]}>
        <cylinderGeometry args={[cm(6), cm(6), cm(1.5), 24]} />
        <meshStandardMaterial color="#1f1f22" roughness={0.4} />
      </mesh>

      <mesh position={[0, CEILING - cm(2.5), 0]}>
        <cylinderGeometry args={[cm(0.5), cm(0.5), cm(5), 8]} />
        <meshStandardMaterial color="#1f1f22" />
      </mesh>

      {/* DOME SHADE */}
      <mesh position={[0, rim, 0]}>
        <sphereGeometry
          args={[cm(16), 32, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          color="#1f1f22"
          metalness={0.5}
          roughness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* BULB */}
      <mesh position={[0, rim - cm(1), 0]}>
        <sphereGeometry args={[cm(4), 16, 12]} />
        <meshBasicMaterial color={isNight ? BULB_ON : BULB_OFF} />
      </mesh>

      <pointLight
        position={[0, rim - cm(4), 0]}
        intensity={isNight ? 14 : 0}
        color={WARM}
      />
    </group>
  );
}

// Mushroom table lamp, about 23 cm tall, base at y = 0.
export function TableLamp() {
  const isNight = useWorkspaceStore((state) => state.isNight);

  return (
    <group>
      {/* BASE + STEM */}
      <mesh position={[0, cm(0.75), 0]} castShadow receiveShadow>
        <cylinderGeometry args={[cm(5), cm(5.5), cm(1.5), 32]} />
        <meshStandardMaterial color="#f1ece5" roughness={0.5} />
      </mesh>

      <mesh position={[0, cm(8), 0]} castShadow>
        <cylinderGeometry args={[cm(1.2), cm(1.6), cm(14), 16]} />
        <meshStandardMaterial color="#f1ece5" roughness={0.5} />
      </mesh>

      {/* SHADE: glows warm when on. */}
      <mesh position={[0, cm(14), 0]} castShadow>
        <sphereGeometry
          args={[cm(9), 32, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          color="#f1ece5"
          roughness={0.6}
          emissive={WARM}
          emissiveIntensity={isNight ? 0.7 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* BULB */}
      <mesh position={[0, cm(14), 0]}>
        <sphereGeometry args={[cm(2.5), 12, 8]} />
        <meshBasicMaterial color={isNight ? BULB_ON : BULB_OFF} />
      </mesh>

      <pointLight
        position={[0, cm(12), 0]}
        intensity={isNight ? 1.5 : 0}
        distance={2.5}
        color={WARM}
      />
    </group>
  );
}

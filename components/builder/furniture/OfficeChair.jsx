import * as THREE from "three";

import { cm } from "@/data/units";

export const CHAIR_SPECS = {
  // Bali: black mesh chair with headrest.
  "ergonomic-office-chair": {
    frame: "#1f1f22",
    base: "#2b2b2e",
    mesh: "#3a3d42",
    seat: "#2d2f33",
    headrest: true,
  },
  // Furradec Haru Plus: light frame and grey mesh, no headrest (the look is
  // approximated from the product photos).
  "ergonomic-chair-furradec-cm": {
    frame: "#e4e4e7",
    base: "#d4d4d8",
    mesh: "#9ca3af",
    seat: "#6b7280",
    headrest: false,
  },
};

const SPOKES = [0, 1, 2, 3, 4].map((i) => (i * Math.PI * 2) / 5);

// Mesh-back ergonomic chair, seat top at 48 cm. Faces local -z.
export default function OfficeChair({ spec }) {
  const METAL = { color: spec.base, metalness: 0.6, roughness: 0.35 };
  const PLASTIC = { color: spec.frame, roughness: 0.6 };
  const MESH = {
    color: spec.mesh,
    roughness: 0.9,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
  };

  return (
    <group>
      {/* 5-STAR BASE + CASTERS */}
      {SPOKES.map((angle) => (
        <group key={angle} rotation={[0, angle, 0]}>
          <mesh position={[0, cm(10), cm(16)]} castShadow>
            <boxGeometry args={[cm(5), cm(3), cm(32)]} />
            <meshStandardMaterial {...METAL} />
          </mesh>

          <mesh
            position={[0, cm(3), cm(31)]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[cm(3), cm(3), cm(4), 16]} />
            <meshStandardMaterial {...PLASTIC} />
          </mesh>
        </group>
      ))}

      {/* GAS LIFT */}
      <mesh position={[0, cm(26), 0]} castShadow>
        <cylinderGeometry args={[cm(2.5), cm(3.5), cm(30), 16]} />
        <meshStandardMaterial {...METAL} />
      </mesh>

      {/* SEAT */}
      <mesh position={[0, cm(44), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(50), cm(8), cm(50)]} />
        <meshStandardMaterial color={spec.seat} roughness={0.85} />
      </mesh>

      {/* ARMRESTS */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * cm(27), 0, cm(4)]}>
          <mesh position={[0, cm(57), 0]} castShadow>
            <boxGeometry args={[cm(3), cm(22), cm(4)]} />
            <meshStandardMaterial {...PLASTIC} />
          </mesh>

          <mesh position={[0, cm(69), cm(-3)]} castShadow>
            <boxGeometry args={[cm(7), cm(2.5), cm(26)]} />
            <meshStandardMaterial {...PLASTIC} />
          </mesh>
        </group>
      ))}

      {/* BACKREST, slightly reclined */}
      <group position={[0, cm(52), cm(24)]} rotation={[-0.12, 0, 0]}>
        {/* spine */}
        <mesh position={[0, cm(30), cm(3)]} castShadow>
          <boxGeometry args={[cm(6), cm(66), cm(3)]} />
          <meshStandardMaterial {...PLASTIC} />
        </mesh>

        {/* frame */}
        <mesh position={[0, cm(33), 0]} castShadow>
          <boxGeometry args={[cm(48), cm(60), cm(2)]} />
          <meshStandardMaterial {...MESH} />
        </mesh>

        {/* lumbar pad */}
        <mesh position={[0, cm(14), cm(-1.5)]}>
          <boxGeometry args={[cm(30), cm(8), cm(2)]} />
          <meshStandardMaterial {...PLASTIC} />
        </mesh>

        {spec.headrest && (
          <mesh position={[0, cm(72), cm(1)]} castShadow>
            <boxGeometry args={[cm(28), cm(13), cm(5)]} />
            <meshStandardMaterial color={spec.seat} roughness={0.85} />
          </mesh>
        )}
      </group>
    </group>
  );
}

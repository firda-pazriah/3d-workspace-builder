import { cm } from "@/data/units";

// Fixed sideboard (not rentable): 112 × 45 cm, counter at 85 cm.
export const COUNTER_HEIGHT = cm(85);

export default function BackWallCabinet() {
  return (
    <group position={[0, 0, -3.94 + cm(22.5)]}>
      {/* Cabinet body */}
      <mesh position={[0, cm(41), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(112), cm(82), cm(45)]} />
        <meshStandardMaterial color="#d6b894" roughness={0.65} />
      </mesh>

      {/* Counter top */}
      <mesh position={[0, cm(83.5), cm(0.5)]} castShadow receiveShadow>
        <boxGeometry args={[cm(116), cm(3), cm(46)]} />
        <meshStandardMaterial color="#eee5da" roughness={0.45} />
      </mesh>

      {/* Doors */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * cm(27.5), cm(42), cm(22.8)]}>
          <boxGeometry args={[cm(53), cm(70), cm(1)]} />
          <meshStandardMaterial color="#cba981" />
        </mesh>
      ))}

      {/* Handles */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * cm(4), cm(48), cm(24)]}>
          <boxGeometry args={[cm(1.5), cm(14), cm(1.5)]} />
          <meshStandardMaterial
            color="#292524"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

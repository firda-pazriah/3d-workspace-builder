import { cm } from "@/data/units";

const FRAME = { color: "#E8E8E8", metalness: 0.35, roughness: 0.4 };

// 140 × 70 cm top at sitting height 73 cm (surfaceHeight in data/furniture.js).
// Length runs along local x; the user sits on the +z side.
export default function ElectricalDesk() {
  return (
    <group>
      {/* TABLE TOP, 2.5 cm */}
      <mesh position={[0, cm(71.75), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(140), cm(2.5), cm(70)]} />
        <meshStandardMaterial color="#C8956D" roughness={0.55} />
      </mesh>

      {/* LEGS, FEET and TOP BRACKETS */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * cm(60), 0, 0]}>
          <mesh position={[0, cm(36), 0]} castShadow>
            <boxGeometry args={[cm(6), cm(68), cm(5)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>

          <mesh position={[0, cm(1.5), 0]} castShadow>
            <boxGeometry args={[cm(6), cm(3), cm(62)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>

          <mesh position={[0, cm(69.5), 0]} castShadow>
            <boxGeometry args={[cm(5), cm(2), cm(60)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>
        </group>
      ))}

      {/* CROSS BEAM */}
      <mesh position={[0, cm(68), 0]} castShadow>
        <boxGeometry args={[cm(114), cm(3), cm(4)]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      {/* HEIGHT CONTROL */}
      <mesh position={[cm(50), cm(69.3), cm(33)]} castShadow>
        <boxGeometry args={[cm(12), cm(2.5), cm(4)]} />
        <meshStandardMaterial color="#242424" roughness={0.35} />
      </mesh>
    </group>
  );
}

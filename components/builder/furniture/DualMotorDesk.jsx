import { cm } from "@/data/units";

const FRAME = { color: "#1c1c1f", metalness: 0.45, roughness: 0.45 };

// 140 × 70 cm, 18 mm top at sitting height 73 cm, black steel frame with
// 3-stage lifting columns. Length runs along local x.
export default function DualMotorDesk() {
  return (
    <group>
      {/* TABLE TOP, 18 mm */}
      <mesh position={[0, cm(72.1), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(140), cm(1.8), cm(70)]} />
        <meshStandardMaterial color="#3a3a3f" roughness={0.6} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * cm(58), 0, 0]}>
          {/* FOOT */}
          <mesh position={[0, cm(1.5), 0]} castShadow>
            <boxGeometry args={[cm(7), cm(3), cm(65)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>

          {/* 3-STAGE COLUMN, narrowing towards the top */}
          <mesh position={[0, cm(15), 0]} castShadow>
            <boxGeometry args={[cm(8), cm(24), cm(10)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>

          <mesh position={[0, cm(38), 0]} castShadow>
            <boxGeometry args={[cm(7), cm(22), cm(8.5)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>

          <mesh position={[0, cm(58.5), 0]} castShadow>
            <boxGeometry args={[cm(6), cm(19), cm(7)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>

          {/* TOP BRACKET */}
          <mesh position={[0, cm(69.5), 0]} castShadow>
            <boxGeometry args={[cm(6), cm(3), cm(62)]} />
            <meshStandardMaterial {...FRAME} />
          </mesh>
        </group>
      ))}

      {/* CROSS BEAM */}
      <mesh position={[0, cm(68.5), 0]} castShadow>
        <boxGeometry args={[cm(110), cm(4), cm(5)]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      {/* KEYPAD */}
      <mesh position={[cm(50), cm(70), cm(33)]} castShadow>
        <boxGeometry args={[cm(14), cm(2.5), cm(4)]} />
        <meshStandardMaterial color="#111111" roughness={0.35} />
      </mesh>
    </group>
  );
}

import { cm } from "@/data/units";

const FRAME = { color: "#3a3b40", metalness: 0.4, roughness: 0.4 };

// Kingsmith WalkingPad R2 Pro, unfolded: 145 × 72.6 cm deck, handrail up to
// 95 cm. Belt runs along z; the handrail is at the -z end (user faces -z).
export default function WalkingPad() {
  return (
    <group>
      {/* DECK */}
      <mesh position={[0, cm(6), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(72.6), cm(12), cm(145)]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.5} />
      </mesh>

      {/* BELT */}
      <mesh position={[0, cm(12.2), cm(5)]} receiveShadow>
        <boxGeometry args={[cm(52), cm(0.5), cm(120)]} />
        <meshStandardMaterial color="#27272a" roughness={0.9} />
      </mesh>

      {/* MOTOR COVER */}
      <mesh position={[0, cm(13), cm(-63)]} castShadow>
        <boxGeometry args={[cm(72.6), cm(3), cm(18)]} />
        <meshStandardMaterial color="#a1a1aa" roughness={0.4} />
      </mesh>

      {/* FOLDING HANDRAIL */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * cm(30), cm(53), cm(-62)]}
          rotation={[0.12, 0, 0]}
          castShadow
        >
          <boxGeometry args={[cm(3), cm(84), cm(3)]} />
          <meshStandardMaterial {...FRAME} />
        </mesh>
      ))}

      <mesh position={[0, cm(94), cm(-67)]} castShadow>
        <boxGeometry args={[cm(64), cm(4), cm(6)]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      {/* LED DISPLAY */}
      <mesh position={[0, cm(96.1), cm(-67)]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[cm(12), cm(4)]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

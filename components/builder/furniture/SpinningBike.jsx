import { cm } from "@/data/units";

const FRAME = { color: "#f4f4f5", roughness: 0.45 };
const DARK = { color: "#1f1f22", roughness: 0.6 };

// Yesoul S3: 124 × 52 × 110 cm (l × w × h). Flywheel and handlebars at the
// -z end, so the rider faces -z.
export default function SpinningBike() {
  return (
    <group>
      {/* STABILISER FEET */}
      {[-52, 50].map((z) => (
        <mesh key={z} position={[0, cm(3), cm(z)]} castShadow>
          <boxGeometry args={[cm(52), cm(6), cm(8)]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
      ))}

      {/* LOWER FRAME */}
      <mesh position={[0, cm(12), 0]} castShadow>
        <boxGeometry args={[cm(8), cm(6), cm(100)]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      {/* FLYWHEEL COVER */}
      <mesh
        position={[0, cm(38), cm(-34)]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[cm(24), cm(24), cm(12), 40]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      {/* SEAT TUBE + SADDLE */}
      <mesh position={[0, cm(45), cm(22)]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[cm(7), cm(70), cm(7)]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      <mesh position={[0, cm(82), cm(33)]} castShadow>
        <boxGeometry args={[cm(17), cm(6), cm(27)]} />
        <meshStandardMaterial {...DARK} />
      </mesh>

      {/* HANDLEBAR POST + BARS */}
      <mesh position={[0, cm(62), cm(-38)]} rotation={[-0.25, 0, 0]} castShadow>
        <boxGeometry args={[cm(7), cm(75), cm(7)]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      <mesh position={[0, cm(100), cm(-44)]} castShadow>
        <boxGeometry args={[cm(46), cm(4), cm(16)]} />
        <meshStandardMaterial {...DARK} />
      </mesh>

      {/* PEDALS */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * cm(13), cm(30), cm(-8)]} castShadow>
          <boxGeometry args={[cm(9), cm(2.5), cm(11)]} />
          <meshStandardMaterial {...DARK} />
        </mesh>
      ))}
    </group>
  );
}

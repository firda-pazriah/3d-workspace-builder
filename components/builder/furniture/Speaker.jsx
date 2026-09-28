import { cm } from "@/data/units";

export const SPEAKER_SPECS = {
  // Marshall Woburn III: 40 × 31.7 × 20.3 cm, black with brass controls.
  "marshall-woburn-ii-bluetooth": { type: "woburn" },
  // HomePod 2nd gen: 16.8 cm tall, 14.2 cm across, midnight fabric.
  "apple-home-pod": { type: "homepod" },
};

function Woburn() {
  return (
    <group>
      {/* CABINET */}
      <mesh position={[0, cm(15.85), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(40), cm(31.7), cm(20.3)]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* GRILLE */}
      <mesh position={[0, cm(13), cm(10.2)]}>
        <planeGeometry args={[cm(36), cm(22)]} />
        <meshStandardMaterial color="#2b2b2b" roughness={1} />
      </mesh>

      {/* BRASS CONTROL STRIP + KNOBS */}
      <mesh position={[0, cm(28), cm(10.2)]}>
        <planeGeometry args={[cm(36), cm(4)]} />
        <meshStandardMaterial color="#b08d57" metalness={0.8} roughness={0.3} />
      </mesh>

      {[-12, -4, 4, 12].map((x) => (
        <mesh
          key={x}
          position={[cm(x), cm(28), cm(10.8)]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[cm(1.2), cm(1.2), cm(1.2), 20]} />
          <meshStandardMaterial
            color="#c9a86a"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function HomePod() {
  return (
    <group>
      <mesh position={[0, cm(8.4), 0]} castShadow>
        <cylinderGeometry args={[cm(7.1), cm(7.1), cm(16.8), 40]} />
        <meshStandardMaterial color="#2b2d31" roughness={1} />
      </mesh>

      {/* TOUCH SURFACE */}
      <mesh position={[0, cm(16.85), 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[cm(5.5), 40]} />
        <meshStandardMaterial color="#111114" roughness={0.2} />
      </mesh>
    </group>
  );
}

// Front faces +z.
export default function Speaker({ spec }) {
  return spec.type === "woburn" ? <Woburn /> : <HomePod />;
}

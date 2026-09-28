import { cm } from "@/data/units";

export const AIR_CARE_SPECS = {
  // Smart Air Purifier: ~24 × 24 × 52 cm.
  "smart-air-purifier": { type: "purifier", size: 24, height: 52 },
  // Smart Air Purifier Elite: ~31 × 31 × 77 cm, silver/white.
  "smart-air-purifier-elite": {
    type: "purifier",
    size: 31,
    height: 77,
    trim: "#c0c0c4",
  },
  // Smart Tower Fan: ~29 cm base, 110 cm tall.
  "smart-tower-fan": { type: "fan" },
};

const WHITE = { color: "#f4f4f5", roughness: 0.5 };

function Purifier({ size, height, trim = "#d4d4d8" }) {
  return (
    <group>
      {/* BODY, perforated intake around the lower part */}
      <mesh position={[0, cm(height / 2), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(size), cm(height), cm(size)]} />
        <meshStandardMaterial {...WHITE} />
      </mesh>

      <mesh position={[0, cm(height * 0.35), cm(size / 2 + 0.05)]}>
        <planeGeometry args={[cm(size - 4), cm(height * 0.55)]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.9} />
      </mesh>

      {/* TOP OUTLET GRILLE + DISPLAY */}
      <mesh
        position={[0, cm(height + 0.05), 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[cm(size - 4), cm(size - 4)]} />
        <meshStandardMaterial color={trim} metalness={0.4} roughness={0.4} />
      </mesh>

      <mesh position={[0, cm(height * 0.82), cm(size / 2 + 0.05)]}>
        <planeGeometry args={[cm(8), cm(4)]} />
        <meshStandardMaterial color="#111318" roughness={0.2} />
      </mesh>
    </group>
  );
}

function TowerFan() {
  return (
    <group>
      {/* BASE */}
      <mesh position={[0, cm(1.5), 0]} castShadow receiveShadow>
        <cylinderGeometry args={[cm(14.5), cm(14.5), cm(3), 40]} />
        <meshStandardMaterial {...WHITE} />
      </mesh>

      {/* COLUMN */}
      <mesh position={[0, cm(57), 0]} castShadow>
        <cylinderGeometry args={[cm(8), cm(8.5), cm(106), 32]} />
        <meshStandardMaterial {...WHITE} />
      </mesh>

      {/* AIR OUTLET */}
      <mesh position={[0, cm(60), cm(8.3)]}>
        <planeGeometry args={[cm(5), cm(80)]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Front faces +z.
export default function AirCare({ spec }) {
  return spec.type === "fan" ? <TowerFan /> : <Purifier {...spec} />;
}

import { cm } from "@/data/units";

export const COFFEE_SPECS = {
  // Nespresso Essenza Mini: 8.4 × 33 × 20.4 cm (w × d × h).
  "nespresso-essenza-coffee-machine": { type: "capsule" },
  // Bosch filter coffee maker: ~20 × 25 × 35 cm, black, glass carafe.
  "bosch-coffee-maker": { type: "filter" },
};

function CapsuleMachine() {
  return (
    <group>
      {/* BODY */}
      <mesh position={[0, cm(10.2), cm(-3)]} castShadow>
        <boxGeometry args={[cm(8.4), cm(20.4), cm(27)]} />
        <meshStandardMaterial color="#9f1d1d" roughness={0.35} />
      </mesh>

      {/* HEAD + OUTLET */}
      <mesh position={[0, cm(17), cm(12)]} castShadow>
        <boxGeometry args={[cm(8.4), cm(6.8), cm(6)]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.3} />
      </mesh>

      {/* DRIP TRAY */}
      <mesh position={[0, cm(1), cm(12)]} castShadow>
        <boxGeometry args={[cm(8), cm(2), cm(7)]} />
        <meshStandardMaterial color="#2b2b2e" metalness={0.5} />
      </mesh>
    </group>
  );
}

function FilterMachine() {
  return (
    <group>
      {/* BASE / HOT PLATE */}
      <mesh position={[0, cm(2), 0]} castShadow>
        <boxGeometry args={[cm(20), cm(4), cm(25)]} />
        <meshStandardMaterial color="#18181b" roughness={0.4} />
      </mesh>

      {/* WATER TANK TOWER */}
      <mesh position={[0, cm(19), cm(-7)]} castShadow>
        <boxGeometry args={[cm(20), cm(30), cm(11)]} />
        <meshStandardMaterial color="#18181b" roughness={0.4} />
      </mesh>

      {/* FILTER HEAD */}
      <mesh position={[0, cm(31), cm(4)]} castShadow>
        <boxGeometry args={[cm(20), cm(8), cm(13)]} />
        <meshStandardMaterial color="#18181b" roughness={0.4} />
      </mesh>

      {/* GLASS CARAFE */}
      <mesh position={[0, cm(12), cm(5)]}>
        <cylinderGeometry args={[cm(7), cm(7.5), cm(16), 28]} />
        <meshStandardMaterial
          color="#c7d2da"
          transparent
          opacity={0.45}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// Front faces +z.
export default function CoffeeMachine({ spec }) {
  return spec.type === "capsule" ? <CapsuleMachine /> : <FilterMachine />;
}

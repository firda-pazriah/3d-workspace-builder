import { cm } from "@/data/units";

export const KEYBOARD_SPECS = {
  // Logitech MX Keys: 43 × 13 cm, graphite.
  "logitech-mx-keyboard": {
    width: 43,
    depth: 13,
    height: 2,
    color: "#2e2f33",
    keys: "#1c1c1f",
  },
  // Apple Magic Keyboard with numeric keypad: 41.9 × 11.5 cm, silver/white.
  "apple-magic-keyboard": {
    width: 41.9,
    depth: 11.5,
    height: 1.1,
    color: "#d4d4d8",
    keys: "#f4f4f5",
  },
};

// Long side along local x, typing side toward +z.
export default function Keyboard({ spec }) {
  const { width, depth, height, color, keys } = spec;

  return (
    <group>
      <mesh position={[0, cm(height / 2), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(width), cm(height), cm(depth)]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
      </mesh>

      <mesh
        position={[0, cm(height + 0.05), 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[cm(width - 2), cm(depth - 2)]} />
        <meshStandardMaterial color={keys} roughness={0.7} />
      </mesh>
    </group>
  );
}

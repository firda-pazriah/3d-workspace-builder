import { cm } from "@/data/units";

// Real footprints (cm) of the monis.rent laptops.
export const LAPTOP_SPECS = {
  "apple-mac-book-neo": {
    width: 29.8,
    depth: 21,
    thickness: 1.3,
    color: "#d4d4d8",
  },
  "office-windows-laptop": {
    width: 36,
    depth: 24,
    thickness: 2,
    color: "#3f3f46",
  },
};

// Keyboard toward +z; the screen is hinged at the back edge, open ~110°.
export default function Laptop({ spec }) {
  const { width, depth, thickness, color } = spec;
  const screenHeight = depth - 1.5;
  const body = { color, metalness: 0.6, roughness: 0.35 };

  return (
    <group>
      {/* BASE */}
      <mesh position={[0, cm(thickness / 2), 0]} castShadow>
        <boxGeometry args={[cm(width), cm(thickness), cm(depth)]} />
        <meshStandardMaterial {...body} />
      </mesh>

      {/* KEYBOARD + TRACKPAD */}
      <mesh
        position={[0, cm(thickness + 0.05), cm(-depth * 0.12)]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[cm(width - 4), cm(depth * 0.45)]} />
        <meshStandardMaterial color="#232326" roughness={0.6} />
      </mesh>

      <mesh
        position={[0, cm(thickness + 0.05), cm(depth * 0.3)]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[cm(width * 0.4), cm(depth * 0.28)]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.2} />
      </mesh>

      {/* SCREEN */}
      <group
        position={[0, cm(thickness), cm(-depth / 2)]}
        rotation={[-0.35, 0, 0]}
      >
        <mesh position={[0, cm(screenHeight / 2), 0]} castShadow>
          <boxGeometry args={[cm(width), cm(screenHeight), cm(0.6)]} />
          <meshStandardMaterial {...body} />
        </mesh>

        <mesh position={[0, cm(screenHeight / 2), cm(0.31)]}>
          <planeGeometry args={[cm(width - 1.5), cm(screenHeight - 1.5)]} />
          <meshStandardMaterial color="#111318" roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

import * as THREE from "three";

import { cm } from "@/data/units";

// Muted book colours, drawn from DESIGN.md's signature palette.
export const BOOK_COLORS = [
  "#aa2d00", // coral
  "#0a2e0e", // forest
  "#f5e9d4", // cream
  "#d9a441", // mustard
  "#181d26", // ink
  "#a8d8c4", // mint
  "#e0e2e6", // surface strong
];

const CERAMIC = { color: "#f1ece5", roughness: 0.55 };
const LEAF = "#4f7a45";

// A book standing on its bottom edge at `x` (cm, along the shelf).
// Spine faces +z. `tilt` leans it sideways (radians).
export function Book({ x, width, height, depth = 15, color, tilt = 0 }) {
  return (
    <group position={[cm(x), 0, 0]} rotation={[0, 0, tilt]}>
      <mesh position={[0, cm(height / 2), 0]} castShadow>
        <boxGeometry args={[cm(width), cm(height), cm(depth)]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

// Upright books side by side, starting at `x` (cm) and running toward +x.
export function BookRow({ x, books }) {
  // Left edge of each book: running sum of the widths before it.
  const starts = books.map(
    (_, i) =>
      x + books.slice(0, i).reduce((sum, book) => sum + book.width + 0.2, 0),
  );

  return books.map((book, i) => (
    <Book key={i} {...book} x={starts[i] + book.width / 2} />
  ));
}

// Books lying flat, stacked, centred at `x` (cm); `children` sit on top.
export function BookStack({ x, books, children }) {
  // Bottom of each book: running sum of the thicknesses below it.
  const bottoms = books.map((_, i) =>
    books.slice(0, i).reduce((sum, book) => sum + book.thickness, 0),
  );
  const height = books.reduce((sum, book) => sum + book.thickness, 0);

  return (
    <group position={[cm(x), 0, 0]}>
      {books.map((book, i) => (
        <mesh
          key={i}
          position={[0, cm(bottoms[i] + book.thickness / 2), 0]}
          rotation={[0, book.turn ?? 0, 0]}
          castShadow
        >
          <boxGeometry args={[cm(book.width), cm(book.thickness), cm(15)]} />
          <meshStandardMaterial color={book.color} roughness={0.8} />
        </mesh>
      ))}

      {/* Anything placed on top of the stack. */}
      <group position={[0, cm(height), 0]}>{children}</group>
    </group>
  );
}

// Small ceramic pot with a trailing pothos spilling over the shelf edge (+z).
export function TrailingPlant({ x }) {
  // Two strands of small heart-shaped leaves (flattened spheres) spilling
  // over the front edge and zig-zagging down.
  const strands = [
    { x: 3, length: 9, sway: 1.6 },
    { x: -3, length: 6, sway: -1.4 },
  ];
  const vine = strands.flatMap(({ x, length, sway }) =>
    Array.from({ length }, (_, i) => {
      const hang = Math.max(0, i - 2);

      return {
        position: [
          x + (i % 2 ? sway : -sway),
          12 - i * 3.2,
          Math.min(5 + i * 3, 12.5) - hang * 0.4,
        ],
        rotation: [0.4, i % 2 ? 0.6 : -0.6, i % 2 ? 0.5 : -0.5],
      };
    }),
  );

  return (
    <group position={[cm(x), 0, 0]}>
      <mesh position={[0, cm(5), 0]} castShadow>
        <cylinderGeometry args={[cm(6), cm(5), cm(10), 24]} />
        <meshStandardMaterial {...CERAMIC} />
      </mesh>

      {/* crown */}
      {[
        [-3, 13, -1],
        [2, 14, 1],
        [0, 16, -2],
        [-1, 12, 3],
      ].map(([lx, ly, lz], i) => (
        <mesh key={i} position={[cm(lx), cm(ly), cm(lz)]} castShadow>
          <sphereGeometry args={[cm(4), 12, 10]} />
          <meshStandardMaterial color={LEAF} roughness={0.8} />
        </mesh>
      ))}

      {/* trailing vine */}
      {vine.map(({ position: [lx, ly, lz], rotation }, i) => (
        <mesh
          key={i}
          position={[cm(lx), cm(ly), cm(lz)]}
          rotation={rotation}
          scale={[1, 0.35, 1.25]}
          castShadow
        >
          <sphereGeometry args={[cm(1.8), 10, 8]} />
          <meshStandardMaterial
            color={i % 3 ? "#5f8a52" : LEAF}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Framed print leaning against the wall.
export function LeaningFrame({ x, width = 14, height = 18 }) {
  return (
    <group position={[cm(x), 0, cm(-3)]} rotation={[-0.12, 0, 0]}>
      <mesh position={[0, cm(height / 2), 0]} castShadow>
        <boxGeometry args={[cm(width), cm(height), cm(1.5)]} />
        <meshStandardMaterial color="#c8a27a" roughness={0.6} />
      </mesh>

      <mesh position={[0, cm(height / 2), cm(0.8)]}>
        <planeGeometry args={[cm(width - 3), cm(height - 3)]} />
        <meshStandardMaterial color="#f5e9d4" roughness={0.9} />
      </mesh>

      {/* simple abstract print: sun over a hill */}
      <mesh position={[cm(1.5), cm(height * 0.62), cm(0.85)]}>
        <circleGeometry args={[cm(2.2), 24]} />
        <meshBasicMaterial color="#aa2d00" />
      </mesh>

      <mesh position={[0, cm(height * 0.3), cm(0.85)]}>
        <circleGeometry args={[cm(5), 24, 0, Math.PI]} />
        <meshBasicMaterial color="#0a2e0e" />
      </mesh>
    </group>
  );
}

// Tall ceramic vase with dried pampas stems.
export function PampasVase({ x }) {
  const stems = [
    [-0.18, 0.05, 34],
    [0.05, -0.1, 38],
    [0.2, 0.08, 31],
  ];

  return (
    <group position={[cm(x), 0, 0]}>
      <mesh position={[0, cm(10), 0]} castShadow>
        <cylinderGeometry args={[cm(3), cm(5), cm(20), 24]} />
        <meshStandardMaterial {...CERAMIC} />
      </mesh>

      {stems.map(([tiltZ, tiltX, length], i) => (
        <group key={i} position={[0, cm(18), 0]} rotation={[tiltX, 0, tiltZ]}>
          <mesh position={[0, cm(length / 2), 0]}>
            <cylinderGeometry args={[cm(0.3), cm(0.3), cm(length), 6]} />
            <meshStandardMaterial color="#b89b72" roughness={0.9} />
          </mesh>

          <mesh position={[0, cm(length), 0]} scale={[1, 2.4, 1]} castShadow>
            <sphereGeometry args={[cm(3), 12, 10]} />
            <meshStandardMaterial
              color="#e9dcc3"
              roughness={1}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Amber glass reed diffuser.
export function Diffuser({ x }) {
  return (
    <group position={[cm(x), 0, 0]}>
      <mesh position={[0, cm(5), 0]} castShadow>
        <cylinderGeometry args={[cm(3.5), cm(3.5), cm(10), 24]} />
        <meshStandardMaterial
          color="#9a5b1c"
          transparent
          opacity={0.8}
          roughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {[-0.25, 0, 0.25].map((tilt, i) => (
        <mesh
          key={i}
          position={[cm(tilt * 8), cm(17), 0]}
          rotation={[0, 0, tilt]}
        >
          <cylinderGeometry args={[cm(0.25), cm(0.25), cm(16), 6]} />
          <meshStandardMaterial color="#3b2a1a" />
        </mesh>
      ))}
    </group>
  );
}

// Matte ceramic sphere, e.g. on top of a book stack.
export function DecorBall({ radius = 4, color = "#181d26" }) {
  return (
    <mesh position={[0, cm(radius), 0]} castShadow>
      <sphereGeometry args={[cm(radius), 24, 16]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

import { cm } from "@/data/units";

import {
  BOOK_COLORS as C,
  BookRow,
  BookStack,
  DecorBall,
  Diffuser,
  LeaningFrame,
  PampasVase,
  TrailingPlant,
} from "./pieces";

const OAK = { color: "#c49a6c", roughness: 0.6 };
const BRACKET = { color: "#1c1c1f", metalness: 0.5, roughness: 0.4 };

const DEPTH = 22;
const THICKNESS = 3;

// Floating oak shelf with black L-brackets. Local space: x along the wall,
// +z out of the wall, y = 0 at the shelf's top surface.
function Shelf({ length, children }) {
  return (
    <group>
      <mesh
        position={[0, cm(-THICKNESS / 2), cm(DEPTH / 2)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[cm(length), cm(THICKNESS), cm(DEPTH)]} />
        <meshStandardMaterial {...OAK} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * cm(length / 2 - 12), 0, 0]}>
          <mesh position={[0, cm(-THICKNESS - 9), cm(0.4)]} castShadow>
            <boxGeometry args={[cm(2.5), cm(18), cm(0.8)]} />
            <meshStandardMaterial {...BRACKET} />
          </mesh>

          <mesh position={[0, cm(-THICKNESS - 0.4), cm(9)]} castShadow>
            <boxGeometry args={[cm(2.5), cm(0.8), cm(18)]} />
            <meshStandardMaterial {...BRACKET} />
          </mesh>
        </group>
      ))}

      {/* Items sit on the top surface, centred front-to-back. */}
      <group position={[0, 0, cm(DEPTH / 2)]}>{children}</group>
    </group>
  );
}

// Two staggered shelves on the left wall above the monitors (fixed decor).
// Lower shelf top at 145 cm, clear of the tallest monitor (~131 cm).
export default function WallShelves() {
  return (
    <group position={[-3.94, 0, -0.1]} rotation={[0, Math.PI / 2, 0]}>
      <group position={[0, cm(145), 0]}>
        <Shelf length={120}>
          <BookRow
            x={-56}
            books={[
              { width: 3, height: 23, color: C[4] },
              { width: 2.2, height: 21, color: C[0] },
              { width: 3.5, height: 24, color: C[2] },
              { width: 2.5, height: 20, color: C[1] },
              { width: 3, height: 22, color: C[3] },
              { width: 2.4, height: 19, color: C[5], tilt: -0.28 },
            ]}
          />

          <TrailingPlant x={-18} />

          <LeaningFrame x={12} />

          <BookStack
            x={42}
            books={[
              { width: 22, thickness: 3, color: C[1] },
              { width: 19, thickness: 2.5, color: C[2], turn: 0.1 },
              { width: 17, thickness: 2, color: C[0], turn: -0.08 },
            ]}
          >
            <DecorBall radius={3.5} />
          </BookStack>
        </Shelf>
      </group>

      {/* Upper shelf, shifted toward the user's left. */}
      <group position={[cm(-20), cm(185), 0]}>
        <Shelf length={80}>
          <PampasVase x={-28} />

          <BookRow
            x={-8}
            books={[
              { width: 2.5, height: 21, color: C[6] },
              { width: 3.2, height: 24, color: C[4] },
              { width: 2.2, height: 20, color: C[3] },
              { width: 2.8, height: 22, color: C[1], tilt: -0.3 },
            ]}
          />

          <Diffuser x={26} />
        </Shelf>
      </group>
    </group>
  );
}

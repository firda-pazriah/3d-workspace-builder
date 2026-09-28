import { cm } from "@/data/units";

import { BOOK_COLORS as C, BookStack, PampasVase } from "./pieces";

// Small arrangement on the sideboard, in the gap between the speaker and
// coffee machine slots (fixed decor).
export default function SideboardDecor() {
  return (
    <group position={[0.35, cm(85), -3.5]}>
      <BookStack
        x={-4}
        books={[
          { width: 20, thickness: 2.5, color: C[2], turn: Math.PI / 2 },
          { width: 18, thickness: 2, color: C[4], turn: Math.PI / 2 + 0.1 },
        ]}
      />

      <group position={[cm(6), 0, cm(4)]} scale={0.7}>
        <PampasVase x={0} />
      </group>
    </group>
  );
}

"use client";

import { useState } from "react";
import { Billboard, useCursor } from "@react-three/drei";

import {
  getVisibleItem,
  isPreviewingSlot,
  useWorkspaceStore,
} from "@/store/useWorkspaceStore";
import { CATEGORIES, needsDesk } from "@/data/categories";

const MARKER_RADIUS = 0.09;
const PLUS_LENGTH = 0.07;
const PLUS_THICKNESS = 0.014;

export default function EmptyFurnitureSlot({ category }) {
  const [hovered, setHovered] = useState(false);

  const config = CATEGORIES[category];

  const hasFurniture = useWorkspaceStore((state) =>
    Boolean(state.selections[category]),
  );

  // A previewed desk overrides the selected one, like in WorkspaceObject.
  const desk = useWorkspaceStore((state) => getVisibleItem(state, "desk"));

  const hasDesk = Boolean(desk);

  const isPreviewing = useWorkspaceStore((state) =>
    isPreviewingSlot(state, category),
  );

  const openCategory = useWorkspaceStore((state) => state.openCategory);

  const isShown =
    !hasFurniture && !isPreviewing && (!needsDesk(category) || hasDesk);

  useCursor(isShown && hovered);

  if (!isShown) {
    return null;
  }

  // Tabletop items get their marker on the desk surface, where the item goes.
  const [x, , z] = config.position;
  const position = config.onDesk
    ? [x, desk.surfaceHeight + MARKER_RADIUS + 0.01, z]
    : config.addPosition;

  return (
    <group position={position}>
      <Billboard>
        {/* BUTTON */}
        <mesh
          renderOrder={999}
          onClick={(event) => {
            event.stopPropagation();
            openCategory(category);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(event) => {
            event.stopPropagation();
            setHovered(false);
          }}
        >
          <circleGeometry args={[MARKER_RADIUS, 32]} />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* + HORIZONTAL */}
        <mesh position={[0, 0, 0.01]} renderOrder={1000}>
          <planeGeometry args={[PLUS_LENGTH, PLUS_THICKNESS]} />

          <meshBasicMaterial
            color="#181d26"
            transparent
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* + VERTICAL */}
        <mesh position={[0, 0, 0.011]} renderOrder={1000}>
          <planeGeometry args={[PLUS_THICKNESS, PLUS_LENGTH]} />

          <meshBasicMaterial
            color="#181d26"
            transparent
            depthTest={false}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

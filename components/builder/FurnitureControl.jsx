"use client";

import { useEffect, useRef, useState } from "react";
import { Html, useCursor } from "@react-three/drei";
import { RefreshCw, Trash2 } from "lucide-react";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  CATEGORIES,
  DRAG_THRESHOLD,
  LEFT_WALL_CAMERA,
} from "@/data/categories";

const HIDE_DELAY_MS = 500;

const buttonClassName =
  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-hairline bg-canvas text-ink active:bg-surface-strong";

export default function FurnitureControl({
  category,
  buttonPosition = [0, 1, 0],
  disabled = false,
  children,
}) {
  const [hovered, setHovered] = useState(false);

  const timeoutRef = useRef(null);

  const openCategory = useWorkspaceStore((state) => state.openCategory);

  const removeItem = useWorkspaceStore((state) => state.removeItem);

  const focusCamera = useWorkspaceStore((state) => state.focusCamera);

  const { label, zone } = CATEGORIES[category];

  const showControls = hovered && !disabled;

  useCursor(showControls);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const showControl = () => {
    clearTimer();
    setHovered(true);
  };

  // Delay hiding so the pointer can travel from the model to the buttons.
  const hideControl = () => {
    clearTimer();

    timeoutRef.current = setTimeout(() => {
      setHovered(false);
    }, HIDE_DELAY_MS);
  };

  useEffect(() => clearTimer, []);

  return (
    <group
      onPointerOver={(event) => {
        event.stopPropagation();
        showControl();
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        hideControl();
      }}
      onClick={(event) => {
        event.stopPropagation();

        // The desk setup stands against the left wall.
        if (zone === "desk" && event.delta <= DRAG_THRESHOLD) {
          focusCamera(LEFT_WALL_CAMERA);
        }
      }}
    >
      {children}

      {showControls && (
        <Html position={buttonPosition} center zIndexRange={[40, 0]}>
          <div
            className="flex gap-2"
            onPointerEnter={showControl}
            onPointerLeave={hideControl}
          >
            <button
              type="button"
              aria-label={`Replace ${label}`}
              title={`Replace ${label}`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                openCategory(category);
              }}
              className={buttonClassName}
            >
              <RefreshCw size={17} />
            </button>

            <button
              type="button"
              aria-label={`Remove ${label}`}
              title={`Remove ${label}`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                removeItem(category);
              }}
              className={buttonClassName}
            >
              <Trash2 size={17} />
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

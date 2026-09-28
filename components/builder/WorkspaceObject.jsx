"use client";

import {
  getVisibleItem as getVisibleItemFromState,
  isPreviewingSlot,
  useWorkspaceStore,
} from "@/store/useWorkspaceStore";
import {
  BUTTON_POSITIONS,
  CATEGORIES,
  getItemCategories,
  getSideMonitorPosition,
  getSlotRotation,
  needsDesk,
} from "@/data/categories";

import FurnitureControl from "./FurnitureControl";
import { MODELS, getMonitorWidth } from "./furniture";
import BackWallCabinet from "./furniture/BackWallCabinet";
import { LAMP_BULB } from "./furniture/DeskLamp";
import Plant from "./furniture/Plant";
import WallShelves from "./decor/WallShelves";
import SideboardDecor from "./decor/SideboardDecor";
import { CeilingLamp } from "./decor/Lamps";

// Slots that can hold a lamp each get a light.
const LAMP_SLOTS = Object.keys(CATEGORIES).filter((slot) =>
  getItemCategories(slot).includes("lamp"),
);

// Local bulb position rotated by the lamp's y rotation, in world space.
const getBulbOffset = (rotation) => {
  const angle = rotation[1];
  const [x, y, z] = LAMP_BULB;

  return [
    x * Math.cos(angle) + z * Math.sin(angle),
    y,
    -x * Math.sin(angle) + z * Math.cos(angle),
  ];
};

export default function WorkspaceObject() {
  const selections = useWorkspaceStore((state) => state.selections);
  const previewItem = useWorkspaceStore((state) => state.previewItem);
  const activeCategory = useWorkspaceStore((state) => state.activeCategory);
  const isNight = useWorkspaceStore((state) => state.isNight);

  const previewState = { selections, previewItem, activeCategory };

  const getVisibleItem = (category) =>
    getVisibleItemFromState(previewState, category);

  const desk = getVisibleItem("desk");

  const getPosition = (category) => {
    const config = CATEGORIES[category];
    const item = getVisibleItem(category);
    let [x, y, z] = config.position;

    // Side monitors sit edge to edge with the middle one, whatever the sizes.
    if (config.side && item?.category === "monitor") {
      const middle = getVisibleItem("monitor");

      [x, y, z] = getSideMonitorPosition(
        config.side,
        (middle && getMonitorWidth(middle.id)) ?? undefined,
        getMonitorWidth(item.id),
      );
    }

    return config.onDesk ? [x, y + desk.surfaceHeight, z] : [x, y, z];
  };

  const isVisible = (category) =>
    Boolean(getVisibleItem(category)) &&
    (!needsDesk(category) || Boolean(desk));

  return (
    <>
      <BackWallCabinet />

      {/* Decor, not rentable. */}
      <group position={[-3, 0, -3.5]} scale={1.3}>
        <Plant />
      </group>

      <WallShelves />

      <SideboardDecor />

      <CeilingLamp />

      {/* Always mounted so adding a lamp doesn't change the scene's light
          count, which would force every material to recompile. */}
      {LAMP_SLOTS.map((slot) => {
        const item = getVisibleItem(slot);
        const lampOn = isNight && isVisible(slot) && item.category === "lamp";
        const base = lampOn ? getPosition(slot) : [0, 0, 0];
        const offset = getBulbOffset(getSlotRotation(slot, item));

        return (
          <pointLight
            key={slot}
            position={base.map((value, i) => value + offset[i])}
            intensity={lampOn ? 4 : 0}
            distance={3.5}
            color="#ffd9a0"
          />
        );
      })}

      {Object.entries(CATEGORIES).map(([category, config]) => {
        if (!isVisible(category)) return null;

        const item = getVisibleItem(category);
        const Model = MODELS[item.id];

        if (!Model) {
          console.warn(`No 3D model registered for furniture id "${item.id}"`);
          return null;
        }

        return (
          <group
            key={category}
            position={getPosition(category)}
            rotation={getSlotRotation(category, item)}
          >
            <FurnitureControl
              category={category}
              buttonPosition={BUTTON_POSITIONS[item.category]}
              disabled={isPreviewingSlot(previewState, category)}
            >
              <Model />
            </FurnitureControl>
          </group>
        );
      })}
    </>
  );
}

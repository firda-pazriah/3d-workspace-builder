import { cm } from "@/data/units";

export const DEFAULT_CAMERA = {
  position: [10, 9, 10],
  target: [0, 1.8, 0],
};

export const LEFT_WALL_CAMERA = {
  position: [0.5, 6.2, -0.1],
  target: [-4, 2.4, -0.1],
};

// Pointer travel (px) above which a click is treated as an orbit drag.
export const DRAG_THRESHOLD = 4;

const COUNTER = cm(85);

export const SIDE_ANGLE = 0.7;

const MIDDLE_MONITOR = [-3.5, 0, -0.1];
const DEFAULT_MONITOR_WIDTH = cm(54); // 24"
const SIDE_GAP = cm(1.5);

export const getSideMonitorPosition = (
  side,
  middleWidth = DEFAULT_MONITOR_WIDTH,
  width = DEFAULT_MONITOR_WIDTH,
) => {
  const [x, y, z] = MIDDLE_MONITOR;
  const reach = width / 2 + SIDE_GAP;

  return [
    x + reach * Math.sin(SIDE_ANGLE),
    y,
    z + side * (middleWidth / 2 + reach * Math.cos(SIDE_ANGLE)),
  ];
};

// Every slot on the desktop offers these; monitors only in monitorSlot slots.
const DESK_ACCESSORIES = [
  "monitor",
  "laptop",
  "keyboard",
  "mouse",
  "lamp",
  "speaker",
  "cpu",
];

export const CATEGORIES = {
  desk: {
    label: "Desk",
    zone: "desk",
    position: [-2.99, 0, -0.1],
    rotation: [0, Math.PI / 2, 0],
    addPosition: [-2.9, 1.5, -0.1],
  },

  chair: {
    label: "Chair",
    zone: "desk",
    position: [-1.35, 0, -0.1],
    rotation: [0, Math.PI / 2, 0],
    addPosition: [-1.35, 1.8, -0.1],
  },

  monitor: {
    label: "Centre Monitor",
    zone: "desk",
    onDesk: true,
    monitorSlot: true,
    position: MIDDLE_MONITOR,
    rotation: [0, Math.PI / 2, 0],
  },

  left_side: {
    label: "Left Monitor",
    zone: "desk",
    onDesk: true,
    monitorSlot: true,
    side: 1,
    position: getSideMonitorPosition(1),
    rotation: [0, Math.PI / 2 + SIDE_ANGLE, 0],
  },

  right_side: {
    label: "Right Monitor",
    zone: "desk",
    onDesk: true,
    monitorSlot: true,
    side: -1,
    position: getSideMonitorPosition(-1),
    rotation: [0, Math.PI / 2 - SIDE_ANGLE, 0],
  },

  keyboard: {
    label: "Front Centre",
    zone: "desk",
    onDesk: true,
    position: [-2.45, 0, -0.25],
    rotation: [0, Math.PI / 2, 0],
  },

  mouse: {
    label: "Front Right",
    zone: "desk",
    onDesk: true,
    position: [-2.45, 0, -1.05],
    rotation: [0, Math.PI / 2, 0],
  },

  laptop: {
    label: "Front Left",
    zone: "desk",
    onDesk: true,
    position: [-2.5, 0, 0.8],
    rotation: [0, Math.PI / 2, 0],
  },

  lamp: {
    label: "Left Corner",
    zone: "desk",
    onDesk: true,
    position: [-2.35, 0, 1.55],
    rotation: [0, Math.PI / 2, 0],
    // A lamp here turns so its light bar reaches back over the desk.
    itemRotations: { lamp: [0, Math.PI, 0] },
  },

  cpu: {
    label: "Under-desk Computer",
    zone: "desk",
    underDesk: true,
    position: [-3.6, 0, -1.2],
    rotation: [0, Math.PI / 2, 0],
    addPosition: [-3.3, 0.5, -1.2],
  },

  speaker: {
    label: "Speaker",
    zone: "back",
    // On the sideboard, left of the coffee machine.
    position: [-0.7, COUNTER, -3.35],
    rotation: [0, 0, 0],
    addPosition: [-0.7, COUNTER + 0.4, -3.3],
    camera: { position: [1.5, 4.2, 1.5], target: [-0.7, 2.6, -3.35] },
  },

  coffee_machine: {
    label: "Coffee Machine",
    zone: "back",
    position: [1, COUNTER, -3.35],
    rotation: [0, 0, 0],
    addPosition: [1, COUNTER + 0.4, -3.3],
    camera: { position: [3.5, 4.2, 1.5], target: [1, 2.6, -3.35] },
  },

  air_care: {
    label: "Air Care",
    zone: "back",
    // Back-right corner, under the window.
    position: [3.3, 0, -3.3],
    rotation: [0, 0, 0],
    addPosition: [3.3, 1.2, -3.3],
    camera: { position: [6, 4.5, 2], target: [3.3, 1.4, -3.3] },
  },

  fitness: {
    label: "Fitness Equipment",
    zone: "floor",
    // Open floor on the right, facing the window.
    position: [2.9, 0, 1],
    rotation: [0, 0, 0],
    addPosition: [2.9, 0.8, 1],
    camera: { position: [7.5, 5.5, 6], target: [2.9, 1.2, 1] },
  },
};

// Replace/remove button position in the model's local space, keyed by
// catalogue category, so it fits the model whichever slot it's in.
export const BUTTON_POSITIONS = {
  desk: [0, cm(60), cm(38)],
  chair: [0, cm(100), cm(10)],
  monitor: [0, cm(62), cm(3)],
  laptop: [0, cm(30), 0],
  keyboard: [0, cm(10), 0],
  mouse: [0, cm(10), 0],
  lamp: [0, cm(50), 0],
  speaker: [0, cm(42), 0],
  cpu: [0, cm(20), 0],
  coffee_machine: [0, cm(45), 0],
  air_care: [0, cm(90), 0],
  fitness: [0, cm(110), 0],
};

// Slots on or under the desk only exist while there is a desk.
export const needsDesk = (slot) =>
  Boolean(CATEGORIES[slot].onDesk || CATEGORIES[slot].underDesk);

export const DESK_DEPENDENT_SLOTS = Object.keys(CATEGORIES).filter(needsDesk);

const getDeskAccessories = (slot) =>
  CATEGORIES[slot].monitorSlot
    ? DESK_ACCESSORIES
    : DESK_ACCESSORIES.filter((category) => category !== "monitor");

export const getItemCategories = (slot) =>
  CATEGORIES[slot].itemCategories ??
  (CATEGORIES[slot].onDesk ? getDeskAccessories(slot) : [slot]);

// Rotation of `item` in `slot`, honouring per-category overrides.
export const getSlotRotation = (slot, item) =>
  CATEGORIES[slot].itemRotations?.[item?.category] ?? CATEGORIES[slot].rotation;

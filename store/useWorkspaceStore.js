import { create } from "zustand";

import {
  CATEGORIES,
  DEFAULT_CAMERA,
  DESK_DEPENDENT_SLOTS,
} from "@/data/categories";
import { getFurnitureItem } from "@/data/furniture";

const emptySelections = Object.fromEntries(
  Object.keys(CATEGORIES).map((category) => [category, null]),
);

export const useWorkspaceStore = create((set, get) => ({
  // =========================
  // SELECTIONS
  // =========================

  selections: {
    ...emptySelections,
    desk: getFurnitureItem("electrical-adjustable-desk"),
    chair: getFurnitureItem("ergonomic-office-chair"),
    monitor: getFurnitureItem("24-full-hd-office-monitor-a24i-2026"),
  },

  selectItem: (slot, item) =>
    set((state) => ({
      selections: { ...state.selections, [slot]: item },
    })),

  removeItem: (category) =>
    set((state) => {
      const selections = { ...state.selections, [category]: null };

      // Items on and under the desk go with it.
      if (category === "desk") {
        DESK_DEPENDENT_SLOTS.forEach((slot) => {
          selections[slot] = null;
        });
      }

      return { selections };
    }),

  // =========================
  // PANEL
  // =========================

  // Open on the desk by default; it only closes from its close button.
  isPanelOpen: true,
  activeCategory: "desk",
  previewItem: null,

  openCategory: (category) => {
    const config = CATEGORIES[category];
    const { activeCategory } = get();

    if (config.zone !== "desk") {
      get().focusCamera(config.camera);
    } else if (activeCategory && CATEGORIES[activeCategory].zone !== "desk") {
      // Switching from another area back to the desk while the panel is open.
      get().resetCamera();
    }

    set({ isPanelOpen: true, activeCategory: category, previewItem: null });
  },

  closePanel: () => {
    const { activeCategory } = get();

    if (activeCategory && CATEGORIES[activeCategory].zone !== "desk") {
      get().resetCamera();
    }

    set({ isPanelOpen: false, activeCategory: null, previewItem: null });
  },

  // Previews always apply to the slot whose panel is open (activeCategory).
  setPreviewItem: (item) => set({ previewItem: item }),

  clearPreviewItem: () => set({ previewItem: null }),

  // =========================
  // CHECKOUT
  // =========================

  rentalWeeks: 1,

  setRentalWeeks: (weeks) =>
    set({ rentalWeeks: Math.min(52, Math.max(1, weeks)) }),

  // =========================
  // CAMERA
  // =========================

  // requestId changes on every request so CameraController re-runs the tween
  // even when the same view is asked for twice.
  camera: { ...DEFAULT_CAMERA, requestId: 0 },

  focusCamera: ({ position, target }) =>
    set((state) => ({
      camera: { position, target, requestId: state.camera.requestId + 1 },
    })),

  resetCamera: () => get().focusCamera(DEFAULT_CAMERA),
}));

export const isPreviewingSlot = (state, slot) =>
  state.activeCategory === slot && state.previewItem !== null;

// The item shown in a slot: the previewed item overrides the selected one.
export const getVisibleItem = (state, slot) =>
  isPreviewingSlot(state, slot) ? state.previewItem : state.selections[slot];

// The selected setup, in slot order: [{ slot, label, zone, item }].
export const getSetupEntries = (selections) =>
  Object.entries(CATEGORIES)
    .filter(([slot]) => selections[slot])
    .map(([slot, config]) => ({
      slot,
      label: config.label,
      zone: config.zone,
      item: selections[slot],
    }));

export const getWeeklyTotal = (entries) =>
  entries.reduce((total, { item }) => total + (item.weeklyPrice ?? 0), 0);

import { create } from "zustand";

export const useWorkspaceStore = create((set) => ({
  objects: [],

  selectedObjectId: null,

  addObject: (product) =>
    set((state) => {
      let objects = state.objects;

      if (product.category === "desk" || product.category === "chair") {
        objects = objects.filter(
          (object) => object.category !== product.category,
        );
      }

      const newObject = {
        id: crypto.randomUUID(),

        productId: product.id,
        category: product.category,

        position: [0, 0, 0],
        rotation: [0, 0, 0],
      };

      return {
        objects: [...objects, newObject],
        selectedObjectId: newObject.id,
      };
    }),

  selectObject: (id) =>
    set({
      selectedObjectId: id,
    }),

  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((object) => object.id !== id),

      selectedObjectId:
        state.selectedObjectId === id ? null : state.selectedObjectId,
    })),

  clearSelection: () =>
    set({
      selectedObjectId: null,
    }),
}));

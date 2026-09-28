"use client";

import EmptyFurnitureSlot from "./EmptyFurnitureSlot";
import { CATEGORIES } from "@/data/categories";

export default function EmptyFurnitureSlots() {
  return (
    <>
      {Object.keys(CATEGORIES).map((category) => (
        <EmptyFurnitureSlot key={category} category={category} />
      ))}
    </>
  );
}

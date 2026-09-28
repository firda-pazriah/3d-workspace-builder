"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { CATEGORIES, getItemCategories } from "@/data/categories";
import { formatPrice, furnitureData, getSourceUrl } from "@/data/furniture";

import { CATEGORY_NAMES } from "./categoryVisuals";
import ProductImage from "./ProductImage";

function ProductCard({
  item,
  isSelected,
  onPreview,
  onClearPreview,
  onSelect,
}) {
  return (
    // Hovering or focusing a card previews the item in the 3D scene.
    <article
      onMouseEnter={onPreview}
      onMouseLeave={onClearPreview}
      className={`bg-canvas/70 flex flex-col overflow-hidden rounded-md border ${
        isSelected ? "border-ink" : "border-hairline"
      }`}
    >
      <div className="bg-canvas border-hairline relative aspect-4/3 border-b">
        <ProductImage
          item={item}
          sizes="(min-width: 640px) 200px, 50vw"
          className="p-3"
        />

        {isSelected && (
          <span className="bg-canvas border-hairline text-success absolute top-2 left-2 flex items-center gap-1 rounded-sm border px-2 py-1 text-xs font-medium">
            <Check size={12} strokeWidth={2.5} /> In your setup
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-muted text-xs font-medium tracking-[0.16px] uppercase">
          {CATEGORY_NAMES[item.category]}
        </p>

        <h3 className="text-ink mt-1 text-base leading-[1.4] font-medium">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-body mt-1 line-clamp-2 text-sm leading-tight">
            {item.description}
          </p>
        )}

        <a
          href={getSourceUrl(item)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link active:text-ink mt-2 inline-flex items-center gap-0.5 self-start text-sm"
        >
          View on monis.rent <ArrowUpRight size={14} aria-hidden="true" />
        </a>

        <div className="mt-auto pt-4">
          {item.weeklyPrice != null && (
            <p className="text-ink">
              <span className="text-xl">{formatPrice(item.weeklyPrice)}</span>
              <span className="text-muted text-sm"> / week</span>
            </p>
          )}

          <button
            type="button"
            disabled={isSelected}
            aria-label={
              isSelected ? `${item.name} is selected` : `Select ${item.name}`
            }
            onFocus={onPreview}
            onBlur={onClearPreview}
            onClick={onSelect}
            className="border-hairline bg-canvas text-ink active:bg-surface-strong disabled:border-border-strong disabled:text-muted mt-3 w-full cursor-pointer rounded-lg border px-4 py-2.5 text-base font-medium disabled:cursor-default"
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FurniturePanel() {
  const isPanelOpen = useWorkspaceStore((state) => state.isPanelOpen);

  const activeCategory = useWorkspaceStore((state) => state.activeCategory);

  const selectedItem = useWorkspaceStore((state) =>
    activeCategory ? state.selections[activeCategory] : null,
  );

  const closePanel = useWorkspaceStore((state) => state.closePanel);

  const selectItem = useWorkspaceStore((state) => state.selectItem);

  const setPreviewItem = useWorkspaceStore((state) => state.setPreviewItem);

  const clearPreviewItem = useWorkspaceStore((state) => state.clearPreviewItem);

  const closeButtonRef = useRef(null);

  const isFirstOpen = useRef(true);

  // Move focus into the panel when a spot is opened (not on page load, where
  // it starts open).
  useEffect(() => {
    if (!isPanelOpen) return;

    if (isFirstOpen.current) {
      isFirstOpen.current = false;
      return;
    }

    closeButtonRef.current?.focus();
  }, [isPanelOpen, activeCategory]);

  if (!isPanelOpen) {
    return null;
  }

  const filteredFurniture = furnitureData.filter((item) =>
    getItemCategories(activeCategory).includes(item.category),
  );

  return (
    <div
      role="dialog"
      aria-labelledby="furniture-panel-title"
      className="border-hairline bg-canvas/75 text-ink fixed inset-0 z-50 flex flex-col overflow-hidden backdrop-blur-xl sm:inset-y-3 sm:right-auto sm:left-3 sm:w-110 sm:rounded-lg sm:border sm:shadow-lg"
    >
      {/* HEADER */}
      <div className="border-hairline flex shrink-0 items-start justify-between gap-4 border-b px-6 pt-6 pb-4">
        <div>
          <p className="text-muted text-sm font-medium tracking-[0.16px]">
            Marketplace
          </p>

          <h2
            id="furniture-panel-title"
            className="text-ink mt-1 text-2xl leading-[1.35] tracking-[0.12px]"
          >
            {CATEGORIES[activeCategory]?.label}
          </h2>

          <p className="text-body mt-1 text-sm leading-tight">
            {filteredFurniture.length}{" "}
            {filteredFurniture.length === 1 ? "item" : "items"} · weekly rental
          </p>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close panel"
          onClick={closePanel}
          className="border-hairline bg-canvas text-ink active:bg-surface-strong flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border"
        >
          <X size={18} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
          {filteredFurniture.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              isSelected={selectedItem?.id === item.id}
              onPreview={() => setPreviewItem(item)}
              onClearPreview={clearPreviewItem}
              onSelect={() => selectItem(activeCategory, item)}
            />
          ))}
        </div>

        {filteredFurniture.length === 0 && (
          <p className="text-body text-sm">No furniture available.</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

import { CATEGORY_VISUALS } from "./categoryVisuals";

// The product's monis.rent photo, filling its (relative) parent. Falls back to
// the category icon on a pastel surface if the photo is missing or fails.
// Decorative: the product name is always shown next to it.
export default function ProductImage({
  item,
  sizes,
  iconSize = 52,
  className,
}) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    const { Icon, surface } = CATEGORY_VISUALS[item.category];

    return (
      <div
        className={`flex h-full w-full items-center justify-center ${surface}`}
      >
        <Icon size={iconSize} strokeWidth={1.5} className="text-ink" />
      </div>
    );
  }

  return (
    <Image
      src={item.image}
      alt=""
      fill
      sizes={sizes}
      className={`object-contain ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}

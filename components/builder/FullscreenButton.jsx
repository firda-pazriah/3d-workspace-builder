"use client";

import { useSyncExternalStore } from "react";
import { Maximize, Minimize } from "lucide-react";

const subscribe = (onChange) => {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
};

const noopSubscribe = () => () => {};

// Top-right, next to the cart button. Hidden where the browser can't go
// fullscreen (e.g. iPhone Safari).
export default function FullscreenButton() {
  const isFullscreen = useSyncExternalStore(
    subscribe,
    () => Boolean(document.fullscreenElement),
    () => false,
  );

  const isSupported = useSyncExternalStore(
    noopSubscribe,
    () => Boolean(document.fullscreenEnabled),
    () => false,
  );

  if (!isSupported) return null;

  const toggle = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Blocked by the browser; nothing to do.
    }
  };

  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className="border-hairline bg-canvas text-ink active:bg-surface-strong absolute top-8 right-26 z-45 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border"
    >
      {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
    </button>
  );
}

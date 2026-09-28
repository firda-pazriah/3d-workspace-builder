"use client";

import { LampDesk } from "lucide-react";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export default function NightModeButton() {
  const isNight = useWorkspaceStore((state) => state.isNight);
  const toggleNight = useWorkspaceStore((state) => state.toggleNight);

  return (
    <button
      type="button"
      aria-label="Night mode"
      aria-pressed={isNight}
      title={isNight ? "Turn off night mode" : "Turn on night mode"}
      onClick={toggleNight}
      className={`border-hairline active:bg-surface-strong absolute top-8 right-44 z-45 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border ${
        isNight ? "bg-signature-yellow text-ink" : "bg-canvas text-ink"
      }`}
    >
      <LampDesk size={22} />
    </button>
  );
}

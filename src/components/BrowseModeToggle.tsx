"use client";

import { useState } from "react";
import { LayoutGrid, Layers } from "lucide-react";

interface BrowseModeToggleProps {
  mode: "grid" | "swipe";
  onChange: (mode: "grid" | "swipe") => void;
}

export function BrowseModeToggle({ mode, onChange }: BrowseModeToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-mist bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          mode === "grid" ? "bg-ink text-stone" : "text-muted hover:text-ink"
        }`}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Grid
      </button>
      <button
        type="button"
        onClick={() => onChange("swipe")}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          mode === "swipe" ? "bg-ink text-stone" : "text-muted hover:text-ink"
        }`}
      >
        <Layers className="h-3.5 w-3.5" />
        Swipe
      </button>
    </div>
  );
}

/** Client wrapper: toggle + children for each mode */
export function useBrowseMode(defaultMode: "grid" | "swipe" = "swipe") {
  return useState<"grid" | "swipe">(defaultMode);
}

"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwipeDeckProps {
  count: number;
  children: (index: number) => React.ReactNode;
  emptyMessage?: string;
  label?: string;
}

const SWIPE_THRESHOLD = 80;

export function SwipeDeck({
  count,
  children,
  emptyMessage = "Nothing to browse yet.",
  label = "Swipe",
}: SwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const locked = useRef<"x" | "y" | null>(null);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, Math.max(count - 1, 0)));
    setOffsetX(0);
  }, [count]);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
    setOffsetX(0);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    if (count === 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startY.current = e.clientY;
    locked.current = null;
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    if (!locked.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      locked.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (locked.current === "y") return;
    e.preventDefault();
    setOffsetX(dx);
  }

  function onPointerUp() {
    if (!dragging) return;
    setDragging(false);

    if (locked.current === "x") {
      if (offsetX <= -SWIPE_THRESHOLD && index < count - 1) goNext();
      else if (offsetX >= SWIPE_THRESHOLD && index > 0) goPrev();
      else setOffsetX(0);
    } else {
      setOffsetX(0);
    }
    locked.current = null;
  }

  if (count === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-mist bg-white px-6 py-16 text-center text-muted">
        {emptyMessage}
      </div>
    );
  }

  const rotation = offsetX / 28;
  const opacityPass = Math.min(Math.abs(offsetX) / 140, 1);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-3 flex items-center justify-between text-sm text-muted">
        <span>
          {label} {index + 1} / {count}
        </span>
        <span className="text-xs">← swipe →</span>
      </div>

      <div
        className="relative touch-pan-y select-none"
        style={{ height: "min(70vh, 560px)" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* next card peek */}
        {index + 1 < count && (
          <div className="absolute inset-0 scale-[0.96] rounded-2xl border border-mist bg-white opacity-70 shadow-sm">
            <div className="pointer-events-none h-full overflow-hidden rounded-2xl">
              {children(index + 1)}
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 cursor-grab rounded-2xl border border-mist bg-white shadow-lg active:cursor-grabbing"
          style={{
            transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
            transition: dragging ? "none" : "transform 0.25s ease-out",
            touchAction: "pan-y",
          }}
        >
          {offsetX < -20 && (
            <div
              className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-clay px-3 py-1 text-xs font-semibold text-white"
              style={{ opacity: opacityPass }}
            >
              Next
            </div>
          )}
          {offsetX > 20 && (
            <div
              className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-sage px-3 py-1 text-xs font-semibold text-white"
              style={{ opacity: opacityPass }}
            >
              Back
            </div>
          )}
          <div className="h-full overflow-hidden rounded-2xl">{children(index)}</div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-mist bg-white text-ink disabled:opacity-30"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={index >= count - 1}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-mist bg-white text-ink disabled:opacity-30"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

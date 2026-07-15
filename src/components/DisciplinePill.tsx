import type { Discipline } from "@/types";

const colors: Record<string, string> = {
  Art: "bg-purple-100 text-purple-800",
  Design: "bg-blue-100 text-blue-800",
  Photography: "bg-amber-100 text-amber-800",
  Film: "bg-red-100 text-red-800",
  Fashion: "bg-pink-100 text-pink-800",
  Architecture: "bg-stone-200 text-stone-800",
  Music: "bg-green-100 text-green-800",
  Writing: "bg-indigo-100 text-indigo-800",
  "Creative technology": "bg-cyan-100 text-cyan-800",
  Other: "bg-gray-100 text-gray-800",
};

interface DisciplinePillProps {
  discipline: Discipline | string;
  size?: "sm" | "md";
}

export function DisciplinePill({ discipline, size = "sm" }: DisciplinePillProps) {
  const colorClass = colors[discipline] ?? colors.Other;
  const sizeClass = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span className={`inline-block rounded-full font-medium ${colorClass} ${sizeClass}`}>
      {discipline}
    </span>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { CreativeCard } from "@/components/CreativeCard";
import { disciplines } from "@/lib/data";
import type { CreativeProfile, Discipline } from "@/types";

interface CreativesPageContentProps {
  initialCreatives: CreativeProfile[];
}

export default function CreativesPageContent({ initialCreatives }: CreativesPageContentProps) {
  const searchParams = useSearchParams();
  const initialDiscipline = searchParams.get("discipline") ?? "";

  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState(initialDiscipline);
  const [city, setCity] = useState("");

  const filtered = useMemo(() => {
    return initialCreatives.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.bio.toLowerCase().includes(query.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));

      const matchesDiscipline =
        !discipline || c.disciplines.includes(discipline as Discipline);

      const matchesCity =
        !city || c.city.toLowerCase().includes(city.toLowerCase());

      return matchesQuery && matchesDiscipline && matchesCity;
    });
  }, [query, discipline, city, initialCreatives]);

  const uniqueCities = [...new Set(initialCreatives.map((c) => c.city))];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Search creatives</h1>
      <p className="mt-2 text-muted">
        Find artists, designers, photographers, and collaborators by skill and location.
      </p>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-mist bg-white p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium">
            Search
          </label>
          <div className="relative mt-1.5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, skill, or keyword…"
              className="w-full rounded-xl border border-mist py-2.5 pl-10 pr-4 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            />
          </div>
        </div>

        <div>
          <label htmlFor="discipline" className="block text-sm font-medium">
            Discipline
          </label>
          <select
            id="discipline"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            className="mt-1.5 rounded-xl border border-mist px-4 py-2.5 text-sm focus:border-clay focus:outline-none"
          >
            <option value="">All disciplines</option>
            {disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1.5 rounded-xl border border-mist px-4 py-2.5 text-sm focus:border-clay focus:outline-none"
          >
            <option value="">Worldwide</option>
            {uniqueCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {filtered.length} creative{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((creative) => (
          <CreativeCard key={creative.id} creative={creative} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted">
          No creatives match your filters. Try broadening your search.
        </p>
      )}
    </div>
  );
}

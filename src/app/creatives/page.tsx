import { Suspense } from "react";
import { getCreatives } from "@/lib/queries/creatives";
import CreativesPageContent from "./CreativesPageContent";

export const metadata = {
  title: "Creatives — Wapate",
  description: "Search and discover creative people on Wapate.",
};

export default async function CreativesPageWrapper() {
  const creatives = await getCreatives();

  return (
    <Suspense fallback={<div className="px-6 py-12 text-muted">Loading…</div>}>
      <CreativesPageContent initialCreatives={creatives} />
    </Suspense>
  );
}

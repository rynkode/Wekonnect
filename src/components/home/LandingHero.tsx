import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=2000&h=1400&fit=crop";

export function LandingHero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Creatives gathering and connecting"
        fill
        priority
        className="object-cover hero-image- ken"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(196,112,74,0.22),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 md:pb-24 md:pt-32">
        <p className="hero-brand font-display text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
          Wa<span className="text-clay-light">pate</span>
        </p>

        <h1 className="hero-headline mt-6 max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
          Find your creative community anywhere in the world.
        </h1>

        <p className="hero-copy mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          A global home for people who create. Meet creatives, join communities, and
          collaborate through meaningful experiences.
        </p>

        <div className="hero-cta mt-9 flex flex-wrap gap-3">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-clay hover:text-white"
          >
            Join Wapate
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/creatives"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/15"
          >
            Explore Creatives
          </Link>
        </div>
      </div>
    </section>
  );
}

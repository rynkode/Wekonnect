import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { getCreativeById, getAuthUser } from "@/lib/queries/creatives";
import { DisciplinePill } from "@/components/DisciplinePill";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { id } = await params;
  const creative = await getCreativeById(id);
  if (!creative) return { title: "Profile not found — WeKonnect" };
  return { title: `${creative.name} — WeKonnect` };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const [creative, user] = await Promise.all([
    getCreativeById(id),
    getAuthUser(),
  ]);

  if (!creative) notFound();

  const isOwnProfile = user?.id === id;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={creative.photo}
              alt={creative.name}
              fill
              className="object-cover"
              priority
              sizes="112px"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-semibold">{creative.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-muted">
              <MapPin className="h-4 w-4" />
              {creative.city}, {creative.country}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {creative.disciplines.map((d) => (
                <DisciplinePill key={d} discipline={d} size="md" />
              ))}
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <Link
            href="/profile/edit"
            className="shrink-0 rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium hover:border-clay"
          >
            Edit profile
          </Link>
        )}
      </div>

      {creative.connectFor.length > 0 && (
        <div className="mt-8 rounded-2xl border border-mist bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            I want to connect for
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {creative.connectFor.map((goal) => (
              <span
                key={goal}
                className="rounded-full bg-clay/10 px-3 py-1 text-sm font-medium text-clay"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {creative.bio && (
        <section className="mt-8">
          <h2 className="font-semibold">About</h2>
          <p className="mt-3 leading-relaxed text-muted">{creative.bio}</p>
        </section>
      )}

      {creative.skills.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {creative.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-mist bg-white px-3 py-1 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {creative.portfolio.length > 0 && (
        <section className="mt-10">
          <h2 className="font-semibold">Portfolio</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {creative.portfolio.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-2xl border border-mist">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
                <p className="p-3 text-sm font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {creative.projects.length > 0 && (
        <section className="mt-10">
          <h2 className="font-semibold">Projects</h2>
          <ul className="mt-4 space-y-3">
            {creative.projects.map((project) => (
              <li
                key={project.title}
                className="rounded-xl border border-mist bg-white p-4"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <span className="text-sm text-muted">{project.year}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{project.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {creative.links.length > 0 && (
        <section className="mt-10">
          <h2 className="font-semibold">Links</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {creative.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-mist bg-white px-4 py-2 text-sm transition-colors hover:border-clay hover:text-clay"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </section>
      )}

      <Link
        href="/creatives"
        className="mt-12 inline-block text-sm font-medium text-clay hover:underline"
      >
        ← Back to search
      </Link>
    </div>
  );
}

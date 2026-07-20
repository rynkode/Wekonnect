import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, HeartHandshake, MapPin } from "lucide-react";
import { getCreativeById, getAuthUser } from "@/lib/queries/creatives";
import { DisciplinePill } from "@/components/DisciplinePill";
import { normalizeConnectForList } from "@/lib/options";

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
  const connectFor = normalizeConnectForList(creative.connectFor);
  const firstName = creative.name.trim().split(/\s+/)[0] || creative.name;

  return (
    <div className="bg-[#f3efe8]">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Identity */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl shadow-sm sm:h-36 sm:w-36">
              <Image
                src={creative.photo}
                alt={creative.name}
                fill
                className="object-cover"
                priority
                sizes="144px"
              />
            </div>

            <div className="flex-1">
              <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-sage">
                Creative on WeKonnect
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {creative.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-muted">
                <MapPin className="h-4 w-4 shrink-0" />
                {creative.city}
                {creative.country ? `, ${creative.country}` : ""}
              </p>

              {creative.disciplines.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    Creative interests
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {creative.disciplines.map((d) => (
                      <DisciplinePill key={d} discipline={d} size="md" />
                    ))}
                  </div>
                </div>
              )}
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

        {/* Why here — connection invitation */}
        <section className="mt-10 rounded-2xl border border-clay/20 bg-white p-6 md:p-8">
          <div className="flex items-start gap-3">
            <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Why {firstName} is here
              </h2>
              <p className="mt-1 text-sm text-muted">
                Profiles on WeKonnect are invitations — not just portfolios.
              </p>
            </div>
          </div>

          {connectFor.length > 0 ? (
            <>
              <p className="mt-6 text-sm font-medium text-ink">I want to connect for:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {connectFor.map((goal) => (
                  <DisciplinePill key={goal} discipline={goal} size="md" />
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-muted">
              {isOwnProfile
                ? "Add what you want to connect for — collaboration, friendships, learning, and more."
                : `${firstName} is open to creative connection. Say hello through their work and interests.`}
            </p>
          )}

          {!isOwnProfile && (
            <p className="mt-6 border-t border-mist pt-5 text-sm leading-relaxed text-muted">
              If you share a city, a discipline, or a dream project — you already have something
              in common. Reach out by joining the same events or posting on Collaborate.
            </p>
          )}
        </section>

        {/* Bio */}
        {creative.bio && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold tracking-tight">About</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/80">{creative.bio}</p>
          </section>
        )}

        {creative.skills.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold tracking-tight">Skills</h2>
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
            <h2 className="font-display text-xl font-semibold tracking-tight">Portfolio</h2>
            <p className="mt-1 text-sm text-muted">A glimpse of what {firstName} makes.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {creative.portfolio.map((item) => (
                <div key={item.title} className="overflow-hidden rounded-2xl border border-mist bg-white">
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
            <h2 className="font-display text-xl font-semibold tracking-tight">Projects</h2>
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
            <h2 className="font-display text-xl font-semibold tracking-tight">Links</h2>
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
          ← Meet more creatives
        </Link>
      </div>
    </div>
  );
}

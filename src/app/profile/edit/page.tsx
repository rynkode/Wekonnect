import Link from "next/link";
import { redirect } from "next/navigation";
import { updateProfile } from "@/app/actions/profile";
import { FormError } from "@/components/FormError";
import { OptionGroup } from "@/components/OptionGroup";
import { getCurrentUserProfile, getAuthUser } from "@/lib/queries/creatives";
import { connectForOptions, creativeInterests } from "@/lib/options";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ImageUpload } from "@/components/ImageUpload";
import { normalizeConnectForList, normalizeDisciplineList } from "@/lib/options";

export const metadata = {
  title: "Edit profile — Wapate",
};

interface EditProfilePageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function EditProfilePage({ searchParams }: EditProfilePageProps) {
  if (!isSupabaseConfigured()) {
    redirect("/setup");
  }

  const { error } = await searchParams;
  const user = await getAuthUser();
  if (!user) {
    redirect("/auth/login?next=/profile/edit");
  }

  const profile = await getCurrentUserProfile();
  const selectedInterests = normalizeDisciplineList(profile?.disciplines);
  const selectedConnect = normalizeConnectForList(profile?.connectFor);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-sage">
        Your invitation
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Edit your profile
      </h1>
      <p className="mt-2 text-muted">
        Don&apos;t just show who you are — share <em>why you&apos;re here</em>. Help others know how
        to connect with you.
      </p>

      {error && (
        <div className="mt-6">
          <FormError message={error} />
        </div>
      )}

      <form action={updateProfile} encType="multipart/form-data" className="mt-10 space-y-8">
        <section className="space-y-5">
          <h2 className="font-display text-lg font-semibold">Identity</h2>
          <Field label="Name" name="name" defaultValue={profile?.name} required />
          <ImageUpload label="Profile photo" folder="profile" currentImageUrl={profile?.photo} />
          <Field
            label="Or paste photo URL"
            name="photo"
            defaultValue={profile?.photo}
            placeholder="https://..."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="City / location"
              name="city"
              defaultValue={profile?.city}
              required
              placeholder="Bergen"
            />
            <Field
              label="Country"
              name="country"
              defaultValue={profile?.country}
              required
              placeholder="Norway"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              defaultValue={profile?.bio}
              placeholder="Who you are as a creative — and what kind of people you'd love to meet…"
              className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            />
          </div>
        </section>

        <section className="space-y-5 border-t border-mist pt-8">
          <OptionGroup
            legend="Creative interests"
            name="disciplines"
            options={creativeInterests}
            defaultSelected={selectedInterests}
            hint="Art, design, photography, film, music, fashion, architecture, technology"
          />
          <Field
            label="Skills (comma-separated, optional)"
            name="skills"
            defaultValue={profile?.skills?.join(", ") ?? ""}
            placeholder="UI Design, Figma, Documentary"
          />
        </section>

        <section className="space-y-5 border-t border-mist pt-8">
          <OptionGroup
            legend="I want to connect for"
            name="connectFor"
            options={connectForOptions}
            defaultSelected={selectedConnect}
            hint="This answers “why is this person here?” for everyone who visits your profile."
          />
        </section>

        <button
          type="submit"
          className="rounded-full bg-ink px-8 py-3 text-sm font-medium text-stone transition-colors hover:bg-clay"
        >
          Save profile
        </button>
      </form>

      <Link href={`/profile/${user.id}`} className="mt-6 inline-block text-sm text-clay hover:underline">
        View public profile →
      </Link>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
      />
    </div>
  );
}

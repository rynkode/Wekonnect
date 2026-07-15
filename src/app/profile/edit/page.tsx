import Link from "next/link";
import { redirect } from "next/navigation";
import { updateProfile } from "@/app/actions/profile";
import { FormError } from "@/components/FormError";
import { getCurrentUserProfile, getAuthUser } from "@/lib/queries/creatives";
import { disciplines } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ImageUpload } from "@/components/ImageUpload";

export const metadata = {
  title: "Edit profile — WeKonnect",
};

const connectForOptions = [
  "Collaboration",
  "Networking",
  "Learning",
  "Finding opportunities",
  "Building creative projects",
];

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

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Edit your profile</h1>
      <p className="mt-2 text-muted">
        Build your creative identity — this is how others discover and connect with you.
      </p>

      {error && (
        <div className="mt-6">
          <FormError message={error} />
        </div>
      )}

      <form action={updateProfile} encType="multipart/form-data" className="mt-10 space-y-6">
        <Field label="Name" name="name" defaultValue={profile?.name} required />
        <ImageUpload label="Profile photo" folder="profile" currentImageUrl={profile?.photo} />
        <Field
          label="Or paste photo URL"
          name="photo"
          defaultValue={profile?.photo}
          placeholder="https://..."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City" name="city" defaultValue={profile?.city} required placeholder="Bergen" />
          <Field label="Country" name="country" defaultValue={profile?.country} required placeholder="Norway" />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium">
            Biography
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={profile?.bio}
            placeholder="Tell the world about your creative work…"
            className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
          />
        </div>
        <Field
          label="Disciplines (comma-separated)"
          name="disciplines"
          defaultValue={profile?.disciplines?.join(", ") ?? ""}
          placeholder={disciplines.slice(0, 3).join(", ")}
        />
        <Field
          label="Skills (comma-separated)"
          name="skills"
          defaultValue={profile?.skills?.join(", ") ?? ""}
          placeholder="UI Design, Figma, Photography"
        />
        <div>
          <label htmlFor="connectFor" className="block text-sm font-medium">
            I want to connect for (comma-separated)
          </label>
          <input
            id="connectFor"
            name="connectFor"
            defaultValue={profile?.connectFor?.join(", ") ?? ""}
            placeholder={connectForOptions.slice(0, 2).join(", ")}
            className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
          />
        </div>

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

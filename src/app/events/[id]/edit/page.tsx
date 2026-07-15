import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { updateEvent } from "@/app/actions/events";
import { FormError } from "@/components/FormError";
import { ImageUpload } from "@/components/ImageUpload";
import { SubmitButton } from "@/components/SubmitButton";
import { getAuthUser } from "@/lib/queries/creatives";
import { getEventById } from "@/lib/queries/events";
import { eventCategories } from "@/lib/data";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export async function generateMetadata({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return { title: "Event not found — WeKonnect" };
  return { title: `Edit ${event.title} — WeKonnect` };
}

export default async function EditEventPage({ params, searchParams }: EditEventPageProps) {
  const { id } = await params;
  const { error } = await searchParams;
  const event = await getEventById(id);
  const user = await getAuthUser();

  if (!event) notFound();
  if (!user) redirect(`/auth/login?next=/events/${id}/edit`);
  if (event.hostId !== user.id) redirect(`/events/${id}`);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Edit event</h1>
      <p className="mt-2 text-muted">Update your meetup details or replace the cover image.</p>

      {error && (
        <div className="mt-6">
          <FormError message={error} />
        </div>
      )}

      <form
        action={updateEvent.bind(null, id)}
        encType="multipart/form-data"
        className="mt-10 space-y-6"
      >
        <Field label="Event title" name="title" defaultValue={event.title} required />

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={event.category}
            className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
          >
            {eventCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date" name="date" type="date" defaultValue={event.date} required />
          <Field label="Time" name="time" type="time" defaultValue={event.time} required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City" name="city" defaultValue={event.city} required />
          <Field label="Country" name="country" defaultValue={event.country} required />
        </div>

        <Field label="Location / venue" name="location" defaultValue={event.location} required />

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={event.description}
            className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
          />
        </div>

        <ImageUpload label="Cover image" folder="event" currentImageUrl={event.imageUrl} />
        <Field
          label="Or paste image URL"
          name="imageUrl"
          defaultValue={event.imageUrl}
          placeholder="https://images.unsplash.com/..."
        />

        <SubmitButton label="Save changes" pendingLabel="Saving…" />
      </form>

      <Link href={`/events/${id}`} className="mt-6 inline-block text-sm text-clay hover:underline">
        ← Back to event
      </Link>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
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
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
      />
    </div>
  );
}

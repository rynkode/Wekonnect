import { createEvent } from "@/app/actions/events";
import { eventCategories } from "@/lib/data";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUpload } from "@/components/ImageUpload";
import { FormError } from "@/components/FormError";

interface CreateEventPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function CreateEventPage({ searchParams }: CreateEventPageProps) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Create an event</h1>
      <p className="mt-2 text-muted">
        Host a creative meetup — Design Kaffe, photo walk, artist talk, or anything that brings people together.
      </p>

      {error && (
        <div className="mt-6">
          <FormError message={error} />
        </div>
      )}

      <form action={createEvent} encType="multipart/form-data" className="mt-10 space-y-6">
        <Field label="Event title" name="title" required placeholder="Design Kaffe — Bergen Edition" />

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
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
          <Field label="Date" name="date" type="date" required />
          <Field label="Time" name="time" type="time" required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City" name="city" required placeholder="Bergen" />
          <Field label="Country" name="country" required placeholder="Norway" />
        </div>

        <div>
          <Field
            label="Location / venue"
            name="location"
            required
            placeholder="Kaffebrenneriet, Øvregaten 12"
          />
          <p className="mt-1 text-xs text-muted">
            Use a full street address so guests can open it in Google Maps.
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Tell people what to expect, who it's for, and what to bring…"
            className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
          />
        </div>

        <ImageUpload label="Cover image" folder="event" />
        <Field
          label="Or paste image URL (optional)"
          name="imageUrl"
          placeholder="https://images.unsplash.com/..."
        />

        <SubmitButton label="Publish event" pendingLabel="Publishing…" />
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
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
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-2.5 text-sm focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
      />
    </div>
  );
}

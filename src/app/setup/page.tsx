import Link from "next/link";

import { isSupabaseConfigured } from "@/lib/supabase/config";



export const metadata = {

  title: "Setup — WeKonnect",

};



const phase3Steps = [

  {

    step: "1",

    title: "Run Phase 3 schema",

    text: "In Supabase SQL Editor, paste and run supabase/schema-phase3.sql. This adds the Collaborate board and image uploads.",

  },

  {

    step: "2",

    title: "Fix city images (optional)",

    text: "Run supabase/fix-city-images.sql once if city cover photos look broken.",

  },

  {

    step: "3",

    title: "Disable email confirmation (local dev)",

    text: "Supabase → Authentication → Providers → Email → turn off “Confirm email” so you can log in immediately while testing.",

  },

  {

    step: "4",

    title: "Try the new features",

    text: "Post on /collaborate/create, upload a profile photo at /profile/edit, and visit /cities/bergen.",

  },

];



export default function SetupPage() {

  const configured = isSupabaseConfigured();



  return (

    <div className="mx-auto max-w-2xl px-6 py-16">

      <h1 className="text-3xl font-semibold">WeKonnect setup</h1>

      <p className="mt-3 text-muted">

        Connect Supabase, run the database schemas, and unlock real accounts, events, and collaboration.

      </p>



      {configured ? (

        <>

          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

            <p className="font-medium text-green-800">Supabase is connected.</p>

            <p className="mt-2 text-sm text-green-700">

              Complete Phase 3 below if you haven&apos;t yet — needed for Collaborate posts and image uploads.

            </p>

            <div className="mt-4 flex flex-wrap gap-4">

              <Link href="/auth/signup" className="text-sm font-medium text-clay hover:underline">

                Create an account →

              </Link>

              <Link href="/collaborate" className="text-sm font-medium text-clay hover:underline">

                Collaborate board →

              </Link>

              <Link href="/cities/bergen" className="text-sm font-medium text-clay hover:underline">

                WeKonnect Bergen →

              </Link>

            </div>

          </div>



          <h2 className="mt-12 text-xl font-semibold">Phase 3 checklist</h2>

          <ol className="mt-6 space-y-4">

            {phase3Steps.map((item) => (

              <li key={item.step} className="flex gap-4 rounded-2xl border border-mist bg-white p-5">

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay/10 text-sm font-bold text-clay">

                  {item.step}

                </span>

                <div>

                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="mt-1 text-sm text-muted">{item.text}</p>

                </div>

              </li>

            ))}

          </ol>



          <div className="mt-10 rounded-2xl border border-mist bg-white p-5">

            <h3 className="font-semibold">What&apos;s next?</h3>

            <p className="mt-2 text-sm text-muted">
              When you&apos;re ready to go live on wekonnect.com, open{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-xs">docs/LAUNCH.md</code>{" "}
              in the project folder for deployment steps.
            </p>

          </div>

        </>

      ) : (

        <ol className="mt-8 space-y-6">

          {[

            {

              step: "1",

              title: "Create a Supabase project",

              text: "Go to supabase.com → New project → choose a name and region.",

            },

            {

              step: "2",

              title: "Run the database schema",

              text: "In Supabase: SQL Editor → paste contents of supabase/schema.sql → Run.",

            },

            {

              step: "3",

              title: "Add environment variables",

              text: "Copy .env.local.example to .env.local and fill in your Project URL and anon key from Settings → API.",

            },

            {

              step: "4",

              title: "Restart the dev server",

              text: "Stop npm run dev (Ctrl+C) and start it again so env vars load.",

            },

            {

              step: "5",

              title: "Run Phase 3 schema",

              text: "Run supabase/schema-phase3.sql in the SQL Editor for Collaborate + image uploads.",

            },

            {

              step: "6",

              title: "Create your account",

              text: "Sign up at /auth/signup, complete your profile, and create your first event.",

            },

          ].map((item) => (

            <li key={item.step} className="flex gap-4 rounded-2xl border border-mist bg-white p-5">

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay/10 text-sm font-bold text-clay">

                {item.step}

              </span>

              <div>

                <h3 className="font-semibold">{item.title}</h3>

                <p className="mt-1 text-sm text-muted">{item.text}</p>

              </div>

            </li>

          ))}

        </ol>

      )}



      <Link href="/" className="mt-10 inline-block text-sm text-muted hover:text-ink">

        ← Back to home

      </Link>

    </div>

  );

}


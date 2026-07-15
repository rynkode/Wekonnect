import Link from "next/link";

export const metadata = {
  title: "Check your email — WeKonnect",
};

export default function CheckEmailPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay/10 text-2xl">
        ✉️
      </div>
      <h1 className="mt-6 text-3xl font-semibold">Check your email</h1>
      <p className="mt-3 text-muted">
        We sent you a confirmation link. Click it to activate your account, then sign in.
      </p>
      <Link
        href="/auth/login"
        className="mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm font-medium text-stone hover:bg-clay"
      >
        Go to sign in
      </Link>
      <p className="mt-6 text-xs text-muted">
        For local testing, you can disable email confirmation in Supabase → Authentication → Providers → Email.
      </p>
    </div>
  );
}

import Link from "next/link";
import { AuthForm, AuthSwitch } from "@/components/AuthForm";
import { AuthError } from "@/components/AuthError";

export const metadata = {
  title: "Sign in — Wapate",
};

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-muted">Sign in to join events and connect with creatives.</p>
      <div className="mt-8 rounded-2xl border border-mist bg-white p-6">
        <AuthError message={error} />
        <AuthForm mode="login" />
        <AuthSwitch mode="login" />
      </div>
      <p className="mt-6 text-center">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

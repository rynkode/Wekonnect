"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function requireSupabase() {
  if (!isSupabaseConfigured()) {
    redirect("/setup");
  }
}

export async function signUp(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
  }

  // No session = email confirmation required
  if (!data.session) {
    redirect("/auth/check-email");
  }

  redirect("/profile/edit");
}

export async function signIn(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/explore");
}

export async function signOut() {
  requireSupabase();
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();

  const email = ((formData.get("email") as string) || "").trim();
  if (!email) {
    redirect("/auth/forgot-password?error=" + encodeURIComponent("Enter your email."));
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    redirect(
      `/auth/forgot-password?error=${encodeURIComponent(error.message)}`
    );
  }

  // Always show success to avoid leaking whether an email exists
  redirect("/auth/forgot-password?sent=1");
}

export async function updatePassword(formData: FormData) {
  requireSupabase();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?error=" + encodeURIComponent("Link expired. Request a new reset."));
  }

  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!password || password.length < 6) {
    redirect(
      "/auth/reset-password?error=" +
        encodeURIComponent("Password must be at least 6 characters.")
    );
  }

  if (password !== confirm) {
    redirect(
      "/auth/reset-password?error=" + encodeURIComponent("Passwords do not match.")
    );
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/auth/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/explore");
}

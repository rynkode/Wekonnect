import { getAuthUser, getCurrentUserProfile } from "@/lib/queries/creatives";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  const user = await getAuthUser();
  const profile = user ? await getCurrentUserProfile() : null;

  return (
    <NavbarClient
      isLoggedIn={!!user}
      profileName={profile?.name}
      userId={user?.id}
    />
  );
}

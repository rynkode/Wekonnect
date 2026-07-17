import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { getAuthUser } from "@/lib/queries/creatives";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "WeKonnect — Connect through creativity",
  description:
    "A global creative network for artists, designers, photographers, filmmakers, and more. Discover events, meet creatives, and collaborate.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans`}>
        <div className="app-shell">
          <Navbar />
          <main className="min-h-screen pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav isLoggedIn={!!user} userId={user?.id} />
        </div>
      </body>
    </html>
  );
}

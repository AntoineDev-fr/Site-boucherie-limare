"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/cookie-banner";

type Props = { children: React.ReactNode };

export function ClientShell({ children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-cream-light">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="container max-w-6xl pt-28">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}

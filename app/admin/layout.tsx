import { cookies } from "next/headers";
import { ReactNode } from "react";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { AdminTopbar } from "@/components/admin/topbar";

export const metadata = {
  title: "Espace admin | Boucherie Limare",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);

  return (
    <div className="min-h-screen bg-cream-light">
      <AdminTopbar session={session} />
      <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
    </div>
  );
}

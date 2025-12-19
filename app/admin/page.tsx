import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginForm } from "@/components/admin/login-form";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export default function AdminPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (session) {
    redirect("/admin/news");
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl space-y-6 rounded-[28px] border border-ink/10 bg-cream-light/80 p-8 shadow-card">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-primary">Espace admin</p>
          <h1 className="font-display text-3xl text-ink">Connexion</h1>
          <p className="text-sm text-ink/70">
            Identifiez-vous pour gérer les actualités (table <code>news</code> dans produits.db).
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

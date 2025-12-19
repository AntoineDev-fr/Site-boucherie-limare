import Link from "next/link";
import { SessionPayload } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/logout-button";
import { Button } from "@/components/ui/button";

type Props = { session: SessionPayload | null };

export function AdminTopbar({ session }: Props) {
  if (!session) return null;
  return (
    <div className="border-b border-ink/10 bg-white/80 shadow-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-primary">Espace admin</p>
          <p className="text-sm text-ink/80">
            Connecté : <span className="font-semibold text-ink">{session.name}</span> ({session.role})
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/news">Actualités</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/password">Mot de passe</Link>
          </Button>
          {session.role === "admin" ? (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/users">Utilisateurs</Link>
            </Button>
          ) : null}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

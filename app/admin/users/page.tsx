import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Section } from "@/components/section";
import { AdminManager } from "@/components/admin/admin-manager";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export default function AdminUsersPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session || session.role !== "admin") {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <Section
        eyebrow="Utilisateurs"
        title="Gérer les administrateurs"
        description="Créer des comptes, changer les rôles, ou supprimer un utilisateur."
        className="bg-cream-light/70"
      >
        <AdminManager />
      </Section>
    </div>
  );
}

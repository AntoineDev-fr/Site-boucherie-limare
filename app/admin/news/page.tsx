import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Section } from "@/components/section";
import { NewsManager } from "@/components/admin/news-manager";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export default function AdminNewsPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="pb-16">
      <Section
        eyebrow="Espace admin"
        title="Actualités"
        description="Créer, éditer, épingler ou supprimer les actualités stockées dans la table news de produits.db."
        className="bg-cream-light/70"
      >
        <NewsManager />
      </Section>
    </div>
  );
}

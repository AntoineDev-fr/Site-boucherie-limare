import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Section } from "@/components/section";
import { PasswordForm } from "@/components/admin/password-form";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export default function AdminPasswordPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <Section
        eyebrow="Sécurité"
        title="Changer mon mot de passe"
        description="Le mot de passe est stocké en hash bcrypt dans la table admins."
        className="bg-cream-light/70"
      >
        <PasswordForm />
      </Section>
    </div>
  );
}

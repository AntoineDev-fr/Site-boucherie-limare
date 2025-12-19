import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { openDb } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  try {
    const { currentPassword, newPassword } = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
    };
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "Mot de passe invalide (6 caractères min.)" }, { status: 400 });
    }

    const db = openDb();
    const user = db
      .prepare("SELECT id, mot_de_passe FROM admins WHERE id = ?")
      .get(session.userId) as { id: number; mot_de_passe: string } | undefined;
    if (!user) {
      db.close();
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const ok = await bcrypt.compare(currentPassword, user.mot_de_passe);
    if (!ok) {
      db.close();
      return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 401 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    db.prepare("UPDATE admins SET mot_de_passe = ? WHERE id = ?").run(hashed, session.userId);
    db.close();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur changement mot de passe", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

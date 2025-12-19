import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { openDb } from "@/lib/db";
import { AdminUser } from "@/types/admin";

export const runtime = "nodejs";

function requireAdmin() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return session;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = requireAdmin();
  if (session instanceof NextResponse) return session;
  try {
    const id = Number(params.id);
    if (!Number.isFinite(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

    const body = (await request.json()) as Partial<AdminUser> & { password?: string };
    const db = openDb();
    const existing = db.prepare("SELECT id, nom, role FROM admins WHERE id = ?").get(id) as
      | AdminUser
      | undefined;
    if (!existing) {
      db.close();
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    const newName = body.nom ?? existing.nom;
    const newRole = body.role ?? existing.role;
    if (body.password) {
      const hashed = await bcrypt.hash(body.password, 10);
      db.prepare("UPDATE admins SET nom = ?, role = ?, mot_de_passe = ? WHERE id = ?").run(
        newName,
        newRole,
        hashed,
        id
      );
    } else {
      db.prepare("UPDATE admins SET nom = ?, role = ? WHERE id = ?").run(newName, newRole, id);
    }

    const updated = db
      .prepare("SELECT id, nom, role FROM admins WHERE id = ?")
      .get(id) as AdminUser;
    db.close();
    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error("Erreur PUT admin user", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = requireAdmin();
  if (session instanceof NextResponse) return session;
  try {
    const id = Number(params.id);
    if (!Number.isFinite(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    const db = openDb();
    const info = db.prepare("DELETE FROM admins WHERE id = ?").run(id);
    db.close();
    if (info.changes === 0) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur DELETE admin user", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

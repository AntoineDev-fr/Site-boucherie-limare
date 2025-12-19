import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { getAdmins, openDb } from "@/lib/db";
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

export async function GET() {
  const session = requireAdmin();
  if (session instanceof NextResponse) return session;
  try {
    const rows = getAdmins() as AdminUser[];
    return NextResponse.json({ items: rows });
  } catch (error) {
    console.error("Erreur GET admins", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = requireAdmin();
  if (session instanceof NextResponse) return session;
  try {
    const { nom, password, role } = (await request.json()) as { nom?: string; password?: string; role?: string };
    if (!nom || !password || password.length < 6) {
      return NextResponse.json({ error: "Nom et mot de passe (6 caractères min.) requis" }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const db = openDb();
    const insert = db.prepare("INSERT INTO admins (nom, mot_de_passe, role) VALUES (?, ?, ?)");
    const info = insert.run(nom, hashed, role || "employe");
    const created = db
      .prepare("SELECT id, nom, role FROM admins WHERE id = ?")
      .get(info.lastInsertRowid) as AdminUser;
    db.close();
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST admins", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

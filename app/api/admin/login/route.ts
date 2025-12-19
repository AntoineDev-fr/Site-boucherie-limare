import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { openDb } from "@/lib/db";
import { ADMIN_COOKIE, createSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };
    if (!username || !password) {
      return NextResponse.json({ error: "Identifiants manquants" }, { status: 400 });
    }

    const db = openDb({ readonly: true });
    const admin = db
      .prepare("SELECT id, nom, mot_de_passe, role FROM admins WHERE nom = ? LIMIT 1")
      .get(username) as { id: number; nom: string; mot_de_passe: string; role: string } | undefined;
    db.close();

    if (!admin) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, admin.mot_de_passe);
    if (!ok) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const token = createSessionToken(admin);
    cookies().set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12 // 12h
    });

    return NextResponse.json({ ok: true, user: { id: admin.id, nom: admin.nom, role: admin.role } });
  } catch (error) {
    console.error("Erreur login admin", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

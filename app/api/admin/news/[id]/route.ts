import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { openDb } from "@/lib/db";
import { NewsItem } from "@/types/news";

export const runtime = "nodejs";

function requireSession() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return session;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = requireSession();
  if (session instanceof NextResponse) return session;
  try {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<NewsItem>;
    if (!Number.isFinite(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

    const db = openDb();
    const existing = db
      .prepare(
        "SELECT id, titre, petite_description, image, longue_description, created_at, epingle, pdf FROM news WHERE id = ?"
      )
      .get(id) as NewsItem | undefined;
    if (!existing) {
      db.close();
      return NextResponse.json({ error: "Actualité introuvable" }, { status: 404 });
    }

    db.prepare(
      "UPDATE news SET titre = ?, petite_description = ?, image = ?, longue_description = ?, epingle = ?, pdf = ? WHERE id = ?"
    ).run(
      body.titre ?? existing.titre,
      body.petite_description ?? existing.petite_description,
      body.image ?? existing.image,
      body.longue_description ?? existing.longue_description,
      body.epingle ? 1 : 0,
      body.pdf ?? existing.pdf,
      id
    );

    const updated = db
      .prepare(
        "SELECT id, titre, petite_description, image, longue_description, created_at, epingle, pdf FROM news WHERE id = ?"
      )
      .get(id) as NewsItem;
    db.close();

    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error("Erreur PUT admin news", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = requireSession();
  if (session instanceof NextResponse) return session;
  try {
    const id = Number(params.id);
    if (!Number.isFinite(id)) return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    const db = openDb();
    const info = db.prepare("DELETE FROM news WHERE id = ?").run(id);
    db.close();
    if (info.changes === 0) return NextResponse.json({ error: "Actualité introuvable" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur DELETE admin news", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

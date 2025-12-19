import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";
import { getNewsRows, openDb } from "@/lib/db";
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

export async function GET() {
  const session = requireSession();
  if (session instanceof NextResponse) return session;
  try {
    const rows = getNewsRows() as NewsItem[];
    return NextResponse.json({ items: rows });
  } catch (error) {
    console.error("Erreur GET admin news", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = requireSession();
  if (session instanceof NextResponse) return session;
  try {
    const body = (await request.json()) as Partial<NewsItem>;
    if (!body.titre || !body.longue_description) {
      return NextResponse.json({ error: "Titre et contenu requis" }, { status: 400 });
    }

    const db = openDb();
    const stmt = db.prepare(
      "INSERT INTO news (titre, petite_description, image, longue_description, created_at, epingle, pdf) VALUES (?, ?, ?, ?, datetime('now'), ?, ?)"
    );
    const info = stmt.run(
      body.titre,
      body.petite_description ?? "",
      body.image ?? null,
      body.longue_description,
      body.epingle ? 1 : 0,
      body.pdf ?? null
    );
    const created = db
      .prepare(
        "SELECT id, titre, petite_description, image, longue_description, created_at, epingle, pdf FROM news WHERE id = ?"
      )
      .get(info.lastInsertRowid) as NewsItem;
    db.close();

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST admin news", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

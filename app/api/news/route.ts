import { NextResponse } from "next/server";
import { getNewsRows } from "@/lib/db";
import { NewsItem } from "@/types/news";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = getNewsRows() as NewsItem[];
    return NextResponse.json({ items: rows }, { status: 200 });
  } catch (error) {
    console.error("Erreur SQLite", error);
    return NextResponse.json({ items: [], error: "Impossible de lire les actualités" }, { status: 500 });
  }
}

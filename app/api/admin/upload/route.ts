import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 30;

function requireSession() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return session;
}

export async function POST(request: Request) {
  const session = requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name) || "";
    const safeExt = ext.toLowerCase().slice(0, 10);
    const baseName = path.basename(file.name, ext).replace(/[^a-z0-9-_]/gi, "-").slice(0, 80) || "upload";
    const fileName = `${Date.now()}-${baseName}${safeExt}`;
    const uploadDir = path.join(process.cwd(), "public", "assets", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const publicPath = `/assets/uploads/${fileName}`;
    return NextResponse.json({ path: publicPath });
  } catch (error) {
    console.error("Erreur upload", error);
    return NextResponse.json({ error: "Upload impossible" }, { status: 500 });
  }
}

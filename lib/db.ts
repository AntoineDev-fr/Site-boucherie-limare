import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "produits.db");

export function openDb(options?: { readonly?: boolean }) {
  if (!fs.existsSync(dbPath)) {
    throw new Error("Base produits.db introuvable à la racine du projet.");
  }
  return new Database(dbPath, { readonly: options?.readonly ?? false, fileMustExist: true });
}

export function getNewsRows() {
  const db = openDb({ readonly: true });
  const rows = db
    .prepare(
      "SELECT id, titre, petite_description, image, longue_description, created_at, epingle, pdf FROM news ORDER BY epingle DESC, datetime(created_at) DESC"
    )
    .all();
  db.close();
  return rows;
}

export function getAdmins() {
  const db = openDb({ readonly: true });
  const rows = db.prepare("SELECT id, nom, role FROM admins ORDER BY nom ASC").all();
  db.close();
  return rows;
}

import { createHmac } from "crypto";

export type SessionPayload = {
  userId: number;
  name: string;
  role: string;
  exp: number;
};

export const ADMIN_COOKIE = "boucherie_admin";
const SECRET = process.env.ADMIN_SECRET || "dev-admin-secret-change-me";
const DEFAULT_TTL_HOURS = 12;

function sign(data: string) {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function createSessionToken(user: { id: number; nom: string; role: string }, ttlHours = DEFAULT_TTL_HOURS) {
  const payload: SessionPayload = {
    userId: user.id,
    name: user.nom,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + ttlHours * 3600
  };
  const base = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(base);
  return `${base}.${signature}`;
}

export function verifySessionToken(token?: string | null): SessionPayload | null {
  if (!token) return null;
  const [base, signature] = token.split(".");
  if (!base || !signature) return null;
  if (sign(base) !== signature) return null;
  try {
    const payload = JSON.parse(Buffer.from(base, "base64url").toString("utf8")) as SessionPayload;
    if (payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch (err) {
    return null;
  }
}

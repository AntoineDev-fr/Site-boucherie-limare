"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Échec de connexion");
      } else {
        router.replace("/admin/news");
      }
    } catch (err) {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-card">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-ink" htmlFor="username">
          Identifiant
        </label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink shadow-inner focus:border-primary focus:outline-none"
          autoComplete="username"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-ink" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink shadow-inner focus:border-primary focus:outline-none"
          autoComplete="current-password"
          required
        />
      </div>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Connexion…" : "Connexion"}
      </Button>
    </form>
  );
}

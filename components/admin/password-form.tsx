"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Mot de passe mis à jour.");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setMessage(data.error || "Erreur.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-5 shadow-card">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-ink">Mot de passe actuel</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-ink">Nouveau mot de passe</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
          minLength={6}
          required
        />
      </div>
      {message ? <p className="text-sm text-primary">{message}</p> : null}
      <Button type="submit" disabled={loading}>
        {loading ? "En cours..." : "Mettre à jour mon mot de passe"}
      </Button>
    </form>
  );
}

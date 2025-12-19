"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdminUser } from "@/types/admin";

const empty = { nom: "", password: "", role: "employe" };

export function AdminManager() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await fetch("/api/admin/users", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setAdmins(data.items || []);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Utilisateur créé.");
      setForm({ ...empty });
      load();
    } else {
      setMessage(data.error || "Erreur.");
    }
    setLoading(false);
  };

  const remove = async (id: number) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE", credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setMessage("Utilisateur supprimé.");
    } else {
      setMessage(data.error || "Erreur.");
    }
  };

  const toggleRole = async (admin: AdminUser) => {
    const newRole = admin.role === "admin" ? "employe" : "admin";
    const res = await fetch(`/api/admin/users/${admin.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role: newRole })
    });
    if (res.ok) {
      load();
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={submit}
        className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-5 shadow-card"
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-ink">Nom</label>
            <input
              value={form.nom}
              onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-ink">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
              minLength={6}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-ink">Rôle</label>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
            >
              <option value="employe">Employé</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        {message ? <p className="text-sm text-primary">{message}</p> : null}
        <Button type="submit" disabled={loading}>
          {loading ? "En cours..." : "Ajouter un utilisateur"}
        </Button>
      </form>

      <div className="space-y-3">
        {admins.map((admin) => (
          <Card key={admin.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-ink">{admin.nom}</p>
              <p className="text-xs text-ink/60">{admin.role}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleRole(admin)}>
                Rôle: {admin.role === "admin" ? "Admin" : "Employé"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => remove(admin.id)}>
                Supprimer
              </Button>
            </div>
          </Card>
        ))}
        {!admins.length ? <p className="text-sm text-ink/70">Aucun utilisateur.</p> : null}
      </div>
    </div>
  );
}

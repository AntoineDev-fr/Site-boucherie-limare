"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NewsItem } from "@/types/news";

type FormState = {
  id?: number;
  titre: string;
  petite_description: string;
  longue_description: string;
  image: string;
  pdf: string;
  epingle: boolean;
};

const emptyForm: FormState = {
  titre: "",
  petite_description: "",
  longue_description: "",
  image: "",
  pdf: "",
  epingle: false
};

export function NewsManager() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const load = async () => {
    const res = await fetch("/api/admin/news", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items || []);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const uploadedPaths: { image?: string; pdf?: string } = {};

    const uploadFile = async (file: File | null) => {
      if (!file) return undefined;
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
      if (!res.ok) throw new Error("Upload échoué");
      const data = await res.json();
      return data.path as string;
    };

    try {
      if (imageFile) {
        uploadedPaths.image = await uploadFile(imageFile);
      }
      if (pdfFile) {
        uploadedPaths.pdf = await uploadFile(pdfFile);
      }
    } catch (err) {
      setMessage("Échec de l’upload (image/pdf).");
      setLoading(false);
      return;
    }

    const payload = {
      titre: form.titre,
      petite_description: form.petite_description,
      longue_description: form.longue_description,
      image: uploadedPaths.image ?? form.image,
      pdf: uploadedPaths.pdf ?? form.pdf,
      epingle: form.epingle ? 1 : 0
    };

    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/admin/news/${form.id}` : "/api/admin/news";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setMessage(form.id ? "Actualité mise à jour." : "Actualité créée.");
      setForm(emptyForm);
      setImageFile(null);
      setPdfFile(null);
      load();
    } else {
      const data = await res.json();
      setMessage(data.error || "Erreur.");
    }
    setLoading(false);
  };

  const handleEdit = (item: NewsItem) => {
    setForm({
      id: item.id,
      titre: item.titre,
      petite_description: item.petite_description ?? "",
      longue_description: item.longue_description,
      image: item.image ?? "",
      pdf: item.pdf ?? "",
      epingle: !!item.epingle
    });
    setImageFile(null);
    setPdfFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette actualité ?")) return;
    const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      setItems((prev) => prev.filter((n) => n.id !== id));
      setMessage("Actualité supprimée.");
    } else {
      const data = await res.json();
      setMessage(data.error || "Erreur.");
    }
  };

  const togglePin = async (item: NewsItem) => {
    const res = await fetch(`/api/admin/news/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ epingle: item.epingle ? 0 : 1 })
    });
    if (res.ok) {
      load();
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-card"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-primary">
              {form.id ? "Modifier" : "Créer"} une actualité
            </p>
            {form.id ? <p className="text-sm text-ink/70">ID #{form.id}</p> : null}
          </div>
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              checked={form.epingle}
              onChange={(e) => setForm((f) => ({ ...f, epingle: e.target.checked }))}
              className="h-4 w-4 rounded border-ink/30 text-primary focus:ring-primary"
            />
            Épingler
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">Titre</label>
            <input
              value={form.titre}
              onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">Chapo (courte description)</label>
            <input
              value={form.petite_description}
              onChange={(e) => setForm((f) => ({ ...f, petite_description: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink">Texte long</label>
          <textarea
            value={form.longue_description}
            onChange={(e) => setForm((f) => ({ ...f, longue_description: e.target.value }))}
            className="min-h-[140px] w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">Image (chemin /assets/...)</label>
            <input
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
              placeholder="/assets/mon-image.jpeg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-ink/80 file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink">PDF (chemin /assets/...)</label>
            <input
              value={form.pdf}
              onChange={(e) => setForm((f) => ({ ...f, pdf: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
              placeholder="/assets/mon-flyer.pdf"
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-ink/80 file:mr-3 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-primary"
            />
          </div>
        </div>
        {message ? <p className="text-sm text-primary">{message}</p> : null}
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "En cours..." : form.id ? "Mettre à jour" : "Publier"}
          </Button>
          {form.id ? (
            <Button variant="ghost" type="button" onClick={() => setForm(emptyForm)}>
              Réinitialiser
            </Button>
          ) : null}
        </div>
      </form>

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl text-ink">{item.titre}</h3>
                  {item.epingle ? <Badge>Épinglé</Badge> : null}
                </div>
                <p className="text-sm text-ink/70">{item.petite_description}</p>
                <p className="text-xs text-ink/50">
                  Créé le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.created_at))}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" onClick={() => togglePin(item)}>
                  {item.epingle ? "Retirer l’épingle" : "Épingler"}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleEdit(item)}>
                  Modifier
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                  Supprimer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

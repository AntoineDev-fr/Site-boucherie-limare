"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { NewsItem } from "@/types/news";
import { Modal } from "../modal";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { NewsCard } from "./news-card";

type Props = { items: NewsItem[] };

export function NewsGrid({ items }: Props) {
  const [selected, setSelected] = useState<NewsItem | null>(null);

  const sorted = useMemo(
    () => [...items].sort((a, b) => Number(b.epingle) - Number(a.epingle)),
    [items]
  );

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item) => (
          <NewsCard key={item.id} item={item} onSelect={setSelected} />
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.titre}>
        {selected ? (
          <div className="space-y-5">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl">
              <Image
                src={selected.image || "/assets/hero.jpg"}
                alt={selected.titre}
                fill
                className="object-cover"
                sizes="80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                {selected.epingle ? <Badge>À la une</Badge> : null}
                <Badge tone="neutral">
                  {new Intl.DateTimeFormat("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  }).format(new Date(selected.created_at))}
                </Badge>
              </div>
            </div>
            <p className="text-base text-ink/80">{selected.petite_description}</p>
            <p className="whitespace-pre-line text-base leading-7 text-ink/90">{selected.longue_description}</p>
            {selected.pdf ? (
              <Button variant="secondary" asChild>
                <a href={selected.pdf} target="_blank" rel="noopener noreferrer">
                  Ouvrir le PDF
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </>
  );
}

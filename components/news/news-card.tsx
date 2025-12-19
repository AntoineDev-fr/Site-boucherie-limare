import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { NewsItem } from "@/types/news";

type Props = {
  item: NewsItem;
  onSelect: (item: NewsItem) => void;
};

export function NewsCard({ item, onSelect }: Props) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={item.image || "/assets/hero.jpg"}
          alt={item.titre}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          {item.epingle ? <Badge>À la une</Badge> : null}
          <Badge tone="neutral">
            {new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(
              new Date(item.created_at)
            )}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl text-ink">{item.titre}</h3>
        <p className="text-sm text-ink/80">{item.petite_description}</p>
        <button
          onClick={() => onSelect(item)}
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark focus-visible:ring-2 focus-visible:ring-primary"
        >
          Lire la suite
          <span aria-hidden>↗</span>
        </button>
      </div>
    </Card>
  );
}

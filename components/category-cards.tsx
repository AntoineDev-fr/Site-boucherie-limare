import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/content";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function CategoryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.slug} className="flex flex-col overflow-hidden">
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={category.heroImage}
              alt={category.name}
              fill
              className="object-cover transition duration-300 hover:scale-105"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            {category.eyebrow ? <Badge>{category.eyebrow}</Badge> : null}
            <h3 className="font-display text-xl text-ink">{category.name}</h3>
            <p className="text-sm text-ink/75">{category.intro}</p>
            <div className="mt-auto">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${category.slug}`}>Découvrir</Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

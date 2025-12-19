import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, categoryMap } from "@/lib/content";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/site";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryMap[params.slug];
  if (!category) return {};
  const title = `${category.name} | ${business.name}`;
  return {
    title,
    description: category.intro,
    openGraph: {
      title,
      description: category.description,
      images: [{ url: category.heroImage }]
    }
  };
}

export default function CategoryPage({ params }: Props) {
  const category = categoryMap[params.slug];
  if (!category) return notFound();

  return (
    <div className="space-y-10 pb-16">
      <section className="relative overflow-hidden rounded-[28px] border border-white/50 bg-cream-light shadow-soft">
        <div className="absolute inset-0">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-overlay to-cream/70" />
        </div>
        <div className="relative grid gap-6 px-6 py-10 md:grid-cols-2 md:px-10 md:py-14">
          <div className="space-y-4 text-white">
            {category.eyebrow ? <Badge className="bg-white/20 text-white">{category.eyebrow}</Badge> : null}
            <h1 className="font-display text-3xl md:text-4xl">{category.name}</h1>
            <p className="text-base text-white/80 md:max-w-xl md:text-lg">{category.intro}</p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-white/20 text-white">Qualité artisanale</Badge>
              <Badge className="bg-white/20 text-white">Conseils personnalisés</Badge>
            </div>
          </div>
          <div className="rounded-3xl bg-white/90 p-6 text-ink shadow-card backdrop-blur">
            <p className="text-sm uppercase tracking-[0.14em] text-primary">Ce que l’on prépare</p>
            <p className="mt-3 text-base leading-7 text-ink/80">{category.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              {category.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-primary">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="secondary" asChild>
                <a href={`tel:${business.phone}`}>Préparer une commande</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Galerie"
        title={`Les ${category.name.toLowerCase()} en images`}
        description="Arrivages, préparations maison et plateaux prêts à servir. Les images sont optimisées et chargées en différé pour plus de performance."
        className="bg-white/80"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {category.gallery.map((item) => (
            <div key={item.src} className="relative h-52 overflow-hidden rounded-3xl md:h-72">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-300 hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

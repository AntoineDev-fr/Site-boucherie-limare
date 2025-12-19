"use client";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { CategoryCards } from "@/components/category-cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { business } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      
      
      <Hero
        eyebrow="Savoir-faire artisanal"
        title="Viandes françaises, charcuterie maison et traiteur sur mesure"
        description="Maison familiale à Cormeilles, nous préparons vos viandes, volailles, charcuterie et plateaux traiteur avec des produits sélectionnés et des recettes maison."
        image="/assets/hero.jpg"
        actions={[
          { label: "Voir les actus", href: "/news" },
          { label: "Découvrir nos viandes", href: "/viandes", variant: "ghost" }
        ]}
      />

      <Section
        eyebrow="À propos"
        title="Boucherie Limare, depuis 2021 à vos côtés"
        description="Viandes françaises, recettes maison et conseils personnalisés pour vos repas du quotidien et vos moments d’exception."
      >
        <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 text-ink/80">
            <p>
              Installés à Cormeilles depuis 2021, nous travaillons avec des éleveurs français engagés et des artisans de
              confiance pour vous proposer des produits de caractère : bœuf maturé, volailles fermières, charcuterie
              maison, fromages affinés et plats traiteur cuisinés sur place.
            </p>
            <p>
              Notre mission : vous conseiller sur les morceaux, les cuissons et les accords, pour rendre chaque repas
              simple et gourmand. Nous préparons vos commandes sur-mesure et vos plateaux prêts à servir.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge>Viandes françaises</Badge>
              <Badge>Charcuterie maison</Badge>
              <Badge tone="neutral">Traiteur sur-mesure</Badge>
            </div>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-3xl">
            <Image
              src="/assets/M et Mme Limare.png"
              alt="L'équipe de la Boucherie Limare"
              fill
              className="object-cover"
              sizes="40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-cream-light/60" />
          </div>
        </div>
      </Section>
        <section className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-primary text-white px-6 py-10 shadow-soft md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.15),transparent_35%)]" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-white/80">Réseaux sociaux</p>
            <h3 className="font-display text-3xl">Idées recettes, arrivages et nouveautés</h3>
            <p className="max-w-2xl text-white/80">
              Suivez la Boucherie Limare pour connaître les plats traiteur du week-end, les arrivages de viandes et nos
              conseils de cuisson.
            </p>
          </div>
            <div className="flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link href={business.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
            </Button>
            <Button variant="ghost" className="bg-white/20 text-white hover:bg-white/30" asChild>
              <Link href={business.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Section
        eyebrow="Infos pratiques"
        title="Venez nous voir"
        description="Au cœur de Cormeilles, avec stationnement à proximité. Passez commande par téléphone et récupérez vos plats ou vos pièces prêtes à cuire."
      >
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-ink/5 bg-white/85 p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-primary">Horaires</p>
                <h3 className="font-display text-xl text-ink">Ouverts du mardi au dimanche</h3>
              </div>
              <Button variant="secondary" size="sm" asChild>
                <a href={`tel:${business.phone}`}>Appeler</a>
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-ink/85 sm:grid-cols-2">
              {business.openingHours.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-cream-light/70 px-4 py-3 shadow-card"
                >
                  <span className="font-semibold text-ink">{item.label}</span>
                  <span className="text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-ink/5 bg-cream-light/90 p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                📍
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-primary">Adresse</p>
                <p className="font-display text-2xl text-ink">{business.address.city}</p>
              </div>
            </div>
            <p className="mt-3 text-ink/80">
              {business.address.line1}
              <br />
              {business.address.postalCode} {business.address.city}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="ghost" asChild>
                <Link href={business.mapLink} target="_blank" rel="noopener noreferrer">
                  Itinéraire
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:${business.phone}`}>Appeler</a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Nos univers"
        title="Viandes, volailles, charcuterie, traiteur, fromages"
        description="Découvrez nos rayons, nos spécialités maison et nos plateaux prêts à déguster."
      >
        <CategoryCards />
      </Section>
    </div>
  );
}

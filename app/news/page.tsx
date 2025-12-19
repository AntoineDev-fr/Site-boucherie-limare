import { headers } from "next/headers";
import { Metadata } from "next";
import { Section } from "@/components/section";
import { NewsGrid } from "@/components/news/news-grid";
import { NewsItem } from "@/types/news";
import { business } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Actualités | Boucherie Limare",
  description:
    "Les arrivages, plats traiteur, promotions et informations pratiques de la Boucherie Limare à Cormeilles.",
  openGraph: {
    title: "Actualités | Boucherie Limare",
    description:
      "Les arrivages, plats traiteur, promotions et informations pratiques de la Boucherie Limare à Cormeilles.",
    url: "https://boucherie-limare.com/news",
    images: [{ url: business.ogImage }]
  },
  alternates: {
    canonical: "https://boucherie-limare.com/news"
  }
};

async function getNews(): Promise<NewsItem[]> {
  const host = headers().get("host") ?? "localhost:3000";
  const protocol = headers().get("x-forwarded-proto") ?? "http";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

  try {
    const res = await fetch(`${baseUrl}/api/news`, { cache: "no-store" });
    if (!res.ok) throw new Error("API non disponible");
    const data = (await res.json()) as { items: NewsItem[] };
    return data.items || [];
  } catch (error) {
    console.error("Erreur de récupération des news", error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="space-y-10 pb-16">
      <Section
        eyebrow="À la une"
        title="Actualités de la Boucherie Limare"
        description="Arrivages, plats traiteur du week-end, promotions et informations pratiques. Les articles épinglés apparaissent en premier."
        className="bg-cream-light/80"
      >
        {news.length ? (
          <NewsGrid items={news} />
        ) : (
          <p className="text-ink/70">Aucune actualité pour le moment.</p>
        )}
      </Section>
    </div>
  );
}

import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { business, mainNav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-cream/80">
      <div className="container max-w-6xl space-y-8 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Boucherie Limare</p>
            <h2 className="font-display text-2xl text-ink">Tradition & savoir-faire à Cormeilles</h2>
            <p className="max-w-2xl text-ink/80">
              Viandes françaises, charcuterie maison, service traiteur sur mesure et fromages affinés pour vos moments
              gourmands.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-ink/80">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-semibold text-ink">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${business.phone}`} className="hover:text-primary">
                  {business.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 text-primary" />
                <a
                  href={business.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {business.address.line1}
                  <br />
                  {business.address.postalCode} {business.address.city}
                </a>
              </div>
              <div className="flex gap-4 text-ink">
                <a
                  aria-label="Instagram"
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  aria-label="Facebook"
                  href={business.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="space-y-2">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="block hover:text-primary">
                  {item.label}
                </Link>
              ))}
              <Link href="/mentions-legales" className="block hover:text-primary">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="block hover:text-primary">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
        <p className="text-xs text-ink/60">
          © {new Date().getFullYear()} Boucherie Limare. Site conçu pour la performance, l’accessibilité et le goût des
          bonnes choses.
        </p>
      </div>
    </footer>
  );
}

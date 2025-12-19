import { Section } from "@/components/section";

export default function MentionsLegalesPage() {
  return (
    <div className="pb-16">
      <Section
        eyebrow="Mentions légales"
        title="Boucherie Limare"
        description="Informations légales et obligations relatives au site boucherie-limare.com."
        className="space-y-6 bg-cream-light/70"
      >
        <div className="space-y-4 text-sm leading-7 text-ink/80">
          <p>
            Propriétaire : Boucherie Limare – 12 rue de l’Abbaye, 27260 Cormeilles – Téléphone : 02 32 57 80 50
          </p>
          <p>Directeur de la publication : Boucherie Limare.</p>
          <p>
            Hébergement : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Contact : privacy@vercel.com.
          </p>
          <p>
            Propriété intellectuelle : les contenus (textes, visuels, logos) sont la propriété de Boucherie Limare. Toute
            reproduction doit faire l’objet d’une autorisation préalable.
          </p>
          <p>
            Données personnelles : aucune donnée n’est collectée sans consentement. Pour toute demande de suppression ou
            de rectification, contactez-nous par téléphone ou sur place.
          </p>
        </div>
      </Section>
    </div>
  );
}

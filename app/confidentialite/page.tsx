import { Section } from "@/components/section";

export default function ConfidentialitePage() {
  return (
    <div className="pb-16">
      <Section
        eyebrow="Confidentialité"
        title="Politique de confidentialité"
        description="Transparence sur les données collectées et l’usage des cookies sur boucherie-limare.com."
        className="space-y-6 bg-white/80"
      >
        <div className="space-y-4 text-sm leading-7 text-ink/80">
          <p>
            Nous utilisons uniquement des cookies de mesure d’audience anonymisés pour améliorer le site. Aucun cookie
            publicitaire ou de suivi inter-site n’est déposé sans votre consentement.
          </p>
          <p>
            Les données personnelles ne sont collectées que lorsque vous nous contactez volontairement (téléphone ou
            échange en boutique). Elles ne sont ni revendues ni transmises à des tiers.
          </p>
          <p>
            Vous pouvez refuser les cookies de mesure via le bandeau dédié. Pour toute question sur vos données ou pour
            exercer vos droits (accès, rectification, suppression), contactez-nous.
          </p>
          <p>
            Hébergement : Vercel Inc. Les journaux techniques (logs) sont conservés pour la sécurité et l’amélioration
            du service.
          </p>
        </div>
      </Section>
    </div>
  );
}

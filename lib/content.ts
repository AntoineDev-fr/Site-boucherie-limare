export type CategoryContent = {
  slug: string;
  name: string;
  eyebrow?: string;
  heroImage: string;
  intro: string;
  description: string;
  highlights: string[];
  gallery: Array<{ src: string; alt: string }>;
};

export const categories: CategoryContent[] = [
  {
    slug: "viandes",
    name: "Viandes",
    eyebrow: "Origine France",
    heroImage: "/assets/viandes1.jpeg",
    intro: "Une sélection de viandes françaises maturées avec soin pour révéler toute leur tendreté.",
    description:
      "Côtes de bœuf persillées, faux-filets fondants, veaux fermiers et agneaux label rouge : nous travaillons avec des éleveurs partenaires pour garantir le goût et la traçabilité. Chaque morceau est préparé à la demande et conseillé selon votre cuisson ou votre recette.",
    highlights: [
      "Bœuf français persillé et maturé en chambre froide",
      "Veau et agneau sélectionnés sur des élevages engagés",
      "Découpes sur mesure, ficelées et prêtes à cuire",
      "Conseils de cuisson et accords traiteur"
    ],
    gallery: [
      { src: "/assets/viandes1.jpeg", alt: "Côte de bœuf maturée" },
      { src: "/assets/viandes2.jpeg", alt: "Pièces de viande rouge" },
      { src: "/assets/viandes3.png", alt: "Préparations de boucherie" },
      { src: "/assets/viandes5.jpeg", alt: "Viande prête à cuire" }
    ]
  },
  {
    slug: "volailles",
    name: "Volailles",
    eyebrow: "Poulets fermiers",
    heroImage: "/assets/volailles1.png",
    intro: "Poulets jaunes fermiers, volailles festives et découpes prêtes à rôtir.",
    description:
      "Nos volailles proviennent d’élevages respectueux du bien-être animal. Poulet fermier jaune, pintade, canard, dinde de fête : nous préparons vos pièces sur mesure, marinées ou bardées pour sublimer vos rôtis du week-end comme vos menus de fête.",
    highlights: [
      "Poulets fermiers jaunes prêts à rôtir",
      "Canards, pintades et volailles festives sur commande",
      "Marinades maison et farces gourmandes",
      "Cuissons et assaisonnements conseillés selon vos envies"
    ],
    gallery: [
      { src: "/assets/volailles1.png", alt: "Poulet fermier prêt à cuire" },
      { src: "/assets/volailles2.png", alt: "Sélection de volailles" },
      { src: "/assets/volailles3.png", alt: "Découpes de volailles" },
      { src: "/assets/poulet.jpg", alt: "Poulet rôti doré" }
    ]
  },
  {
    slug: "charcuterie",
    name: "Charcuterie",
    eyebrow: "Maison et terroir",
    heroImage: "/assets/charcuterie.webp",
    intro: "Charcuterie maison, jambons rôtis, terrines et spécialités régionales.",
    description:
      "Nos jambons blancs sont rôtis sur place, nos pâtés et rillettes sont mitonnés dans le respect des recettes traditionnelles. Nous sourçons aussi des maisons partenaires (Teyssier, Targe…) pour compléter l’étal avec des saveurs de caractère.",
    highlights: [
      "Jambon blanc rôti maison, découpe minute",
      "Terrines, pâtés en croûte et rillettes maison",
      "Saucissons et jambons secs de maisons partenaires",
      "Plateaux apéritifs prêts à partager"
    ],
    gallery: [
      { src: "/assets/charcuterie.webp", alt: "Charcuterie maison" },
      { src: "/assets/charcuterieplateau.jpg", alt: "Plateau de charcuterie" },
      { src: "/assets/teyssier.jpg", alt: "Saucisson Teyssier" },
      { src: "/assets/targe.jpg", alt: "Jambon sec Targe" }
    ]
  },
  {
    slug: "traiteur",
    name: "Traiteur",
    eyebrow: "Sur-mesure",
    heroImage: "/assets/traiteur1.png",
    intro: "Buffets, plats mijotés et plateaux raffinés pour vos réceptions.",
    description:
      "Du plat du jour aux réceptions privées, nous cuisinons des recettes généreuses : bœuf bourguignon, parmentier confit, volailles farcies, mais aussi verrines et plateaux apéritifs. Nous adaptons quantités et formats selon votre événement.",
    highlights: [
      "Plats mijotés maison prêts à réchauffer",
      "Plateaux apéritifs et pièces cocktail",
      "Formules sur-mesure pour repas de famille et entreprises",
      "Conseils d’accord mets & vins locaux"
    ],
    gallery: [
      { src: "/assets/traiteur1.png", alt: "Assortiment traiteur" },
      { src: "/assets/traiteur2.png", alt: "Plateau cocktail" },
      { src: "/assets/banniereplateau.png", alt: "Plateau traiteur gourmand" },
      { src: "/assets/M et Mme Limare.png", alt: "Équipe de la boucherie" }
    ]
  },
  {
    slug: "fromages",
    name: "Fromages",
    eyebrow: "Crèmerie affinée",
    heroImage: "/assets/fromageplateau.png",
    intro: "Sélection de fromages affinés, crèmerie et plateaux sur commande.",
    description:
      "Camembert fermier, comté affiné, tommes et chèvres locaux : nous composons des plateaux prêts à servir, accompagnés de fruits secs ou de condiments maison. Parfaits pour vos repas de famille et fins de repas chaleureux.",
    highlights: [
      "Plateaux fromagers prêts à partager",
      "Sélection affinée selon la saison",
      "Accords confitures et condiments maison",
      "Conseils de service et de découpe"
    ],
    gallery: [
      { src: "/assets/fromageplateau.png", alt: "Plateau de fromages" },
      { src: "/assets/tomates.jpg", alt: "Fromages et condiments" },
      { src: "/assets/poules.jpg", alt: "Produits de crèmerie" },
      { src: "/assets/hero.jpg", alt: "Étal de fromages" }
    ]
  }
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

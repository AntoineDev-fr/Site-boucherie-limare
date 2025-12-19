export const business = {
  name: "Boucherie Limare",
  tagline: "Boucherie – Charcuterie – Traiteur à Cormeilles",
  description:
    "Boucherie Limare à Cormeilles (27260) : viandes françaises sélectionnées, charcuterie maison et service traiteur sur mesure.",
  phone: "+33232578050",
  email: "contact@boucherie-limare.com",
  address: {
    line1: "12 rue de l'Abbaye",
    city: "Cormeilles",
    postalCode: "27260",
    country: "France"
  },
  mapLink: "https://www.google.com/maps/place/12+Rue+de+l%27Abbaye,+27260+Cormeilles",
  social: {
    instagram: "https://www.instagram.com/Boucherie.Limare",
    facebook: "https://www.facebook.com/p/Boucherie-Limare-100075564131371/?locale=fr_FR"
  },
  openingHours: [
    { label: "Lundi", value: "Fermé" },
    { label: "Mardi", value: "07h30 – 13h / 15h – 19h30" },
    { label: "Mercredi", value: "07h30 – 13h / 15h – 19h30" },
    { label: "Jeudi", value: "07h30 – 13h / 15h – 19h30" },
    { label: "Vendredi", value: "07h30 – 13h / 15h – 19h30" },
    { label: "Samedi", value: "07h30 – 13h / 15h – 19h30" },
    { label: "Dimanche et jours fériés", value: "08h – 13h" }
  ],
  ogImage: "/assets/hero.jpg"
};

export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "À la une", href: "/news" },
  { label: "Viandes", href: "/viandes" },
  { label: "Volailles", href: "/volailles" },
  { label: "Charcuterie", href: "/charcuterie" },
  { label: "Traiteur", href: "/traiteur" },
  { label: "Fromages", href: "/fromages" }
];

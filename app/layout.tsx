import type { Metadata } from "next";
import "./globals.css";
import { Manrope, Playfair_Display } from "next/font/google";
import { ClientShell } from "@/components/layout/client-shell";
import { business } from "@/lib/site";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

const title = `${business.name} | ${business.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://boucherie-limare.com"),
  title: {
    default: title,
    template: `%s | ${business.name}`
  },
  description: business.description,
  openGraph: {
    title,
    description: business.description,
    url: "https://boucherie-limare.com",
    type: "website",
    locale: "fr_FR",
    siteName: business.name,
    images: [
      {
        url: business.ogImage,
        width: 1200,
        height: 630,
        alt: business.name
      }
    ]
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png"
  },
  alternates: {
    canonical: "https://boucherie-limare.com"
  }
};

const businessLd = {
  "@context": "https://schema.org",
  "@type": "Butcher",
  name: business.name,
  image: "https://boucherie-limare.com/assets/hero.jpg",
  url: "https://boucherie-limare.com",
  telephone: business.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.line1,
    addressLocality: business.address.city,
    postalCode: business.address.postalCode,
    addressCountry: "FR"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "00:00",
      closes: "00:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:30",
      closes: "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "15:00",
      closes: "19:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "PublicHolidays"],
      opens: "08:00",
      closes: "13:00"
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
        />
      </head>
      <body className="antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}

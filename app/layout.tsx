import type { Metadata } from "next";
import { business } from "@/lib/site-data";
import { ScrollAnimator } from "./scroll-animator";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aalavaaisolar.in"),
  title: {
    default: "AALAVAAI SOLAR | Solar Street Lights | Madurai",
    template: "%s | AALAVAAI SOLAR",
  },
  description: "AALAVAAI SOLAR provides premium solar street lights (60W, 90W, 120W) and solar energy solutions in Madurai. Solar powered, long life battery, water resistant, remote control. LIGHT TODAY | SAVE TOMORROW.",
  keywords: [
    "solar street light Madurai",
    "AALAVAAI SOLAR",
    "60W solar street light",
    "90W solar street light",
    "120W solar street light",
    "solar energy Madurai",
    "solar installation Madurai",
    "solar power solutions Madurai",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AALAVAAI SOLAR | Solar Street Lights | Madurai",
    description: "Premium solar street lights and solar energy solutions. LIGHT TODAY | SAVE TOMORROW.",
    images: ["/solar-hero.webp"],
    locale: "en_IN",
    siteName: "AALAVAAI SOLAR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    image: "/solar-hero.webp",
    telephone: `+91${business.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "27, Mela Ponnagaram Main Road",
      addressLocality: "Madurai",
      addressRegion: "Tamil Nadu",
      postalCode: "625016",
      addressCountry: "IN",
    },
    areaServed: ["Madurai", "Dindigul", "Virudhunagar", "Sivaganga"],
    serviceType: ["Solar Street Lights", "Solar Power Solutions", "Solar Installation", "Solar Maintenance", "Solar Energy Consultation"],
    slogan: "LIGHT TODAY | SAVE TOMORROW",
  };

  return (
    <html lang="en">
      <body>
        <ScrollAnimator />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}

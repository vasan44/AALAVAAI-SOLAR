import type { Metadata } from "next";
import { ContactSection, FaqSection, PageHero, SiteShell } from "../site-components";

export const metadata: Metadata = {
  title: "Contact AALAVAAI SOLAR",
  description: "Contact AALAVAAI SOLAR for solar street lights and solar energy solutions in Madurai. Phone: 63852 35606. 27, Mela Ponnagaram Main Road, Near by Karimedu Police Station, Madurai - 16.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch with AALAVAAI SOLAR"
        copy="Contact us for solar street lights, solar power solutions and free consultation. LIGHT TODAY | SAVE TOMORROW."
        image="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80&fit=crop&crop=right"
      />
      <FaqSection />
      <ContactSection />
    </SiteShell>
  );
}

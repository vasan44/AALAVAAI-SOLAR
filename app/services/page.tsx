import type { Metadata } from "next";
import { ExecutionDetailSection, PageHero, SafetySection, ServicesSection, SiteShell } from "../site-components";

export const metadata: Metadata = {
  title: "Solar Solutions & Services",
  description: "Solar street lights, solar power solutions, installation, maintenance and consultation by AALAVAAI SOLAR in Madurai. LIGHT TODAY | SAVE TOMORROW.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title="Professional Solar Energy Solutions"
        copy="AALAVAAI SOLAR provides complete solar energy services — from solar street lights and solar power systems to installation, maintenance and consultation."
        image="/services.webp"
      />
      <ServicesSection />
      <ExecutionDetailSection />
      <SafetySection />
    </SiteShell>
  );
}

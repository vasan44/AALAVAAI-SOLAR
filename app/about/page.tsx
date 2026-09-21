import type { Metadata } from "next";
import { AboutSection, BenefitsSection, ExecutionDetailSection, PageHero, SiteShell, TestimonialsSection, WhyChooseUsSection } from "../site-components";

export const metadata: Metadata = {
  title: "About AALAVAAI SOLAR",
  description: "Learn about AALAVAAI SOLAR, a professional solar energy company in Madurai providing premium solar street lights and solar energy solutions. LIGHT TODAY | SAVE TOMORROW.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Us"
        title="Powering a Brighter, Sustainable Future"
        copy="AALAVAAI SOLAR is committed to delivering reliable, high-quality solar street lights and solar energy solutions. LIGHT TODAY | SAVE TOMORROW."
        image="/about.webp"
      />
      <AboutSection />
      <WhyChooseUsSection />
      <ExecutionDetailSection />
      <BenefitsSection />
      <TestimonialsSection />
    </SiteShell>
  );
}

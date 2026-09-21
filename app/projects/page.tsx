import type { Metadata } from "next";
import { ExecutionDetailSection, PageHero, ProjectsSection, SiteShell } from "../site-components";

export const metadata: Metadata = {
  title: "Solar Street Light Products",
  description: "60W, 90W and 120W solar street lights by AALAVAAI SOLAR in Madurai. Solar powered, long life battery, water resistant, remote control.",
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Projects"
        title="Solar Street Lights & Applications"
        copy="AALAVAAI SOLAR delivers 60W, 90W and 120W solar street lights for residential colonies, main roads, schools, industrial areas and public spaces."
        image="/projects.webp"
      />
      <ProjectsSection />
      <ExecutionDetailSection />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { GallerySection, PageHero, SiteShell } from "../site-components";
import { listGalleryImages } from "@/lib/db";

export const metadata: Metadata = {
  title: "Solar Work Gallery",
  description: "View solar panel mounting, inverter installation, AC/DC protection board, cable routing, earthing and cleaning service areas.",
};

export default async function GalleryPage() {
  let dbImages: { id: number; url: string; label: string; tag: string }[] = [];
  try {
    dbImages = await listGalleryImages();
  } catch {
    // DB not configured — fall back to static gallery items
  }

  return (
    <SiteShell>
      <PageHero
        eyebrow="Gallery"
        title="Installation areas and electrical work views."
        copy="A focused gallery page for panel mounting, inverter setup, cable routing, protection boards and maintenance work."
        image="/gallery.webp"
      />
      <GallerySection dbImages={dbImages} />
    </SiteShell>
  );
}

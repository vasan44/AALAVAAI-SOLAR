import type { MetadataRoute } from "next";

const baseUrl = "https://aalavaaisolar.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/services", "/projects", "/gallery", "/career", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}

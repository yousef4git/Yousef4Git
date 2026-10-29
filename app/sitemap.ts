import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site";

// Both language pages, each pointing at the other.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${siteContent.url}/`, ar: `${siteContent.url}/ar` };
  return [
    { url: `${siteContent.url}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteContent.url}/ar`, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}

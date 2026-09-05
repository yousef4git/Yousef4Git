import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteContent.url}/`, changeFrequency: "monthly", priority: 1 }];
}

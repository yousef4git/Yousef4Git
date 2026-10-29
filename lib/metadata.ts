import type { Metadata } from "next";
import { contentFor, localePath, type Locale } from "@/content/locale";

// Each language page points at the other through hreflang, with the English
// root as the default. The English social card is generated (app/(en)/
// opengraph-image.tsx); the Arabic one is a static PNG rendered with the
// Arabic fonts, because the image renderer cannot shape Arabic text.
export function buildMetadata(locale: Locale): Metadata {
  const c = contentFor(locale);
  const path = localePath(locale);
  const languages = { en: "/", ar: "/ar", "x-default": "/" };
  const arabicImage = { url: "/og-ar.png", width: 1200, height: 630, alt: c.meta.og.alt };
  return {
    metadataBase: new URL(c.url),
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: "profile",
      siteName: c.name,
      title: c.meta.title,
      description: c.meta.description,
      url: `${c.url}${path}`,
      locale: c.meta.ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      ...(locale === "ar" ? { images: [arabicImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
      ...(locale === "ar" ? { images: [arabicImage.url] } : {}),
    },
  };
}

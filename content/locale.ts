import { siteContent, type CredentialId, type SiteContent } from "./site";
import { siteContentAr } from "./site.ar";

export type Locale = "en" | "ar";
export const LOCALES: readonly Locale[] = ["en", "ar"];

// English lives at the root, Arabic under /ar. Both are the same single page.
export const localePath = (locale: Locale) => (locale === "ar" ? "/ar" : "/");

export function contentFor(locale: Locale): SiteContent {
  return locale === "ar" ? siteContentAr : siteContent;
}

export function pickCredential(content: SiteContent, id: CredentialId) {
  const c = content.credentials.list.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown credential: ${id}`);
  return c;
}

export function pickProject(content: SiteContent, id: string) {
  const p = content.noon.projects.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown Noon project: ${id}`);
  return p;
}

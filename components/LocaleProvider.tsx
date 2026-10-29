"use client";
import { createContext, useContext, type ReactNode } from "react";
import { contentFor, type Locale } from "@/content/locale";
import type { SiteContent } from "@/content/site";

const LocaleContext = createContext<SiteContent | null>(null);

// One locale's content for the whole page. Client components read it with
// useContent(); server components call contentFor(locale) directly.
export default function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={contentFor(locale)}>{children}</LocaleContext.Provider>;
}

export function useContent(): SiteContent {
  const content = useContext(LocaleContext);
  if (!content) throw new Error("useContent must be used inside LocaleProvider");
  return content;
}

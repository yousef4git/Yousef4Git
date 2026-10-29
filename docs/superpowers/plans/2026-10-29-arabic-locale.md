# Arabic edition at /ar Implementation Plan

> **For agentic workers:** executed natively in the session that wrote it. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Serve the same single page in Arabic at `/ar`, right to left, with English kept as the default at `/`, using the Arabic copy from the October 2026 editorial handoff.

**Architecture:** Two root layouts in route groups (`app/(en)`, `app/(ar)`) set `lang`, `dir` and the fonts; both render `components/HomePage.tsx`, which wraps the chapters in a `LocaleProvider`. Components read one locale's content through `useContent()`; server components call `contentFor(locale)`. `content/site.ar.ts` mirrors the shape of `content/site.ts` (widened `SiteContent` type) and a parity test keeps ids, links, files and numbers identical. Layout uses logical utilities so RTL mirrors without a second stylesheet.

**Tech Stack:** Next.js 16 route groups and metadata alternates, next/font (Noto Naskh Arabic, IBM Plex Sans Arabic), Tailwind 4 `rtl:` and logical utilities, Playwright.

**Spec:** `portfolio-claude-handoff/portfolio-review-handoff.md` section 4 (private, untracked) and the Arabic column of `portfolio-copy-en-ar.json`.

## Global Constraints

- English stays the default at `/`; Arabic at `/ar`; both canonical, cross-linked with `hreflang` and in the sitemap.
- Official credential names, tool names and URLs stay in English inside the Arabic copy.
- No em or en dashes in `content/site.ar.ts` (copy lint covers it).
- The Arabic CV strings in `cv/data/master.json` are not touched; both pages serve the English PDF.
- No push to `main` without approval.

## Tasks

- [x] `content/site.ts`: `meta`, `ui`, `locale`, `dir`; `SiteContent` widened; `content/site.ar.ts` generated from the inventory; `content/locale.ts` helpers.
- [x] `components/LocaleProvider.tsx`, `components/HomePage.tsx`, `components/RootShell.tsx`, `lib/metadata.ts`, `lib/jsonld.ts`; route groups with their own fonts and layouts; `app/sitemap.ts` alternates; static `public/og-ar.png`.
- [x] Components read `useContent()`; logical utilities; Arabic hero name cascades by word; strip keeps LTR mechanics; chat mirrors to the end corner; chat route answers in the visitor's language.
- [x] Tests: `tests/unit/locale.test.ts` parity; `tests/e2e/arabic.spec.ts`; nav test ignores the language link; `devIndicators` moved out of the chat corner.
- [x] `npx tsc --noEmit`, `npx vitest run`, `PORT=3100 npx playwright test`, `npm run build`, screenshots of `/ar` at 1440x900 and 390x844.

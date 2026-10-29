# Portfolio repositioning (engineer, founder, educator) Implementation Plan

> **For agentic workers:** executed natively in the session that wrote it. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the October 2026 editorial handoff (`portfolio-claude-handoff/`, kept private and untracked) to youusef.com: lead with AI Systems Engineer, Founder and Educator; make AWS and CDMP the two primary credentials in the hero and in Credentials; cut Noon's default-page footprint with attributed cards and all-width disclosures; elevate Rusokh as founder work; align chat, metadata and the CV source.

**Architecture:** All copy stays in `content/site.ts`. Credentials gain a stable `id` and a `category` so the hero and the Credentials chapter select by identity instead of array position. The Noon chapter is dissolved: two cases become Selected work cards (`#work`) with a native `<details>` disclosure holding the full case; the other two cases, the hackathon paragraph and the Noon employment row move into a new Experience chapter (`#experience`) with one "More work at Noon Academy" disclosure. GHRS and YAX become Experience rows. Legacy hashes (`#noon`, `#method`, `#yax`, the four case ids) keep working; a small client hook opens any closed disclosure that a hash points into.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind 4, GSAP 3 (matchMedia, reduced motion), Vitest, Playwright, the zero-dependency CV generator in `cv/`.

**Spec:** `portfolio-claude-handoff/portfolio-review-handoff.md` and `portfolio-claude-handoff/portfolio-copy-en-ar.json` (private, untracked). Copy comes from the inventory verbatim.

## Global Constraints

- No em or en dashes anywhere under `content/`, `components/`, `app/` (`tests/unit/copy.test.ts`).
- Never claim the title "Forward Deployed Engineer"; the phrase "forward deployed" now appears exactly once on the page, in the Method closer.
- Confidentiality list in `tests/unit/content.test.ts` stays intact; nothing new from the handoff archive is published.
- No invented AWS issue year, no graduation date, no new figures; "about 71 to about 5" stays "one workflow"; HR "zero errors" stays scoped to go-live; 525 / 88% stay attendance and survey responses.
- AWS and CDMP are the first two credential items in DOM and visual order in the hero and in Credentials; Early Adopter and Associate stay attached.
- Arabic copy is not published; existing Arabic CV strings are not replaced.
- No push to `main`, no deployment. The served PDF is regenerated on the branch in its own commit so it can be dropped at review.

## Review Focus

1. A hash link to `#noon-ops-hr-integration` while the Noon disclosure is closed: the disclosure must open and the article must be scrolled into view (hook in `components/HashOpener.tsx`; e2e test).
2. Hero at 390px: both credentials readable without horizontal scroll and the role line wrapping (e2e viewport test).
3. Keyboard: the `<summary>` controls are focusable and toggle with Enter/Space (native; e2e test tabs to one and presses Enter).
4. Reduced motion: every new chapter's content is visible with motion off (e2e reduced-motion test extended to work and experience).
5. ScrollTrigger positions after a disclosure opens: `ScrollTrigger.refresh()` runs on every toggle so later reveals still fire.

---

### Task 1: Content model and copy (`content/site.ts`)

**Files:** Modify `content/site.ts`; Test `tests/unit/content.test.ts`.

- [ ] Credentials gain `id` (`apple`, `sda`, `cdmp`, `aws`, `mckinsey`) and `category` (`"certification" | "programme"`); array order AWS, CDMP, Apple, SDA, McKinsey.
- [ ] Hero: `role`, `tagline`, `currentRole`, `credentials: ["aws", "cdmp"]`, `cta.work`, `proof[]`; `roleAside` and `badges` removed.
- [ ] Method copy; Noon `intro`, `hackathon.line`, project `summary` strings; `framing` and `closer` removed.
- [ ] `workSection`, `work` rows (rusokh, site), `selectedWork`, `experience`, `yax` (title, bridge), `teaching`, `credentials` headings, `footer.line`, `chat`.
- [ ] `chapters`: hero, work, experience, teaching, method, credentials.
- [ ] Update `tests/unit/content.test.ts`: one "forward deploy" mention; hero credential ids; Apple by id; no placement card; categories; teaching start year; chat labels. Run `npx vitest run`.

### Task 2: Hero (`components/chapters/Hero.tsx`)

- [ ] Role line in sentence case, wrapping; no aside, no separator.
- [ ] Two credential links (badge artwork, name, designation) under the tagline, before the CTAs; `data-hero-cred`.
- [ ] CTAs: View selected work (primary), Email me, Download CV, LinkedIn; then the current-role line; proof band at the section's foot.
- [ ] Timeline and noscript fallback updated for the new attributes.

### Task 3: Selected work (`components/chapters/Work.tsx`, `components/Disclosure.tsx`, `components/noon/ProjectBlock.tsx`)

- [ ] Rusokh row first (founder framing, logo, link). Two Noon rows: status, title, "Built at Noon Academy", summary, one preview image, site link, `<details>` with the full case (description, lists, media).
- [ ] `ProjectBlock` loses its own article wrapper so it can sit inside the disclosure; the card owns `article#<id>`.
- [ ] Disclosure labels swap open/closed via CSS; toggle calls `ScrollTrigger.refresh()`.

### Task 4: Experience (`components/chapters/Experience.tsx`)

- [ ] Noon row (`#noon`): logo, title, meta, intro, site link, disclosure "More work at Noon Academy" with the HR integration and AI Week cases (`article#noon-ops-hr-integration`, `article#noon-ai-week`) and the hackathon paragraph with its two photos.
- [ ] GHRS row: logo, title, kicker, meta, line, two highlight lines, link.
- [ ] YAX row (`#yax`): logo, title "Operational leadership", lead, line, three figures, bridge.

### Task 5: Credentials (`components/chapters/Credentials.tsx`)

- [ ] "Professional certifications": AWS then CDMP as two equal wide rows (badge, name, designation, issuer, description, "View credential").
- [ ] "Selected programmes": Apple (scan plus "Selected 1 of 66"), SDA, McKinsey.
- [ ] Education row, then "Additional learning:" line.

### Task 6: Shell, nav, footer, chat, metadata

- [ ] `app/page.tsx` order: Nav, Hero, Work, Experience, Teaching, Method, Credentials, Footer, ChatBubble, HashOpener.
- [ ] `components/Nav.tsx`: Work, Experience, Teaching, Credentials, Contact; skip link to `#work`.
- [ ] `components/Footer.tsx`: compact "This portfolio, built as a product" row with the chat button, then the contact block with the new line.
- [ ] `components/ChatBubble.tsx`: labels and starters from `siteContent.chat`; "AI assistant" role label.
- [ ] `app/layout.tsx`, `app/opengraph-image.tsx`: new title, descriptions, OG lines; JSON-LD unchanged.
- [ ] `components/HashOpener.tsx`: opens closed `<details>` ancestors or a card's own disclosure for the current hash, then scrolls.
- [ ] `content/persona.md`: AI-assistant framing, Rusokh founder line, CV download link, teaching since 2022; confidentiality rules untouched.
- [ ] `PRODUCT.md`, `DESIGN.md`: positioning, nav and component notes.

### Task 7: Tests and verification

- [ ] `tests/e2e/site.spec.ts`: chapter order, nav labels, hero credentials visible at 1440 and 390, disclosures open by hash and by keyboard, four case anchors, reduced motion.
- [ ] `npx tsc --noEmit`, `npx vitest run`, `npx playwright test`, `cd cv && node --test test/*.test.mjs`, `npm run build`.
- [ ] Production build served locally; screenshots at 1440x900 and 390x844 (hero, work closed and open, experience, credentials, full page).

### Task 8: CV source and served PDF

- [ ] `cv/roles/ai_engineer.json` summary (EN); `cv/data/master.json`: tutor_scale, Rusokh title and bullet (EN), AWS before CDMP in certs.
- [ ] `node cv/build.mjs --role=ai_engineer`; confirm one page; copy to `public/cv/` in a separate commit; render page 1 to PNG for review.

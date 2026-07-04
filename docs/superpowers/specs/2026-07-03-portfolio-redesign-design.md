# Portfolio Redesign — Cinematic Scroll Story (Next.js + GSAP)

**Date:** 2026-07-03
**Status:** Approved design, pending implementation plan

## Goal

Rebuild yousefalshuwayi.online as a cinematic, animation-driven portfolio that
presents Yousef as **AI Systems Engineer at noon** (noon Education,
https://www.noon.edu.sa/en/, starting 2026-07-06), showcases new certificates
and stage moments through imagery and video rather than long text, and replaces
the Hugging Face Gradio chatbot with a native in-site chat. Update `linkedin.md`
to match the new positioning. Quality over deadline; no fixed ship date.

## Decisions (settled during brainstorming)

| Question | Decision |
|---|---|
| Positioning | noon front and center; freelance consulting becomes past-tense track record |
| Scope | Full rebuild on Next.js (App Router), replacing static `index.html` |
| Chatbot | Rebuilt native in Next.js with Vercel AI SDK; HF Space retired after launch |
| Identity | Evolve the existing gold-on-dark identity (richer type, texture, motion) |
| Language | English-only; Arabic stays covered by the bilingual CV suite |
| Experience concept | A: Cinematic Scroll Story — one page, scroll-driven pinned chapters |
| Timeline | No deadline; quality is the acceptance bar |

## Architecture

- **Stack:** Next.js (App Router, TypeScript) + GSAP with `@gsap/react`
  (`useGSAP`). GSAP is now fully free including formerly-premium plugins
  (SplitText, Flip, ScrollTrigger, ScrollSmoother) — plain `npm install gsap`,
  no license. Plugins registered at module level. Styling via Tailwind (v4) with
  design tokens as CSS custom properties (evolved gold/dark palette).
- **Repo layout:** Next.js app at repo root (`app/`, `public/`, `package.json`;
  `vercel.json` updated). Old `index.html` moves to `legacy/`. `cv/` and `docs/` stay untouched.
  `theChatBot/` is gitignored (personal files) and stays local-only as the
  archived Gradio version after the native chat ships.
- **Assets pipeline:** `Certificates/` is the source of truth and stays in the
  repo. Web-ready derivatives are generated into `public/media/`:
  - Apple Academy `me presinting.mov` (6.6MB) → compressed MP4 (H.264, ~720p,
    target ≤ 3–4MB) + poster frame.
  - Certificate PDFs (SDA, KAUST, Coursera ×2, McKinsey, SDAIA, Apple) →
    crisp images for the credentials wall.
  - Photos (SDA presenting, Shaguf honoring) resized/optimized; badges
    (CDMP, McKinsey) and the noon logo (`Certificates/noon-logo.png`,
    green mark + white wordmark — dark-background only) used as-is.
- **Deployment:** Vercel, same project/domain. Preview deployments for review;
  production promote only on sign-off. Old site serves until that moment.

## The scroll story — six chapters

One continuous page. Content sourced from README, linkedin.md, and CV data,
rewritten tighter (imagery carries the weight). Fixed minimal nav: monogram +
chapter dots for jumping.

1. **Hero — the film open.** Full-viewport Apple presentation video, muted,
   behind a darkened gold-tinted overlay. Name reveals letter-by-letter
   (SplitText), then "AI Systems Engineer at noon". Scroll cue. The source
   clip has no audio track, so the video simply plays muted and loops.
2. **Now — noon chapter.** Pinned section: the new role and what he builds
   (agentic AI systems in production). Type-on text with parallax depth. The
   noon logo appears here; its green is a deliberate one-time accent against
   the gold so the chapter reads as "the new era".
3. **Selected work.** Rusokh /01, GHRS /02, risk-triage /03 as large cards
   sliding horizontally while pinned — logo, one-line outcome, link.
4. **On stage.** SDA presenting photo + Shaguf best-instructor photo,
   large-format, scale-and-crossfade on scroll, short captions.
5. **Credentials wall.** Badges/certificate images fly into a grid (Flip):
   Certified Data Management Professional (CDMP, live verify URL), SDA
   Agentic AI, KAUST, McKinsey Forward, SDAIA,
   Apple Developer Academy, Coursera. Hover lifts a card, shows issuer + date.
6. **Finale — "Ask my CV anything."** Native chat panel rises in, plus contact
   links (email, LinkedIn, GitHub) and CV download.

## Motion system, performance, fallbacks

- **Motion language:** shared easing/duration tokens (slow cinematic ease for
  chapters, snappy ease for hovers). Gold light as recurring motif — reveals
  sweep like light over dark metal. SplitText for headlines, ScrollTrigger
  scrub/pin for chapters, Flip for the credentials fly-in. GSDevTools in dev.
- **Performance:** poster frame so first paint never waits on video;
  `preload="metadata"`; lazy-load below the hero; `next/image` everywhere;
  animate only transform/opacity. Target Lighthouse 90+ performance.
- **Mobile:** `ScrollTrigger.matchMedia` — pinned horizontal sections become
  vertical stacked cards with simpler reveals. Video hero respects data-saver.
- **Accessibility:** `prefers-reduced-motion` → fully readable static version
  (content never depends on animation for visibility). Semantic HTML, alt text
  on every photo/certificate, keyboard-reachable nav and chat. Target
  Lighthouse 100 accessibility.
- **SEO/social:** metadata updated to noon positioning, new OG image matching
  the evolved identity, Person structured data with role and credentials.

## Native chatbot

- **Backend:** `app/api/chat/route.ts` — AI SDK `streamText` with the direct
  `@ai-sdk/openai` provider, streaming via UI message stream response.
  Default model `gpt-4o-mini` on the user's own OpenAI key (parity with the
  current bot), overridable with a `CHAT_MODEL` env var.
- **Persona:** rebuilt from `theChatBot/me/summary.txt` + `linkedin.txt`
  (local-only sources),
  updated with noon, CDMP, SDA; stored as versioned `content/persona.md` so
  story updates are text edits.
- **Guardrails (simplified):** system prompt enforces speaking as Yousef,
  grounded only in CV content, graceful deflection of off-topic/jailbreak.
  Input length caps + per-IP rate limiting to protect API spend. The Groq
  output-judge from the Gradio version is dropped.
- **Frontend:** `useChat` in the finale chapter — streaming text with typing
  shimmer, suggested starter questions, fully styled in the site design
  system. No iframe, no Gradio.
- **Env:** `OPENAI_API_KEY` in Vercel env. Graceful
  degradation: missing key or API error → panel shows contact links instead.

## linkedin.md updates

Keep structure and voice rules (plain, no inflation, no em-dashes). Content:

- **Headline:** leads with "AI Systems Engineer at noon | Agentic AI · LLMs ·
  Python | Riyadh"; freelance framing drops out of the headline.
- **About:** new opening — building production AI systems, joining noon
  (education platform); consulting becomes past-tense track record.
- **Experience:** new top entry "AI Systems Engineer, noon — Jul 2026–present,
  Riyadh" with 2–3 truthful bullets (role, focus area); freelance entry gets an
  end date. Company page: noon Education (noon.edu.sa), not noon.com.
- **Certifications:** add Certified Data Management Professional (CDMP),
  Associate (DAMA, issued 2026-07-02, expires
  2029-07-02, verify: https://eu.credential.net/1c13a3e1-5f2d-4840-a944-afc2a1c5f720)
  and SDA Agentic AI Bootcamp; reconcile existing entries against
  `Certificates/` so names match the documents.
- **Honors:** add Shaguf best-instructor honoring.
- **Featured:** new site once live; SDA/Shaguf photos as featured media.
- **Open to Work / Services:** removed/flipped off; guide notes the manual
  LinkedIn toggle explicitly.

## Build order, testing, error handling

**Build order (each step independently shippable):**
1. Asset pipeline (video conversion, PDF renders, photo optimization)
2. Next.js scaffold: design tokens + static content of all six chapters
3. GSAP choreography, chapter by chapter
4. Chatbot route + panel
5. SEO/OG/metadata
6. linkedin.md rewrite (independent; can happen anytime)

**Testing:** TypeScript + lint on build; Playwright smoke test (page renders,
six chapters present, chat responds with mocked API); Lighthouse checks (90+
performance, 100 accessibility); manual verification of reduced-motion and
mobile modes before each merge.

**Error handling:** chat degrades to contact links on API failure; video falls
back to poster image; credential verify links open in new tabs.

**Rollout:** work on a `redesign` branch off `chatbot`,
Vercel preview per step, production promote on sign-off. LinkedIn changes are
manual paste-ins from the updated guide, independent of site launch.

## Out of scope

- Arabic/bilingual site version (later phase)
- Blog or additional pages/routes
- Changes to `cv/` generator or the CVs themselves
- New social-card assets beyond the OG image refresh

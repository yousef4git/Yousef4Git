# Portfolio Content Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-weight the portfolio's content so the Noon Training & Development Portal is the flagship, teaching at Shaguf becomes its own section, and the pre-AI YAX history collapses to one compact block, using the copy in `portfolio-content-overhaul.md` verbatim.

**Architecture:** All copy lives in `content/site.ts` (a single `as const` object) and `content/persona.md` (the chat knowledge base). Chapter components under `components/chapters/` are thin renderers over that data with GSAP scroll animations. This overhaul rewrites the data, adds one shared `StatBand` component, replaces `Stage.tsx` with `Teaching.tsx`, and reorders `app/page.tsx`. No new dependencies, no theme changes, no new fonts.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (`@theme inline` tokens in `app/globals.css`), GSAP 3.15 + `@gsap/react` (`useGSAP`, `ScrollTrigger`, `SplitText`), Vercel AI SDK v7 (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`), Vitest (unit), Playwright (e2e).

## Global Constraints

Every task's requirements implicitly include this section.

- **No em dashes (`—`, U+2014) anywhere in rendered copy, source, or comments.** The repo is currently clean (verified: zero hits across `content/`, `components/`, `app/`, `tests/`). Task 1 adds a test that keeps it that way.
- **No en dashes (`–`, U+2013) either.** Date ranges use a plain hyphen with spaces: `July 2026 - Present`. This matches the existing convention in `content/site.ts` (`"Nov 2024 - May 2025"`).
- **Em-dash substitution policy** (applied when transcribing copy from the doc, which is written with em dashes): prefer a substitution that changes **zero words and zero word order**. In priority order: (1) colon, (2) comma, (3) parentheses for a bracketed aside, (4) plain hyphen ` - ` where the dash is a hard break, (5) restructure into a component's existing title/kicker slots. Every substitution made is listed in the task that makes it.
- **Never invent facts.** Every claim must trace to the facts table in Part 4 of `portfolio-content-overhaul.md`. Copy is final: do not rewrite, embellish, tighten, or "improve" it.
- **Preserve the existing visual identity.** Colors are the `@theme inline` tokens only: `night #100e0b`, `coal #161311`, `gold #c9a96e`, `gold-bright #e8d5a4`, `bone #efe9de`, `stone #a39b8b`, `noon #17d9a3`. Fonts stay `font-display` (Cormorant Garamond), `font-body` (Inter), `font-mono` (JetBrains Mono). Keep `.gold-sheen`, `.liquid-glass`, the film-grain `body::after`, the `·` separator, the `/01 /02 /03` card numbering, and the `ChapterHead` eyebrow pattern. These are committed brand identity; identity-preservation wins over generic design-lint advice.
- **Reuse before creating.** `ChapterHead` is the section-heading component. Only `StatBand` is new, and only because two sections need it and nothing existing fits.
- **Every GSAP block goes through `gsap.matchMedia()`** with a `(prefers-reduced-motion: reduce)` branch that leaves content visible. Never gate content visibility on an animation that might not fire.
- **The recurring hairline motif** for emphasis rules is `<div aria-hidden className="h-px w-16 bg-gold/40" />`, copied from `ChapterHead`. Use it instead of colored side-borders.
- **Client names stay confidential.** The risk-triage client is only ever "an education platform". FREIGHTLX is "an early-stage logistics startup" in site copy.
- **Verify after every task:** `npx tsc --noEmit` must pass, `npm run test:unit` must pass, `npm run test:e2e` must pass, and `npm run build` must succeed.
- **Line numbers in `content/site.ts` are not stable across tasks.** Every task reshapes that file, so a range quoted in Task 3 is wrong by Task 6. Locate edits by **top-level key** (`hero`, `noon`, `teaching`, `work`, `yax`, `credentials`, `chapters`), never by line number. Line numbers quoted for other files (`app/layout.tsx`, `components/Nav.tsx`, `components/chapters/Work.tsx`, `components/ChatBubble.tsx`) are accurate at the point their task runs, because no earlier task touches them.

## Answered decisions (do not re-litigate)

| Question | Decision |
|---|---|
| Nav structure | 6 explicit links: `Intro #hero`, `Noon #noon`, `Teaching #teaching`, `Work #work`, `Before AI #yax`, `Credentials #credentials`. Scroll-spy is 1:1. |
| Noon motion | Two-beat: a pinned opening (kicker, logo, meta, lead, promise, landing line), then release to normal scroll for the stat band, bullets, and closer. |
| CDMP badge | Spelled out: `Certified Data Management Professional (CDMP)`. Overrides the doc's literal `CDMP`. |
| Work card /03 | Gets a real CTA button that opens the chat panel via a `ya:open-chat` window event. |

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `content/site.ts` | Modify | Single source of all site copy. Gains `noon` (expanded), `teaching`; loses `stage`; `yax`, `work`, `credentials` reshaped. |
| `content/persona.md` | Modify | Chat system-prompt knowledge base. Gains the Noon portal story. |
| `components/StatBand.tsx` | Create | Shared 3-up stat row for Noon and Teaching. |
| `components/chapters/Noon.tsx` | Modify | Flagship section, two-beat pin. |
| `components/chapters/Teaching.tsx` | Create | Shaguf section, absorbs the On-Stage gallery. |
| `components/chapters/Stage.tsx` | Delete | Superseded by `Teaching.tsx`. |
| `components/chapters/Work.tsx` | Modify | Optional `meta` line, optional `open-chat` action button. |
| `components/chapters/Yax.tsx` | Modify | Timeline and highlight grid deleted; one compact block. |
| `components/chapters/Credentials.tsx` | Modify | Featured 4 (Apple wide) + collapsed "Also" list. |
| `components/chapters/Hero.tsx` | Unchanged | Already data-driven; only `site.ts` changes. |
| `components/ChatBubble.tsx` | Modify | New starter chips, listens for `ya:open-chat`. |
| `components/Nav.tsx` | Modify | 6 links, 1:1 scroll-spy map. |
| `app/page.tsx` | Modify | New section order. |
| `app/layout.tsx` | Modify | Metadata descriptions carry the old tagline in 3 places. |
| `app/opengraph-image.tsx` | Modify | OG card carries the old tagline. |
| `public/media/photo-hackathon-judging.jpg` | Done | 1600x1066, 356KB. Already produced from the 6000x4000 original, which was deleted. |
| `public/media/photo-hackathon-group.jpg` | Done | 1600x1066, 408KB. Already produced from the 6000x4000 original, which was deleted. |
| `tests/unit/copy.test.ts` | Create | Em-dash guard over content and components. |
| `tests/e2e/site.spec.ts` | Modify | New chapter ids, order assertion, 6 nav links. |
| `tests/e2e/chat.spec.ts` | Modify | New starter chip text, card /03 opens chat. |

---

### Task 1: Copy guard, hero, and metadata

**Files:**
- Create: `tests/unit/copy.test.ts`
- Modify: `content/site.ts` (the `tagline` and `hero.badges` keys)
- Modify: `app/layout.tsx:20-35`
- Modify: `app/opengraph-image.tsx:25-27`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `siteContent.tagline: string`, `siteContent.hero.badges: readonly string[]` (already consumed by `Hero.tsx`, whose markup does not change).

**Em-dash substitutions in this task:**
- Doc: `"I build AI systems that people actually adopt — and that keep running after I hand them over."` → comma. Zero words changed.

**Note on scope:** the doc does not mention `app/layout.tsx` or `app/opengraph-image.tsx`, but the old tagline is hard-coded in four places there and is rendered copy (search results, link previews, the OG card). Leaving them would ship the replaced subtitle to every share of the site. The OG image line is shortened to the first clause because the full sentence overflows the 1008px text column at 24px.

- [ ] **Step 1: Write the failing copy guard test**

Create `tests/unit/copy.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const EM_DASH = "—";
const EN_DASH = "–";

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return /\.(tsx?|md)$/.test(e.name) ? [full] : [];
  });
}

const FILES = [
  ...walk(path.join(process.cwd(), "content")),
  ...walk(path.join(process.cwd(), "components")),
  ...walk(path.join(process.cwd(), "app")),
];

describe("rendered copy", () => {
  it("scans a non-trivial number of files", () => {
    expect(FILES.length).toBeGreaterThan(10);
  });

  for (const file of FILES) {
    const rel = path.relative(process.cwd(), file);
    it(`has no em or en dashes in ${rel}`, () => {
      const text = readFileSync(file, "utf8");
      expect(text).not.toContain(EM_DASH);
      expect(text).not.toContain(EN_DASH);
    });
  }
});
```

- [ ] **Step 2: Run it to confirm it passes on the current clean tree**

Run: `npm run test:unit -- copy`
Expected: PASS. The repo has zero em/en dashes today; this test is a ratchet, not a red-to-green cycle. If it fails, something in the working tree already regressed and must be fixed before continuing.

- [ ] **Step 3: Update the hero tagline and badge order**

In `content/site.ts`, replace the `tagline` value and the `hero.badges` array:

```ts
  tagline:
    "I build AI systems that people actually adopt, and that keep running after I hand them over.",
```

```ts
    badges: [
      "Apple AI Program · 1 of 66",
      "SDA Agentic AI Bootcamp",
      "Certified Data Management Professional (CDMP)",
    ],
```

- [ ] **Step 4: Update the metadata descriptions**

In `app/layout.tsx`, replace lines 20-21:

```ts
  description:
    "AI Systems Engineer at noon. I build AI systems that people actually adopt, and that keep running after I hand them over. Agentic AI, LLMs, Python, Next.js. Riyadh, Saudi Arabia.",
```

Replace line 27 and line 34 (both `description` values inside `openGraph` and `twitter`) with:

```ts
    description:
      "I build AI systems that people actually adopt, and that keep running after I hand them over.",
```

- [ ] **Step 5: Update the OG image line**

In `app/opengraph-image.tsx`, replace lines 25-27:

```tsx
        <div style={{ fontSize: 24, marginTop: 28, color: "#A39B8B" }}>
          I build AI systems that people actually adopt · yousefalshuwayi.online
        </div>
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npm run test:unit && npm run build`
Expected: all pass.

Run: `npm run dev`, open `http://localhost:3000`, confirm the hero subtitle reads the new line and the badges are ordered Apple, SDA, CDMP.

- [ ] **Step 7: Commit**

```bash
git add tests/unit/copy.test.ts content/site.ts app/layout.tsx app/opengraph-image.tsx
git commit -m "feat(site): new hero subtitle, badge order, and a no-dash copy guard"
```

---

### Task 2: StatBand component

**Files:**
- Create: `components/StatBand.tsx`

**Interfaces:**
- Consumes: `EASE` from `@/lib/motion`, `gsap`/`useGSAP` from `@/lib/gsap`.
- Produces:
  - `export type Stat = { value: string; unit?: string; label: string }`
  - `export default function StatBand({ stats, tone }: { stats: readonly Stat[]; tone?: "gold" | "noon" }): JSX.Element`
  - Renders a root element carrying `data-stat-band`, with one `data-stat` per entry.

**Design rationale (so a reviewer does not flag it as a SaaS metric template):** this is a mid-page evidence band inside a narrative section, not a hero. It uses the site's existing hairline-rule motif for separation, the display face for values and the mono face for labels, no gradients, no icons, and no card chrome. The `tone` prop gives Noon its green accent and Teaching the site gold, which is deliberate per-section art direction, not inconsistency.

- [ ] **Step 1: Create the component**

Create `components/StatBand.tsx`:

```tsx
"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

export type Stat = { value: string; unit?: string; label: string };

// Hairline separators come from a 1px parent gap showing through between
// coal-filled cells, so the band reads as ruled type rather than as cards.
export default function StatBand({
  stats,
  tone = "gold",
}: {
  stats: readonly Stat[];
  tone?: "gold" | "noon";
}) {
  const wrap = useRef<HTMLDListElement>(null);
  const rule = tone === "noon" ? "bg-noon/20" : "bg-gold/20";
  const unitTone = tone === "noon" ? "text-noon" : "text-gold";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stat]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: wrap.current, start: "top 85%" },
        });
      });
    },
    { scope: wrap }
  );

  return (
    <dl
      ref={wrap}
      data-stat-band
      className={`grid grid-cols-1 gap-px overflow-hidden rounded-lg sm:grid-cols-3 ${rule}`}
    >
      {stats.map((s) => (
        <div key={s.label} data-stat className="flex flex-col-reverse bg-coal px-5 py-6">
          <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            {s.label}
          </dt>
          <dd className="flex items-baseline gap-1 font-display text-4xl leading-none text-bone md:text-5xl">
            {s.value}
            {s.unit && <span className={`font-mono text-base ${unitTone}`}>{s.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: PASS. Nothing imports it yet; Task 3 is its first consumer.

- [ ] **Step 3: Commit**

```bash
git add components/StatBand.tsx
git commit -m "feat(site): shared stat band for the Noon and Teaching sections"
```

---

### Task 3: Noon flagship section

**Files:**
- Modify: `content/site.ts` (the whole `noon` object)
- Modify: `components/chapters/Noon.tsx` (full rewrite)

**Interfaces:**
- Consumes: `StatBand`, `Stat` from `@/components/StatBand` (Task 2).
- Produces: `siteContent.noon` with keys `kicker`, `logo`, `url`, `meta`, `lead`, `promise`, `landing`, `stats`, `bullets`, `hackathon`, `closer`. No later task reads these.

**Material not in the overhaul doc:** the Educational Games Industry Hackathon. Yousef judged it at noon, run with Saudi Arabia's Ministry of Communications and Information Technology and supported by Replit. It gets a compact second beat in this section, after the portal bullets and before the closer. This is new copy, so it must follow the doc's Part 3 voice rules rather than being transcribed.

Facts verified directly from the two photographs (MCIT, noon, and Replit lockups on the branding bar and the closing-ceremony screen, Arabic screen text `برنامج صناعة الألعاب التعليمية` and `حفل ختام البرنامج`) and from the Arabic source of Yousef's LinkedIn post. The auto-translated English version of that post says "young Emirati cadres"; the Arabic says `الكوادر الوطنية الشابة`, "young national talent", which in a Saudi ministry programme means Saudi. Copy uses "young Saudi talent". Do not write "Emirati" anywhere.

**Em-dash substitutions in this task:**

| Doc source | Rendered | Technique |
|---|---|---|
| `Noon — the 16-day platform` (heading) | kicker `The 16-day platform` above the noon logo | Restructure into the existing kicker + logo composition; the logo supplies "noon" |
| `July 2026 – Present` | `July 2026 - Present` | Plain hyphen, matches existing date convention |
| `I made myself a bigger promise — build a platform...` | `...a bigger promise: build a platform...` | Colon |
| `Four distinct role experiences — trainee, ... views — where there had been two` | `Four distinct role experiences (trainee, ... views) where there had been two` | Parentheses, word order untouched |
| `Adopted by 100% of the teams it touches — trainers, ... HR — before any official rollout` | `Adopted by 100% of the teams it touches (trainers, ... HR) before any official rollout` | Parentheses, word order untouched |

- [ ] **Step 1: Replace the `noon` content object**

In `content/site.ts`, replace the entire `noon: { ... }` object with:

```ts
  noon: {
    kicker: "The 16-day platform",
    logo: "/media/noon-logo.png",
    url: "https://www.noon.edu.sa/en/",
    meta: "AI Systems Engineer · Noon Academy · July 2026 - Present",
    lead: "My first assignment at noon was a measurement layer inside a six-day training camp: one exercise a day, ten fixed scenarios, two user roles.",
    promise:
      "I made myself a bigger promise: build a platform that serves the whole training journey, and hand it to the Training & Development team needing zero engineering support.",
    landing: "Sixteen days later, the Training & Development Portal was live.",
    stats: [
      { value: "16", unit: "days", label: "Concept to live" },
      { value: "100", unit: "%", label: "Team adoption" },
      { value: "4", label: "Role experiences" },
    ],
    bullets: [
      "From a daily assessment tool to the platform that now runs noon's supervisor and leadership training end to end",
      "Four distinct role experiences (trainee, trainer, T&D operations console, and leadership views) where there had been two",
      "Integrated with noon's central database by API: automatic enrollment, and a daily absence report that reaches HR on schedule, every day, without a human touching it",
      "Adopted by 100% of the teams it touches (trainers, trainees, T&D, and HR) before any official rollout",
      "Built for handover: question banks, batch management, analytics, audit log, and full operational control, all owned by a non-technical team",
    ],
    hackathon: {
      label: "Also at noon",
      line: "I judged the Educational Games Industry Hackathon, run with the Ministry of Communications and Information Technology and supported by Replit. The AI-based solutions in those evaluation sessions proved again that young Saudi talent can ship educational products that compete.",
      photos: [
        {
          src: "/media/photo-hackathon-judging.jpg",
          alt: "Yousef judging project presentations at the Educational Games Industry Hackathon",
          caption: "Evaluation sessions",
          width: 1600,
          height: 1066,
        },
        {
          src: "/media/photo-hackathon-group.jpg",
          alt: "Yousef with the Ministry of Communications and Information Technology and noon teams at the hackathon closing ceremony",
          caption: "Closing ceremony with the MCIT and noon teams",
          width: 1600,
          height: 1066,
        },
      ],
    },
    closer:
      "The next goal is already in motion: turning a two-month program tool into a platform facilitators open every single day of the year.",
  },
```

- [ ] **Step 2: Rewrite the component**

Replace the entire contents of `components/chapters/Noon.tsx`:

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import StatBand from "@/components/StatBand";

export default function Noon() {
  const container = useRef<HTMLElement>(null);
  const { noon } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The pin holds only the opening beat. Short viewports skip it: the
      // opening copy needs roughly 700px to sit without clipping.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 700px)",
        () => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-noon-stage]",
                start: "top top",
                end: "+=110%",
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
              },
              defaults: { ease: EASE.drift },
            })
            .from("[data-noon-kicker]", { autoAlpha: 0, y: 30 })
            .from("[data-noon-logo]", { autoAlpha: 0, scale: 0.85 })
            .from("[data-noon-meta]", { autoAlpha: 0, y: 16 })
            .from("[data-noon-line]", { autoAlpha: 0, y: 40, stagger: 0.3 })
            .from("[data-noon-landing]", { autoAlpha: 0, y: 40 })
            .to("[data-noon-depth]", { yPercent: -12 }, 0);
        }
      );
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-noon-bullet]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-bullets]", start: "top 85%" },
        });
        gsap.from("[data-noon-also]", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.12,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-hackathon]", start: "top 85%" },
        });
        gsap.from("[data-noon-photo]", {
          autoAlpha: 0,
          y: 36,
          stagger: 0.14,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-photos]", start: "top 88%" },
        });
        gsap.from("[data-noon-closer]", {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-closer]", start: "top 88%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="noon" data-chapter="noon" className="relative bg-coal">
      <div
        data-noon-stage
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        <div
          data-noon-depth
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-noon/5 blur-3xl"
        />
        <div className="mx-auto w-full max-w-3xl px-6 py-24">
          <p
            data-noon-kicker
            className="font-mono text-xs uppercase tracking-[0.3em] text-noon"
          >
            {noon.kicker}
          </p>
          <a
            data-noon-logo
            href={noon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-40"
          >
            <Image src={noon.logo} alt="noon" width={288} height={64} />
          </a>
          <p data-noon-meta className="mt-4 font-mono text-xs text-stone">
            {noon.meta}
          </p>
          <p data-noon-line className="mt-10 max-w-2xl text-lg text-stone">
            {noon.lead}
          </p>
          <p data-noon-line className="mt-5 max-w-2xl text-lg text-stone">
            {noon.promise}
          </p>
          <p
            data-noon-landing
            className="mt-10 font-display text-3xl text-bone md:text-4xl"
          >
            {noon.landing}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24 md:pb-32">
        <StatBand stats={noon.stats} tone="noon" />
        <ul data-noon-bullets className="mt-14 space-y-5">
          {noon.bullets.map((b) => (
            <li key={b} data-noon-bullet className="relative max-w-2xl pl-6 text-stone">
              <span
                aria-hidden
                className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-noon"
              />
              {b}
            </li>
          ))}
        </ul>
        {/* Second beat: the ministry-level programme, kept to one paragraph
            and two photographs so it supports the portal without competing. */}
        <div data-noon-hackathon className="mt-16">
          <p
            data-noon-also
            className="font-mono text-xs uppercase tracking-[0.2em] text-noon"
          >
            {noon.hackathon.label}
          </p>
          <p data-noon-also className="mt-4 max-w-2xl text-stone">
            {noon.hackathon.line}
          </p>
          <div data-noon-photos className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {noon.hackathon.photos.map((p) => (
              <figure key={p.src} data-noon-photo>
                <div className="overflow-hidden rounded-lg border border-bone/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    className="w-full"
                    sizes="(max-width: 640px) 100vw, 45vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs text-stone">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div aria-hidden className="mt-16 h-px w-16 bg-noon/40" />
        <p
          data-noon-closer
          className="mt-6 max-w-2xl font-display text-2xl text-bone md:text-3xl"
        >
          {noon.closer}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run test:unit && npm run build`
Expected: all pass.

- [ ] **Step 4: Check the section renders**

Run `npm run dev`. In the browser at `http://localhost:3000`:
- Scroll into `#noon`. The opening beat pins; kicker, logo, meta, the two lead paragraphs, then the landing line reveal on scrub.
- The pin releases and the stat band reads `16 days` / `100 %` / `4` with mono labels beneath.
- Five bullets, then the `Also at noon` beat: a green mono kicker, one paragraph, and the two hackathon photographs side by side.
- A short gold-green hairline, then the closer.
- Resize to 375px wide: no pin, everything stacks, the stat band goes single-column, the two hackathon photos stack, no horizontal scroll.
- In devtools, emulate `prefers-reduced-motion: reduce` and reload: all Noon content is visible with no pin.

- [ ] **Step 5: Commit**

```bash
git add content/site.ts components/chapters/Noon.tsx
git commit -m "feat(site): make the Noon portal the flagship section"
```

---

### Task 4: Teaching section, new order, and nav

**Files:**
- Modify: `content/site.ts` (replace the `stage` array with a `teaching` object; update `chapters`)
- Create: `components/chapters/Teaching.tsx`
- Delete: `components/chapters/Stage.tsx`
- Modify: `components/Nav.tsx:6-22`
- Modify: `app/page.tsx`
- Modify: `tests/e2e/site.spec.ts:3-19`

**Interfaces:**
- Consumes: `ChapterHead` from `@/components/ChapterHead`, `StatBand` from `@/components/StatBand` (Task 2).
- Produces: `siteContent.teaching` with keys `title`, `note`, `meta`, `lines`, `stats`, `gallery`. Section id `teaching`, `data-chapter="teaching"`. The `stage` key no longer exists.

**Em-dash substitutions in this task:**

| Doc source | Rendered | Technique |
|---|---|---|
| `Teaching · Shaguf Educational Platform · Jan 2022 – Present` | `ChapterHead` title `Teaching`, note `Shaguf Educational Platform`, plus meta line `Instructor · Jan 2022 - Present` | Restructure into the existing head component; plain hyphen for the range |
| `...to 1,800+ students — holding a 4.9 out of 5 rating...` | `...to 1,800+ students, holding a 4.9 out of 5 rating...` | Comma |
| `...making it land — for a beginner, for an expert...` | `...making it land, for a beginner, for an expert...` | Comma |

**Note:** the three gallery photos, their `PLACEMENT`/`SIZES` arrays, and the parallax drift move verbatim from `Stage.tsx`. Per the doc, the SDA presenting photo stays in the gallery.

- [ ] **Step 1: Replace the `stage` array with `teaching` and update `chapters`**

In `content/site.ts`, replace the entire `stage: [ ... ]` array with:

```ts
  teaching: {
    title: "Teaching",
    note: "Shaguf Educational Platform",
    meta: "Instructor · Jan 2022 - Present",
    lines: [
      "For four years and counting, I've taught computer science to 1,800+ students, holding a 4.9 out of 5 rating the whole way, and honored as best instructor on stage at a Shaguf event.",
      "Teaching is where I learned the skill I use most as an engineer: taking something complicated and making it land, for a beginner, for an expert, or for a stakeholder who just needs to trust the system.",
    ],
    stats: [
      { value: "1,800", unit: "+", label: "Students taught" },
      { value: "4.9", unit: "/5", label: "Instructor rating" },
      { value: "4", unit: "years", label: "And counting" },
    ],
    gallery: [
      {
        src: "/media/photo-sda-presenting.jpg",
        alt: "Yousef presenting at the SDA Agentic AI Bootcamp",
        caption: "Presenting at the SDA Agentic AI Bootcamp",
        width: 1600,
        height: 1200,
      },
      {
        src: "/media/photo-shaguf-stage.jpg",
        alt: "Yousef speaking on stage as the honored best instructor at a Shaguf event",
        caption: "Honored as best instructor at a Shaguf event",
        width: 892,
        height: 490,
      },
      {
        src: "/media/photo-shaguf-audience.jpg",
        alt: "The audience at the Shaguf session",
        caption: "The room at the Shaguf session",
        width: 892,
        height: 477,
      },
    ],
  },
```

Then update the `chapters` key to:

```ts
  chapters: ["hero", "noon", "teaching", "work", "yax", "credentials"] as const,
```

- [ ] **Step 2: Create the Teaching component**

Create `components/chapters/Teaching.tsx`:

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";
import StatBand from "@/components/StatBand";

const PLACEMENT = [
  "md:col-span-8 md:col-start-1",
  "md:col-span-6 md:col-start-7 md:mt-24",
  "md:col-span-7 md:col-start-3 md:mt-6",
];

const SIZES = [
  "(max-width: 768px) 100vw, 60vw",
  "(max-width: 768px) 100vw, 45vw",
  "(max-width: 768px) 100vw, 52vw",
];

export default function Teaching() {
  const container = useRef<HTMLElement>(null);
  const { teaching } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-teach-line]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.15,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-teach-copy]", start: "top 82%" },
        });
        gsap.utils.toArray<HTMLElement>("[data-stage-photo]").forEach((fig) => {
          gsap.fromTo(
            fig,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: fig, start: "top 88%", end: "top 45%", scrub: 1 },
            }
          );
          // Slow drift inside the cropped frame for depth; the constant
          // overscale keeps edges covered through the plus/minus 6% travel.
          const img = fig.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -6, scale: 1.12 },
              {
                yPercent: 6,
                scale: 1.12,
                ease: "none",
                scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          }
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="teaching"
      data-chapter="teaching"
      className="bg-coal py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={teaching.title} note={teaching.note} />
        <div data-teach-copy className="mt-10 px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
            {teaching.meta}
          </p>
          <div className="mt-8 max-w-2xl space-y-5">
            {teaching.lines.map((l) => (
              <p key={l} data-teach-line className="text-stone">
                {l}
              </p>
            ))}
          </div>
          <div className="mt-14 max-w-3xl">
            <StatBand stats={teaching.stats} />
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {teaching.gallery.map((s, i) => (
            <figure key={s.src} data-stage-photo className={PLACEMENT[i]}>
              <div className="overflow-hidden rounded-lg border border-gold/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  className="w-full"
                  sizes={SIZES[i]}
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-stone">
                <span aria-hidden className="mr-2 text-gold">
                  ·0{i + 1}
                </span>
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Delete the old Stage component**

```bash
git rm components/chapters/Stage.tsx
```

- [ ] **Step 4: Apply the new section order**

Replace the contents of `app/page.tsx`:

```tsx
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/chapters/Hero";
import Noon from "@/components/chapters/Noon";
import Teaching from "@/components/chapters/Teaching";
import Work from "@/components/chapters/Work";
import Yax from "@/components/chapters/Yax";
import Credentials from "@/components/chapters/Credentials";
import Footer from "@/components/Footer";

const ChatBubble = dynamic(() => import("@/components/ChatBubble"));

export default function Home() {
  return (
    <>
      <main>
        <Nav />
        <Hero />
        <Noon />
        <Teaching />
        <Work />
        <Yax />
        <Credentials />
      </main>
      <Footer />
      <ChatBubble />
    </>
  );
}
```

- [ ] **Step 5: Update the nav to 6 explicit links**

In `components/Nav.tsx`, replace lines 6-22:

```tsx
const LINKS = [
  { href: "#hero", label: "Intro" },
  { href: "#noon", label: "Noon" },
  { href: "#teaching", label: "Teaching" },
  { href: "#work", label: "Work" },
  { href: "#yax", label: "Before AI" },
  { href: "#credentials", label: "Credentials" },
];

// Every section now owns its own nav stop, so the spy map is one to one.
const SPY: Record<string, string> = {
  hero: "#hero",
  noon: "#noon",
  teaching: "#teaching",
  work: "#work",
  yax: "#yax",
  credentials: "#credentials",
};
```

- [ ] **Step 6: Update the site e2e spec**

In `tests/e2e/site.spec.ts`, replace lines 3-19:

```ts
const CHAPTERS = ["hero", "noon", "teaching", "work", "yax", "credentials"];

test("all six chapters render", async ({ page }) => {
  await page.goto("/");
  for (const c of CHAPTERS) {
    await expect(page.locator(`section[data-chapter="${c}"]`)).toHaveCount(1);
  }
});

test("chapters follow the narrative order", async ({ page }) => {
  await page.goto("/");
  const ids = await page
    .locator("section[data-chapter]")
    .evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(CHAPTERS);
});

test("glass navbar links every stop", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('nav[aria-label="Sections"] a')).toHaveCount(6);
  await expect(page.locator('nav[aria-label="Sections"] a', { hasText: "Noon" })).toHaveAttribute(
    "href",
    "#noon"
  );
  await expect(
    page.locator('nav[aria-label="Sections"] a', { hasText: "Before AI" })
  ).toHaveAttribute("href", "#yax");
});
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`
Expected: all pass.

- [ ] **Step 8: Check the section renders**

Run `npm run dev`. Confirm:
- The page order is Hero, Noon, Teaching, Work, Before AI, Credentials.
- The Teaching heading animates in, the meta line reads `Instructor · Jan 2022 - Present`, both paragraphs land, the stat band reads `1,800+` / `4.9/5` / `4 years`.
- The three photos keep their staggered offset layout and parallax drift.
- The nav pill shows six labels; at 375px it scrolls horizontally with the fade mask and no layout break.
- Clicking each nav link jumps to the right section; the active pill highlight follows the scroll.

- [ ] **Step 9: Commit**

```bash
git add -A content/site.ts components/chapters app/page.tsx components/Nav.tsx tests/e2e/site.spec.ts
git commit -m "feat(site): add the Teaching section and reorder the narrative"
```

---

### Task 5: Work cards and the chat opener

**Files:**
- Modify: `content/site.ts` (the `work` array)
- Modify: `components/chapters/Work.tsx`
- Modify: `components/ChatBubble.tsx` (add the `ya:open-chat` listener)
- Modify: `tests/e2e/chat.spec.ts` (add the card-opens-chat test)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: each `siteContent.work[n]` has the full key set `no`, `kicker`, `title`, `meta`, `logo`, `logoAlt`, `line`, `href`, `cta`, `action`, with `null` where unused. The uniform key set is required: `siteContent` is `as const`, so `work` is a heterogeneous tuple and `w.action` must exist on every member for the union to narrow. This mirrors the existing `title: null` / `logo: null` pattern.
- Produces: the window event name `"ya:open-chat"`, dispatched by `Work.tsx` and listened for by `ChatBubble.tsx`.

**Em-dash substitutions in this task:**

| Doc source | Rendered | Technique |
|---|---|---|
| `/01 · Rusokh — course platform · Personal product` | `no` `/01`, kicker `Course platform · Personal product`, Rusokh logo as the card title | Restructure into the existing card slots |
| `...payments, video delivery — live and in use today.` | `...payments, video delivery - live and in use today.` | Plain hyphen (hard break) |
| `/02 · Client work — web, automation, and AI · Freelance via GHRS · 2025–2026` | kicker `Client work · Web, automation, and AI`, meta `Freelance via GHRS · 2025 - 2026` | Restructure into kicker + new meta slot; plain hyphen for the range |
| `/03 · This site — a portfolio that answers back` | kicker `This site`, title `A portfolio that answers back` | Restructure into the existing kicker + title slots |
| `Try it — ask it anything on this page.` | `Try it: ask it anything on this page.` | Colon |

**Deletion:** the standalone risk-triage card is removed. Its content survives as exactly one sentence inside card /02, with no implementation detail. The strings `71`, `about 5`, `caching`, and `rules score` must not appear anywhere in `content/site.ts` after this task.

- [ ] **Step 1: Replace the `work` array**

In `content/site.ts`, replace the entire `work: [ ... ]` array with:

```ts
  work: [
    {
      no: "/01",
      kicker: "Course platform · Personal product",
      title: null,
      meta: null,
      logo: "/media/rusokh-logo.png",
      logoAlt: "Rusokh",
      line: "I hit the same walls on every course platform I taught on, so I built my own. Bilingual (Arabic/English), payments, video delivery - live and in use today.",
      href: "https://rusokh.com",
      cta: "Visit the platform",
      action: null,
    },
    {
      no: "/02",
      kicker: "Client work · Web, automation, and AI",
      title: null,
      meta: "Freelance via GHRS · 2025 - 2026",
      logo: "/media/ghrs-logo.png",
      logoAlt: "GHRS",
      line: "End-to-end delivery for Saudi businesses: rebuilt websites, automated WhatsApp Business, connected internal tools to customer channels. On the AI side: an auditable document-intake and risk-triage system for an education platform, and AI architecture advisory for an early-stage logistics startup.",
      href: "https://ghrs.sa",
      cta: "Visit GHRS",
      action: null,
    },
    {
      no: "/03",
      kicker: "This site",
      title: "A portfolio that answers back",
      meta: null,
      logo: null,
      logoAlt: null,
      line: "Built as a product, not a page: a streaming AI chat that answers as me, with rate limits, input validation, and prompt guardrails behind the API. Try it: ask it anything on this page.",
      href: null,
      cta: "Ask it something",
      action: "open-chat",
    },
  ],
```

- [ ] **Step 2: Render the meta line and the action button**

In `components/chapters/Work.tsx`, replace the card body (lines 56-77, from the `{w.logo ? (` opening through the closing of the `{w.href && ...}` block) with:

```tsx
            {w.logo ? (
              <h3 className="mt-4">
                <span className="inline-block h-16 w-16 overflow-hidden rounded-xl bg-bone p-1.5 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.8)]">
                  <Image
                    src={w.logo}
                    alt={w.logoAlt}
                    width={128}
                    height={128}
                    className="h-full w-full object-contain"
                  />
                </span>
              </h3>
            ) : (
              <h3 className="mt-4 font-display text-3xl text-bone">{w.title}</h3>
            )}
            {w.meta && <p className="mt-3 font-mono text-xs text-stone">{w.meta}</p>}
            <p className="mt-3 text-stone">{w.line}</p>
            {w.href ? (
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono text-sm text-gold hover:text-gold-bright"
              >
                {w.cta} →
              </a>
            ) : w.action === "open-chat" ? (
              // The chat lives in a sibling component, so the card asks for it
              // by event rather than lifting the panel's open state to the page.
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("ya:open-chat"))}
                className="mt-4 inline-block font-mono text-sm text-gold hover:text-gold-bright"
              >
                {w.cta} →
              </button>
            ) : null}
```

- [ ] **Step 3: Make the chat bubble listen for the event**

In `components/ChatBubble.tsx`, add this effect immediately after the existing Escape-key effect (after line 101):

```tsx
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("ya:open-chat", openChat);
    return () => window.removeEventListener("ya:open-chat", openChat);
  }, []);
```

- [ ] **Step 4: Write the failing test for the card opener**

Append to `tests/e2e/chat.spec.ts`:

```ts
test("the site card opens the chat", async ({ page }) => {
  await page.goto("/");
  await page
    .locator('section[data-chapter="work"]')
    .getByRole("button", { name: /ask it something/i })
    .click();
  await expect(page.locator("[data-chat-panel]")).toBeVisible();
});
```

- [ ] **Step 5: Run the suite**

Run: `npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`
Expected: all pass.

If the new e2e test is flaky, it is because the Work track is GSAP-pinned and horizontally translated on desktop. Do not weaken the assertion; scroll the section into view first with `await page.locator('section[data-chapter="work"]').scrollIntoViewIfNeeded()` before the click.

- [ ] **Step 6: Confirm the risk-triage detail is gone**

Run: `grep -nE "71|risk-triage system|rules score|caching" content/site.ts`
Expected: exactly one hit, the phrase `risk-triage system` inside card /02's sentence. No `71`, no `caching`, no `rules score`.

- [ ] **Step 7: Check the section renders**

Run `npm run dev`. Confirm three cards, not four. Card /02 shows the GHRS logo with the meta line under it. Card /03 shows the display-face title and a gold `Ask it something →` button that opens the chat panel. On mobile the cards stack and animate in individually.

- [ ] **Step 8: Commit**

```bash
git add content/site.ts components/chapters/Work.tsx components/ChatBubble.tsx tests/e2e/chat.spec.ts
git commit -m "feat(site): fold risk-triage into client work and showcase the chat"
```

---

### Task 6: Before AI, the compact YAX block

**Files:**
- Modify: `content/site.ts` (the `yax` object)
- Modify: `components/chapters/Yax.tsx` (full rewrite)

**Interfaces:**
- Consumes: `ChapterHead` from `@/components/ChapterHead`.
- Produces: `siteContent.yax` with keys `logo`, `title`, `note`, `meta`, `lines`, `bridge`. The `company`, `intro`, `roles`, and `highlights` keys are gone.

**Em-dash substitutions in this task:**

| Doc source | Rendered | Technique |
|---|---|---|
| `Before AI: operations at scale · YAX · Nov 2023 – May 2025` | `ChapterHead` title `Before AI`, note `Operations at scale`, meta `YAX · Nov 2023 - May 2025` | Restructure into the existing head component; plain hyphen for the range |
| `...promoted twice in one year — operations, to HR coordination, to Staff Manager for the Riyadh Metro launch: 1,500 staff...` | `...promoted twice in one year - operations, to HR coordination, to Staff Manager for the Riyadh Metro launch: 1,500 staff...` | Plain hyphen. A colon is unavailable here because the sentence already uses one downstream |
| `That period is why I build the way I build — systems have to survive...` | `That period is why I build the way I build: systems have to survive...` | Colon |

**Deletions, per the doc:** the three-entry role timeline, the scroll-drawn spine, the per-role slide-in, and the three-up highlight grid all go. The Cityscape highlight is dropped entirely; World Urban Forum and AlUla survive inside one sentence. The closing bridge line is kept and given the hairline-rule emphasis treatment, because it is what makes this section serve the AI story instead of competing with it.

- [ ] **Step 1: Replace the `yax` content object**

In `content/site.ts`, replace the entire `yax: { ... }` object with:

```ts
  yax: {
    logo: "/media/yax-logo.jpg",
    title: "Before AI",
    note: "Operations at scale",
    meta: "YAX · Nov 2023 - May 2025",
    lines: [
      "Before I built systems for machines, I ran them for people. At YAX I was promoted twice in one year - operations, to HR coordination, to Staff Manager for the Riyadh Metro launch: 1,500 staff recruited, trained, and deployed across 45 stations in a single month, serving 30M+ visitors.",
      "Along the way: supervising the World Urban Forum protocol team in Cairo, and leading ministerial transport from Riyadh to AlUla.",
    ],
    bridge:
      "That period is why I build the way I build: systems have to survive contact with real people, real deadlines, and real chaos.",
  },
```

- [ ] **Step 2: Rewrite the component**

Replace the entire contents of `components/chapters/Yax.tsx`:

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

export default function Yax() {
  const container = useRef<HTMLElement>(null);
  const { yax } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-yax-logo]", {
          scale: 0.5,
          rotation: -10,
          duration: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: "[data-yax-head]", start: "top 80%" },
        });
        gsap.from("[data-yax-line]", {
          autoAlpha: 0,
          y: 28,
          stagger: 0.15,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-body]", start: "top 82%" },
        });
        gsap.from("[data-yax-bridge]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-bridge]", start: "top 88%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="yax"
      data-chapter="yax"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#f05e22]/5 blur-3xl"
      />
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={yax.title} note={yax.note} />
        <div className="mt-10 px-6">
          <div data-yax-head className="flex items-center gap-5">
            <div
              data-yax-logo
              className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-bone/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]"
            >
              <Image
                src={yax.logo}
                alt="YAX"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
              {yax.meta}
            </p>
          </div>
          <div data-yax-body className="mt-10 max-w-2xl space-y-5">
            {yax.lines.map((l) => (
              <p key={l} data-yax-line className="text-stone">
                {l}
              </p>
            ))}
          </div>
          <div aria-hidden className="mt-14 h-px w-16 bg-gold/40" />
          <p
            data-yax-bridge
            className="mt-6 max-w-2xl font-display text-2xl text-bone md:text-3xl"
          >
            {yax.bridge}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`
Expected: all pass.

- [ ] **Step 4: Confirm the dropped content is gone**

Run: `grep -nE "Cityscape|Sports Boulevard|Operations Team Member|Human Resources Coordinator" content/site.ts`
Expected: no output.

- [ ] **Step 5: Check the section renders**

Run `npm run dev`. Confirm the section is now a `Before AI` head, the YAX logo with a date meta line, two paragraphs, a short gold hairline, then the bridge line in the display face. No timeline spine, no numbered highlight cards. The section is visually lighter than the Noon section above it.

- [ ] **Step 6: Commit**

```bash
git add content/site.ts components/chapters/Yax.tsx
git commit -m "feat(site): collapse the YAX timeline into one compact block"
```

---

### Task 7: Credentials, featured and collapsed

**Files:**
- Modify: `content/site.ts` (the `credentials` array becomes an object)
- Modify: `components/chapters/Credentials.tsx` (full rewrite)

**Interfaces:**
- Consumes: `ChapterHead` from `@/components/ChapterHead`.
- Produces: `siteContent.credentials` as `{ featured: readonly {img, name, issuer, year, href, note}[]; also: readonly string[] }`.

**Structure, per the doc:** Apple gets the largest visual treatment because the selection stat *is* the credential, so it takes a full-width horizontal card with the image on the left and the `1 of 66` line set in the display face at gold. SDA, CDMP, and McKinsey follow in a three-up row using the existing card markup plus an optional note line. The four weak items collapse to a text-only `Also` list with no badge images.

**Facts note:** `Data Science & ML scholarship, KAUST Academy, 2025` is in the doc's collapsed row and in the Part 4 facts table, but has no entry in the current `credentials` array and no badge image on disk. Because the collapsed row renders text only, no asset is needed. The four badge images that stop being referenced (`cert-kaust.png`, `cert-sdaia.png`, `cert-coursera-1.png`, `cert-coursera-2.png`) stay on disk untouched; Next.js only serves referenced assets, and deleting files is outside a content overhaul.

- [ ] **Step 1: Replace the `credentials` array with a featured/also object**

In `content/site.ts`, replace the entire `credentials: [ ... ]` array with:

```ts
  credentials: {
    featured: [
      {
        img: "/media/cert-apple.png",
        name: "Apple AI Program",
        issuer: "Apple Developer Academy & Tuwaiq",
        year: "2025",
        href: null,
        note: "Selected 1 of 66 from 400,000+ applicants",
      },
      {
        img: "/media/cert-sda.png",
        name: "Agentic AI Bootcamp",
        issuer: "SDA Academy",
        year: "2026",
        href: null,
        note: "Selective admission",
      },
      {
        img: "/media/cert-cdmp-badge.png",
        name: "Certified Data Management Professional (CDMP) · Associate",
        issuer: "DAMA",
        year: "2026",
        href: "https://eu.credential.net/1c13a3e1-5f2d-4840-a944-afc2a1c5f720",
        note: null,
      },
      {
        img: "/media/cert-mckinsey-badge.png",
        name: "McKinsey Forward",
        issuer: "McKinsey & Company",
        year: "2026",
        href: null,
        note: null,
      },
    ],
    also: [
      "Introduction to AI · KAUST Academy · 2026",
      "Data Science & ML scholarship · KAUST Academy · 2025",
      "Data courses · University of Michigan · 2025",
      "Vibe Coding · SDAIA · 2026",
    ],
  },
```

- [ ] **Step 2: Rewrite the component**

Replace the entire contents of `components/chapters/Credentials.tsx`:

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

export default function Credentials() {
  const container = useRef<HTMLElement>(null);
  const { featured, also } = siteContent.credentials;
  const [lead, ...rest] = featured;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cred-lead]", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
        gsap.from("[data-cred-card]", {
          autoAlpha: 0,
          y: 60,
          scale: 0.94,
          stagger: 0.1,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-row]", start: "top 85%" },
        });
        gsap.from("[data-cred-also]", {
          autoAlpha: 0,
          y: 12,
          stagger: 0.06,
          duration: 0.5,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-also-list]", start: "top 90%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="credentials" data-chapter="credentials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title="Credentials" note="Verified where possible" />
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-6">
        {/* The selection stat is the credential, so Apple gets the wide card. */}
        <div
          data-cred-lead
          className="rounded-lg border border-gold/30 bg-coal p-6 md:flex md:items-center md:gap-8 md:p-8"
        >
          <Image
            src={lead.img}
            alt={lead.name}
            width={800}
            height={600}
            className="h-40 w-full rounded object-contain md:h-44 md:w-72 md:shrink-0"
          />
          <div className="mt-5 md:mt-0">
            <h3 className="font-display text-3xl text-bone md:text-4xl">{lead.name}</h3>
            <p className="mt-1 font-mono text-xs text-stone">
              {lead.issuer} · {lead.year}
            </p>
            {lead.note && (
              <p className="mt-4 font-display text-xl text-gold md:text-2xl">{lead.note}</p>
            )}
          </div>
        </div>

        <div data-cred-row className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {rest.map((c) => {
            const card = (
              <div
                data-cred-card
                className="h-full rounded-lg border border-gold/20 bg-coal p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-gold/50"
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  width={400}
                  height={300}
                  className="h-32 w-full rounded object-contain"
                />
                <p className="mt-3 text-sm text-bone">{c.name}</p>
                <p className="mt-1 font-mono text-xs text-stone">
                  {c.issuer} · {c.year}
                </p>
                {c.note && <p className="mt-2 font-mono text-xs text-gold">{c.note}</p>}
              </div>
            );
            return c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify: ${c.name}`}
              >
                {card}
              </a>
            ) : (
              <div key={c.name}>{card}</div>
            );
          })}
        </div>

        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone">Also</p>
          <ul data-cred-also-list className="mt-4 space-y-2">
            {also.map((a) => (
              <li key={a} data-cred-also className="font-mono text-sm text-stone">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`
Expected: all pass. The existing `credential verify links open in a new tab` test still applies: the CDMP card is the only one with an `href`, and it keeps `target="_blank"` and `rel="noopener noreferrer"`.

- [ ] **Step 4: Check the section renders**

Run `npm run dev`. Confirm the Apple card spans the full width with the image left and `Selected 1 of 66 from 400,000+ applicants` in gold display type; three cards below it; then a muted `Also` list of four mono lines with no images. At 375px the Apple card stacks image over text and the three cards go single-column. Confirm the `Also` text is legible against `night` (it is `text-stone #a39b8b` on `#100e0b`, which clears 4.5:1).

- [ ] **Step 5: Commit**

```bash
git add content/site.ts components/chapters/Credentials.tsx
git commit -m "feat(site): feature the top four credentials and collapse the rest"
```

---

### Task 8: Chat chips and the persona knowledge base

**Files:**
- Modify: `components/ChatBubble.tsx:11-15` (the `STARTERS` array)
- Modify: `content/persona.md`
- Modify: `tests/e2e/chat.spec.ts:9`

**Interfaces:**
- Consumes: the `ya:open-chat` listener added in Task 5.
- Produces: nothing consumed by later tasks. This is the last task.

**Note on the risk-triage internals:** the doc says the `71 model calls to about 5` detail is "interview detail only, NOT site copy" and that those are "interview stories now". The chat is exactly where those conversations happen, so the persona keeps them. They are removed from `content/site.ts` (Task 5) but stay in `content/persona.md`.

- [ ] **Step 1: Write the failing test for the new starter chips**

In `tests/e2e/chat.spec.ts`, replace line 9:

```ts
  await expect(panel.getByRole("button", { name: /16 days/i })).toBeVisible();
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test:e2e -- chat`
Expected: FAIL on `chat bubble opens a panel with starters and an input`, because the current chips ask about Rusokh, noon's future, and risk-triage.

- [ ] **Step 3: Replace the starter chips**

In `components/ChatBubble.tsx`, replace lines 11-15:

```tsx
const STARTERS = [
  "How did you build a whole platform in 16 days?",
  "What does 100% adoption actually mean?",
  "Why did you go from managing 1,500 people to building AI systems?",
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test:e2e -- chat`
Expected: PASS.

- [ ] **Step 5: Update the persona knowledge base**

In `content/persona.md`, replace the `## Current role` section (lines 11-13) with:

```markdown
## Current role
AI Systems Engineer at noon (noon.edu.sa), Riyadh, since July 2026. I build
agentic AI systems that reach production and hold up there.

### The Training and Development Portal
My first assignment was a measurement layer inside a six-day training camp: one
exercise a day, ten fixed scenarios, two user roles. I promised something bigger,
a platform serving the whole training journey that the Training and Development
team could run with zero engineering support.

Sixteen days later, 13 to 29 July 2026, the Training and Development Portal was
live. About 520 code updates and 21 database migrations went into that build.

- It grew from a daily assessment tool into the platform that runs noon's
  supervisor and leadership training end to end.
- Four role experiences where there had been two: trainee, trainer, a Training
  and Development operations console, and leadership views.
- It integrates with noon's central database by API for automatic enrollment,
  and sends a daily absence report to HR on schedule every day, on Riyadh time,
  idempotent, with a kill switch, and with no human involved.
- Every team it touches adopted it, trainers, trainees, Training and Development,
  and HR, before any official rollout.
- Built for handover: question banks, batch management, analytics, an audit log,
  and full operational control, all owned by a non-technical team.

Next is turning a two-month program tool into a platform facilitators open every
day of the year: a workshops page, personalized content, a knowledge bank, and
one to one expert sessions.
```

Then, in the `## Track record` list, replace the Shaguf bullet (line 28-29) with:

```markdown
- Instructor at Shaguf Educational Platform since Jan 2022: 1,800+ computer
  science students over four years at a 4.9 of 5 rating, honored as best
  instructor on stage at a Shaguf event. Teaching is where I learned to take
  something complicated and make it land for a beginner, an expert, or a
  stakeholder who just needs to trust the system.
```

Leave the rest of `## Track record`, `## Skills`, `## Education and certifications`, and `## Languages and contact` unchanged.

- [ ] **Step 6: Verify no dashes crept into the persona**

Run: `npm run test:unit -- copy`
Expected: PASS. `content/persona.md` is inside the scanned set.

- [ ] **Step 7: Full verification**

Run: `npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`
Expected: all pass.

- [ ] **Step 8: Check the chat answers from the new knowledge**

Run `npm run dev` with `OPENAI_API_KEY` set. Open the chat bubble, click `How did you build a whole platform in 16 days?`, and confirm the answer describes the Training and Development Portal, stays in first person, and does not name the risk-triage client as anything other than "an education platform".

If `OPENAI_API_KEY` is not set, the route returns 503 and the panel shows the contact fallback. That is correct behavior; verify the fallback instead and note that the live answer check is pending.

- [ ] **Step 9: Commit**

```bash
git add components/ChatBubble.tsx content/persona.md tests/e2e/chat.spec.ts
git commit -m "feat(site): point the chat at the Noon portal story"
```

---

### Task 9: The portal in use

**Files:**
- Modify: `content/site.ts` (add a `portal` key inside the existing `noon` object)
- Modify: `components/chapters/Noon.tsx` (render the row between the bullets and the hackathon block)

**Interfaces:**
- Consumes: `siteContent.noon` from Task 3. The `noon` object already has `kicker`, `logo`, `url`, `meta`, `lead`, `promise`, `landing`, `stats`, `bullets`, `hackathon`, `closer`. Add `portal` between `bullets` and `hackathon`.
- Produces: nothing consumed by later tasks.

**Material not in the overhaul doc.** Three photographs of the Training & Development Portal being used, added at the owner's request after the plan was written. They are the only direct evidence on the site that the portal is real and in daily use, which is what the "100% adoption" stat asserts.

**These images were redacted before this task starts. Do not undo that work and do not re-import any original.** The three originals contained third-party personal data and have been deleted:
- `photo-portal-trainer.jpg` (1600x1535): the roster name column is framed out of shot, and a residual strip of truncated name glyphs at the frame edge is blurred. The attendance chips stay legible.
- `photo-portal-trainee.jpg` (1600x1182): the app header carrying the user's name is blurred. The question UI stays legible.
- `photo-portal-hr.jpg` (696x700): cropped to the phone lock screen only, removing a Slack header that carried a named colleague and their profile photo.

**Layout note:** the three photographs have different aspect ratios (roughly 1.04, 1.35, and 0.99). The row therefore uses a fixed `aspect-[4/3]` box with `object-cover` so the grid stays even. This differs from the hackathon row, whose two photographs are both 1600x1066 and can use natural height.

- [ ] **Step 1: Add the `portal` key to the `noon` object**

In `content/site.ts`, inside the existing `noon: { ... }` object, insert this key between `bullets` and `hackathon`:

```ts
    portal: {
      label: "The portal in use",
      photos: [
        {
          src: "/media/photo-portal-trainer.jpg",
          alt: "A trainer marking attendance for a workshop batch in the Training and Development Portal",
          caption: "A trainer taking attendance",
          width: 1600,
          height: 1535,
        },
        {
          src: "/media/photo-portal-trainee.jpg",
          alt: "A trainee answering a competency scenario question in the portal on a phone",
          caption: "A trainee answering a competency question",
          width: 1600,
          height: 1182,
        },
        {
          src: "/media/photo-portal-hr.jpg",
          alt: "The portal's automated daily absence report arriving as a phone notification",
          caption: "The daily absence report, sent automatically",
          width: 696,
          height: 700,
        },
      ],
    },
```

- [ ] **Step 2: Render the row in Noon.tsx**

In `components/chapters/Noon.tsx`, insert this block immediately after the closing `</ul>` of `[data-noon-bullets]` and immediately before the `<div data-noon-hackathon ...>` block:

```tsx
        {/* Direct evidence for the adoption stat: the portal in real use. */}
        <div data-noon-portal className="mt-16">
          <p
            data-noon-portal-label
            className="font-mono text-xs uppercase tracking-[0.2em] text-noon"
          >
            {noon.portal.label}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {noon.portal.photos.map((p) => (
              <figure key={p.src} data-noon-portal-photo>
                <div className="overflow-hidden rounded-lg border border-bone/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs text-stone">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
```

- [ ] **Step 3: Add the reveal animation**

In the same file, inside the existing `mm.add("(prefers-reduced-motion: no-preference)", () => { ... })` block (the second one, which already animates `[data-noon-bullet]`, `[data-noon-also]`, `[data-noon-photo]`, and `[data-noon-closer]`), add:

```tsx
        gsap.from("[data-noon-portal-label], [data-noon-portal-photo]", {
          autoAlpha: 0,
          y: 32,
          stagger: 0.12,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-portal]", start: "top 85%" },
        });
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`
Expected: all pass.

- [ ] **Step 5: Confirm no original PII files came back**

Run: `ls public/media/ | grep -iE "trainee|trainer|attindance|competincey|HR email"`
Expected: no output. The only portal images are `photo-portal-trainer.jpg`, `photo-portal-trainee.jpg`, and `photo-portal-hr.jpg`.

- [ ] **Step 6: Check the section renders**

Run `npm run dev`. In the Noon section, confirm a green `The portal in use` kicker followed by three equal-height photographs in one row, each with a mono caption, sitting between the bullets and the `Also at noon` block. At 375px they stack to one column. Confirm no personal name is legible in any of the three.

- [ ] **Step 7: Commit**

```bash
git add content/site.ts components/chapters/Noon.tsx public/media/photo-portal-trainer.jpg public/media/photo-portal-trainee.jpg public/media/photo-portal-hr.jpg
git commit -m "feat(site): show the Noon portal in use, with PII redacted"
```

---

### Task 10: Serve one CV

**Files:**
- Create: `public/cv/Yousef-Alshuwayi-AI-Systems-Engineer.pdf` (copy of `cv/Yousef-Alshuwayi-AI-Systems-Engineer.pdf`)
- Delete: `public/cv/Yousef-Alshuwayi-AI-Engineer.pdf`
- Delete: all 10 PDFs in `cv/output/`
- Modify: `content/site.ts` (the `contact.cv` value)

**Interfaces:**
- Consumes: `siteContent.contact.cv`, already read by `components/Footer.tsx:33` as `href={contact.cv}` with a `download` attribute. `Footer.tsx` does NOT change.
- Produces: nothing consumed by later tasks. This is the last task.

**Material not in the overhaul doc**, added at the owner's request. The site currently serves a stale CV whose content predates the whole overhaul. The new CV matches the new site copy (16 days, 100% adoption, four role experiences, Shaguf 1,800+ at 4.9/5, Apple 1 of 66).

**Owner decisions, already made. Do not revisit:**
- `cv/output/*.pdf` (10 role-specific CVs) are deleted. The generator and the `cv/roles/*.json` configs stay, so they can be rebuilt.
- `docs/Yousef Alshuwayi - Resume 2026.pdf`, `docs/Forward.pdf`, and `theChatBot/me/linkedin.pdf` are NOT touched.
- The CV is published as-is, including the phone number it contains. This is deliberate.

- [ ] **Step 1: Put the new CV where the site can serve it**

```bash
cp cv/Yousef-Alshuwayi-AI-Systems-Engineer.pdf public/cv/Yousef-Alshuwayi-AI-Systems-Engineer.pdf
```

- [ ] **Step 2: Point the site at it**

In `content/site.ts`, in the `contact` object, replace the `cv` value:

```ts
    cv: "/cv/Yousef-Alshuwayi-AI-Systems-Engineer.pdf",
```

Leave `email`, `linkedin`, and `github` unchanged.

- [ ] **Step 3: Delete the stale CVs**

```bash
git rm -f public/cv/Yousef-Alshuwayi-AI-Engineer.pdf
git rm -f cv/output/*.pdf
```

If `git rm` reports a path is not tracked, remove it with plain `rm` instead and note which ones were untracked.

- [ ] **Step 4: Confirm nothing still points at a deleted file**

Run: `grep -rn "AI-Engineer.pdf" --include="*.ts" --include="*.tsx" --include="*.json" . | grep -v node_modules | grep -v package-lock`
Expected: no output.

Run: `ls public/cv/`
Expected: exactly one file, `Yousef-Alshuwayi-AI-Systems-Engineer.pdf`.

Run: `ls cv/output/*.pdf 2>/dev/null | wc -l`
Expected: `0`.

Run: `ls cv/roles/*.json | wc -l`
Expected: `10`. The generator's role configs must survive.

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`
Expected: all pass.

- [ ] **Step 6: Confirm the download works**

Run `npm run dev`, then:

```bash
curl -sI http://localhost:3000/cv/Yousef-Alshuwayi-AI-Systems-Engineer.pdf | head -3
```

Expected: `HTTP/1.1 200` and a `content-type` of `application/pdf`. Then confirm the footer's CV link resolves to that path.

- [ ] **Step 7: Commit**

```bash
git add content/site.ts public/cv/Yousef-Alshuwayi-AI-Systems-Engineer.pdf
git commit -m "feat(site): serve the current AI Systems Engineer CV and drop the rest"
```

---

## Final verification

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run test:unit` passes (including the em/en dash guard over `content/`, `components/`, `app/`)
- [ ] `npm run test:e2e` passes
- [ ] `npm run build` succeeds
- [ ] `grep -rn $'—' content/ components/ app/` returns nothing
- [ ] Section order in the browser is Hero, Noon, Teaching, Work, Before AI, Credentials
- [ ] The Noon section is visibly the largest and most detailed block on the page
- [ ] The YAX block is visibly lighter than the Noon block
- [ ] Every nav link resolves and the active highlight tracks the scroll
- [ ] At 375px there is no horizontal page scroll in any section
- [ ] With `prefers-reduced-motion: reduce`, every section's content is visible

## Known deviations to report on completion

These are decisions the implementer must surface in the final summary, not silently absorb:

1. **Heading restructures.** Four of the doc's headings contained em dashes and were mapped onto existing component slots rather than rendered as one string: `Noon — the 16-day platform`, `Teaching · Shaguf...`, `Before AI: operations at scale...`, and the three work card names. No words were dropped.
2. **`app/layout.tsx` and `app/opengraph-image.tsx` were changed** even though the doc does not mention them, because they carried the replaced tagline in four places. The OG image line is the first clause only, for width.
3. **The doc's own voice rules are violated by the doc's own copy** in two places, and the copy wins because it is final: the Noon "Built for handover" bullet lists five capabilities against rule 6 ("cut it at three"), and the YAX opening sentence carries three numbers against rule 3 ("one number per sentence maximum").
4. **The Noon section's pin was restructured**, not preserved as-is. The original pinned two lines over `+=120%`; the new copy cannot fit a pinned viewport, so the pin now holds only the opening beat and releases for the stat band, bullets, and closer. The pin is also suppressed below 768px wide or 700px tall.
5. **Four credential badge images are no longer referenced** (`cert-kaust.png`, `cert-sdaia.png`, `cert-coursera-1.png`, `cert-coursera-2.png`, about 3.7MB). The files were left on disk.
6. **The risk-triage implementation details stay in `content/persona.md`** (the chat's knowledge base) while being removed from the site copy, per the doc's own framing that they are "interview stories now".
7. **The Educational Games Industry Hackathon is not in the overhaul doc at all.** It was added mid-plan from two photographs and a LinkedIn post, and placed as a second beat inside the Noon section. Unlike every other line on the site, this copy was written rather than transcribed, so it needs a copy approval pass of its own.
8. **"Emirati" was rejected as a fact.** The English auto-translation of the LinkedIn post says "young Emirati cadres"; the Arabic source says `الكوادر الوطنية الشابة`, "young national talent". Rendered copy says "young Saudi talent", which is an interpretation of "national" in a Saudi MCIT context and should be confirmed.
9. **Two 6000x4000 originals totalling 37MB were deleted** after 1600x1066 web versions were produced. If the full-resolution files are wanted, they must be recovered from the original source; they are not in git history.
10. **"An education platform" sits on the same page as the Noon Academy section.** This phrasing is unchanged from the current site and is what the doc specifies, but a reader could infer a connection between the anonymized risk-triage client and noon. Flag for a decision if that inference is unacceptable.

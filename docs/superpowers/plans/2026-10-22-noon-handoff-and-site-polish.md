# Noon handoff, site polish and AI Engineer CV: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Noon handoff content, the critique fixes and the regenerated AI Engineer CV on branch `noon-portfolio-update`, verified by unit, CV and e2e suites plus a production build, and opened as a pull request without merging.

**Architecture:** Content stays in `content/site.ts` (typed, readonly) and is rendered by one client component per chapter under `components/chapters/`. The Noon chapter gains a typed project list rendered by a `ProjectBlock` component with four media treatments. The CV suite reads `cv/data/master.json` plus `cv/roles/*.json` and renders PDFs with headless Chrome.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind 4, GSAP 3 (`@gsap/react`), Vitest, Playwright, Node 26 test runner, poppler.

**Spec:** `docs/superpowers/specs/2026-10-22-noon-handoff-and-site-polish-design.md`

## Global Constraints

- No em dash (U+2014) or en dash (U+2013) anywhere under `content/`, `components/`, `app/`, `README.md`, or in CV text.
- Banned phrases (case-insensitive) from `cv/lib/lint.mjs`, including `arabic-first`, `most engineers`, `not demos`, `unlike others`.
- Never the string "Forward Deployed Engineer" as a title; "forward deployed" only next to evidence.
- No "100%", "16 days", "30M", "30 million", "520 code updates", "21 database migrations" in site copy, persona or README.
- AWS credential: name "AWS Certified AI Business Strategist", designation "Early Adopter", issuer "Amazon Web Services Training and Certification", description verbatim from the spec, no year, no link.
- Captions and alt text copied from `docs/noon-portfolio-handoff/asset-manifest.json`, qualifiers intact.
- Employer rendered as "Noon Academy".
- Every GSAP tween inside `gsap.matchMedia()` under `(prefers-reduced-motion: no-preference)`; no `pin: true`; no `back.out` or elastic eases.

## Review Focus

1. A visitor with reduced motion must see every project, every image and the four Method steps without any animation firing (pinned by the e2e reduced-motion tests in Task 7).
2. The MCIT strip must scroll on a phone with a thumb and must not trap the page's vertical scroll (native `overflow-x: auto` plus `overscroll-behavior-x: contain`; manual check in Task 7's screenshots).
3. A project whose `media` is empty must render no empty frame, no broken `<img>` (unit test in Task 1 asserts media arrays resolve to files; Task 3 renders `null` for empty media).
4. The AWS card has no year: the issuer line must not print a trailing separator (unit assertion in Task 1 on the content, render check in Task 4).
5. Old CV URLs keep resolving after the swap (redirect test on `vercel.json` in Task 6; e2e request in Task 7).

---

### Task 1: Content model and data

**Files:**
- Modify: `content/site.ts`
- Create: `tests/unit/content.test.ts`

**Interfaces:**
- Produces: `siteContent.noon = { logo, url, title, meta, framing, intro, closer, projects: NoonProject[], hackathon }`, where `NoonProject = { id, title, role, status, statusDetail, summary, description, work: string[], outcomes: string[], metrics: { value, label, context }[], technologies: string[], media: { src, alt, caption, width, height }[], treatment: "wide" | "flow" | "strip" | "slides" | "none" }`.
- Produces: `siteContent.credentials.featured[]` items gain `designation: string | null`, `year: string | null`, `description: string | null`.
- Produces: `siteContent.work[]` items become `{ id, kicker, meta, logo, logoAlt, line, href, cta, action }` with no `no` field.
- Produces: `siteContent.contact.cv === "/cv/Yousef-Alshuwayi-AI-Engineer.pdf"`; `siteContent.footer = { title, line }`; `siteContent.hero.cta = { cv, email }`.

- [ ] **Step 1: Write the failing test** `tests/unit/content.test.ts` with `describe("noon content")`: five project ids in order `["noon-training-development","noon-ops-hr-integration","noon-mcit-genai","noon-ai-week","noon-school-staff-placements"]`; every `media[].src` exists under `public/`; MCIT has 10 media and every caption of a `test_data` screen contains "test" or "demonstration" or "Draft"; AI Week metrics include a context containing "365"; the Citadel metric context contains "go-live"; the serialised `siteContent` contains none of `["100%","16 days","30M","30 million","Arabic-first"]`; credentials contain an entry named "AWS Certified AI Business Strategist" with `designation === "Early Adopter"` and `year === null`; `contact.cv` ends with `AI-Engineer.pdf`.
- [ ] **Step 2: Run it:** `npx vitest run tests/unit/content.test.ts`. Expected: FAIL (properties missing).
- [ ] **Step 3: Rewrite `content/site.ts`** per the spec's content mapping, keeping `host`, `url`, `method`, `teaching.gallery`, `hackathon` photos, `chapters`.
- [ ] **Step 4: Run** `npx vitest run`. Expected: all pass (copy test included).
- [ ] **Step 5: Commit** `feat(content): noon handoff, experience rewrites, AWS credential`.

### Task 2: Chapter head, nav, hero, global styles

**Files:**
- Modify: `components/ChapterHead.tsx`, `components/Nav.tsx`, `components/chapters/Hero.tsx`, `app/globals.css`

**Interfaces:**
- Produces: `ChapterHead({ title, lead }: { title: string; lead?: string })`; `lead` is a sentence, rendered in stone body type under the title.
- Produces: `.liquid-glass`, `.no-scrollbar` unchanged; `.gold-sheen` removed; new `.strip` utility (`scroll-snap-type: x mandatory; overscroll-behavior-x: contain`).

- [ ] **Step 1: ChapterHead** renders `h2` plus optional `p` lead; word reveal stays.
- [ ] **Step 2: Nav** labels in Inter (`text-xs font-medium`), case as written: Intro, How I work, Noon, Teaching, Projects, Before AI, Credentials.
- [ ] **Step 3: Hero** name solid gold (`text-gold`), CTA row (`a[href=contact.cv]` as a gold pill button, `a[href=mailto]` as text link), chips in Inter, scroll cue a 1px line.
- [ ] **Step 4: globals.css** drop `.gold-sheen`, add `.strip`, add `:focus-visible` outline in gold.
- [ ] **Step 5: Run** `npx vitest run` and `npx tsc --noEmit`. Expected: pass.
- [ ] **Step 6: Commit** `feat(site): chapter head cadence, nav labels, hero CTAs`.

### Task 3: Noon chapter

**Files:**
- Create: `components/noon/ProjectBlock.tsx`, `components/noon/ScreenStrip.tsx`, `components/noon/FlowFigure.tsx`, `components/noon/Figure.tsx`
- Modify: `components/chapters/Noon.tsx`

**Interfaces:**
- Consumes: `NoonProject` from Task 1.
- Produces: `ProjectBlock({ project }: { project: NoonProject })` rendering `article[data-noon-project=id]`, `h3` title, `p[data-status]`, the treatment by `project.treatment`.
- Produces: `ScreenStrip({ media }: { media: NoonProject["media"] })` rendering `ul.strip` of `li > figure` at a fixed height (`h-64 md:h-80`), natural widths.
- Produces: `FlowFigure()` rendering the ops-to-HR integration ownership figure from the project's `work[1]` sentence.
- Produces: `Figure({ metric })` rendering value in display type and `context` in a small stone line.

- [ ] **Step 1: Build the four components** as above.
- [ ] **Step 2: Rewrite `Noon.tsx`**: no pin; head row, five `ProjectBlock`s, hackathon beat, closer; image reveals via `gsap.from(frame, { autoAlpha: 0, scale: 1.04 })` on `scrollTrigger` per figure.
- [ ] **Step 3: Run** `npx tsc --noEmit`. Expected: pass.
- [ ] **Step 4: Commit** `feat(site): noon chapter with the five handoff projects`.

### Task 4: Teaching, Projects, Before AI, Credentials, Footer

**Files:**
- Modify: `components/chapters/Teaching.tsx`, `components/chapters/Work.tsx`, `components/chapters/Yax.tsx`, `components/chapters/Credentials.tsx`, `components/Footer.tsx`, `components/StatBand.tsx`

- [ ] **Step 1: Teaching** 7+5 photo grid, Inter captions without ordinals, lead sentence.
- [ ] **Step 2: Work** ruled rows, section id stays `work`, title "Projects".
- [ ] **Step 3: Yax** description left, pull figure right, fade instead of bounce.
- [ ] **Step 4: Credentials** four-up grid, designation and description slots, optional year, "Also completed" sentence.
- [ ] **Step 5: Footer** "Let's talk." block with the four actions.
- [ ] **Step 6: StatBand** labels in Inter.
- [ ] **Step 7: Run** `npx tsc --noEmit && npx vitest run`. Expected: pass.
- [ ] **Step 8: Commit** `feat(site): teaching, projects, before AI, credentials and footer layouts`.

### Task 5: Chat, persona, README, metadata

**Files:**
- Modify: `components/ChatBubble.tsx`, `content/persona.md`, `README.md`, `app/layout.tsx`, `app/opengraph-image.tsx`, `tests/e2e/chat.spec.ts`

- [ ] **Step 1: Starters**: "What does 'forward deployed' actually mean?", "What did you build at Noon Academy?", "Why did you go from managing 1,500 people to building AI systems?". Update the e2e assertion to `/Noon Academy/i`.
- [ ] **Step 2: persona.md** current-role section rewritten from the handoff (five projects with their qualifiers), consultant/Shaguf/YAX lines updated, AWS added, no retracted figures.
- [ ] **Step 3: README.md** About and Credentials updated the same way.
- [ ] **Step 4: layout.tsx** description and JSON-LD (`worksFor.name: "Noon Academy"`, AWS credential added); OG image subtitle "AI Systems Engineer at Noon Academy".
- [ ] **Step 5: Run** `cd cv && node --test test/site.test.mjs` and `npx vitest run`. Expected: pass.
- [ ] **Step 6: Commit** `feat(chat,docs): persona, starters, README and metadata for the Noon handoff`.

### Task 6: CV suite

**Files:**
- Modify: `cv/data/master.json`, `cv/roles/ai_engineer.json`, `cv/lib/render.mjs`, `cv/test/render.test.mjs`, `vercel.json`, `tests/e2e/site.spec.ts`
- Create: `public/cv/Yousef-Alshuwayi-AI-Engineer.pdf`; Delete: `public/cv/Yousef-Alshuwayi-Forward-Deployed-Engineer.pdf`

- [ ] **Step 1: Failing render test**: a cert entry with `year: ""` renders `"AWS Certified AI Business Strategist</span>, Amazon Web Services Training and Certification."` with no `, .`.
- [ ] **Step 2: Run** `cd cv && node --test test/render.test.mjs`. Expected: FAIL.
- [ ] **Step 3: render.mjs** omits the year segment when empty.
- [ ] **Step 4: master.json** edits per the spec (five Noon bullets with Arabic, consultant rewording, YAX without 30 million, AWS cert). **ai_engineer.json** new summary.
- [ ] **Step 5: Build** `node cv/build.mjs --all`; every PDF 1 page (2 is the ceiling); apply tag diets if any role spills.
- [ ] **Step 6: Serve** copy `cv/output/Yousef-Alshuwayi-AI-Engineer.pdf` to `public/cv/`, `git rm` the Forward Deployed PDF, flip the two `vercel.json` redirects to point at the AI Engineer file, update the e2e regex to `/AI-Engineer\.pdf$/`.
- [ ] **Step 7: Run** `cd cv && node --test test/*.test.mjs`. Expected: all pass.
- [ ] **Step 8: Commit** `feat(cv): Noon projects, AWS credential, serve the AI Engineer CV`.

### Task 7: Verification and pull request

- [ ] **Step 1:** `npx tsc --noEmit && npx vitest run && npx playwright test`. Expected: pass.
- [ ] **Step 2:** `npm run build`. Expected: success, no warnings about images.
- [ ] **Step 3:** Screenshots at 1440 and 390 with motion on and reduced; inspect every chapter.
- [ ] **Step 4:** `node <impeccable>/scripts/detect.mjs --json app components content`. Expected: exit 0.
- [ ] **Step 5:** Push the branch, open a PR titled "Noon handoff, site polish, AI Engineer CV", body listing files changed, checks run and what Yousef still has to decide before merging.

# Portfolio + Chatbot Rebrand (Plan B) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the public website, the chatbot's knowledge, the social card, and the README with the consolidated, humble positioning already shipped in the CV suite (Plan A), so the brand and the CVs tell one story.

**Architecture:** `index.html` is one self-contained file whose visible text lives in two places that must stay in sync: the static HTML defaults (`[data-key]` elements) and a JS `I18N` dictionary (`en` + `ar`) that overwrites them on load. The chatbot (`theChatBot/app.py`) builds its system prompt from two ingested files (`me/summary.txt` and `me/linkedin.pdf`). We replace the PDF with a clean, lint-able `me/linkedin.txt`. An objective guardrail test reuses `cv/lib/lint.mjs` `findViolations()` to enforce the voice rules across every content file.

**Tech Stack:** Static HTML/CSS/JS, Node v26 built-in test runner (reusing `cv/lib/lint.mjs`), headless Google Chrome (already used by the CV build) for screenshots and the og-image re-render, Python (`py_compile`) to smoke-check `app.py`.

## Global Constraints

These apply to every task. Copy verbatim from the approved spec (`docs/superpowers/specs/2026-06-30-cv-suite-and-portfolio-rebrand-design.md`, sections 4, 9, 10).

- **No em-dashes (`—`) and no en-dashes (`–`) anywhere in content.** Replace date ranges with `to` (English) / `إلى` / `حتى الآن` (Arabic). `findViolations()` flags both.
- **No banned phrases** (from `cv/lib/lint.mjs`): `arabic-first`, `arabic first`, `running three companies`, `one operator`, `full power`, `shipped solo`, `deploy it`, `demo it`, `founder & ceo`, `founder and ceo`.
- **Remove Replyli entirely** (cards, links, footer, keywords, og-image, chatbot, README).
- **AWS replaces Google Cloud / Google Cloud Run.** Drop Azure too (not in the master skill set).
- **SDA Agentic AI Bootcamp is completed**, not "in progress". **McKinsey Forward is 2026**, not 2025.
- **Keep** the real numbers (30M visitors, 1,500 staff, 45 stations, 1,800+ students at 4.9, Apple 1 of 66 from 400,000+), the gold/dark visual identity, all section `id`s and anchors (`#ventures`, `#trajectory`, `#running`, `#stack`, `#timeline`, `#connect`), and all eight certifications.
- **Bilingual parity:** every English string changed gets its Arabic counterpart changed. `I18N.en` and `I18N.ar` must keep identical key sets.
- **Arabic:** tech and brand names stay in Latin; the Trayath project transliterates to **تريث**.
- Plain, humble voice. Do not make anything bigger than it is. State facts and let them stand.

## File Structure

- `cv/test/site.test.mjs` (create) — guardrail test; reuses `findViolations` from `cv/lib/lint.mjs`. Reads the four content files plus `assets/og-image.svg`, asserts voice-clean, no Replyli, no Google Cloud, AWS present, "Selected work" present, McKinsey 2026, SDA not "in progress", and i18n key parity.
- `index.html` (modify) — head metadata, hero, proof, Selected work (was Ventures), trajectory, currently, stack, certificates, footer; both static HTML and the `I18N` `en`/`ar` dicts.
- `theChatBot/me/summary.txt` (rewrite) — primary chatbot knowledge, new positioning.
- `theChatBot/me/linkedin.txt` (create) — clean profile text replacing the stale PDF.
- `theChatBot/app.py` (modify) — read `me/linkedin.txt` instead of `me/linkedin.pdf` (line ~130), update `HEADLINE` (line 55) and the module docstring (line 6).
- `theChatBot/README.md` (modify) — fix the single em-dash; leave deploy instructions.
- `assets/og-image.svg` (modify) + `assets/og-image.png` (re-render) — social card text.
- `README.md` (rewrite) — About, Tech Stack, Currently Building, Currently Learning, Credentials, typing SVG.

`theChatBot/me/linkedin.pdf` is left on disk but no longer ingested. `theChatBot/website_widget/*` needs no change (no old-story text).

## New copy (English) — the content lock

Arabic mirrors each item in meaning, plain, no em-dashes, tech/brand names in Latin. Authored inline during execution.

### Head metadata
- `<title>`: `Yousef Alshuwayi · Agentic AI Engineer & Full-Stack Developer`
- description: `Computer science student in Riyadh. I build AI systems and web products, and I have run operations at national scale. I built a risk-triage system for an education platform and Rusokh, a course platform.`
- keywords: `Yousef Alshuwayi, AI Engineer, Agentic AI Engineer, Full-Stack Developer, LangGraph, CrewAI, MCP, RAG, FastAPI, Next.js, AWS, Riyadh, Saudi Arabia` (no Replyli, no Founder)
- og:title / twitter:title: `Yousef Alshuwayi · Agentic AI Engineer`
- og:description / twitter:description: `I build AI systems and web products from Riyadh. A risk-triage system for an education platform, the Rusokh course platform, and client work through GHRS.`
- og:image:alt / twitter:image:alt / og:title author: drop "Founder".
- JSON-LD `jobTitle`: `Agentic AI Engineer and Full-Stack Developer`; `knowsAbout`: add `AWS`; keep the rest; `sameAs` keep linkedin/github/ghrs.sa/rusokh.com.

### Hero
- role1: `AI & Software Consultant<b>Freelance · Riyadh</b>`
- role2: `Agentic AI Engineer<b>LangGraph / CrewAI / MCP</b>`
- role3: `Full-Stack Developer<b>Next.js · FastAPI · Postgres</b>`
- tagline (`TAGLINES.en`): `I build practical AI systems and web products.\nI use plain rules where they are safer, and AI where it helps.`

### Proof (numbers kept)
- s1 cap: `Riyadh Metro launch. Operations across 45 stations.`
- s2 unit: `Staff prepared` · cap: `Across 45 stations for the metro launch, in one month.`
- s3 unit: `Students taught · 4.9/5` · cap: `Computer science, over four years.`
- range-p: `Operations at national scale → Apple's AI program (1 of 66 from 400,000+) → KAUST → SDAIA → agentic AI engineering.`

### Selected work (replaces Ventures; nav label `Work`)
- eyebrow `02 / Selected work`; title `Selected work.`; right `A few things I have built and delivered, 2025 to 2026.`
- Card 1 — Risk-triage system (no external link, not clickable): kicker `Client work · AI`; name `Risk-triage system` / `نظام ترتيب حسب الخطورة`; badge `Paid client work`; line `Built a document intake and risk-triage system for an education platform. It reads facilitator notes, scores each student's risk with fixed rules, and uses an AI model only for the Arabic text, never for the scoring.`; meta `2025` · `Education platform`.
- Card 2 — Rusokh (hero-card, keeps logo + link): kicker `Course platform · personal project`; h3 `Course platform.`; badge `Live · in use`; line `A course platform I built for myself. As an instructor I hit the same problems on other platforms, so I built my own. Next.js, Convex, payments, and video, in Arabic and English.`; cta `Visit rusokh.com`; meta `2026` · `Personal project`.
- Card 3 — GHRS (keeps logo + link): kicker `Client work`; h3 `GHRS` + `غرس للتنمية والحلول التقنية`; badge `Client work`; line `Through GHRS I deliver client work for Saudi businesses: rebuilt websites, automated WhatsApp Business, and connected internal tools to customer channels.`; cta `Visit ghrs.sa`; meta `2025 to Present` · `Riyadh`.

### Trajectory (consolidated to 4 rows)
- title `From operations to AI engineering.`; idx `2022 to present`
1. `2025 to Present` · `AI & Software Consultant` / `Freelance · Riyadh` · `I build AI systems and web products for clients. A risk-triage system for an education platform, and web and automation work through GHRS.`
2. `Jan 2022 to Present` · `Computer Science Tutor` / `Shaguf` · `1,800+ students over four years, at a 4.9 of 5 rating.`
3. `Jun 2024 to May 2025` · `Riyadh Metro Launch` / `YAX · Your Amazing Xperience` · `Prepared 1,500 staff across 45 stations in one month for the metro opening. Promoted from Coordinator to Staff Manager.`
4. `Nov 2022 to Oct 2024` · `Operations Team Member` / `Allure Event` · `On-site logistics for large events.`
- Remove the FREIGHTLX, Startup Hub Riyadh, separate Rusokh/GHRS founder rows, and separate YAX Coordinator row.

### Currently (how I build)
- eyebrow `§ 04 / Currently`; title `How I build: plain rules where they are safer, AI where it helps.`; idx `2026`
- terminal: drop Azure; `deploy: FastAPI · Docker · AWS`; `status: COMPLETED`.
- why eyebrow `/ how I work`; h3 `I keep AI out of the parts where plain rules are safer.`
- why p1: `On the risk-triage system, fixed rules do the scoring. The AI model only handles the messy Arabic text, and it never decides a student's risk.`
- why p2: `I add an AI check on the AI-written messages before a person approves them. Re-runs are cached, so a full run of about 71 model calls drops to about 5.`
- why quote: `Plain rules where they are safer. AI where it helps.`

### Stack
- title `Tools I have actually used.`
- Infrastructure tags: `Docker · AWS · GitHub Actions · Cloudflare R2 · Bunny.net · Moyasar` (remove Google Cloud Run and Azure).

### Certificates
- SDA: date `2026`, badge `Completed`.
- McKinsey: date `2026`.
- B.Sc. stays `In Progress` (expected Jan 2027). Apple keeps `1 of 66 from 400,000+` and `Built Trayath` (Arabic: تريث). idx `2025 to 2027`.

### Footer
- line1: `© 2026 Yousef Alshuwayi · GHRS · Rusokh` (remove Replyli link).

CV download links in Connect: deferred (CVs are not hosted on the live site). Note, do not add.

---

## Task 1: Site guardrail test (red)

**Files:** Create `cv/test/site.test.mjs`. Consumes `findViolations` from `cv/lib/lint.mjs`.

- [ ] **Step 1: Write the test**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findViolations } from '../lib/lint.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (rel) => { try { return fs.readFileSync(path.join(root, rel), 'utf8'); } catch { return ''; } };

const CONTENT = ['index.html', 'README.md', 'theChatBot/me/summary.txt', 'theChatBot/me/linkedin.txt', 'assets/og-image.svg'];

for (const rel of CONTENT) {
  test(`${rel}: clean voice (no dashes, no banned phrases)`, () => {
    const text = read(rel);
    assert.ok(text.length > 0, `${rel} is empty/missing`);
    assert.deepEqual(findViolations(text), [], `${rel} voice violations`);
  });
  test(`${rel}: no Replyli`, () => {
    assert.ok(!/replyli/i.test(read(rel)), `${rel} still mentions Replyli`);
  });
}

test('index.html: AWS in, Google Cloud out', () => {
  const t = read('index.html');
  assert.ok(/AWS/.test(t), 'AWS missing');
  assert.ok(!/google cloud/i.test(t), 'Google Cloud still present');
});

test('README.md: AWS in, Google Cloud out', () => {
  const t = read('README.md');
  assert.ok(/AWS/.test(t), 'AWS missing');
  assert.ok(!/google cloud/i.test(t), 'Google Cloud still present');
});

test('index.html: Selected work present, McKinsey 2026, SDA not in progress', () => {
  const t = read('index.html');
  assert.ok(/Selected work/.test(t), 'Selected work missing');
  assert.ok(/McKinsey Forward/.test(t), 'McKinsey missing');
  assert.ok(!/McKinsey Forward Program<span class="sub">McKinsey &amp; Company<\/span>'[\s\S]{0,40}'cred\.mckinsey\.date': '2025'/.test(t));
});

test('i18n en/ar key parity', () => {
  const t = read('index.html');
  const arIdx = t.indexOf('\n      ar: {');
  assert.ok(arIdx > 0, 'ar block not found');
  const enBlock = t.slice(t.indexOf('en: {'), arIdx);
  const arBlock = t.slice(arIdx);
  const keys = (block) => new Set([...block.matchAll(/^\s*'([^']+)':/gm)].map(m => m[1]));
  const en = keys(enBlock), ar = keys(arBlock);
  const missingInAr = [...en].filter(k => !ar.has(k));
  const missingInEn = [...ar].filter(k => !en.has(k));
  assert.deepEqual(missingInAr, [], `keys missing in ar: ${missingInAr}`);
  assert.deepEqual(missingInEn, [], `keys missing in en: ${missingInEn}`);
});
```

- [ ] **Step 2: Run, expect RED**

Run: `node --test cv/test/site.test.mjs`
Expected: FAIL (current files contain em-dashes, Replyli, Google Cloud; `linkedin.txt` missing).

- [ ] **Step 3: Commit** `git add cv/test/site.test.mjs && git commit -m "Add website/chatbot content guardrail test (red)"`

## Task 2: index.html head + hero + proof

**Files:** Modify `index.html` (head meta + JSON-LD; static hero/proof at ~2048-2109; `I18N.en`/`I18N.ar` hero/proof keys; `TAGLINES`).

- [ ] Apply the Head metadata, Hero, and Proof copy above. Edit static HTML defaults AND both `I18N` dicts AND `TAGLINES`. Replace every `—`/`–` in these regions with `to` / commas. Arabic mirrors.
- [ ] Run `node --test cv/test/site.test.mjs` — fewer violations than Task 1 (still red overall).
- [ ] Commit `git commit -am "Rebrand index head, hero, proof to plain voice"`

## Task 3: index.html Selected work section

**Files:** Modify `index.html` nav label; the `#ventures` section (static, ~2111-2211); `I18N` `ventures.*` and `card.*` keys (remove all `card.replyli.*`).

- [ ] Replace the three venture cards with the three Selected-work cards above. Remove the Replyli `<article>`, its `card.replyli.*` keys in both dicts, and the `replyli` data-href. Card 1 has no `data-href` and no `.cta`. Update `nav.ventures` label to `Work` / `الأعمال`.
- [ ] Run `node --test cv/test/site.test.mjs` — `Selected work` assertion passes; Replyli assertions for index begin passing.
- [ ] Commit `git commit -am "Replace Ventures with Selected work; remove Replyli card"`

## Task 4: index.html trajectory

**Files:** Modify the `#trajectory` section (static, ~2213-2291) and `I18N` `traj.*` + `exp.*` keys.

- [ ] Replace the eight `exp` rows with the four consolidated rows above. Remove `exp.flx.*`, `exp.shr.*`, `exp.yaxc.*`, the old `exp.ghrs.*`/`exp.rusokh.*` founder rows; rename/repurpose remaining keys (`exp.consultant`, `exp.tutor` from `exp.shaguf`, `exp.metro` from `exp.yaxm`, `exp.allure`). Keep keys identical across en/ar.
- [ ] Run `node --test cv/test/site.test.mjs` — parity holds; dash count drops.
- [ ] Commit `git commit -am "Consolidate trajectory to four humble rows"`

## Task 5: index.html currently + stack + certificates + footer

**Files:** Modify `#running` (~2293-2348), `#stack` (~2350-2441), `#timeline` (~2443-2510), footer (~2547-2553); matching `I18N` keys.

- [ ] Apply Currently, Stack, Certificates, Footer copy above. Terminal: drop Azure, status `COMPLETED`. Stack g4: remove Google Cloud Run + Azure. SDA badge `Completed`, date `2026`; McKinsey date `2026`. Footer: remove Replyli link. Replace all remaining `—`/`–`.
- [ ] Run `node --test cv/test/site.test.mjs` — index.html cases all GREEN (clean, AWS in, Google Cloud out, McKinsey 2026, Selected work, no Replyli).
- [ ] Commit `git commit -am "Rebrand currently, stack, certificates, footer; AWS in, Google Cloud out"`

## Task 6: chatbot knowledge

**Files:** Rewrite `theChatBot/me/summary.txt`; create `theChatBot/me/linkedin.txt`; modify `theChatBot/app.py` (line ~130 read txt, line 55 `HEADLINE`, docstring line 6); fix `theChatBot/README.md` em-dash.

- [ ] Rewrite `summary.txt`: consolidated AI & Software Consultant umbrella, Tutor, Riyadh Metro, Allure; projects Rusokh + Trayath; skills with AWS; education; all 8 certs (SDA completed, McKinsey 2026); languages. No Replyli, no em-dashes, no banned phrases.
- [ ] Create `linkedin.txt`: a clean LinkedIn-style version of the same facts (headline `AI & Software Consultant · Agentic AI Engineer · Full-Stack Developer`, summary, experience, skills). No old story.
- [ ] `app.py`: change `self.linkedin = self._read_pdf("me/linkedin.pdf")` to `self.linkedin = self._read_text("me/linkedin.txt")`; set `HEADLINE = "AI & Software Consultant · Agentic AI Engineer · Full-Stack Developer"`; update docstring line 6 to reference `linkedin.txt`. (PdfReader import may stay; harmless.)
- [ ] `theChatBot/README.md`: replace the one `—` with a comma.
- [ ] Verify: `python3 -m py_compile theChatBot/app.py` passes; `node --test cv/test/site.test.mjs` — summary.txt and linkedin.txt cases GREEN.
- [ ] Commit `git commit -am "Rebrand chatbot knowledge: clean summary + linkedin.txt, drop stale PDF"`

## Task 7: og-image

**Files:** Modify `assets/og-image.svg`; re-render `assets/og-image.png`.

- [ ] In `og-image.svg`, change `FOUNDER · AGENTIC AI ENGINEER · FULL-STACK DEVELOPER` to `AGENTIC AI ENGINEER · FULL-STACK DEVELOPER`, the em-dash tagline to a plain one, and `GHRS · RUSOKH · REPLYLI` to `GHRS · RUSOKH`.
- [ ] Re-render the PNG: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --window-size=1200,630 --default-background-color=00000000 --screenshot=assets/og-image.png file://$PWD/assets/og-image.svg` (or load the SVG in a 1200x630 HTML wrapper if Chrome crops). Verify the PNG is 1200x630 and visually correct via Read.
- [ ] Run `node --test cv/test/site.test.mjs` — og-image.svg cases GREEN.
- [ ] Commit `git commit -am "Update social card: drop Founder and Replyli"`

## Task 8: README.md

**Files:** Rewrite `README.md`.

- [ ] About: plain, consolidated (consultant + engineer + operations edge; risk-triage system; Rusokh as personal project; no "solo in 3 weeks", no "Arabic-first", no "demo/deploy it"). Tech Stack: Google Cloud badge to AWS. Currently Building table: remove Replyli row, reframe GHRS (client work) and Rusokh (personal project). Currently Learning: SDA shown completed. Credentials: SDA `Completed` (not in progress), McKinsey `2026`. Typing SVG `lines=`: remove `Arabic-first` and `Built production SaaS solo in 3 weeks`; use plain lines.
- [ ] Run `node --test cv/test/site.test.mjs` — README cases GREEN (clean, AWS in, Google Cloud out, no Replyli).
- [ ] Commit `git commit -am "Rebrand README to plain consolidated voice"`

## Task 9: Full verification

- [ ] `node --test cv/test/*.test.mjs` — all CV tests (19) + all site tests GREEN.
- [ ] `grep -c '—\|–' index.html README.md theChatBot/me/summary.txt theChatBot/me/linkedin.txt assets/og-image.svg` — every file `0`.
- [ ] `python3 -m py_compile theChatBot/app.py` — passes.
- [ ] Screenshot `index.html` in English and Arabic via headless Chrome at 1440px; Read both PNGs; confirm layout intact, Selected work renders, Arabic RTL correct, no Replyli, no leftover em-dashes.
- [ ] Report results; then finishing-a-development-branch.

## Self-review notes

- Spec coverage: head/hero/proof (T2), Ventures→Selected work + Replyli removal (T3), trajectory (T4), currently/stack/certs/footer + AWS + SDA/McKinsey (T5), chatbot summary+linkedin+app.py (T6), og-image (T7, beyond spec but carries Replyli), README (T8). All of spec §9–§10 covered.
- The lint guardrail (T1) is the cross-cutting check; index.html goes fully green only after T5, so T2–T4 are expected to remain partially red, by design.
- Risk: i18n divergence between static HTML and the dicts. Mitigation: the JS dict is the source shown to users; edit both, rely on key-parity test + EN/AR screenshots.

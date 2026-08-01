# Portfolio Content Overhaul — yousefalshuwayi.online

**Purpose of this document:** A full content audit of the current site, a critique of what's wrong (the same problems that plagued the old CVs), and exact replacement copy for every section. This is a handoff document for implementation — the copy below is final and ready to paste. Design/layout stays as-is unless a note says otherwise; this is a **content and emphasis** overhaul, not a redesign.

---

## Part 1 — The Core Problem

The site tells the story of who Yousef **was**, not who he **is**.

The single most impressive, most current, most differentiating thing Yousef has done — **building the Training & Development Portal at Noon Academy in 16 days, with 100% adoption, integrated into Noon's central systems** — gets exactly **two sentences** on the site, under a vague heading called "A new chapter":

> "In July 2026 I joined noon as an AI Systems Engineer. I build agentic AI systems that reach production and hold up there."

Meanwhile:

- The **YAX / events job gets an entire multi-entry timeline** with three sub-roles and three highlighted side-assignments (World Urban Forum, Cityscape, AlUla transport). This is pre-AI career history. It deserves one compact block, not the largest experience section on the page.
- The **risk-triage system gets a full featured project card** with implementation minutiae ("71 model calls to about 5", "fixed rules score each case"). This is exactly the over-detail problem from the old CVs — a freelance project from 2025 explained at a depth the Noon work never receives.
- The **certifications section lists 8 items with equal visual weight**, including "Vibe Coding" and two intro Coursera courses sitting next to "1 of 66 from 400,000+ applicants at Apple." Weak items dilute strong ones.
- **Shaguf (1,800+ students, 4.9/5, four years, honored as best instructor)** only appears indirectly through two photo captions in the "On Stage" gallery. That's a headline achievement hidden in an image alt-text.

### The rule for the rewrite

**Weight by relevance to where Yousef is going (AI systems engineering), not by how much material exists.** The order of emphasis should be:

1. **Noon — the Training & Development Portal** (the headline; current, technical, adopted, real)
2. **Teaching at Shaguf** (scale + longevity + credibility: 1,800 students, 4.9/5, 4 years)
3. **Freelance AI & software work** (breadth: GHRS client work, risk-triage, FREIGHTLX advisory — each ONE line of depth, not a spec sheet)
4. **Rusokh + portfolio-as-product** (proof he ships his own things)
5. **YAX / Metro** (one strong compact block — impressive scale, but it's the past)
6. **Credentials** (top 4 featured, rest collapsed)

---

## Part 2 — Section-by-Section Critique & Replacement Copy

### 2.1 Hero

**Current:**
> "AI Systems Engineer at noon — I build production AI systems and web products."
> Badges: CDMP · Apple AI Program 1 of 66 · SDA Agentic AI Bootcamp

**Critique:** The title line is fine. The subtitle is generic — "production AI systems and web products" could belong to ten thousand portfolios. It says nothing about *how* he works or what makes him different. The badges are fine but CDMP is the weakest of the three and leads.

**Replacement copy:**

- Keep: `AI Systems Engineer at noon`
- Replace subtitle with:
  > **"I build AI systems that people actually adopt — and that keep running after I hand them over."**
- Badge order: `Apple AI Program · 1 of 66` first, then `SDA Agentic AI Bootcamp`, then `CDMP`.

---

### 2.2 "A new chapter" (Noon section) — THE BIG FIX

**Current:** Two sentences and a logo. The largest gap on the site.

**Critique:** This is the section a hiring manager or collaborator actually cares about, and it's currently a placeholder. It needs to become the **flagship section of the entire site** — bigger than the YAX timeline, richer than the project cards. It should tell a story with tension and resolution, but stay high-level enough that people want to ask about it (per Yousef's explicit preference: intrigue on the page, depth in conversation).

**Replacement:** Rename the section from "A new chapter" to something with substance. Suggested heading: **"Noon — the 16-day platform"**.

**Full replacement copy:**

> **AI Systems Engineer · Noon Academy · July 2026 – Present**
>
> My first assignment at noon was a measurement layer inside a six-day training camp: one exercise a day, ten fixed scenarios, two user roles.
>
> I made myself a bigger promise — build a platform that serves the whole training journey, and hand it to the Training & Development team needing zero engineering support.
>
> **Sixteen days later, the Training & Development Portal was live.**
>
> - From a daily assessment tool to the platform that now runs noon's supervisor and leadership training end to end
> - Four distinct role experiences — trainee, trainer, T&D operations console, and leadership views — where there had been two
> - Integrated with noon's central database by API: automatic enrollment, and a daily absence report that reaches HR on schedule, every day, without a human touching it
> - Adopted by 100% of the teams it touches — trainers, trainees, T&D, and HR — before any official rollout
> - Built for handover: question banks, batch management, analytics, audit log, and full operational control, all owned by a non-technical team
>
> The next goal is already in motion: turning a two-month program tool into a platform facilitators open every single day of the year.

**Implementation notes:**
- The stat trio from the internal presentation — **16 days · ~520 code updates · 21 database migrations · 100% adoption** — works beautifully as a stat band (pick 3; recommend *16 days*, *100% adoption*, *4 role experiences* for a general audience, since "520 updates" reads as engineering trivia to non-engineers).
- Do NOT list the full feature inventory (heatmaps, export, invitation emails, etc.). The bullets above are the ceiling of detail. The point is to make people ask.

---

### 2.3 YAX / Events section

**Current:** Full timeline with 3 roles + 3 numbered highlight assignments. The visually heaviest experience block on the site.

**Critique:** Genuinely impressive (1,500 staff, 45 stations, 30M visitors, promoted twice in a year) — but it's over-weighted relative to Noon. It's also framed as a chronology when it should be framed as a *character reference*: this is the section that proves Yousef can operate under pressure, coordinate humans at scale, and be trusted with real-world stakes. That's one strong paragraph plus one line of stats, not a four-entry timeline.

**Replacement copy (collapse the timeline into a single block):**

> **Before AI: operations at scale · YAX · Nov 2023 – May 2025**
>
> Before I built systems for machines, I ran them for people. At YAX I was promoted twice in one year — operations, to HR coordination, to Staff Manager for the Riyadh Metro launch: 1,500 staff recruited, trained, and deployed across 45 stations in a single month, serving 30M+ visitors.
>
> Along the way: supervising the World Urban Forum protocol team in Cairo, and leading ministerial transport from Riyadh to AlUla.
>
> That period is why I build the way I build — systems have to survive contact with real people, real deadlines, and real chaos.

**Implementation notes:**
- Kill the multi-entry timeline UI for this section, or collapse it to an expandable "full timeline" detail.
- The closing line ("why I build the way I build") is the bridge that makes this section *serve* the AI story instead of competing with it. Keep it.
- Drop the Cityscape stand item — three examples is one too many; keep the two most impressive.

---

### 2.4 Teaching / Shaguf — NEW SECTION (currently missing!)

**Current:** Exists only as photo captions in the "On Stage" gallery.

**Critique:** 1,800+ students, a 4.9/5 rating held over four years, and being honored as best instructor is arguably Yousef's deepest credential — it predates everything else and it's still running. It proves communication, consistency, and the ability to make complex things understandable — exactly what separates an AI engineer who can align teams from one who can't. It must be its own section.

**New section copy (place after the Noon section, before or merged with "On Stage"):**

> **Teaching · Shaguf Educational Platform · Jan 2022 – Present**
>
> For four years and counting, I've taught computer science to 1,800+ students — holding a 4.9 out of 5 rating the whole way, and honored as best instructor on stage at a Shaguf event.
>
> Teaching is where I learned the skill I use most as an engineer: taking something complicated and making it land — for a beginner, for an expert, or for a stakeholder who just needs to trust the system.

**Implementation notes:**
- The existing "On Stage" photo gallery slots naturally under this section — the Shaguf stage photo and audience photo become evidence for the story instead of orphaned images. The SDA presenting photo can stay in the gallery too.
- Stat band option: **1,800+ students · 4.9/5 rating · 4 years**.

---

### 2.5 Work / Projects section

**Current:** Three cards — Rusokh, GHRS, and the Risk-triage system (with the "71 calls to 5" caching detail).

**Critique:**
- Rusokh card: good, keep nearly as-is.
- GHRS card: fine, but flat — reads like a task list.
- Risk-triage card: **this is the exact "triage problem" from the old CVs.** It's the only project with implementation internals on display, giving a 2025 freelance project more technical depth than the current full-time role. Cut the detail down to one confident sentence and let Noon be the technical showcase.
- Missing: FREIGHTLX advisory (one line of breadth, worth having) and the portfolio itself (it has a real AI chat with guardrails — that's a project).

**Replacement copy for the cards:**

> **/01 · Rusokh — course platform · Personal product**
> I hit the same walls on every course platform I taught on, so I built my own. Bilingual (Arabic/English), payments, video delivery — live and in use today.
> [Visit the platform →]

> **/02 · Client work — web, automation, and AI · Freelance via GHRS · 2025–2026**
> End-to-end delivery for Saudi businesses: rebuilt websites, automated WhatsApp Business, connected internal tools to customer channels. On the AI side: an auditable document-intake and risk-triage system for an education platform, and AI architecture advisory for an early-stage logistics startup.
> [Visit GHRS →]

> **/03 · This site — a portfolio that answers back**
> Built as a product, not a page: a streaming AI chat that answers as me, with rate limits, input validation, and prompt guardrails behind the API. Try it — ask it anything on this page.

**Implementation notes:**
- The standalone risk-triage card is **deleted** — it's absorbed into the client-work card as one sentence with zero implementation detail. No "71 calls to 5", no "rules own the scoring". Those are interview stories now.
- Card /03 turns an existing hidden strength (the chat widget already on the site) into a showcased project, and invites interaction.

---

### 2.6 Credentials section

**Current:** 8 credentials in a flat grid with equal weight: CDMP, SDA Bootcamp, Apple (1 of 66), KAUST Intro to AI, McKinsey Forward, Vibe Coding (SDAIA), and two University of Michigan intro courses.

**Critique:** "1 of 66 from 400,000+ applicants" is a headline achievement sitting in the same grid cell as an intro Coursera course. Equal weight means the strongest item gets averaged down. Vibe Coding and the two Michigan intro courses actively signal "beginner" next to the rest.

**Replacement structure:**

**Featured (large cards, keep badges/images):**
1. **Apple AI Program** — Apple Developer Academy & Tuwaiq, 2025 · *Selected 1 of 66 from 400,000+ applicants* ← give this one the biggest visual treatment, the selection stat IS the credential
2. **Agentic AI Bootcamp** — SDA Academy, 2026 · selective admission
3. **CDMP Associate** — DAMA, 2026
4. **McKinsey Forward** — McKinsey & Company, 2026

**Collapsed row ("Also:" — small text, one line each, no badge images):**
- Introduction to AI, KAUST Academy, 2026 · Data Science & ML scholarship, KAUST Academy, 2025 · Data courses, University of Michigan, 2025 · Vibe Coding, SDAIA, 2026

---

### 2.7 AI chat widget — suggested question chips

**Current chips:** "What did you build at Rusokh?" / "What will you do at noon?" / "How does the risk-triage system work?"

**Critique:** Two of three chips point at the past ("What *will* you do at noon" is even phrased as if the Noon work hasn't happened, and the triage chip drags attention back to the exact project we're de-emphasizing).

**Replacement chips:**
- "How did you build a whole platform in 16 days?"
- "What does 100% adoption actually mean?"
- "Why did you go from managing 1,500 people to building AI systems?"

Also update the chat system prompt's knowledge base with the Noon portal story (Part 2.2 content) so the answers match the new site.

---

### 2.8 Site narrative order (top to bottom)

**Current order:** Hero → Noon (2 lines) → YAX timeline → On Stage gallery → Work cards → Credentials → Chat

**New order:**
1. Hero (updated subtitle)
2. **Noon — the 16-day platform** (flagship section, per 2.2)
3. **Teaching — Shaguf** (new section, absorbs the On Stage gallery, per 2.4)
4. **Work** (3 cards, per 2.5)
5. **Before AI — YAX** (single compact block, per 2.3)
6. **Credentials** (featured 4 + collapsed row, per 2.6)
7. Chat (updated chips + system prompt, per 2.7)

The narrative this order tells: *here's what I'm building now → here's why you can trust me to explain and align → here's what I ship on my own → here's the pressure I was forged under → here's the paper trail.*

---

## Part 3 — Voice & Style Rules (apply to all copy)

1. **No em dashes in body copy** if reusing text for CVs; on the site they're acceptable, but the copy above already works either way.
2. **First person, active, concrete.** "I built", "I handed over", never "was responsible for".
3. **One number per sentence maximum.** Numbers lose power in clusters.
4. **High-level over exhaustive.** Every section should leave one obvious question unanswered — that question is the interview hook. (Explicit owner preference.)
5. **The past serves the present.** Every pre-AI section must end with a line connecting it to how Yousef builds today.
6. **No feature inventories.** If a sentence starts listing more than three capabilities, cut it at three.

---

## Part 4 — Facts Reference (verified source material)

For the implementer — all claims in the copy above trace to these facts:

| Fact | Value |
|---|---|
| Noon role | AI Systems Engineer, Jul 2026 – Present |
| Portal build time | 16 days (Jul 13 – Jul 29, 2026) |
| Code updates during build | ~520 |
| Database migrations | 21 |
| Adoption | 100% of involved teams, began before official rollout |
| Role experiences | 4 (was 2): trainee, trainer, T&D console, leadership |
| Integration | Noon central database via API (auto-enrollment); daily automated HR absence report (Riyadh time, idempotent, with kill switch) |
| Handover goal | Non-technical T&D team operates with zero engineering intervention |
| Next phase | Daily-use facilitator platform: workshops page, personalized content, knowledge bank, 1:1 expert sessions |
| Shaguf | 1,800+ students, 4.9/5, Jan 2022 – present, honored best instructor |
| YAX | Nov 2023 – May 2025, promoted twice in one year, 1,500 staff / 45 stations / 30M+ visitors, WUF Cairo, AlUla ministerial transport |
| Freelance | Jan 2025 – Jul 2026, via GHRS; risk-triage system (rules score, AI handles Arabic text only, LLM-as-judge gate, ~71→~5 calls via caching — interview detail only, NOT site copy); FREIGHTLX advisory |
| Rusokh | 2026, bilingual course platform, Next.js/Convex/payments/video, live |
| Portfolio chat | Streaming AI chat, rate limits, validation, prompt guardrails |
| Apple AI Program | 2025, 1 of 66 from 400,000+ |
| Other credentials | SDA Agentic AI Bootcamp 2026 (selective); CDMP Associate, DAMA 2026; McKinsey Forward 2026; KAUST 2025–26; U. Michigan 2025; SDAIA Vibe Coding 2026 |

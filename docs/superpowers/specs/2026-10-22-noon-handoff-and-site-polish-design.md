# Noon handoff, site polish and the AI Engineer CV: design

Date: 2026-10-22. Branch: `noon-portfolio-update`. Status: approved by default (autonomous session; Yousef's brief plus the handoff pack are the requirements).

## Intent

Three things, in one branch:

1. Replace the Noon Academy chapter of youusef.com with the October handoff content (role copy, five projects, fourteen approved images), update the freelance, Shaguf and YAX descriptions, and add the AWS Certified AI Business Strategist credential.
2. Fix what the 2026-10-22 critique found (score 26/40): half-empty desktop viewports, template grammar (eyebrows, numbered markers, gradient name, identical cards, uniform reveals), scroll hijacks, no CTA in the hero.
3. Refresh the CV suite with the same facts and serve the AI Engineer CV from the site.

Why now: the live Noon chapter still tells the "16-day platform, 100% adoption" story. The handoff retracts the adoption claim and replaces the single story with five documented projects. Yousef's verdict on the last round of changes was "not good at all"; he wants a solid, good-looking site.

## Goals

- Every fact on the site traces to the handoff pack, `portfolio-experience-and-aws-prompt.md`, or facts already confirmed on the live site (July 2026 start, Shaguf and YAX dates, existing credentials).
- The Noon chapter holds five projects with their status, work, outcomes (with qualifiers), technologies and supplied media, and reads as evidence rather than as a report.
- Desktop layouts use the full column; nothing is pinned; reduced motion shows everything.
- The page passes the voice lint (no em or en dashes, no banned phrases), the existing unit and e2e suites, `next build`, and a fresh critique with no P0 or P1 left.
- The served CV is a regenerated one-page AI Engineer CV carrying the Noon work, the new experience wording and the AWS credential.

## Non-goals

- No re-theming. Palette, the three typefaces, the liquid-glass nav, the chat bubble and the "How I work" line stay. The handoff says "preserve the website's existing design"; the critique fixes are executed inside that identity.
- No new chat behaviour beyond new starter questions and an updated persona.
- No public deployment. Whether the new imagery goes public is Yousef's call, so the branch goes to a pull request with a protected preview and stops there.
- No Arabic CV output (English-only since 2026-07-06), though Arabic strings stay in the data and must stay complete.

## Anti-goals (what would make this a failure even if it builds)

- Publishing any handoff note, prompt text, manifest metadata, approval discussion or "how this copy was prepared" on the site.
- Any adoption rate, reach, time-saved, cost-saved or load-test figure. "100%" and "16 days" do not come back. "30M+ visitors" is removed everywhere.
- Calling Yousef a Forward Deployed Engineer at Noon. Title: AI Systems Engineer. Forward deployed: the way of working.
- "Arabic-first" (banned phrase in the lint and in Yousef's voice rules; the handoff's wording is rephrased to "Arabic" or "in Arabic").
- MCIT as "contributor", AI Week as a solo or whole-week claim, Placements as a finished automation, the hackathon artwork or the AI Week banner as his design.
- A generated mockup standing in for a missing screenshot. Projects without supplied media (Citadel to ZenHR, Placements) get typographic treatment, not invented UI.

## Constraints

- Copy rules from `cv/lib/lint.mjs` apply to `content/site.ts`, `content/persona.md`, `README.md`, `app/layout.tsx` and all CV text. The vitest copy test bans em and en dashes in `content/`, `components/`, `app/`.
- Handoff titles that contain an em dash are rewritten: "MCIT × Noon: generative AI learning platform", "AI Week, the boys' session".
- Image captions keep their qualifiers from `asset-manifest.json` ("Product test screenshot", "demonstration data", "Draft curriculum", "co-created and delivered with Talah", "programme artwork").
- No issue date, expiry, credential ID or verification link for the AWS credential. Designation "Early Adopter" is displayed separately from the name. Description text is the one supplied.
- Employer name on the site: "Noon Academy" (the handoff's and LinkedIn's form), with the logo unchanged.
- The CV generator stays zero-dependency; one page per role is the target, two is the hard ceiling in the tests.

## Decisions

### Content mapping

| Source | Destination |
|---|---|
| `profile.description` (full) | Noon chapter intro; last sentence becomes the chapter closer |
| Addendum framing line | kept, under the meta line, in italic |
| Five `projects[]` | `siteContent.noon.projects`, in order: training portal, Citadel to ZenHR, MCIT, AI Week, School Staff Placements |
| `metrics[].context` | rendered as the small line under each figure, verbatim |
| `asset-manifest.json` alt/caption | `media[]` on each project, files at `public/media/noon/<id>.<ext>` |
| Hackathon beat (already live) | kept after the projects as "Also at Noon" |
| Consultant, Shaguf, YAX descriptions | the three quoted paragraphs, verbatim, in the Projects row, Teaching chapter and Before AI chapter |
| AWS credential | `credentials.featured[]` entry with `designation: "Early Adopter"`, `year: null`, badge at `public/media/cert-aws-ai-business-strategist.png` |
| Experience highlights, `additionalWork` | not rendered (alternatives, not additions) |

### Chapter design

- **Chapter head cadence**: display title plus one plain sentence in stone. The tracked uppercase eyebrows are deleted everywhere. Mono survives only in technology lists and the four Method ordinals.
- **Hero**: solid gold name (no gradient), the two-clause role line, tagline, three badges, then a primary "Download CV" button and an "Email me" link. The scroll cue is a thin gold line.
- **Noon**: head row (logo, title, meta on the left; framing and intro on the right), then five project articles separated by hairlines. Each article: sticky left column (title, status label, role line, technology list), right column (description, "What I did", outcomes and figures), media across the row. Media treatments: training portal wide image; Citadel to ZenHR a CSS figure of the ownership split with the "held for review" lane; MCIT a horizontal scroll-snap strip of all ten screens at a fixed height; AI Week two slides stacked beside the tall artwork; Placements text only. Then "Also at Noon" and the closer.
- **Teaching**: text left with the stat band, photos in a 7+5 grid (SDA presenting large, the two Shaguf photos stacked).
- **Projects** (was "Selected work"): three ruled rows, logo or mark on the left, kicker sentence, paragraph, one text link. No cards, no horizontal pin.
- **Before AI**: the two-sentence description left, a vertical pull figure right (1,500 staff / 45 stations / 1 month), the bridge line unchanged.
- **Credentials**: Apple lead row, then a four-up grid (SDA, CDMP, AWS, McKinsey) with designation and note slots, then an "Also completed" sentence.
- **Footer**: "Let's talk." in display type, one sentence, Email as a button, LinkedIn, GitHub and Download CV as links.
- **Motion**: Noon and Work pins removed; YAX bounce removed; image frames reveal with a slight scale-down; leads fade once; the Method draw and the hero sequence stay.

### CV

- `cv/data/master.json`: Noon entry gets five bullets (training portal, Citadel to ZenHR, MCIT, AI Week, Placements) with Arabic; consultant bullets reworded to the supplied descriptions; YAX loses "30 million"; AWS added to `certs` with an empty year; `render.mjs` omits an empty year.
- `cv/roles/ai_engineer.json`: new summary leading with the Noon work; no certificate names.
- Served file: `public/cv/Yousef-Alshuwayi-AI-Engineer.pdf`; `vercel.json` redirects the two old filenames to it; the Forward Deployed PDF leaves `public/cv/`.

## Left to the builder

Exact Tailwind classes, the reveal timings inside the ranges in `DESIGN.md`, the status label palette inside the Noon chapter (noon green for live, stone for initial build), and the Arabic wording of the new CV bullets.

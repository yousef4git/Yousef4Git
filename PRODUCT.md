# Product

## Register

brand

## Users

Hiring managers, engineering leads and founders in Saudi Arabia and the GCC who open the site from a CV, LinkedIn or a referral, usually on a phone or a laptop, with a few minutes to decide whether to reply. A second group is collaborators and former students who already know Yousef and want the current picture.

The job to be done: in under a minute, understand what Yousef does (AI systems engineer, founder of Rusokh, educator, currently at Noon Academy), see proof that he ships real systems that people adopt, and get to the CV, the email or the chat.

## Product Purpose

youusef.com is Yousef Alshuwayi's portfolio. It exists to turn a cold open into a conversation. Success is a visitor who downloads the CV, writes an email or asks the chat something after reading Selected work.

The site leads with Yousef as an AI systems engineer, founder and educator, with the two professional certifications (AWS Certified AI Business Strategist, Early Adopter; CDMP, Associate) in the hero. The job title stays exact (AI Systems Engineer at Noon Academy) as a fact on the page; forward deployed is named once, in How I work, as the way of working, and is never claimed as a title.

## Languages

English is the default at `/`; Arabic is the same single page at `/ar`, right to left, with the copy the October 2026 editorial review approved (`content/site.ar.ts`). Official credential names, tool names and URLs stay in English inside the Arabic. Each page links to the other from the nav and through `hreflang`; the chat answers in the visitor's language. The CV stays the English PDF on both pages.

## Brand Personality

Plain, humble, exact. Three words: grounded, warm, precise.

The voice is first person and concrete. Every claim stands on its own evidence (adoption, handover, dates, counts) and never on a comparison with other people. Numbers carry their context ("in the documented go-live run", "of 365 respondents"). No em dashes. No marketing phrases. Nothing is made bigger than it is.

Emotionally the page should feel like meeting a calm engineer who has done the work and does not need to oversell it: confident without volume.

## Anti-references

- The hero-metric SaaS template: a big number, a small label, a gradient accent, identical cards in a grid.
- The generic dark "AI engineer" portfolio: neon accents, glassmorphism everywhere, monospace on everything, a tracked uppercase eyebrow above every section.
- Inflated resume copy: stacked founder titles, "shipped solo in 3 weeks", "Arabic-first", "100% adoption" claims without context.
- Anything that needs a villain to work ("unlike most engineers", "not demos").
- Any copy that implies "Forward Deployed Engineer at Noon" as a job title.
- A page that reads as the employer's project report: four full case studies before the founder work appears.

## Design Principles

1. **Evidence over adjectives.** Show the thing: real screens, real photos, real counts with their qualifiers. Cut any sentence that only describes a quality.
2. **Every number keeps its organisation.** Shaguf figures stay Shaguf's, YAX figures stay YAX's, GHRS results stay one workflow's, and each Noon case is attributed to Noon Academy. The employer is a chapter, not the identity.
3. **One memorable move per chapter.** The "How I work" line that draws through four stations, the MCIT screen strip, the AI Week artwork. Everything around the move stays quiet.
4. **Honest hierarchy.** Title in gold, way of working in stone. Status labels say "initial build" when that is what it is.
5. **Leave one question open.** Each chapter stops before the full inventory so the interview has somewhere to go. Full cases sit behind one native disclosure each, open to keyboards, screen readers and old links.

## Accessibility & Inclusion

WCAG 2.2 AA as the floor: body text at 4.5:1 or better on the dark surfaces, visible focus on every link and control, reduced motion honoured on every animation (content is readable with motion off), captions and alt text on every image, no content gated behind scroll hijacking. Arabic-language screenshots carry English captions. The chat degrades to plain contact links when the API is unavailable.

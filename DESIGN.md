# Design

Visual system for youusef.com (Next.js 16, Tailwind 4, GSAP). Source of truth for tokens: `app/globals.css` (`@theme`) and `app/layout.tsx` (fonts).

## Overview

A dark, warm, gold-on-night portfolio that reads like a quiet film: one long page of chapters, hairline rules instead of cards, real photographs and screens as the imagery, one motion signature per chapter. Strategy: restrained palette with one committed accent (gold) and one chapter-local accent (Noon green).

## Colors

| Token | Hex | Role |
|---|---|---|
| `night` | `#100E0B` | Page background |
| `coal` | `#161311` | Alternate chapter surface, stat cells, panels |
| `gold` | `#C9A96E` | Accent: display name, links, rules, active nav |
| `gold-bright` | `#E8D5A4` | Hover state for gold, highlights |
| `bone` | `#EFE9DE` | Headings and primary text |
| `stone` | `#A39B8B` | Body copy and secondary text (7:1 on night, 6.7:1 on coal) |
| `noon` | `#17D9A3` | Accent used only inside the Noon chapter |

Rules: gold never carries body copy. Stone is the body colour; bone is for headings, leads and closers. Borders are `bone/10` or `gold/20`. No gradients on text.

## Typography

- **Display**: Cormorant Garamond (300 to 600). Chapter titles, leads, closers, the name. `text-wrap: balance` on headings. Lining, tabular numerals when numbers sit in a row.
- **Body**: Inter. Paragraphs, meta lines, nav, captions, buttons.
- **Mono**: JetBrains Mono. Only for technology lists and the four-step ordinals, never as a decorative label font.

Scale (desktop): title 60px, lead 30px, closer 30px, body 17px, meta 13px, caption 12px. Mobile: title 36px, lead 24px.

Chapter head cadence: a display title followed by one plain-language sentence in stone. No tracked uppercase eyebrows.

## Layout

- Container `max-w-6xl` with a 24px gutter. Chapters alternate `night` and `coal`.
- Two-column editorial grid on desktop (`md:grid-cols-12`): a sticky left column for the chapter head or a project's title and status, a right column for the copy, media below spanning the row. Single column under 768px.
- Rhythm: `py-24` to `py-32` between chapters, `py-16` between projects inside a chapter, hairline rules (`border-t border-bone/10`) between list items.
- Images sit in `rounded-lg` frames with a `bone/10` border and a deep soft shadow. Screens of different ratios use fixed-height, natural-width frames in a horizontal scroll-snap strip.

## Components

- **Nav**: a fixed liquid-glass pill, mark on the left, seven text links, active state `bg-gold/15 text-gold-bright`, a 1px gold progress line at the top of the viewport.
- **ChapterHead**: title plus one-sentence subtitle plus a 64px gold hairline.
- **StatBand**: a `dl` of coal cells separated by a 1px tinted gap; display numerals, Inter labels.
- **Project block (Noon)**: title, status label, role line, tech list on the left; description, "What I did", outcomes on the right; media below.
- **Work row**: logo, kicker line, one paragraph, one text link. Hairline between rows.
- **Credential card**: image, name, designation (gold), issuer and year, one-line note.
- **Chat bubble**: liquid-glass round button bottom right, panel with starters, degrades to contact links.
- **Buttons**: primary `bg-gold text-night rounded-full`; secondary is a gold text link with an underline on hover.

## Motion

GSAP with `gsap.matchMedia()`. Every tween lives under `(prefers-reduced-motion: no-preference)`; with reduced motion, content is simply visible.

- Hero: one orchestrated entrance (frame, name characters, meta, role, tagline, badges, CTAs).
- How I work: a hairline that draws through four stations on scroll, then runs past the last one and fades.
- Images: reveal by fading in with a slight scale-down inside their frame; teaching photos drift gently on scroll.
- Leads and closers: a single fade-up. Lists stagger once. No bounce or elastic eases. No pinned sections.

Eases: `power3.out` for reveals, `power2.inOut` for drifts, `none` for scrubbed draws.

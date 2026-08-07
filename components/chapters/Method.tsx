"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

// The deployment line: a hairline rule (the closer mark used by the Noon and
// YAX chapters) grown into this section's spine. It draws through the four
// stations on scroll, then runs past the last one and fades, which is the
// handover claim made in the layout instead of asserted twice in the copy.
// Horizontal above md, vertical below: two elements, one per direction, so
// each gets an honest transform origin instead of a rotated compromise.
// The fade starts past the fourth station (which sits at 75%), never before it:
// the line has to reach "Hand over" and then keep going, or the last station
// reads as a rendering fault rather than as the point.
const TRACK_FADE_X = "[mask-image:linear-gradient(to_right,black_80%,transparent)]";
const TRACK_FADE_Y = "[mask-image:linear-gradient(to_bottom,black_80%,transparent)]";

export default function Method() {
  const container = useRef<HTMLElement>(null);
  const { method } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Scrubbed draw, one axis per breakpoint. The four stations sit at 0%,
      // 25%, 50% and 75% of the track, so a 1s line against 0.25s-staggered
      // stations lights each one exactly as the line reaches it. The range is
      // viewport-relative rather than element-relative: the track is a single
      // short row on desktop, and its own height gives too little scroll for
      // the draw to read as a draw.
      const draw = (line: string, axis: "scaleX" | "scaleY") => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "[data-method-track]",
              start: "top 95%",
              end: "top 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(line, { [axis]: 0 }, { [axis]: 1, duration: 1, ease: "none" }, 0)
          .from(
            "[data-method-dot]",
            { scale: 0, duration: 0.2, stagger: 0.25, ease: EASE.snap },
            0
          )
          .from(
            "[data-method-ordinal]",
            { color: "#a39b8b", duration: 0.2, stagger: 0.25, ease: "none" },
            0
          );
      };

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () =>
        draw("[data-method-line-x]", "scaleX")
      );
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () =>
        draw("[data-method-line-y]", "scaleY")
      );

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-method-lead]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-method-lead]", start: "top 85%" },
        });
        gsap.from("[data-method-closer]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-method-closer]", start: "top 88%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="method"
      data-chapter="method"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={method.title} note={method.note} />
        <div className="px-6">
          <p
            data-method-lead
            className="mt-10 max-w-2xl font-display text-2xl text-bone md:text-3xl"
          >
            {method.lead}
          </p>

          <div data-method-track className="relative mt-16 md:mt-20">
            {/* Horizontal spine, md and up. Sits on the dot row's centre. */}
            <div
              aria-hidden
              className={`pointer-events-none absolute left-0 top-1 hidden h-px w-full md:block ${TRACK_FADE_X}`}
            >
              <div className="h-full w-full bg-bone/10" />
              <div
                data-method-line-x
                className="absolute inset-0 origin-left bg-gold/60"
              />
            </div>
            {/* Vertical spine, below md. Runs down the left gutter. */}
            <div
              aria-hidden
              className={`pointer-events-none absolute bottom-0 left-1 top-1 w-px md:hidden ${TRACK_FADE_Y}`}
            >
              <div className="h-full w-full bg-bone/10" />
              <div
                data-method-line-y
                className="absolute inset-0 origin-top bg-gold/60"
              />
            </div>

            <ol className="grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-x-8">
              {method.steps.map((s, i) => (
                <li key={s.name} className="relative pl-8 md:pl-0">
                  <span
                    data-method-dot
                    aria-hidden
                    className="absolute left-0 top-0 block h-2 w-2 -translate-y-1/2 rounded-full bg-gold md:relative md:translate-y-0"
                  />
                  <p
                    data-method-ordinal
                    className="mt-5 font-mono text-xs tracking-[0.2em] text-gold md:mt-6"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-bone">{s.name}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone">
                    {s.line}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden className="mt-16 h-px w-16 bg-gold/40" />
          <p
            data-method-closer
            className="mt-6 max-w-2xl font-display text-2xl text-bone md:text-3xl"
          >
            {method.closer}
          </p>
        </div>
      </div>
    </section>
  );
}

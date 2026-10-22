"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";
import Mark from "@/components/Mark";

const LINK =
  "mt-4 inline-block text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline";

// Three pieces of work as three ruled rows: a logo, a name, one paragraph and
// one link. Rows, not cards, because the three are not peers of the same kind
// and should not be dressed as if they were.
export default function Work() {
  const container = useRef<HTMLElement>(null);
  const { work, workSection } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-work-row]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-work-list]", start: "top 82%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="work" data-chapter="work" className="bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={workSection.title} lead={workSection.lead} />
        <ul data-work-list className="mt-12 px-6">
          {work.map((w) => (
            <li
              key={w.id}
              data-work-row
              className="grid grid-cols-[3.5rem_1fr] gap-x-5 gap-y-4 border-t border-bone/10 py-8 md:grid-cols-12 md:gap-x-8 md:py-10"
            >
              <div className="md:col-span-1">
                {w.logo ? (
                  <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-bone p-1.5">
                    <Image
                      src={w.logo}
                      alt={w.logoAlt ?? ""}
                      width={112}
                      height={112}
                      className="h-full w-full object-contain"
                    />
                  </span>
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/25 bg-night">
                    <Mark className="h-8 w-8" />
                  </span>
                )}
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl leading-tight text-bone md:text-3xl">{w.title}</h3>
                <p className="mt-1.5 text-sm text-bone/80">{w.kicker}</p>
                {w.meta && <p className="mt-0.5 text-sm text-stone">{w.meta}</p>}
              </div>
              <div className="col-span-2 md:col-span-7">
                <p className="max-w-prose leading-relaxed text-stone">{w.line}</p>
                {w.href ? (
                  <a href={w.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {w.cta}
                  </a>
                ) : w.action === "open-chat" ? (
                  // The chat lives in a sibling component, so the row asks for
                  // it by event rather than lifting the panel's state to the page.
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("ya:open-chat"))}
                    className={LINK}
                  >
                    {w.cta}
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

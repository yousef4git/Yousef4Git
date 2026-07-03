"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/content/site";

export default function Work() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const track = container.current!.querySelector<HTMLElement>("[data-work-track]")!;
        const shift = () => -(track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: shift,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 40,
            scrollTrigger: { trigger: card, start: "top 80%" },
          });
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="work" data-chapter="work" className="min-h-screen overflow-hidden py-24">
      <h2 className="px-6 font-display text-4xl text-gold md:text-5xl">Selected work</h2>
      <div data-work-track className="mt-12 flex flex-col gap-8 px-6 md:w-max md:flex-row md:flex-nowrap md:pr-[40vw]">
        {siteContent.work.map((w) => (
          <article key={w.no} data-work-card className="w-full max-w-md shrink-0 rounded-lg border border-gold/20 bg-coal p-8 md:w-[32rem] md:max-w-none">
            <div className="flex justify-between font-mono text-xs text-stone">
              <span>{w.no}</span>
              <span>{w.kicker}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl text-bone">{w.title}</h3>
            <p className="mt-3 text-stone">{w.line}</p>
            {w.href && (
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-mono text-sm text-gold hover:text-gold-bright">
                {w.cta} →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

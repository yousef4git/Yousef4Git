"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";

export default function Yax() {
  const container = useRef<HTMLElement>(null);
  const { yax } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-yax-head]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: container.current, start: "top 75%" },
        });
        gsap.from("[data-yax-logo]", {
          scale: 0.5,
          rotation: -10,
          duration: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: container.current, start: "top 75%" },
        });
        gsap.to("[data-yax-spine]", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-yax-roles]",
            start: "top 80%",
            end: "bottom 65%",
            scrub: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-yax-role]").forEach((row) => {
          gsap.fromTo(
            row,
            { autoAlpha: 0, x: -32 },
            {
              autoAlpha: 1,
              x: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: row, start: "top 85%", end: "top 55%", scrub: 1 },
            }
          );
        });
        gsap.from("[data-yax-highlight]", {
          autoAlpha: 0,
          y: 28,
          stagger: 0.12,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-highlights]", start: "top 85%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="yax" data-chapter="yax" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#f05e22]/5 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-6">
        <div data-yax-head className="flex flex-wrap items-center gap-5">
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
          <div>
            <h2 className="font-display text-3xl text-bone md:text-4xl">{yax.company}</h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-stone">
              {yax.meta}
            </p>
          </div>
          <p className="w-full max-w-xl text-stone md:mt-2">{yax.intro}</p>
        </div>

        <ol data-yax-roles className="relative mt-14 space-y-12 border-l border-gold/10 pl-8">
          <span
            aria-hidden
            data-yax-spine
            className="absolute -left-px top-0 h-full w-px origin-top scale-y-0 bg-gold/50"
          />
          {yax.roles.map((r) => (
            <li key={r.title} data-yax-role className="relative">
              <span aria-hidden className="absolute -left-9 top-2 h-2 w-2 rounded-full bg-gold" />
              <p className="font-mono text-xs text-stone">{r.dates}</p>
              <h3 className="mt-2 font-display text-2xl text-bone md:text-3xl">{r.title}</h3>
              <p className="mt-2 max-w-2xl text-stone">{r.line}</p>
            </li>
          ))}
        </ol>

        <div data-yax-highlights className="mt-16 grid gap-4 md:grid-cols-3">
          {yax.highlights.map((h, i) => (
            <p
              key={h}
              data-yax-highlight
              className="rounded-lg border border-gold/10 bg-coal p-5 text-sm text-stone"
            >
              <span aria-hidden className="mr-2 font-mono text-xs text-gold">
                ·0{i + 1}
              </span>
              {h}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

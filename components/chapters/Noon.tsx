"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import StatBand from "@/components/StatBand";

export default function Noon() {
  const container = useRef<HTMLElement>(null);
  const { noon } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The pin holds only the opening beat. Short viewports skip it: the
      // opening copy needs roughly 700px to sit without clipping.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 700px)",
        () => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "[data-noon-stage]",
                start: "top top",
                end: "+=110%",
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
              },
              defaults: { ease: EASE.drift },
            })
            .from("[data-noon-kicker]", { autoAlpha: 0, y: 30 })
            .from("[data-noon-logo]", { autoAlpha: 0, scale: 0.85 })
            .from("[data-noon-meta]", { autoAlpha: 0, y: 16 })
            .from("[data-noon-line]", { autoAlpha: 0, y: 40, stagger: 0.3 })
            .from("[data-noon-landing]", { autoAlpha: 0, y: 40 })
            .to("[data-noon-depth]", { yPercent: -12 }, 0);
        }
      );
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-noon-bullet]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-bullets]", start: "top 85%" },
        });
        gsap.from("[data-noon-portal-label], [data-noon-portal-photo]", {
          autoAlpha: 0,
          y: 32,
          stagger: 0.12,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-portal]", start: "top 85%" },
        });
        gsap.from("[data-noon-also]", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.12,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-hackathon]", start: "top 85%" },
        });
        gsap.from("[data-noon-photo]", {
          autoAlpha: 0,
          y: 36,
          stagger: 0.14,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-photos]", start: "top 88%" },
        });
        gsap.from("[data-noon-closer]", {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-closer]", start: "top 88%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="noon" data-chapter="noon" className="relative bg-coal">
      <div
        data-noon-stage
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        <div
          data-noon-depth
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-noon/5 blur-3xl"
        />
        <div className="mx-auto w-full max-w-3xl px-6 py-24">
          <h2
            data-noon-kicker
            className="font-mono text-xs uppercase tracking-[0.3em] text-noon"
          >
            {noon.kicker}
          </h2>
          <a
            data-noon-logo
            href={noon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-40"
          >
            <Image src={noon.logo} alt="noon" width={288} height={64} />
          </a>
          <p data-noon-meta className="mt-4 font-mono text-xs text-stone">
            {noon.meta}
          </p>
          {/* Names the model before the evidence, so the story below reads as
              proof rather than as one more project write-up. */}
          <p
            data-noon-meta
            className="mt-4 max-w-2xl border-t border-noon/20 pt-4 text-sm italic text-stone"
          >
            {noon.framing}
          </p>
          <p data-noon-line className="mt-10 max-w-2xl text-lg text-stone">
            {noon.lead}
          </p>
          <p data-noon-line className="mt-5 max-w-2xl text-lg text-stone">
            {noon.promise}
          </p>
          <p
            data-noon-landing
            className="mt-10 font-display text-3xl text-bone md:text-4xl"
          >
            {noon.landing}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24 md:pb-32">
        <StatBand stats={noon.stats} tone="noon" />
        <ul data-noon-bullets className="mt-14 space-y-5">
          {noon.bullets.map((b) => (
            <li key={b} data-noon-bullet className="relative max-w-2xl pl-6 text-stone">
              <span
                aria-hidden
                className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-noon"
              />
              {b}
            </li>
          ))}
        </ul>
        {/* Direct evidence for the adoption stat: the portal in real use. */}
        <div data-noon-portal className="mt-16">
          <p
            data-noon-portal-label
            className="font-mono text-xs uppercase tracking-[0.2em] text-noon"
          >
            {noon.portal.label}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {noon.portal.photos.map((p) => (
              <figure key={p.src} data-noon-portal-photo>
                <div className="overflow-hidden rounded-lg border border-bone/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs text-stone">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        {/* Second beat: the ministry-level programme, kept to one paragraph
            and two photographs so it supports the portal without competing. */}
        <div data-noon-hackathon className="mt-16">
          <p
            data-noon-also
            className="font-mono text-xs uppercase tracking-[0.2em] text-noon"
          >
            {noon.hackathon.label}
          </p>
          <p data-noon-also className="mt-4 max-w-2xl text-stone">
            {noon.hackathon.line}
          </p>
          <div data-noon-photos className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {noon.hackathon.photos.map((p) => (
              <figure key={p.src} data-noon-photo>
                <div className="overflow-hidden rounded-lg border border-bone/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    className="w-full"
                    sizes="(max-width: 640px) 100vw, 45vw"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs text-stone">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div aria-hidden className="mt-16 h-px w-16 bg-noon/40" />
        <p
          data-noon-closer
          className="mt-6 max-w-2xl font-display text-2xl text-bone md:text-3xl"
        >
          {noon.closer}
        </p>
      </div>
    </section>
  );
}

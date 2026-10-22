"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

export default function Yax() {
  const container = useRef<HTMLElement>(null);
  const { yax } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-yax-line], [data-yax-head]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.15,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-body]", start: "top 82%" },
        });
        gsap.from("[data-yax-figure]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-figures]", start: "top 85%" },
        });
        gsap.from("[data-yax-bridge]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-bridge]", start: "top 88%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="yax"
      data-chapter="yax"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#f05e22]/5 blur-3xl"
      />
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={yax.title} lead={yax.lead} />
        <div className="mt-12 grid grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-x-8">
          <div data-yax-body className="md:col-span-7">
            <div data-yax-head className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-bone/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
                <Image
                  src={yax.logo}
                  alt="YAX"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm text-stone">YAX, Your Amazing Xperience</p>
            </div>
            <div className="mt-8 max-w-2xl space-y-5">
              {yax.lines.map((l) => (
                <p key={l} data-yax-line className="text-lg leading-relaxed text-bone/90">
                  {l}
                </p>
              ))}
            </div>
            <div aria-hidden className="mt-14 h-px w-16 bg-gold/40" />
            <p
              data-yax-bridge
              className="mt-6 max-w-2xl font-display text-2xl text-bone md:text-3xl"
            >
              {yax.bridge}
            </p>
          </div>
          <dl data-yax-figures className="space-y-6 md:col-span-4 md:col-start-9">
            {yax.figure.map((f) => (
              <div key={f.label} data-yax-figure className="border-t border-bone/10 pt-4">
                <dd className="flex items-baseline gap-2 font-display text-5xl leading-none tabular-nums lining-nums text-bone">
                  {f.value}
                  {"unit" in f && f.unit && <span className="text-lg text-gold">{f.unit}</span>}
                </dd>
                <dt className="mt-2 text-sm text-stone">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

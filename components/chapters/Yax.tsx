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
        gsap.from("[data-yax-logo]", {
          scale: 0.5,
          rotation: -10,
          duration: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: "[data-yax-head]", start: "top 80%" },
        });
        gsap.from("[data-yax-line]", {
          autoAlpha: 0,
          y: 28,
          stagger: 0.15,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-body]", start: "top 82%" },
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
        <ChapterHead title={yax.title} note={yax.note} />
        <div className="mt-10 px-6">
          <div data-yax-head className="flex items-center gap-5">
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
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
              {yax.meta}
            </p>
          </div>
          <div data-yax-body className="mt-10 max-w-2xl space-y-5">
            {yax.lines.map((l) => (
              <p key={l} data-yax-line className="text-stone">
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
      </div>
    </section>
  );
}

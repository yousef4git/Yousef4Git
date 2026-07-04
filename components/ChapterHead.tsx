"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

export default function ChapterHead({ title, note }: { title: string; note?: string }) {
  const head = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create("[data-head-title]", { type: "words" });
        gsap
          .timeline({
            defaults: { ease: EASE.cinematic },
            scrollTrigger: { trigger: head.current, start: "top 85%" },
          })
          .from("[data-head-note]", { autoAlpha: 0, y: 16, duration: 0.6 })
          .from(
            split.words,
            { yPercent: 110, autoAlpha: 0, stagger: 0.08, duration: 0.9 },
            "-=0.3"
          )
          .from("[data-head-rule]", { scaleX: 0, transformOrigin: "left", duration: 0.7 }, "-=0.5");
        return () => split.revert();
      });
    },
    { scope: head }
  );

  return (
    <header ref={head} data-chapter-head className="px-6">
      {note && (
        <p data-head-note className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          {note}
        </p>
      )}
      <h2 data-head-title className="mt-4 font-display text-4xl text-bone md:text-6xl">
        {title}
      </h2>
      <div aria-hidden data-head-rule className="mt-6 h-px w-16 bg-gold/40" />
    </header>
  );
}

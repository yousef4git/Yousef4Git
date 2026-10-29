"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

// A chapter opens with its title and one plain sentence. The sentence does
// the job a tracked eyebrow used to pretend to do: it says what the chapter
// is, in words a visitor would use.
export default function ChapterHead({ title, lead }: { title: string; lead?: string }) {
  const head = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create("[data-head-title]", { type: "words" });
        const tl = gsap
          .timeline({
            defaults: { ease: EASE.cinematic },
            scrollTrigger: { trigger: head.current, start: "top 85%" },
          })
          .from(split.words, { yPercent: 110, autoAlpha: 0, stagger: 0.08, duration: 0.9 })
          .from("[data-head-rule]", { scaleX: 0, transformOrigin: "left", duration: 0.7 }, "-=0.5");
        // Chapters without a lead sentence (How I work, Experience) skip the
        // third beat instead of tweening a target that is not there.
        if (head.current?.querySelector("[data-head-lead]")) {
          tl.from("[data-head-lead]", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.4");
        }
        return () => split.revert();
      });
    },
    { scope: head }
  );

  return (
    <header ref={head} data-chapter-head className="px-6">
      <h2
        data-head-title
        className="font-display text-4xl leading-none text-bone [text-wrap:balance] md:text-6xl"
      >
        {title}
      </h2>
      <div aria-hidden data-head-rule className="mt-6 h-px w-16 bg-gold/40" />
      {lead && (
        <p data-head-lead className="mt-5 max-w-xl text-base text-stone md:text-lg">
          {lead}
        </p>
      )}
    </header>
  );
}

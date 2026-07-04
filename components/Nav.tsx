"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/content/site";

export default function Nav() {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap}>
      <div
        data-progress
        aria-hidden
        className="fixed left-0 top-0 z-50 h-px w-full origin-left scale-x-0 bg-gold/70"
      />
      <a href="#hero" className="fixed top-6 left-6 z-50 font-display text-2xl text-gold" aria-label="YA, back to top">
        YA
      </a>
      <nav aria-label="Chapters" className="fixed right-5 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col gap-1">
        {siteContent.chapters.map((c) => (
          <a
            key={c}
            href={`#${c}`}
            aria-label={c}
            className="group flex h-6 w-6 items-center justify-center"
          >
            <span aria-hidden className="block h-2 w-2 rounded-full bg-stone/40 transition-colors group-hover:bg-gold" />
          </a>
        ))}
      </nav>
    </div>
  );
}

"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

export type Stat = { value: string; unit?: string; label: string };

// Hairline separators come from a 1px parent gap showing through between
// coal-filled cells, so the band reads as ruled type rather than as cards.
export default function StatBand({
  stats,
  tone = "gold",
}: {
  stats: readonly Stat[];
  tone?: "gold" | "noon";
}) {
  const wrap = useRef<HTMLDListElement>(null);
  const rule = tone === "noon" ? "bg-noon/20" : "bg-gold/20";
  const unitTone = tone === "noon" ? "text-noon" : "text-gold";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stat]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: wrap.current, start: "top 85%" },
        });
      });
    },
    { scope: wrap }
  );

  return (
    <dl
      ref={wrap}
      data-stat-band
      className={`grid grid-cols-1 gap-px overflow-hidden rounded-lg sm:grid-cols-3 ${rule}`}
    >
      {stats.map((s) => (
        <div key={s.label} data-stat className="flex flex-col-reverse bg-coal px-5 py-6">
          <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            {s.label}
          </dt>
          {/* Cormorant defaults to old-style figures, so "1,800" renders with
              the 1 at x-height and the 8 ascending, and "4.9" drops below the
              baseline. Lining evens the heights; tabular keeps the three cells
              optically aligned. */}
          <dd className="flex items-baseline gap-1 font-display text-4xl leading-none tabular-nums lining-nums text-bone md:text-5xl">
            {s.value}
            {s.unit && <span className={`font-mono text-base ${unitTone}`}>{s.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

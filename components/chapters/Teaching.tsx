"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";
import StatBand from "@/components/StatBand";

const PLACEMENT = [
  "md:col-span-8 md:col-start-1",
  "md:col-span-6 md:col-start-7 md:mt-24",
  "md:col-span-7 md:col-start-3 md:mt-6",
];

const SIZES = [
  "(max-width: 768px) 100vw, 60vw",
  "(max-width: 768px) 100vw, 45vw",
  "(max-width: 768px) 100vw, 52vw",
];

export default function Teaching() {
  const container = useRef<HTMLElement>(null);
  const { teaching } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-teach-line]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.15,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-teach-copy]", start: "top 82%" },
        });
        gsap.utils.toArray<HTMLElement>("[data-stage-photo]").forEach((fig) => {
          gsap.fromTo(
            fig,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: fig, start: "top 88%", end: "top 45%", scrub: 1 },
            }
          );
          // Slow drift inside the cropped frame for depth; the constant
          // overscale keeps edges covered through the plus/minus 6% travel.
          const img = fig.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -6, scale: 1.12 },
              {
                yPercent: 6,
                scale: 1.12,
                ease: "none",
                scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          }
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="teaching"
      data-chapter="teaching"
      className="bg-coal py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={teaching.title} note={teaching.note} />
        <div data-teach-copy className="mt-10 px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
            {teaching.meta}
          </p>
          <div className="mt-8 max-w-2xl space-y-5">
            {teaching.lines.map((l) => (
              <p key={l} data-teach-line className="text-stone">
                {l}
              </p>
            ))}
          </div>
          <div className="mt-14 max-w-3xl">
            <StatBand stats={teaching.stats} />
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {teaching.gallery.map((s, i) => (
            <figure key={s.src} data-stage-photo className={PLACEMENT[i]}>
              <div className="overflow-hidden rounded-lg border border-gold/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  className="w-full"
                  sizes={SIZES[i]}
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-stone">
                <span aria-hidden className="mr-2 text-gold">
                  ·0{i + 1}
                </span>
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

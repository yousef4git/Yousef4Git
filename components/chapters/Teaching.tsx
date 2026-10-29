"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { useContent } from "@/components/LocaleProvider";
import ChapterHead from "@/components/ChapterHead";
import StatBand from "@/components/StatBand";

const SIZES = [
  "(max-width: 768px) 100vw, 660px",
  "(max-width: 640px) 100vw, 320px",
  "(max-width: 640px) 100vw, 320px",
];

export default function Teaching() {
  const container = useRef<HTMLElement>(null);
  const { teaching } = useContent();
  const [stage, ...rest] = teaching.gallery;

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
          gsap.from(fig, {
            autoAlpha: 0,
            scale: 1.03,
            duration: 0.9,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: fig, start: "top 88%" },
          });
          // Slow drift inside the cropped frame for depth; the constant
          // overscale keeps edges covered through the plus/minus 4% travel.
          const img = fig.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -4, scale: 1.08 },
              {
                yPercent: 4,
                scale: 1.08,
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
    <section ref={container} id="teaching" data-chapter="teaching" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={teaching.title} lead={teaching.lead} />
        <div className="mt-12 grid grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-x-8">
          <div data-teach-copy className="md:col-span-5">
            <div className="space-y-5">
              {teaching.lines.map((l, i) => (
                <p
                  key={l}
                  data-teach-line
                  className={i === 0 ? "text-lg leading-relaxed text-bone/90" : "text-stone"}
                >
                  {l}
                </p>
              ))}
            </div>
            <div className="mt-10">
              <StatBand stats={teaching.stats} layout="stack" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:col-span-7">
            <figure data-stage-photo>
              <div className="overflow-hidden rounded-lg border border-gold/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <Image
                  src={stage.src}
                  alt={stage.alt}
                  width={stage.width}
                  height={stage.height}
                  className="aspect-[4/3] w-full object-cover"
                  sizes={SIZES[0]}
                />
              </div>
              <figcaption className="mt-3 text-xs text-stone">{stage.caption}</figcaption>
            </figure>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {rest.map((s, i) => (
                <figure key={s.src} data-stage-photo>
                  <div className="overflow-hidden rounded-lg border border-gold/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={s.width}
                      height={s.height}
                      className="aspect-[16/9] w-full object-cover"
                      sizes={SIZES[i + 1]}
                    />
                  </div>
                  <figcaption className="mt-3 text-xs text-stone">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

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

export default function Stage() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="stage" data-chapter="stage" className="bg-coal py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <ChapterHead no="04" title="On stage" note="Teaching and speaking" />
        <div className="mt-16 grid grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {siteContent.stage.map((s, i) => (
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

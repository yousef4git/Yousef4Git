"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/content/site";

export default function Stage() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-stage-photo]").forEach((fig) => {
          gsap.fromTo(
            fig,
            { autoAlpha: 0, scale: 1.06 },
            {
              autoAlpha: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: fig, start: "top 85%", end: "top 35%", scrub: 1 },
            }
          );
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="stage" data-chapter="stage" className="min-h-screen bg-coal py-24">
      <h2 className="px-6 font-display text-4xl text-gold md:text-5xl">On stage</h2>
      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-24 px-6">
        {siteContent.stage.map((s) => (
          <figure key={s.src} data-stage-photo>
            <Image src={s.src} alt={s.alt} width={1600} height={1067} className="rounded-lg" sizes="(max-width: 1024px) 100vw, 1024px" />
            <figcaption className="mt-3 font-mono text-sm text-stone">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

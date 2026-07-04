"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";

export default function Noon() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: "+=120%",
              scrub: 1,
              pin: true,
            },
            defaults: { ease: EASE.drift },
          })
          .from("[data-noon-kicker]", { autoAlpha: 0, y: 30 })
          .from("[data-noon-logo]", { autoAlpha: 0, scale: 0.85 })
          .from("[data-noon-line]", { autoAlpha: 0, y: 40, stagger: 0.3 })
          .to("[data-noon-depth]", { yPercent: -12 }, 0);
      });
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
        gsap.from("[data-noon-line]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.2,
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="noon" data-chapter="noon" className="relative flex min-h-screen items-center overflow-hidden bg-coal">
      <div data-noon-depth aria-hidden className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-noon/5 blur-3xl" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p data-noon-kicker className="font-mono text-xs uppercase tracking-[0.3em] text-noon">
          {siteContent.noon.heading}
        </p>
        <a data-noon-logo href={siteContent.noon.url} target="_blank" rel="noopener noreferrer" className="mt-6 block w-40">
          <Image src={siteContent.noon.logo} alt="noon" width={288} height={64} />
        </a>
        {siteContent.noon.lines.map((line) => (
          <p key={line} data-noon-line className="mt-6 font-display text-3xl text-bone md:text-4xl">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ProjectBlock from "@/components/noon/ProjectBlock";

export default function Noon() {
  const container = useRef<HTMLElement>(null);
  const { noon } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-noon-head] > *", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-head]", start: "top 80%" },
        });
        // The glow drifts against the scroll so the chapter has depth
        // without any element being pinned.
        gsap.to("[data-noon-depth]", {
          yPercent: 40,
          ease: "none",
          scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-noon-project]").forEach((art) => {
          gsap.from(art.querySelectorAll("[data-noon-copy]"), {
            autoAlpha: 0,
            y: 20,
            stagger: 0.12,
            duration: 0.8,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: art, start: "top 78%" },
          });
        });
        // Frames settle into place: a slight scale-down inside the clip, no slide.
        gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame) => {
          gsap.from(frame, {
            autoAlpha: 0,
            scale: 1.03,
            duration: 0.9,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: frame, start: "top 90%" },
          });
        });
        gsap.from("[data-strip]", {
          autoAlpha: 0,
          x: 40,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-strip]", start: "top 88%" },
        });
        gsap.from("[data-noon-also] > *", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.12,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-also]", start: "top 80%" },
        });
        gsap.from("[data-noon-closer]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-noon-closer]", start: "top 88%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="noon" data-chapter="noon" className="relative overflow-hidden bg-coal py-24 md:py-32">
      <div
        data-noon-depth
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-noon/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div data-noon-head className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <a
              href={noon.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Noon Academy website"
              className="block w-36"
            >
              <Image src={noon.logo} alt="Noon" width={288} height={64} />
            </a>
            <h2 className="mt-6 font-display text-4xl leading-none text-bone md:text-6xl">{noon.title}</h2>
            <p className="mt-4 text-sm text-stone">{noon.meta}</p>
          </div>
          <div className="md:col-span-7 md:pt-3">
            <p className="text-sm italic text-stone">{noon.framing}</p>
            <p className="mt-5 text-lg leading-relaxed text-bone/90 md:text-xl">{noon.intro}</p>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          {noon.projects.map((p) => (
            <ProjectBlock key={p.id} project={p} />
          ))}
        </div>

        {/* Second beat: the ministry-level programme, kept to one paragraph
            and two photographs so it supports the projects without competing. */}
        <div
          data-noon-also
          className="grid grid-cols-1 gap-8 border-t border-bone/10 pt-14 md:grid-cols-12 md:gap-x-8 md:pt-20"
        >
          <div className="md:col-span-5">
            <h3 className="font-display text-3xl text-bone">{noon.hackathon.label}</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone">{noon.hackathon.line}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-7">
            {noon.hackathon.photos.map((p) => (
              <figure key={p.src}>
                <div
                  data-frame
                  className="overflow-hidden rounded-lg border border-bone/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    className="w-full"
                    sizes="(max-width: 640px) 100vw, 330px"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-stone">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div aria-hidden className="mt-16 h-px w-16 bg-noon/40" />
        <p
          data-noon-closer
          className="mt-6 max-w-2xl font-display text-2xl text-bone md:text-3xl"
        >
          {noon.closer}
        </p>
      </div>
    </section>
  );
}

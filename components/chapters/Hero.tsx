"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, DUR } from "@/lib/motion";
import { siteContent } from "@/content/site";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create("[data-hero-name]", { type: "chars" });
        gsap.set(container.current, { autoAlpha: 1 });
        gsap
          .timeline({ defaults: { ease: EASE.cinematic } })
          .from(split.chars, { yPercent: 110, autoAlpha: 0, stagger: 0.045, duration: DUR.slow })
          .from("[data-hero-role]", { autoAlpha: 0, y: 24, duration: DUR.base }, "-=0.4")
          .from("[data-hero-tagline]", { autoAlpha: 0, y: 16, duration: DUR.base }, "-=0.5")
          .from("[data-scroll-cue]", { autoAlpha: 0, duration: DUR.base });
        gsap.to("[data-scroll-cue]", { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: EASE.drift });
        return () => split.revert();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(container.current, { autoAlpha: 1 });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      data-chapter="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden opacity-0"
    >
      <video
        data-hero-video
        className="absolute inset-0 h-full w-full object-cover"
        src={siteContent.hero.video}
        poster={siteContent.hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={siteContent.hero.videoAlt}
      />
      <div className="absolute inset-0 bg-night/70 [background-image:radial-gradient(ellipse_at_center,rgba(201,169,110,0.12),transparent_65%)]" />
      <div className="relative z-10 px-6 text-center">
        <h1 data-hero-name className="font-display text-6xl md:text-8xl gold-sheen">
          {siteContent.name}
        </h1>
        <p data-hero-role className="mt-4 font-mono text-sm md:text-base uppercase tracking-widest text-gold">
          {siteContent.role}
        </p>
        <p data-hero-tagline className="mt-2 text-stone">{siteContent.tagline}</p>
      </div>
      <div data-scroll-cue aria-hidden className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold">
        ↓
      </div>
    </section>
  );
}

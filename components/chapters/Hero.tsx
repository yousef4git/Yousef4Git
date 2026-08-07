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
        // Each char carries its own gold-sheen: background-clip on the parent
        // stops painting once transformed char spans create stacking contexts.
        const split = SplitText.create("[data-hero-name]", {
          type: "words,chars",
          charsClass: "gold-sheen",
        });
        gsap.set(container.current, { autoAlpha: 1 });
        gsap
          .timeline({ defaults: { ease: EASE.cinematic } })
          .from("[data-hero-frame]", { autoAlpha: 0, y: 32, duration: DUR.slow })
          .from(
            split.chars,
            { yPercent: 110, autoAlpha: 0, stagger: 0.03, duration: DUR.slow },
            "-=0.7"
          )
          // The kicker moves instead of fading: small text at partial opacity
          // fails the color-contrast audit mid-animation.
          .from(
            "[data-hero-meta]",
            { y: 12, letterSpacing: "0.5em", duration: DUR.base },
            "-=0.8"
          )
          .from("[data-hero-role]", { autoAlpha: 0, y: 24, duration: DUR.base }, "-=0.5")
          .from("[data-hero-tagline]", { autoAlpha: 0, y: 16, duration: DUR.base }, "-=0.5")
          .from(
            "[data-hero-badge]",
            { autoAlpha: 0, y: 14, stagger: 0.08, duration: DUR.base },
            "-=0.5"
          )
          .from("[data-scroll-cue]", { autoAlpha: 0, duration: DUR.base }, "-=0.3");
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
      className="relative flex min-h-screen items-center overflow-hidden opacity-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 hidden h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl md:block"
      />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="relative z-10 text-center md:text-left">
          <p data-hero-meta className="font-mono text-xs uppercase tracking-[0.3em] text-stone">
            {siteContent.hero.location}
          </p>
          <h1
            data-hero-name
            className="mt-5 font-display text-5xl leading-none gold-sheen md:text-6xl lg:text-7xl"
          >
            {siteContent.name}
          </h1>
          {/* Title in gold, way of working in stone: the hierarchy is the
              honesty. noon gave the first clause, not the second. */}
          <p
            data-hero-role
            className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-sm uppercase tracking-widest text-gold md:justify-start"
          >
            <span>{siteContent.role}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-gold/50" />
            <span className="text-stone">{siteContent.roleAside}</span>
          </p>
          <p data-hero-tagline className="mx-auto mt-3 max-w-xl text-stone md:mx-0">
            {siteContent.tagline}
          </p>
          <ul className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
            {siteContent.hero.badges.map((b) => (
              <li
                key={b}
                data-hero-badge
                className="flex items-center gap-2 rounded-full border border-gold/25 bg-coal/60 px-3.5 py-1.5 font-mono text-[11px] text-stone"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div
          data-hero-frame
          className="absolute inset-0 md:relative md:inset-auto md:w-[20rem] md:overflow-hidden md:rounded-2xl md:border md:border-gold/20 md:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] lg:w-[22rem]"
        >
          <video
            data-hero-video
            className="h-full w-full object-cover md:aspect-[9/16] md:h-auto"
            src={siteContent.hero.video}
            poster={siteContent.hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={siteContent.hero.videoAlt}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-night/70 [background-image:radial-gradient(ellipse_at_center,rgba(201,169,110,0.12),transparent_65%)] md:bg-transparent md:[background-image:linear-gradient(to_top,rgba(16,14,11,0.55),transparent_45%)]"
          />
          <p
            aria-hidden
            className="absolute bottom-4 left-1/2 hidden w-full -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70 md:block"
          >
            Apple Developer Academy
          </p>
        </div>
      </div>
      <div data-scroll-cue aria-hidden className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold">
        ↓
      </div>
    </section>
  );
}

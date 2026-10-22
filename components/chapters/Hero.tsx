"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, DUR } from "@/lib/motion";
import { siteContent } from "@/content/site";

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const { hero } = siteContent;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create("[data-hero-name]", { type: "words,chars" });
        gsap.set(container.current, { autoAlpha: 1 });
        gsap
          .timeline({ defaults: { ease: EASE.cinematic } })
          .from("[data-hero-frame]", { autoAlpha: 0, y: 32, duration: DUR.slow })
          .from(
            split.chars,
            { yPercent: 110, autoAlpha: 0, stagger: 0.03, duration: DUR.slow },
            "-=0.7"
          )
          // Every line of small text wipes in behind a clip instead of fading:
          // text at partial opacity fails the colour-contrast audit
          // mid-animation, and a wipe reads as a reveal rather than a fade.
          .from("[data-hero-meta]", { y: 12, duration: DUR.base }, "-=0.8")
          .from(
            "[data-hero-role]",
            { clipPath: "inset(0 0 100% 0)", y: 16, duration: DUR.base },
            "-=0.5"
          )
          .from(
            "[data-hero-tagline]",
            { clipPath: "inset(0 0 100% 0)", y: 12, duration: DUR.base },
            "-=0.5"
          )
          .from(
            "[data-hero-badge]",
            { clipPath: "inset(0 100% 0 0)", y: 10, stagger: 0.08, duration: DUR.base },
            "-=0.5"
          )
          .from(
            "[data-hero-cta]",
            { clipPath: "inset(0 100% 0 0)", y: 10, stagger: 0.1, duration: DUR.base },
            "-=0.5"
          )
          .from("[data-scroll-cue]", { scaleY: 0, transformOrigin: "top", duration: DUR.base }, "-=0.2");
        gsap.to("[data-scroll-cue]", {
          scaleY: 0.4,
          transformOrigin: "top",
          repeat: -1,
          yoyo: true,
          duration: 1.1,
          ease: EASE.drift,
        });
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
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-28 md:grid-cols-[1fr_auto] md:gap-16 md:py-24">
        <div className="relative z-10 text-center md:text-left">
          <p data-hero-meta className="text-sm text-stone">
            {hero.location}
          </p>
          <h1
            data-hero-name
            className="mt-4 font-display text-5xl leading-none text-gold md:text-6xl lg:text-7xl"
          >
            {siteContent.name}
          </h1>
          {/* Title in gold, way of working in stone: the hierarchy is the
              honesty. Noon gave the first clause, not the second. */}
          <p
            data-hero-role
            className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium uppercase tracking-wide text-gold md:justify-start"
          >
            <span>{siteContent.role}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-gold/50" />
            <span className="text-stone">{siteContent.roleAside}</span>
          </p>
          <p data-hero-tagline className="mx-auto mt-4 max-w-xl text-lg text-stone md:mx-0">
            {siteContent.tagline}
          </p>
          <ul className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start">
            {hero.badges.map((b) => (
              <li
                key={b}
                data-hero-badge
                className="rounded-full border border-gold/25 bg-coal/70 px-3.5 py-1.5 text-xs text-bone/90"
              >
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
            <a
              data-hero-cta
              href={hero.cta.cv}
              download
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-night transition-colors hover:bg-gold-bright"
            >
              {hero.cta.cvLabel}
            </a>
            <a
              data-hero-cta
              href={`mailto:${hero.cta.email}`}
              className="text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
            >
              {hero.cta.emailLabel}
            </a>
          </div>
        </div>
        <div
          data-hero-frame
          className="absolute inset-0 md:relative md:inset-auto md:w-[20rem] md:overflow-hidden md:rounded-2xl md:border md:border-gold/20 md:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] lg:w-[22rem]"
        >
          <video
            data-hero-video
            className="h-full w-full object-cover md:aspect-[9/16] md:h-auto"
            src={hero.video}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={hero.videoAlt}
          />
          {/* On phones the video sits behind the copy, so the scrim is heavy;
              on wider screens it only grounds the caption at the frame's foot. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-night/80 md:bg-transparent md:[background-image:linear-gradient(to_top,rgba(16,14,11,0.7),transparent_40%)]"
          />
          <p
            aria-hidden
            className="absolute bottom-4 left-0 hidden w-full text-center text-xs text-bone/80 md:block"
          >
            {hero.videoCaption}
          </p>
        </div>
      </div>
      <div
        data-scroll-cue
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 h-10 w-px -translate-x-1/2 bg-gold/70"
      />
    </section>
  );
}

"use client";
import { useRef } from "react";
import Image from "next/image";
import { preload } from "react-dom";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { EASE, DUR } from "@/lib/motion";
import { siteContent, credentialById } from "@/content/site";

const TEXT_LINK =
  "text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline";

// The hero is visible from the first paint: the frame and the poster are
// never faded, only moved, so the largest paint does not wait for JavaScript
// and the entrance animation. The text lines start clipped by a CSS rule
// (see globals.css, motion-only) and are revealed by the timeline; with
// JavaScript off, the noscript block below undoes the clips.
export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const { hero } = siteContent;
  const credentials = hero.credentials.map(credentialById);

  preload(hero.poster, { as: "image", fetchPriority: "high" });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create("[data-hero-name]", { type: "words,chars" });
        // Characters hide before the heading's clip opens, in the same frame,
        // so the name never flashes whole.
        gsap.set(split.chars, { yPercent: 110, autoAlpha: 0 });
        gsap.set("[data-hero-name]", { clipPath: "none" });
        const open = { clipPath: "inset(0 0 0% 0)", y: 0, duration: DUR.base };
        const openX = { clipPath: "inset(0 0% 0 0)", y: 0, duration: DUR.base };
        gsap
          .timeline({ defaults: { ease: EASE.cinematic } })
          .fromTo("[data-hero-frame]", { y: 32 }, { y: 0, duration: DUR.slow })
          .to(split.chars, { yPercent: 0, autoAlpha: 1, stagger: 0.03, duration: DUR.slow }, "-=0.7")
          .fromTo("[data-hero-meta]", { y: 12 }, { y: 0, duration: DUR.base }, "-=0.8")
          .fromTo("[data-hero-role]", { clipPath: "inset(0 0 100% 0)", y: 16 }, open, "-=0.5")
          .fromTo("[data-hero-tagline]", { clipPath: "inset(0 0 100% 0)", y: 12 }, open, "-=0.5")
          .fromTo(
            "[data-hero-cred]",
            { clipPath: "inset(0 100% 0 0)", y: 10 },
            { ...openX, stagger: 0.12 },
            "-=0.5"
          )
          .fromTo(
            "[data-hero-cta]",
            { clipPath: "inset(0 100% 0 0)", y: 10 },
            { ...openX, stagger: 0.1 },
            "-=0.5"
          )
          .fromTo("[data-hero-now]", { clipPath: "inset(0 0 100% 0)", y: 8 }, open, "-=0.5")
          .to("[data-hero-proof]", { opacity: 1, y: 0, duration: DUR.base }, "-=0.4");
        return () => split.revert();
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      data-chapter="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <noscript>
        <style>{`[data-hero-clip],[data-hero-clip-x]{clip-path:none!important}[data-hero-frame],[data-hero-meta],[data-hero-proof]{transform:none!important}[data-hero-proof]{opacity:1!important}`}</style>
      </noscript>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 hidden h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl md:block"
      />
      <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-28 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="relative z-10 text-center md:text-left">
            <p data-hero-meta className="text-sm text-stone">
              {hero.location}
            </p>
            <h1
              data-hero-name
              data-hero-clip
              className="mt-4 font-display text-5xl leading-none text-gold md:text-6xl lg:text-7xl"
            >
              {siteContent.name}
            </h1>
            {/* Three roles in one line that wraps where it needs to. The
                employer is named lower down, as a fact, not as the identity. */}
            <p data-hero-role data-hero-clip className="mt-5 text-base font-medium text-gold md:text-lg">
              {siteContent.role}
            </p>
            <p
              data-hero-tagline
              data-hero-clip
              className="mx-auto mt-4 max-w-xl text-lg text-stone md:mx-0"
            >
              {siteContent.tagline}
            </p>
            {/* The two professional certifications, each a link to its own
                record. Programmes are listed in the Credentials chapter. */}
            <ol className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              {credentials.map((c) => (
                <li key={c.id} data-hero-cred data-hero-clip-x className="flex sm:w-auto">
                  <a
                    href={c.href ?? "#credentials"}
                    target={c.href ? "_blank" : undefined}
                    rel={c.href ? "noopener noreferrer" : undefined}
                    className="flex w-full items-center gap-3 rounded-xl border border-gold/25 bg-coal/70 py-2.5 pl-2.5 pr-4 text-left transition-colors hover:border-gold/60"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-bone p-1">
                      <Image src={c.img} alt="" width={88} height={88} className="h-full w-full object-contain" />
                    </span>
                    <span>
                      <span className="block text-sm leading-snug text-bone">{c.name}</span>
                      {c.designation && (
                        <span className="mt-0.5 block text-xs text-gold">{c.designation}</span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
              <a
                data-hero-cta
                data-hero-clip-x
                href={hero.cta.work}
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-night transition-colors hover:bg-gold-bright"
              >
                {hero.cta.workLabel}
              </a>
              <a data-hero-cta data-hero-clip-x href={`mailto:${hero.cta.email}`} className={TEXT_LINK}>
                {hero.cta.emailLabel}
              </a>
              <a data-hero-cta data-hero-clip-x href={hero.cta.cv} download className={TEXT_LINK}>
                {hero.cta.cvLabel}
              </a>
              <a
                data-hero-cta
                data-hero-clip-x
                href={hero.cta.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={TEXT_LINK}
              >
                {hero.cta.linkedinLabel}
              </a>
            </div>
            <p data-hero-now data-hero-clip className="mt-6 text-sm text-stone">
              {hero.currentRole}
            </p>
          </div>
          <div
            data-hero-frame
            className="absolute inset-0 md:relative md:inset-auto md:w-[20rem] md:overflow-hidden md:rounded-2xl md:border md:border-gold/20 md:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] lg:w-[22rem]"
          >
            <video
              data-hero-video
              className="h-full w-full object-cover md:aspect-[9/16] md:h-auto"
              poster={hero.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={hero.videoAlt}
            >
              {/* Phones sit behind an 80% scrim and never show the full frame,
                  so they get the 720p cut (about a quarter of the bytes). The
                  1080p source comes first so a browser that ignores the media
                  attribute still gets today's behaviour. */}
              <source src={hero.video} type="video/mp4" media="(min-width: 768px)" />
              <source src={hero.videoSmall} type="video/mp4" />
            </video>
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
        {/* Three facts with their context, as the hero's foot. */}
        <ul
          data-hero-proof
          className="relative z-10 mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-bone/10 pt-5 text-center text-sm text-stone md:mt-12 md:justify-start md:text-left"
        >
          {hero.proof.map((p) => (
            <li key={p.text}>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  {p.text}
                </a>
              ) : (
                p.text
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

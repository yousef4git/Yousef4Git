"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Mark from "@/components/Mark";

// Labels match each section's own heading, in sentence case, so the nav
// reads as a table of contents rather than as a row of badges.
const LINKS = [
  { href: "#hero", label: "Intro" },
  { href: "#method", label: "How I work" },
  { href: "#noon", label: "Noon" },
  { href: "#teaching", label: "Teaching" },
  { href: "#work", label: "Projects" },
  { href: "#yax", label: "Before AI" },
  { href: "#credentials", label: "Credentials" },
];

// Every section owns its own nav stop, so the spy map is one to one.
const SPY: Record<string, string> = {
  hero: "#hero",
  method: "#method",
  noon: "#noon",
  teaching: "#teaching",
  work: "#work",
  yax: "#yax",
  credentials: "#credentials",
};

export default function Nav() {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
        gsap.from("[data-nav-pill]", {
          y: -16,
          autoAlpha: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
        });
      });
    },
    { scope: wrap }
  );

  // Active-section highlight. IntersectionObserver reads live layout, so it
  // stays correct however tall a chapter becomes: whichever section crosses
  // the viewport's centre band wins.
  useEffect(() => {
    const setActive = (href: string) => {
      wrap.current
        ?.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")
        .forEach((a) => {
          const on = a.getAttribute("href") === href;
          a.classList.toggle("bg-gold/15", on);
          a.classList.toggle("text-gold-bright", on);
          if (on) {
            a.setAttribute("aria-current", "true");
            // Keep the active stop in view on narrow screens, where the pill scrolls.
            a.scrollIntoView({ block: "nearest", inline: "nearest" });
          } else a.removeAttribute("aria-current");
        });
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const href = SPY[e.target.id];
          if (href) setActive(href);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    Object.keys(SPY).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap}>
      <a
        href="#noon"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-night"
      >
        Skip to the work
      </a>
      <div
        data-progress
        aria-hidden
        className="fixed left-0 top-0 z-[65] h-px w-full origin-left scale-x-0 bg-gold/70"
      />
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3">
        <div
          data-nav-pill
          className="liquid-glass pointer-events-auto flex max-w-full items-center rounded-full py-1.5 pl-4 pr-1.5"
        >
          <a href="#hero" aria-label="Yousef Alshuwayi, back to top" className="mr-1.5 flex items-center">
            <Mark className="h-7 w-7" />
          </a>
          <nav
            aria-label="Sections"
            className="no-scrollbar flex items-center gap-0.5 overflow-x-auto scroll-smooth max-md:[mask-image:linear-gradient(to_right,black_88%,transparent)]"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                data-nav-link
                href={l.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-stone transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

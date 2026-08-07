"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Mark from "@/components/Mark";

// Labels match each section's own heading: "Selected work" rather than "Work",
// so it cannot be misread as a second link to "How I work".
const LINKS = [
  { href: "#hero", label: "Intro" },
  { href: "#method", label: "How I work" },
  { href: "#noon", label: "Noon" },
  { href: "#teaching", label: "Teaching" },
  { href: "#work", label: "Selected work" },
  { href: "#yax", label: "Before AI" },
  { href: "#credentials", label: "Credentials" },
];

// Every section now owns its own nav stop, so the spy map is one to one.
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

  // Active-section highlight. IntersectionObserver reads live layout, so
  // pinned sections (whose ScrollTrigger positions shift by pin spacers)
  // stay correct: whichever section crosses the viewport's center band wins.
  useEffect(() => {
    const setActive = (href: string) => {
      wrap.current
        ?.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")
        .forEach((a) => {
          const on = a.getAttribute("href") === href;
          a.classList.toggle("bg-gold/15", on);
          a.classList.toggle("text-gold-bright", on);
          if (on) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
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
            className="no-scrollbar flex items-center gap-0.5 overflow-x-auto max-md:[mask-image:linear-gradient(to_right,black_88%,transparent)]"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                data-nav-link
                href={l.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-stone transition-colors hover:text-bone"
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

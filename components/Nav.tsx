"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Mark from "@/components/Mark";
import { useContent } from "@/components/LocaleProvider";

// Five stops named after their chapters, then the other language. The logo
// returns to the hero; How I work keeps its anchor but no longer takes a stop.
export default function Nav() {
  const wrap = useRef<HTMLDivElement>(null);
  const { ui } = useContent();
  const links = ui.nav.links;

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
  // the viewport's centre band wins. The hero lights nothing; chapters
  // without a stop keep the previous one lit.
  useEffect(() => {
    const spy = Object.fromEntries(links.map((l) => [l.href.slice(1), l.href]));
    const setActive = (href: string | null) => {
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
          const id = e.target.id;
          setActive(id === "hero" ? null : (spy[id] ?? null));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ["hero", ...Object.keys(spy)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [links]);

  return (
    <div ref={wrap}>
      <a
        href={links[0].href}
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-night"
      >
        {ui.nav.skip}
      </a>
      <div
        data-progress
        aria-hidden
        className="fixed start-0 top-0 z-[65] h-px w-full origin-left scale-x-0 bg-gold/70 rtl:origin-right"
      />
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3">
        <div
          data-nav-pill
          className="liquid-glass pointer-events-auto flex max-w-full items-center rounded-full py-1.5 ps-4 pe-1.5"
        >
          <a href="#hero" className="me-1.5 flex items-center">
            <Mark className="h-7 w-7" />
            <span className="sr-only">{ui.nav.backToTop}</span>
          </a>
          <nav
            aria-label={ui.nav.sections}
            className="no-scrollbar flex items-center gap-0.5 overflow-x-auto scroll-smooth max-md:[mask-image:linear-gradient(to_right,black_88%,transparent)] max-md:rtl:[mask-image:linear-gradient(to_left,black_88%,transparent)]"
          >
            {links.map((l) => (
              <a
                key={l.href}
                data-nav-link
                href={l.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-stone transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
            <a
              data-lang-switch
              href={ui.nav.switch.href}
              lang={ui.nav.switch.lang}
              hrefLang={ui.nav.switch.lang}
              className="ms-1 whitespace-nowrap rounded-full border border-bone/15 px-3 py-1.5 text-xs font-medium text-stone transition-colors hover:border-gold/40 hover:text-bone"
            >
              {ui.nav.switch.label}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

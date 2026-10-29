"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// One control for everything the page keeps folded, on every width: a native
// <details>, so keyboard, screen readers and search get it for free. The two
// labels swap by CSS (globals.css, [data-disclosure]), so the control keeps no
// state of its own. Scroll-driven reveals further down the page re-measure
// whenever a fold opens or closes.
export default function Disclosure({
  open,
  close,
  tone = "gold",
  hashOpen = false,
  children,
}: {
  open: string;
  close: string;
  tone?: "gold" | "noon";
  // Marks the fold a hash link to the enclosing card should open (HashOpener).
  hashOpen?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onToggle = () => ScrollTrigger.refresh();
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, []);

  const colour =
    tone === "noon"
      ? "border-noon/30 text-noon hover:border-noon/60"
      : "border-gold/30 text-gold hover:border-gold/60";

  return (
    <details ref={ref} data-disclosure data-hash-open={hashOpen ? "" : undefined} className="group mt-8">
      <summary
        className={`inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${colour}`}
      >
        <span data-disclosure-open>{open}</span>
        <span data-disclosure-close>{close}</span>
        <svg
          aria-hidden
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="transition-transform group-open:rotate-180"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="mt-8">{children}</div>
    </details>
  );
}

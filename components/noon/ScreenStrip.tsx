"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Media } from "@/content/site";

// Ten screens of different ratios share one height and keep their natural
// widths, so nothing is cropped and the strip reads like a contact sheet. It
// is a native horizontal scroller: the thumb works on a phone, the two buttons
// work for a mouse, and the page's vertical scroll is never captured.
export default function ScreenStrip({ media, label }: { media: readonly Media[]; label: string }) {
  const list = useRef<HTMLUListElement>(null);
  // Frames past the right edge are lazy by default and would only load as
  // they are scrolled into view, with a blank flash each time. Once the strip
  // is near the viewport, every frame loads so the sideways scroll is smooth.
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = (dir: 1 | -1) => {
    const el = list.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div data-strip>
      <ul
        ref={list}
        aria-label={label}
        className="strip no-scrollbar -mx-6 flex gap-5 overflow-x-auto px-6 pb-2 md:gap-6"
      >
        {media.map((m, i) => (
          <li key={m.src} className="shrink-0">
            <figure className="w-fit">
              <div className="h-56 overflow-hidden rounded-lg border border-bone/10 bg-night shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] md:h-72">
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  className="h-full w-auto"
                  sizes="(max-width: 768px) 80vw, 640px"
                  loading={near || i < 2 ? "eager" : "lazy"}
                />
              </div>
              <figcaption className="mt-3 w-min min-w-full text-xs leading-relaxed text-stone">
                {m.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous screens"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 text-stone transition-colors hover:border-noon/50 hover:text-noon"
        >
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next screens"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 text-stone transition-colors hover:border-noon/50 hover:text-noon"
        >
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-xs text-stone">
          {media.length} screens, from the entry page to the draft curriculum.
        </p>
      </div>
    </div>
  );
}

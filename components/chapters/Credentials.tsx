"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

export default function Credentials() {
  const container = useRef<HTMLElement>(null);
  const { featured, also } = siteContent.credentials;
  const [lead, ...rest] = featured;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cred-lead]", {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        });
        gsap.from("[data-cred-card]", {
          autoAlpha: 0,
          y: 60,
          scale: 0.94,
          stagger: 0.1,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-row]", start: "top 85%" },
        });
        gsap.from("[data-cred-also]", {
          autoAlpha: 0,
          y: 12,
          stagger: 0.06,
          duration: 0.5,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-also-list]", start: "top 90%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="credentials" data-chapter="credentials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title="Credentials" note="Verified where possible" />
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-6">
        {/* The selection stat is the credential, so Apple gets the wide card. */}
        <div
          data-cred-lead
          className="rounded-lg border border-gold/30 bg-coal p-6 md:flex md:items-center md:gap-8 md:p-8"
        >
          <Image
            src={lead.img}
            alt={lead.name}
            width={800}
            height={600}
            className="h-40 w-full rounded object-contain md:h-44 md:w-72 md:shrink-0"
          />
          <div className="mt-5 md:mt-0">
            <h3 className="font-display text-3xl text-bone md:text-4xl">{lead.name}</h3>
            <p className="mt-1 font-mono text-xs text-stone">
              {lead.issuer} · {lead.year}
            </p>
            {lead.note && (
              <p className="mt-4 font-display text-xl text-gold md:text-2xl">{lead.note}</p>
            )}
          </div>
        </div>

        <div data-cred-row className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {rest.map((c) => {
            const card = (
              <div
                data-cred-card
                className="h-full rounded-lg border border-gold/20 bg-coal p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-gold/50"
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  width={400}
                  height={300}
                  className="h-32 w-full rounded object-contain"
                />
                <p className="mt-3 text-sm text-bone">{c.name}</p>
                <p className="mt-1 font-mono text-xs text-stone">
                  {c.issuer} · {c.year}
                </p>
                {c.note && <p className="mt-2 font-mono text-xs text-gold">{c.note}</p>}
              </div>
            );
            return c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify: ${c.name}`}
              >
                {card}
              </a>
            ) : (
              <div key={c.name}>{card}</div>
            );
          })}
        </div>

        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone">Also</p>
          <ul data-cred-also-list className="mt-4 space-y-2">
            {also.map((a) => (
              <li key={a} data-cred-also className="font-mono text-sm text-stone">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

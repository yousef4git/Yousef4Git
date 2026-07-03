"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";

export default function Credentials() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cred-card]", {
          autoAlpha: 0,
          y: 80,
          rotation: () => gsap.utils.random(-6, 6),
          scale: 0.9,
          stagger: { each: 0.08, from: "random" },
          ease: EASE.cinematic,
          duration: 0.9,
          scrollTrigger: { trigger: container.current, start: "top 65%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="credentials" data-chapter="credentials" className="min-h-screen py-24">
      <h2 className="px-6 font-display text-4xl text-gold md:text-5xl">Credentials</h2>
      <div data-cred-grid className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {siteContent.credentials.map((c) => {
          const card = (
            <div data-cred-card className="h-full rounded-lg border border-gold/20 bg-coal p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-gold/50">
              <Image src={c.img} alt={c.name} width={400} height={300} className="h-32 w-full rounded object-contain" />
              <p className="mt-3 text-sm text-bone">{c.name}</p>
              <p className="mt-1 font-mono text-xs text-stone">{c.issuer} · {c.year}</p>
            </div>
          );
          return c.href ? (
            <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`Verify: ${c.name}`}>
              {card}
            </a>
          ) : (
            <div key={c.name}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}

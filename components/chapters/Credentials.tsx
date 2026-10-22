"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

export default function Credentials() {
  const container = useRef<HTMLElement>(null);
  const { title, lead: sectionLead, featured, alsoLead, also } = siteContent.credentials;
  const [lead, ...rest] = featured;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cred-lead] > *", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.15,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-lead]", start: "top 80%" },
        });
        gsap.from("[data-cred-card]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-row]", start: "top 85%" },
        });
        gsap.from("[data-cred-also]", {
          autoAlpha: 0,
          y: 12,
          duration: 0.6,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-also]", start: "top 92%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="credentials" data-chapter="credentials" className="bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={title} lead={sectionLead} />
        <div className="mt-12 px-6">
          {/* The selection stat is the credential, so Apple gets the wide row. */}
          <div
            data-cred-lead
            className="grid grid-cols-1 gap-8 border-t border-bone/10 py-10 md:grid-cols-12 md:items-center md:gap-x-8"
          >
            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-lg border border-bone/10 bg-bone p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <Image
                  src={lead.img}
                  alt={lead.name}
                  width={800}
                  height={600}
                  className="w-full rounded"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
            </div>
            <div className="md:col-span-7 md:pl-4">
              <h3 className="font-display text-3xl text-bone md:text-4xl">{lead.name}</h3>
              <p className="mt-2 text-sm text-stone">
                {lead.issuer}
                {lead.year && `, ${lead.year}`}
              </p>
              {lead.note && (
                <p className="mt-5 font-display text-2xl lining-nums text-gold md:text-3xl">{lead.note}</p>
              )}
            </div>
          </div>

          <ul
            data-cred-row
            className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-bone/10 pt-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {rest.map((c) => (
              <li key={c.name} data-cred-card>
                <div className="flex h-44 items-center justify-center overflow-hidden rounded-lg border border-bone/10 bg-bone p-4">
                  <Image
                    src={c.img}
                    alt={c.name}
                    width={400}
                    height={300}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <h3 className="mt-5 text-base leading-snug text-bone">{c.name}</h3>
                {c.designation && <p className="mt-1 text-sm text-gold">{c.designation}</p>}
                <p className="mt-1 text-xs text-stone">
                  {c.issuer}
                  {c.year && `, ${c.year}`}
                </p>
                {c.note && <p className="mt-2 text-xs text-stone">{c.note}</p>}
                {c.description && (
                  <p className="mt-3 text-xs leading-relaxed text-stone">{c.description}</p>
                )}
                {c.href && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-medium text-gold underline-offset-4 hover:text-gold-bright hover:underline"
                  >
                    Verify credential
                  </a>
                )}
              </li>
            ))}
          </ul>

          <p data-cred-also className="mt-14 max-w-3xl border-t border-bone/10 pt-6 text-sm leading-relaxed text-stone">
            {alsoLead} {also.join("; ")}.
          </p>
        </div>
      </div>
    </section>
  );
}

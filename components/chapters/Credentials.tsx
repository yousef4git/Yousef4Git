"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";

const VERIFY =
  "mt-3 inline-block text-xs font-medium text-gold underline-offset-4 hover:text-gold-bright hover:underline";

// Two groups in DOM and reading order: the professional certifications as two
// equal wide rows, then the programmes. The degree and the shorter courses
// close the chapter. Nothing is reordered by CSS.
export default function Credentials() {
  const container = useRef<HTMLElement>(null);
  const c = siteContent.credentials;
  const certifications = c.list.filter((x) => x.category === "certification");
  const programmes = c.list.filter((x) => x.category === "programme");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Opacity rather than autoAlpha: every group carries verification
        // links that must stay focusable before the reveal fires.
        gsap.from("[data-cred-primary] > *", {
          opacity: 0,
          y: 24,
          stagger: 0.15,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-primary]", start: "top 80%" },
        });
        gsap.from("[data-cred-card]", {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-row]", start: "top 85%" },
        });
        gsap.from("[data-cred-education], [data-cred-also]", {
          opacity: 0,
          y: 12,
          stagger: 0.1,
          duration: 0.6,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-cred-education]", start: "top 92%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="credentials" data-chapter="credentials" className="bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={c.title} lead={c.lead} />
        <div className="mt-12 px-6">
          <h3 className="text-sm text-stone">{c.primaryHeading}</h3>
          <ol data-cred-primary className="mt-4 grid grid-cols-1 gap-x-8 md:grid-cols-2">
            {certifications.map((x) => (
              <li
                key={x.id}
                className="grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-3 border-t border-bone/10 py-8"
              >
                <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center overflow-hidden rounded-lg border border-bone/10 bg-bone p-2">
                  <Image src={x.img} alt="" width={176} height={176} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h4 className="font-display text-2xl leading-tight text-bone md:text-3xl">{x.name}</h4>
                  {x.designation && <p className="mt-1.5 text-sm text-gold">{x.designation}</p>}
                  <p className="mt-1 text-xs text-stone">
                    {x.issuer}
                    {x.year && `, ${x.year}`}
                  </p>
                  {x.description && (
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{x.description}</p>
                  )}
                  {x.href && (
                    <a href={x.href} target="_blank" rel="noopener noreferrer" className={VERIFY}>
                      {c.verifyLabel}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 text-sm text-stone">{c.programmesHeading}</h3>
          <ul
            data-cred-row
            className="mt-4 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-bone/10 pt-8 sm:grid-cols-3"
          >
            {programmes.map((x) => (
              <li key={x.id} data-cred-card>
                <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg border border-bone/10 bg-bone p-4">
                  <Image
                    src={x.img}
                    alt={x.name}
                    width={400}
                    height={300}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <h4 className="mt-5 text-base leading-snug text-bone">{x.name}</h4>
                <p className="mt-1 text-xs text-stone">
                  {x.issuer}
                  {x.year && `, ${x.year}`}
                </p>
                {x.note && <p className="mt-2 text-sm text-gold">{x.note}</p>}
                {x.href && (
                  <a href={x.href} target="_blank" rel="noopener noreferrer" className={VERIFY}>
                    {c.verifyLabel}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div
            data-cred-education
            className="mt-14 grid grid-cols-1 gap-2 border-t border-bone/10 pt-8 md:grid-cols-12 md:gap-x-8"
          >
            <h3 className="text-sm text-stone md:col-span-3">{c.educationHeading}</h3>
            <p className="text-base leading-snug text-bone md:col-span-9">{c.education}</p>
          </div>
          <p data-cred-also className="mt-8 max-w-3xl border-t border-bone/10 pt-6 text-sm leading-relaxed text-stone">
            {c.alsoLead} {c.also.join("; ")}.
          </p>
        </div>
      </div>
    </section>
  );
}

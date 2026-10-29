"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { siteContent, noonProjectById } from "@/content/site";
import ChapterHead from "@/components/ChapterHead";
import Disclosure from "@/components/Disclosure";
import ProjectBlock from "@/components/noon/ProjectBlock";

const LINK =
  "mt-4 inline-block text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline";
const ROW = "scroll-mt-24 border-t border-bone/10 py-10 md:py-14";
const GRID = "grid grid-cols-1 gap-y-5 md:grid-cols-12 md:gap-x-8";

// Three ruled rows, newest first: the current job, the consulting venture,
// the operations years. Each row is a title column and one paragraph; the
// Noon row keeps its two remaining cases and the hackathon behind one fold.
export default function Experience() {
  const container = useRef<HTMLElement>(null);
  const { experience, noon, work, yax } = siteContent;
  const ghrs = work.find((w) => w.id === "consulting")!;
  const more = experience.noonMore.projects.map(noonProjectById);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Opacity rather than autoAlpha, so the links and the fold control
        // stay focusable before the reveal fires.
        gsap.utils.toArray<HTMLElement>("[data-exp-row]").forEach((row) => {
          gsap.from(row.querySelectorAll("[data-exp-copy]"), {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: row, start: "top 80%" },
          });
        });
        gsap.from("[data-yax-figure]", {
          autoAlpha: 0,
          y: 16,
          stagger: 0.1,
          duration: 0.7,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-yax-figures]", start: "top 88%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="experience" data-chapter="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={experience.title} />
        <div className="mt-12 px-6">
          {/* Noon Academy: the current job, with the cases that did not make
              Selected work and the hackathon kept behind one fold. */}
          <article id="noon" data-exp-row className={ROW}>
            <div className={GRID}>
              <div data-exp-copy className="md:col-span-4">
                <a
                  href={noon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={noon.linkLabel}
                  className="inline-block"
                >
                  <Image src={noon.logo} alt={noon.logoAlt} width={1176} height={254} className="h-7 w-auto" />
                </a>
                <h3 className="mt-5 font-display text-3xl leading-tight text-bone md:text-4xl">{noon.title}</h3>
                <p className="mt-2 text-sm text-stone">{noon.meta}</p>
              </div>
              <div data-exp-copy className="md:col-span-8">
                <p className="max-w-prose text-lg leading-relaxed text-bone/90">{noon.intro}</p>
              </div>
            </div>
            <Disclosure open={experience.noonMore.open} close={experience.noonMore.close} tone="noon">
              {more.map((p) => (
                <ProjectBlock key={p.id} project={p} />
              ))}
              <div className="grid grid-cols-1 gap-8 border-t border-bone/10 py-12 md:grid-cols-12 md:gap-x-8 md:py-16">
                <div className="md:col-span-5">
                  <h3 className="font-display text-3xl text-bone">{noon.hackathon.label}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone">{noon.hackathon.line}</p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-7">
                  {noon.hackathon.photos.map((p) => (
                    <figure key={p.src}>
                      <div className="overflow-hidden rounded-lg border border-bone/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          width={p.width}
                          height={p.height}
                          className="w-full"
                          sizes="(max-width: 640px) 100vw, 330px"
                        />
                      </div>
                      <figcaption className="mt-3 text-xs text-stone">{p.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </Disclosure>
          </article>

          {/* GHRS Ventures: the co-founded consulting venture. */}
          <article id="ghrs" data-exp-row className={ROW}>
            <div className={GRID}>
              <div data-exp-copy className="md:col-span-4">
                <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-bone p-1.5">
                  <Image src={ghrs.logo!} alt={ghrs.logoAlt ?? ""} width={96} height={96} className="h-full w-full object-contain" />
                </span>
                <h3 className="mt-5 font-display text-3xl leading-tight text-bone md:text-4xl">{ghrs.title}</h3>
                <p className="mt-2 text-sm text-bone/80">{ghrs.kicker}</p>
                {ghrs.meta && <p className="mt-0.5 text-sm text-stone">{ghrs.meta}</p>}
              </div>
              <div data-exp-copy className="md:col-span-8">
                <p className="max-w-prose text-lg leading-relaxed text-bone/90">{ghrs.line}</p>
                <ul className="mt-5 max-w-prose space-y-2.5">
                  {experience.ghrsHighlights.map((h) => (
                    <li key={h} className="relative pl-4 text-sm leading-relaxed text-stone">
                      <span aria-hidden className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
                {ghrs.href && (
                  <a href={ghrs.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {ghrs.cta}
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* YAX: the operations years, with their three figures. */}
          <article id="yax" data-exp-row className={ROW}>
            <div className={GRID}>
              <div data-exp-copy className="md:col-span-4">
                <span className="block h-12 w-12 overflow-hidden rounded-xl border border-bone/10">
                  <Image src={yax.logo} alt={yax.logoAlt} width={96} height={96} className="h-full w-full object-cover" />
                </span>
                <h3 className="mt-5 font-display text-3xl leading-tight text-bone md:text-4xl">{yax.title}</h3>
                <p className="mt-2 text-sm text-bone/80">{yax.org}</p>
                <p className="mt-0.5 text-sm text-stone">{yax.lead}</p>
              </div>
              <div data-exp-copy className="md:col-span-8">
                {yax.lines.map((l) => (
                  <p key={l} className="max-w-prose text-lg leading-relaxed text-bone/90">
                    {l}
                  </p>
                ))}
                <dl data-yax-figures className="mt-7 flex flex-wrap gap-x-10 gap-y-5">
                  {yax.figure.map((f) => (
                    <div key={f.label} data-yax-figure>
                      <dd className="flex items-baseline gap-1.5 font-display text-4xl leading-none tabular-nums lining-nums text-bone">
                        {f.value}
                        {"unit" in f && f.unit && <span className="text-base text-gold">{f.unit}</span>}
                      </dd>
                      <dt className="mt-1.5 text-xs text-stone">{f.label}</dt>
                    </div>
                  ))}
                </dl>
                <p className="mt-8 max-w-prose font-display text-2xl text-bone">{yax.bridge}</p>
              </div>
            </div>
          </article>

          <p className="mt-2 border-t border-bone/10 pt-6 text-sm text-stone">
            <span className="text-bone">{experience.toolkit.label}:</span>{" "}
            <span className="font-mono text-xs">{experience.toolkit.items}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

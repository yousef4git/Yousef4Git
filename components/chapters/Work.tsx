"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { pickProject } from "@/content/locale";
import { useContent } from "@/components/LocaleProvider";
import ChapterHead from "@/components/ChapterHead";
import Disclosure from "@/components/Disclosure";
import Frame from "@/components/noon/Frame";
import { CaseDetail, StatusPill } from "@/components/noon/ProjectBlock";

const LINK =
  "mt-4 inline-block text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline";
const NOON_LINK =
  "mt-4 inline-block text-sm font-medium text-noon underline-offset-4 transition-colors hover:text-bone hover:underline";
const ROW = "grid grid-cols-1 gap-y-5 border-t border-bone/10 py-10 md:grid-cols-12 md:gap-x-8 md:py-14";

// Three pieces of work as three ruled rows: the product Yousef founded, then
// the two Noon cases that show the same kind of delivery for an employer.
// Rows rather than cards, because the three are not peers of the same kind.
// Each Noon row keeps its full case behind one fold, so the chapter reads in
// a minute and still holds every bullet and screen for whoever wants them.
export default function Work() {
  const container = useRef<HTMLElement>(null);
  const content = useContent();
  const { work, workSection, noon } = content;
  const rusokh = work.find((w) => w.id === "rusokh")!;
  const cases = workSection.noonCases.map((id) => pickProject(content, id));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Opacity rather than autoAlpha: the rows hold links and the fold
        // controls, which must stay reachable by keyboard before the reveal
        // fires. Focusing one scrolls it into view, which plays the reveal.
        gsap.from("[data-work-row]", {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.8,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: "[data-work-list]", start: "top 82%" },
        });
        // Preview frames settle into place. Frames inside a closed fold are
        // left alone: they are simply there when the fold opens.
        gsap.utils
          .toArray<HTMLElement>("[data-frame]")
          .filter((frame) => !frame.closest("details"))
          .forEach((frame) => {
            gsap.from(frame, {
              autoAlpha: 0,
              scale: 1.03,
              duration: 0.9,
              ease: EASE.cinematic,
              scrollTrigger: { trigger: frame, start: "top 90%" },
            });
          });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="work" data-chapter="work" className="bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ChapterHead title={workSection.title} lead={workSection.lead} />
        <ul data-work-list className="mt-12 px-6">
          <li data-work-row className={ROW}>
            <div className="md:col-span-4">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-bone p-1.5">
                <Image
                  src={rusokh.logo!}
                  alt={rusokh.logoAlt ?? ""}
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                />
              </span>
              <h3 className="mt-5 font-display text-3xl leading-tight text-bone md:text-4xl">{rusokh.title}</h3>
              <p className="mt-2 text-sm text-bone/80">{rusokh.kicker}</p>
              {rusokh.meta && <p className="mt-0.5 text-sm text-stone">{rusokh.meta}</p>}
            </div>
            <div className="md:col-span-8">
              <p className="max-w-prose text-lg leading-relaxed text-bone/90">{rusokh.line}</p>
              {rusokh.href && (
                <a href={rusokh.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                  {rusokh.cta}
                </a>
              )}
              {rusokh.preview && (
                <Frame media={rusokh.preview} sizes="(max-width: 768px) 100vw, 740px" className="mt-8" />
              )}
            </div>
          </li>
          {cases.map((p) => {
            const [preview] = p.media;
            return (
              <li key={p.id} data-work-row className="border-t border-bone/10 py-10 md:py-14">
                <article id={p.id} className="scroll-mt-24">
                  <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-8">
                    <div className="md:col-span-4">
                      <Image src={noon.logo} alt={noon.logoAlt} width={1176} height={254} className="h-6 w-auto" />
                      <div className="mt-5">
                        <StatusPill status={p.status} />
                      </div>
                      <h3 className="mt-4 font-display text-3xl leading-tight text-bone md:text-4xl">{p.title}</h3>
                      <p className="mt-2 text-sm text-noon">{workSection.noonContext}</p>
                      <p className="mt-0.5 text-sm text-bone/80">{p.role}</p>
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={NOON_LINK}>
                          {l.label}
                        </a>
                      ))}
                    </div>
                    <div className="md:col-span-8">
                      <p className="max-w-prose text-lg leading-relaxed text-bone/90">{p.summary}</p>
                      {preview && (
                        <Frame
                          media={preview}
                          sizes="(max-width: 768px) 100vw, 740px"
                          className="mt-8"
                        />
                      )}
                    </div>
                  </div>
                  <Disclosure
                    open={workSection.details.open}
                    close={workSection.details.close}
                    tone="noon"
                    hashOpen
                  >
                    <CaseDetail project={p} />
                  </Disclosure>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

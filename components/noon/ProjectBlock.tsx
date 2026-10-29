"use client";
import type { NoonProject, SiteContent } from "@/content/site";
import { useContent } from "@/components/LocaleProvider";
import Figure from "@/components/noon/Figure";
import FlowFigure from "@/components/noon/FlowFigure";
import Frame from "@/components/noon/Frame";
import ScreenStrip from "@/components/noon/ScreenStrip";

const NOON_LINK =
  "text-sm font-medium text-noon underline-offset-4 transition-colors hover:text-bone hover:underline";

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((text) => (
        <li key={text} className="relative ps-4 text-sm leading-relaxed text-stone">
          <span aria-hidden className="absolute start-0 top-[0.6em] h-1 w-1 rounded-full bg-noon" />
          {text}
        </li>
      ))}
    </ul>
  );
}

type Project = SiteContent["noon"]["projects"][number] | NoonProject;

export function MediaRow({ project }: { project: Project }) {
  const { ui } = useContent();
  switch (project.treatment) {
    case "wide": {
      const [first, ...rest] = project.media;
      if (!first) return null;
      return (
        <div className="mt-12">
          <Frame media={first} sizes="(max-width: 768px) 100vw, 1152px" />
          {rest.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {rest.map((m) => (
                <Frame
                  key={m.src}
                  media={m}
                  sizes="(max-width: 640px) 100vw, 370px"
                  imgClassName="aspect-[4/3] w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>
      );
    }
    case "flow":
      return project.flow ? (
        <div className="mt-12">
          <FlowFigure flow={project.flow} />
        </div>
      ) : null;
    case "strip":
      return project.media.length ? (
        <div className="mt-12">
          <ScreenStrip media={project.media} label={ui.strip.label.replace("{title}", project.title)} />
        </div>
      ) : null;
    case "poster": {
      const [poster] = project.media;
      if (!poster) return null;
      return (
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {project.metrics.length > 0 && (
            <div className="space-y-8 md:col-span-6 md:self-center">
              {project.metrics.map((m) => (
                <Figure key={m.label} metric={m} size="lg" />
              ))}
            </div>
          )}
          <Frame
            media={poster}
            sizes="(max-width: 768px) 100vw, 460px"
            className="md:col-span-5 md:col-start-8"
          />
        </div>
      );
    }
    default:
      return null;
  }
}

// Live things get the Noon green; anything else stays in stone, so the
// status reads as a fact rather than as a decoration.
export function StatusPill({ status }: { status: string }) {
  const live = /^(live|delivered|platform live)/i.test(status);
  const tone = live ? "border-noon/30 text-noon" : "border-stone/30 text-stone";
  const dot = live ? "bg-noon" : "bg-stone";
  return (
    <p data-status className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${tone}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </p>
  );
}

// The written case: description, what was done, where it stands. Nothing
// here animates; it usually sits inside a fold and is simply there once the
// fold opens.
export function CaseText({ project }: { project: Project }) {
  const { ui } = useContent();
  const inlineMetrics = project.treatment !== "poster" && project.metrics.length > 0;
  return (
    <div>
      <p className="max-w-prose text-lg leading-relaxed text-bone/90">{project.description}</p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-medium text-bone">{ui.caseLabels.work}</h4>
          <BulletList items={project.work} />
        </div>
        {(project.outcomes.length > 0 || inlineMetrics) && (
          <div>
            {project.outcomes.length > 0 && (
              <>
                <h4 className="text-sm font-medium text-bone">{ui.caseLabels.outcomes}</h4>
                <BulletList items={project.outcomes} />
              </>
            )}
            {inlineMetrics && (
              <div className={project.outcomes.length > 0 ? "mt-7 space-y-5" : "space-y-5"}>
                {project.metrics.map((m) => (
                  <Figure key={m.label} metric={m} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// The full case for a Selected work card: the status detail, the written
// case, then every screen. The card above it already carries the status,
// title, role and summary.
export function CaseDetail({ project }: { project: Project }) {
  return (
    <div>
      {project.statusDetail && (
        <p className="mb-6 max-w-prose text-sm leading-relaxed text-stone">{project.statusDetail}</p>
      )}
      <CaseText project={project} />
      <MediaRow project={project} />
    </div>
  );
}

// One case in full with its own anchor: a title column, the written case,
// then the media across the row. Used for the cases that live in the
// Experience chapter's fold.
export default function ProjectBlock({ project }: { project: Project }) {
  return (
    <article id={project.id} className="scroll-mt-24 border-t border-bone/10 py-12 md:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-5">
          <StatusPill status={project.status} />
          <h3 className="mt-5 font-display text-3xl leading-tight text-bone md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-bone/80">{project.role}</p>
          {project.statusDetail && (
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">{project.statusDetail}</p>
          )}
          {project.links.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={NOON_LINK}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-7">
          <CaseText project={project} />
        </div>
      </div>
      <MediaRow project={project} />
    </article>
  );
}

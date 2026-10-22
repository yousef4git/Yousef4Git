import Image from "next/image";
import type { Media, NoonProject } from "@/content/site";
import Figure from "@/components/noon/Figure";
import FlowFigure from "@/components/noon/FlowFigure";
import ScreenStrip from "@/components/noon/ScreenStrip";
import MoreList from "@/components/noon/MoreList";

const FRAME =
  "overflow-hidden rounded-lg border border-bone/10 bg-night shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]";

function Frame({
  media,
  sizes,
  className = "",
  imgClassName = "w-full",
}: {
  media: Media;
  sizes: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={className}>
      <div data-frame className={FRAME}>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className={imgClassName}
          sizes={sizes}
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-stone">{media.caption}</figcaption>
    </figure>
  );
}

function MediaRow({ project }: { project: NoonProject }) {
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
          <ScreenStrip media={project.media} label={`${project.title} screens`} />
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

// One project: a sticky title column, the copy, then the media across the row.
// Live things get the Noon green; an initial build stays in stone, so the
// status reads as a fact rather than as a decoration.
export default function ProjectBlock({ project }: { project: NoonProject }) {
  const live = /^(live|delivered|platform live)/i.test(project.status);
  const tone = live ? "border-noon/30 text-noon" : "border-stone/30 text-stone";
  const dot = live ? "bg-noon" : "bg-stone";
  const inlineMetrics = project.treatment !== "poster" && project.metrics.length > 0;

  return (
    <article
      id={project.id}
      data-noon-project
      className="border-t border-bone/10 py-14 md:py-20"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8">
        <div data-noon-copy className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <p
            data-status
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${tone}`}
          >
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            {project.status}
          </p>
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
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-noon underline-offset-4 transition-colors hover:text-bone hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div data-noon-copy className="md:col-span-7">
          <p className="text-lg leading-relaxed text-bone/90">{project.description}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-bone">What I did</h4>
              <MoreList items={project.work} />
            </div>
            {(project.outcomes.length > 0 || inlineMetrics) && (
              <div>
                {project.outcomes.length > 0 && (
                  <>
                    <h4 className="text-sm font-medium text-bone">Where it stands</h4>
                    <MoreList items={project.outcomes} />
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
      </div>
      <MediaRow project={project} />
    </article>
  );
}

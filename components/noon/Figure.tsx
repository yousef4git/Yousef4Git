import type { Metric } from "@/content/site";

// A figure is a number with its qualifier attached. The context line is not
// a footnote; it is the part of the claim that keeps it honest.
export default function Figure({ metric }: { metric: Metric }) {
  return (
    <div data-figure className="border-t border-bone/10 pt-4">
      <p className="font-display text-3xl leading-none tabular-nums lining-nums text-bone md:text-4xl">
        {metric.value}
      </p>
      <p className="mt-2 text-sm text-bone/90">{metric.label}</p>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-stone">{metric.context}</p>
    </div>
  );
}

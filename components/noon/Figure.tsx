import type { Metric } from "@/content/site";

// A number and what it counts. One line each; the sentence does the
// qualifying where one is needed, not a footnote.
export default function Figure({ metric, size = "md" }: { metric: Metric; size?: "md" | "lg" }) {
  const value =
    size === "lg"
      ? "font-display text-6xl leading-none tabular-nums lining-nums text-bone md:text-7xl"
      : "font-display text-3xl leading-none tabular-nums lining-nums text-bone md:text-4xl";
  return (
    <div data-figure className="border-t border-bone/10 pt-4">
      <p className={value}>{metric.value}</p>
      <p className="mt-2 max-w-xs text-sm text-stone">{metric.label}</p>
    </div>
  );
}

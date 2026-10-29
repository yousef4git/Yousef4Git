"use client";
import type { Flow } from "@/content/site";
import { useContent } from "@/components/LocaleProvider";

function Side({ name, verb, items }: { name: string; verb: string; items: readonly string[] }) {
  return (
    <div className="rounded-lg border border-bone/10 bg-night/50 p-5">
      <p className="font-display text-2xl text-bone">{name}</p>
      <p className="mt-0.5 text-xs text-noon">{verb}</p>
      <ul className="mt-4 space-y-1.5">
        {items.map((i) => (
          <li key={i} className="text-sm text-stone">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

// The integration has no screenshot, so the figure shows the one thing a
// screenshot could not: which system owns which fields.
export default function FlowFigure({ flow }: { flow: Flow }) {
  const { ui } = useContent();
  const label = ui.flow.aria.replace("{from}", flow.from.name).replace("{to}", flow.to.name);
  return (
    <figure data-flow aria-label={label}>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <Side name={flow.from.name} verb={ui.flow.provides} items={flow.from.items} />
        <div className="flex justify-center text-noon" aria-hidden>
          <svg
            width="72"
            height="24"
            viewBox="0 0 72 24"
            fill="none"
            className="rotate-90 md:rotate-0 md:rtl:-scale-x-100"
          >
            <path d="M2 12h60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M54 5l8 7-8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <Side name={flow.to.name} verb={ui.flow.keeps} items={flow.to.items} />
      </div>
    </figure>
  );
}

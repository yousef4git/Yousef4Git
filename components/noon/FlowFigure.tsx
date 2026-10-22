import type { Flow } from "@/content/site";

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
// screenshot could not: who owns which fields, and where the daily run stops
// and asks a person.
export default function FlowFigure({ flow }: { flow: Flow }) {
  return (
    <figure data-flow>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <Side name={flow.from.name} verb="provides" items={flow.from.items} />
        <div className="flex justify-center text-noon" aria-hidden>
          <svg
            width="72"
            height="24"
            viewBox="0 0 72 24"
            fill="none"
            className="rotate-90 md:rotate-0"
          >
            <path d="M2 12h60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M54 5l8 7-8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <Side name={flow.to.name} verb="keeps" items={flow.to.items} />
      </div>
      <figcaption className="mt-5 max-w-2xl text-sm leading-relaxed text-stone">
        <span className="text-bone/90">{flow.run}</span> {flow.held}
      </figcaption>
    </figure>
  );
}

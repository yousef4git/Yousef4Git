import { siteContent } from "@/content/site";

export default function Work() {
  return (
    <section id="work" data-chapter="work" className="min-h-screen py-24">
      <h2 className="px-6 font-display text-4xl md:text-5xl text-gold">Selected work</h2>
      <div data-work-track className="mt-12 flex flex-col gap-8 px-6 md:flex-row">
        {siteContent.work.map((w) => (
          <article key={w.no} data-work-card className="max-w-md rounded-lg border border-gold/20 bg-coal p-8">
            <div className="flex justify-between font-mono text-xs text-stone">
              <span>{w.no}</span>
              <span>{w.kicker}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl text-bone">{w.title}</h3>
            <p className="mt-3 text-stone">{w.line}</p>
            {w.href && (
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-mono text-sm text-gold hover:text-gold-bright">
                {w.cta} →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

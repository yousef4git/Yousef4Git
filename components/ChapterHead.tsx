export default function ChapterHead({
  no,
  title,
  note,
}: {
  no: string;
  title: string;
  note?: string;
}) {
  return (
    <header data-chapter-head className="px-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
        Scene {no}
        {note && <span className="text-stone"> · {note}</span>}
      </p>
      <h2 className="mt-4 font-display text-4xl text-bone md:text-6xl">{title}</h2>
      <div aria-hidden className="mt-6 h-px w-16 bg-gold/40" />
    </header>
  );
}

import Image from "next/image";
import { siteContent } from "@/content/site";

export default function Stage() {
  return (
    <section id="stage" data-chapter="stage" className="min-h-screen bg-coal py-24">
      <h2 className="px-6 font-display text-4xl md:text-5xl text-gold">On stage</h2>
      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-16 px-6">
        {siteContent.stage.map((s) => (
          <figure key={s.src} data-stage-photo>
            <Image src={s.src} alt={s.alt} width={1600} height={1067} className="rounded-lg" />
            <figcaption className="mt-3 font-mono text-sm text-stone">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

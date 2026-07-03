import Image from "next/image";
import { siteContent } from "@/content/site";

export default function Noon() {
  return (
    <section id="noon" data-chapter="noon" className="flex min-h-screen items-center bg-coal">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-noon">{siteContent.noon.heading}</p>
        <a href={siteContent.noon.url} target="_blank" rel="noopener noreferrer" className="mt-6 block w-40">
          <Image src={siteContent.noon.logo} alt="noon" width={288} height={64} />
        </a>
        {siteContent.noon.lines.map((line) => (
          <p key={line} className="mt-6 font-display text-3xl md:text-4xl text-bone">{line}</p>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import { siteContent } from "@/content/site";

export default function Credentials() {
  return (
    <section id="credentials" data-chapter="credentials" className="min-h-screen py-24">
      <h2 className="px-6 font-display text-4xl md:text-5xl text-gold">Credentials</h2>
      <div data-cred-grid className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {siteContent.credentials.map((c) => {
          const card = (
            <div data-cred-card className="rounded-lg border border-gold/20 bg-coal p-4 transition-transform hover:-translate-y-1">
              <Image src={c.img} alt={c.name} width={400} height={300} className="rounded object-contain" />
              <p className="mt-3 text-sm text-bone">{c.name}</p>
              <p className="mt-1 font-mono text-xs text-stone">{c.issuer} · {c.year}</p>
            </div>
          );
          return c.href ? (
            <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer">{card}</a>
          ) : (
            <div key={c.name}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}

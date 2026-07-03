import { siteContent } from "@/content/site";

export default function Hero() {
  return (
    <section id="hero" data-chapter="hero" className="relative flex min-h-screen items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-display text-6xl md:text-8xl gold-sheen">{siteContent.name}</h1>
        <p className="mt-4 font-mono text-sm md:text-base text-gold tracking-widest uppercase">{siteContent.role}</p>
        <p className="mt-2 text-stone">{siteContent.tagline}</p>
      </div>
    </section>
  );
}

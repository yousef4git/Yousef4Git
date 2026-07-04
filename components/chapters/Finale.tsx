import ChatPanel from "@/components/ChatPanel";
import { siteContent } from "@/content/site";

export default function Finale() {
  const { contact } = siteContent;
  return (
    <section id="finale" data-chapter="finale" className="flex min-h-screen items-center bg-coal">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-gold">Ask my CV anything</h2>
        <div className="mt-10"><ChatPanel /></div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 font-mono text-sm">
          <a className="text-gold hover:text-gold-bright" href={`mailto:${contact.email}`}>Email</a>
          <a className="text-gold hover:text-gold-bright" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-gold hover:text-gold-bright" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-gold hover:text-gold-bright" href={contact.cv} download>Download CV</a>
        </div>
      </div>
    </section>
  );
}

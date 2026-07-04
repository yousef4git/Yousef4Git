import dynamic from "next/dynamic";
import { siteContent } from "@/content/site";

const ChatPanel = dynamic(() => import("@/components/ChatPanel"));

export default function Finale() {
  const { contact } = siteContent;
  return (
    <section id="finale" data-chapter="finale" className="flex min-h-screen items-center bg-coal">
      <div className="w-full mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Scene 06 <span className="text-stone">· Closing credits</span>
        </p>
        <h2 className="mt-4 font-display text-4xl text-bone md:text-6xl">Ask my CV anything</h2>
        <div aria-hidden className="mx-auto mt-6 h-px w-16 bg-gold/40" />
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

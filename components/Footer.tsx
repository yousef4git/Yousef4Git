import { siteContent } from "@/content/site";

export default function Footer() {
  const { contact } = siteContent;
  return (
    <footer id="contact" data-chapter="footer" className="border-t border-gold/10 bg-coal">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Closing credits</p>
        <p className="max-w-md text-stone">
          Questions about my work? The chat in the corner answers from my CV, or reach me
          directly.
        </p>
        <div className="flex flex-wrap justify-center gap-6 font-mono text-sm">
          <a className="text-gold hover:text-gold-bright" href={`mailto:${contact.email}`}>
            Email
          </a>
          <a
            className="text-gold hover:text-gold-bright"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-gold hover:text-gold-bright"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a className="text-gold hover:text-gold-bright" href={contact.cv} download>
            Download CV
          </a>
        </div>
        <p className="font-mono text-[11px] text-stone">Yousef Alshuwayi · Riyadh, Saudi Arabia</p>
      </div>
    </footer>
  );
}

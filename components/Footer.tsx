import { siteContent } from "@/content/site";

const LINK = "text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline";

export default function Footer() {
  const { contact, footer } = siteContent;
  return (
    <footer id="contact" data-chapter="footer" className="border-t border-gold/10 bg-night">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:items-end md:py-28">
        <div className="md:col-span-7">
          <p className="font-display text-5xl leading-none text-bone md:text-7xl">{footer.title}</p>
          <p className="mt-6 max-w-md text-stone">{footer.line}</p>
        </div>
        <div className="flex flex-col items-start gap-5 md:col-span-5 md:items-end md:text-right">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-night transition-colors hover:bg-gold-bright"
          >
            {contact.email}
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            <a className={LINK} href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className={LINK} href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className={LINK} href={contact.cv} download>
              Download CV
            </a>
          </div>
          <p className="mt-4 text-xs text-stone">Yousef Alshuwayi, Riyadh, Saudi Arabia</p>
        </div>
      </div>
    </footer>
  );
}

import Mark from "@/components/Mark";
import OpenChatButton from "@/components/OpenChatButton";
import { siteContent } from "@/content/site";

const LINK = "text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline";

// Contact, with the site's own small demonstration above it: the chat is an
// example of the work, not the way to reach Yousef. Email comes first.
export default function Footer() {
  const { contact, footer, work } = siteContent;
  const site = work.find((w) => w.id === "site")!;
  return (
    <footer id="contact" data-chapter="footer" className="scroll-mt-24 border-t border-gold/10 bg-night">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div
          data-site-demo
          className="grid grid-cols-1 gap-y-4 border-b border-bone/10 pb-12 md:grid-cols-12 md:gap-x-8"
        >
          <div className="md:col-span-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-night">
              <Mark className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl leading-tight text-bone md:text-3xl">{site.title}</h2>
            <p className="mt-2 text-sm text-bone/80">{site.kicker}</p>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-prose leading-relaxed text-stone">{site.line}</p>
            <OpenChatButton label={site.cta} className={`mt-4 inline-block ${LINK}`} />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
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
      </div>
    </footer>
  );
}

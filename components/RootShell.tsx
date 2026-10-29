import { contentFor, type Locale } from "@/content/locale";
import { personJsonLd } from "@/lib/jsonld";

// The document for one language: lang and dir from the content, the fonts
// from the layout that owns them, the Person record for both.
export default function RootShell({
  locale,
  fontClass,
  children,
}: {
  locale: Locale;
  fontClass: string;
  children: React.ReactNode;
}) {
  const content = contentFor(locale);
  return (
    <html lang={content.locale} dir={content.dir} className={fontClass}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yousefalshuwayi.online"),
  title: "Yousef Alshuwayi · AI Systems Engineer at noon",
  description:
    "AI Systems Engineer at noon. I build production AI systems and web products: agentic AI, LLMs, Python, Next.js. Riyadh, Saudi Arabia.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: "Yousef Alshuwayi",
    title: "Yousef Alshuwayi · AI Systems Engineer at noon",
    description: "I build production AI systems and web products.",
    url: "https://yousefalshuwayi.online/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yousef Alshuwayi · AI Systems Engineer at noon",
    description: "I build production AI systems and web products.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yousef Alshuwayi",
  jobTitle: "AI Systems Engineer",
  worksFor: { "@type": "Organization", name: "noon", url: "https://www.noon.edu.sa/en/" },
  url: "https://yousefalshuwayi.online",
  email: "mailto:yousefalshuwayi@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
  sameAs: ["https://linkedin.com/in/yousefalshuwayi", "https://github.com/Yousef4Git"],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Certified Data Management Professional (CDMP) - Associate", credentialCategory: "certification" },
    { "@type": "EducationalOccupationalCredential", name: "Agentic AI Bootcamp, SDA Academy", credentialCategory: "certificate" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

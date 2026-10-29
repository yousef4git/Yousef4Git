import dynamic from "next/dynamic";
import type { Locale } from "@/content/locale";
import LocaleProvider from "@/components/LocaleProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/chapters/Hero";
import Work from "@/components/chapters/Work";
import Experience from "@/components/chapters/Experience";
import Teaching from "@/components/chapters/Teaching";
import Method from "@/components/chapters/Method";
import Credentials from "@/components/chapters/Credentials";
import Footer from "@/components/Footer";
import HashOpener from "@/components/HashOpener";

const ChatBubble = dynamic(() => import("@/components/ChatBubble"));

// The one page, in one language. / and /ar both render this.
export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <main>
        <Nav />
        <Hero />
        <Work />
        <Experience />
        <Teaching />
        <Method />
        <Credentials />
      </main>
      <Footer locale={locale} />
      <ChatBubble />
      <HashOpener />
    </LocaleProvider>
  );
}

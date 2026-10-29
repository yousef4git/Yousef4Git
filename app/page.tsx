import dynamic from "next/dynamic";
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

export default function Home() {
  return (
    <>
      <main>
        <Nav />
        <Hero />
        <Work />
        <Experience />
        <Teaching />
        <Method />
        <Credentials />
      </main>
      <Footer />
      <ChatBubble />
      <HashOpener />
    </>
  );
}

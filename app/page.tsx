import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/chapters/Hero";
import Noon from "@/components/chapters/Noon";
import Teaching from "@/components/chapters/Teaching";
import Work from "@/components/chapters/Work";
import Yax from "@/components/chapters/Yax";
import Credentials from "@/components/chapters/Credentials";
import Footer from "@/components/Footer";

const ChatBubble = dynamic(() => import("@/components/ChatBubble"));

export default function Home() {
  return (
    <>
      <main>
        <Nav />
        <Hero />
        <Noon />
        <Teaching />
        <Work />
        <Yax />
        <Credentials />
      </main>
      <Footer />
      <ChatBubble />
    </>
  );
}

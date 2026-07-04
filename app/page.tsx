import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/chapters/Hero";
import Noon from "@/components/chapters/Noon";
import Yax from "@/components/chapters/Yax";
import Stage from "@/components/chapters/Stage";
import Work from "@/components/chapters/Work";
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
        <Yax />
        <Stage />
        <Work />
        <Credentials />
      </main>
      <Footer />
      <ChatBubble />
    </>
  );
}

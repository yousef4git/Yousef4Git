import Nav from "@/components/Nav";
import Hero from "@/components/chapters/Hero";
import Noon from "@/components/chapters/Noon";
import Work from "@/components/chapters/Work";
import Stage from "@/components/chapters/Stage";
import Credentials from "@/components/chapters/Credentials";
import Finale from "@/components/chapters/Finale";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Noon />
      <Work />
      <Stage />
      <Credentials />
      <Finale />
    </main>
  );
}

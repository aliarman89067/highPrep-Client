import Chapters from "@/components/Chapters";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <section className="flex flex-col relative">
      <Navbar />
      <Hero />
      <Chapters />
      <Footer />
    </section>
  );
}

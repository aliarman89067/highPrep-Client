import Chapters from "@/components/Chapters";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useOnWebLoad } from "@/context";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const { isLoad, setLoadTrue } = useOnWebLoad();
  useEffect(() => {
    if (!isLoad) {
      axios
        .get("/add-traffic")
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoadTrue();
        });
    }
  }, []);
  return (
    <section className="flex flex-col relative">
      <Navbar />
      <Hero />
      <Chapters />
      <Footer />
    </section>
  );
}

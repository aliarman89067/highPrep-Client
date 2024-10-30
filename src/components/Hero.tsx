import images from "@/constant/images";
import { motion } from "framer-motion";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <div className="flex items-center justify-center relative">
      <img
        src={images.heroImage}
        alt="Heri Image"
        className="h-[400px] object-cover"
      />
      <motion.h1
        className="absolute z-10 text-6xl font-poppins font-bold text-darkGreen text-center"
        initial={{ opacity: 0, y: -140 }}
        animate={{ opacity: 1, y: -60 }}
        transition={{ duration: 1 }}
      >
        High School <br /> Prep
      </motion.h1>
      <div className="absolute flex bottom-40 gap-[2px]">
        {"Where  Learning  Knows  No  Bounds!"
          .split("")
          .map((letter, index) => (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ duration: 0.1, delay: index / 20 }}
              key={index}
              className="text-textSecondary text-base font-poppins"
            >
              {letter}
            </motion.div>
          ))}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-20">
        <HeroSearch />
      </div>
    </div>
  );
}

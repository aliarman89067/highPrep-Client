import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSearch() {
  return (
    <motion.div
      initial={{ width: 0, paddingRight: 1, paddingLeft: 1 }}
      animate={{ width: 440, paddingRight: 20, paddingLeft: 20 }}
      transition={{ duration: 1.5, delay: 1.2 }}
      className="flex items-center  border border-darkGreen/40 rounded-sm h-[50px] py-1.5 bg-white overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search topics skills and more"
        className="flex-1 outline-none text-text text-base font-medium"
      />
      <SearchIcon size={20} color="#1f2937" className="cursor-pointer" />
    </motion.div>
  );
}

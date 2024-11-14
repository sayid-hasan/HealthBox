import { motion } from "framer-motion";
import "./shineyButton.css";
const ShineyButton = ({ text }) => {
  return (
    <motion.div
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 10,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="px-2 group  py-3 hover:bg-SecondaryColor rounded-md relative radial-gradient transition duration-400 md:w-[200px] w-[120px]"
    >
      <span className="text-[#FFFF] ] group-hover:tracking-widest  transition duration-400 text-lg md:text-xl font-Nunito tracking-wide font-bold h-full  block relative linear-mask">
        {text}
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.div>
  );
};

export default ShineyButton;

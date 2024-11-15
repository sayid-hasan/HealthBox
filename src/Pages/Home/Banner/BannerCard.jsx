import ShineyButton from "../../../components/ShineyButton/ShineyButton";
import fadeIn from "../../../Utility/varient";
import { motion } from "framer-motion";

const BannerCard = ({ banner }) => {
  return (
    <div className="flex py-10 flex-col md:flex-row-reverse max-w-7xl mx-auto ">
      <div className=" font-Nunito rounded-lg w-[500px] h-[500px] object-contain object-center overflow-hidden">
        {" "}
        <img
          src={banner?.image}
          className="w-full min-h-full object-cover object-center"
          alt=""
        />
      </div>
      <div className=" flex justify-start items-center grow bg-black bg-opacity-20  rounded-lg">
        <div className="text-left flex flex-col gap-5">
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="text-xl md:text-3xl font-firaSans font-bold text-white md:leading-relaxed leading-normal"
          >
            <span className="text-[#D8639b]">{banner?.name}</span> <br />
            {/* <span className="  md:text-[39px] ">
              {description}
              {/* <span className="text-[#B22222]">dishes</span> */}
            {/* </span> */}
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            <p className="text-sm md:text-base tracking-wider max-w-[600px] text-SubTextColor font-firaSans md:leading-normal leading-tight">
              {banner?.description}
            </p>
            <ShineyButton
              //   icon={<FaArrowRight className="text-lg" />}
              text={"Explore our menu"}
            ></ShineyButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;

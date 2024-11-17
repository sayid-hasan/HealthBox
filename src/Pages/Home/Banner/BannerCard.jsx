import { FaArrowRight } from "react-icons/fa";
import BtnWithICon from "../../../components/NormalBtns/BtnWithIcon";

import fadeIn from "../../../Utility/varient";
import { motion } from "framer-motion";

const BannerCard = ({ banner }) => {
  return (
    <div className="flex px-4 py-7 md:py-12 flex-row-reverse max-w-7xl mx-auto ">
      <div className=" font-Nunito rounded-t-lg md:w-[500px]  md:h-[500px] w-[300px] object-cover object-center overflow-hidden">
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
            className="text-base md:text-3xl font-Nunito font-bold  md:leading-relaxed leading-normal"
          >
            <span className="text-SecondaryColor mb-5">{banner?.name}</span>{" "}
            <br />
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
            <p className="text-sm md:text-base tracking-wider max-w-[600px] text-SubTextColor font-firaSans md:leading-normal leading-tight mb-3">
              {banner?.description}
            </p>
            <BtnWithICon
              icon={<FaArrowRight className="text-lg " />}
              text={"Buy Now "}
              classname={`hover:bg-PrimaryColor text-[#fff] hover:text-SecondaryColor mb-5 `}
            ></BtnWithICon>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;

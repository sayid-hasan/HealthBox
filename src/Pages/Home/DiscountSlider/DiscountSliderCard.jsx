import { motion } from "framer-motion";
import fadeIn from "../../../Utility/varient";
import { useNavigate } from "react-router-dom";

const DiscountSliderCard = ({ slider }) => {
  const {
    itemGenericName,
    name,
    image,
    description,

    category,
    companyName,
    discountPercentage,
    price,
    stock,
  } = slider;
  const newPrice = parseFloat(
    (price - (price * discountPercentage) / 100).toFixed(2)
  );

  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/all")}>
      {" "}
      <div className=" py-7 max-w-sm md:max-w-xl cursor-pointer transition transform hover:scale-105 duration-300  mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <motion.img
          variants={fadeIn("right", 0)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="object-contain object-center w-full h-56  transition duration-100"
          src={image}
          alt={name}
        />
        {/* catergory & company Name */}
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="flex items-center justify-between px-6 py-3 bg-gray-900"
        >
          <h1 className="mx-3 font-frescha tracking-[2px] text-SecondaryColor text-lg font-font-oswald font-semibold ">
            {category}
          </h1>
          <p className="mx-3 font-frescha tracking-[2px] text-SecondaryColor text-lg font-font-oswald font-semibold ">
            {companyName}
          </p>
        </motion.div>

        <div className="px-6 py-4 min-h-[90px]">
          {/* name and Generic Name */}
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="flex justify-between items-center"
          >
            <motion.h1 className="text-lg font-firaSans tracking-wide font-semibold  md:min-h-[56px]  text-gray-800 dark:text-white">
              {name}
            </motion.h1>

            <div className="text-[17px] font-Nunito font-bold text-SecondaryColor ">
              <span>{itemGenericName}</span>
            </div>
          </motion.div>
          {/* description */}
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="py-2 text-[#b2b2b2] font-firaSans tracking-wide min-h-[90px] dark:text-gray-400"
          >
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </motion.div>

          {/* stock and price*/}
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="flex justify-between items-center"
          >
            <motion.h1 className="text-xl font-firaSans tracking-wide font-semibold  min-h-[20px]  text-gray-800 dark:text-white">
              <span>Stock : {stock}</span>
            </motion.h1>
            {/* before and after price */}
            <div className="text-[17px] font-Nunito font-bold text-SecondaryColor ">
              <span>
                Before :{" "}
                <span className="line-through text-[#B20000]">{price}</span>
                <br />
              </span>
              <span>Now : {newPrice}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiscountSliderCard;

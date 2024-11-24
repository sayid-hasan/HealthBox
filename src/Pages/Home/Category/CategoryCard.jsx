import { motion } from "framer-motion";
import fadeIn from "../../../Utility/varient";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const CategoryCard = ({ category }) => {
  const { categoryImg, categoryName } = category;
  const axiosNonSecure = useAxios();

  // getDynamic medicine Count
  const getData = async () => {
    const { data } = await axiosNonSecure.get(
      `/medicines/category/${categoryName}`
    );
    return data;
  };
  // tanStack
  const { data: medicineCategorys = [] } = useQuery({
    queryFn: async () => getData(),
    queryKey: ["categorys", categoryName],
  });
  const medicineCount = medicineCategorys.length;
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/categoryDetails/${categoryName}`)}>
      {" "}
      <div className=" max-w-full md:max-w-xl cursor-pointer transition transform hover:scale-105 duration-300  mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <motion.img
          variants={fadeIn("right", 0)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="object-cover object-center w-full h-56  transition duration-100"
          src={categoryImg}
          alt={categoryName}
        />

        <div className="px-6 py-4 min-h-[90px]">
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="flex justify-between items-center"
          >
            <motion.h1 className="text-xl font-firaSans tracking-wide font-semibold  min-h-[20px]  text-gray-800 dark:text-white">
              {categoryName}
            </motion.h1>

            <div className="text-[17px] font-Nunito font-bold text-SecondaryColor ">
              <span>Total Medicine : </span> {medicineCount}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

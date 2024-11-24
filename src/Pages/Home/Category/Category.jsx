import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoryCard from "./CategoryCard";
import { motion } from "framer-motion";
import fadeIn from "../../../Utility/varient";
const Category = () => {
  const axiosNonSecure = useAxios();

  const getData = async () => {
    const { data } = await axiosNonSecure.get("/top-categories");
    return data;
  };
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["categories"],
  });

  if (isError || error) {
    console.log(error);
  }
  console.log("top categories", categories);

  if (isLoading)
    return (
      <div className="grid max-w-7xl mx-auto lg:mt-16 mt-10 mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CategoryCardSkeleton></CategoryCardSkeleton>
        <CategoryCardSkeleton></CategoryCardSkeleton>
        <CategoryCardSkeleton></CategoryCardSkeleton>
        <CategoryCardSkeleton></CategoryCardSkeleton>
        <CategoryCardSkeleton></CategoryCardSkeleton>
        <CategoryCardSkeleton></CategoryCardSkeleton>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl my-10">
      <div className="text-center space-y-2">
        <motion.h2
          variants={fadeIn("right", 0.2)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className=" text-2xl md:text-4xl tracking-wide font-Nunito text-SecondaryColor  leading-relaxed mb-5 font-bold "
        >
          Explore Our Medicine Categories
        </motion.h2>
        <motion.p
          variants={fadeIn("right", 0.2)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-sm md:text-base leading-relaxed text-[#b2b0b0] max-w-screen-sm mx-auto "
        >
          Discover a wide range of medicine categories tailored to meet your
          health needs. Browse through popular categories like Pain Relief,
          Vitamins, and more. Click on any category to explore all available
          medicines, ensuring quick and easy access to the essentials you need.
        </motion.p>
      </div>

      <div className="grid lg:mt-16 mt-10 mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(
          (category) => (
            <CategoryCard key={category._id} category={category}></CategoryCard>
          )
          // console.log(foodItem)
        )}
      </div>
      {/* <div className="flex w-full justify-center items-center">
        <Link to={`/allFoods`}>
          {" "}
          <BtnWithICon
            classname={`w-[200px] md:w-[300px] rounded-full`}
            text={`View More`}
            icon={<FaArrowAltCircleRight></FaArrowAltCircleRight>}
          ></BtnWithICon>
        </Link>
      </div> */}
    </div>
  );
};

export default Category;

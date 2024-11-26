import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import bgImg from "../../assets/images/tableBg.jpg";
import fadeIn from "../../Utility/varient";
import TableWithAction from "../../shared/TableWithAction/TableWithAction";

const CategoryDetailsPage = () => {
  const axiosNonSecure = useAxios();
  const { category } = useParams();
  const getData = async () => {
    const { data } = await axiosNonSecure.get(
      `/medicines/category/${category}`
    );
    return data;
  };
  // tanStack
  const { data: medicineCategorys = [] } = useQuery({
    queryFn: async () => getData(),
    queryKey: ["category", category],
  });
  // console.log("category Details:", medicineCategorys);
  return (
    <div>
      <Helmet>
        {" "}
        <title>category | {category}</title>
      </Helmet>
      <div
        className={` flex justify-center  text-white  bg-cover bg-center min-h-screen w-full  font-Nunito     `}
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex backdrop-blur-md flex-col gap-4 bg-PrimaryColor/90 w-full my-7 rounded-lg py-4 max-w-7xl mx-auto">
          {" "}
          <div className="text-center space-y-2">
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className=" text-2xl md:text-4xl tracking-wide font-Nunito text-SecondaryColor  leading-relaxed mb-5 font-bold "
            >
              Shop by Category
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.2)}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-sm md:text-base leading-relaxed text-[#b2b0b0] max-w-screen-sm mx-auto "
            >
              Browse our extensive range of products, organized by category, to
              easily find the right solution for your health needs. Whether
              you&rsquo;re looking for syrups, tablets, or other treatments, we
              have something for everyone.
            </motion.p>
          </div>
          <TableWithAction rows={medicineCategorys}></TableWithAction>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsPage;

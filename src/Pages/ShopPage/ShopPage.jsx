import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Helmet } from "react-helmet-async";
import TableWithAction from "../../shared/TableWithAction/TableWithAction";
import { motion } from "framer-motion";
import fadeIn from "../../Utility/varient";
import bgImg from "../../assets/images/tableBg.jpg";
const ShopPage = () => {
  const axiosNonSecure = useAxios();
  const getData = async () => {
    const { data } = await axiosNonSecure.get("/allMedicines");
    return data;
  };
  const { data: allMedicines = [] } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: async () => getData(),
  });
  console.log("shop page", allMedicines);
  return (
    <div>
      <Helmet>
        {" "}
        <title>Shop</title>
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
              Shop for Health & Wellness
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.2)}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-sm md:text-base leading-relaxed text-[#b2b0b0] max-w-screen-sm mx-auto "
            >
              Discover premium medicines and health essentials, carefully
              curated for your well-being
            </motion.p>
          </div>
          <TableWithAction rows={allMedicines}></TableWithAction>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

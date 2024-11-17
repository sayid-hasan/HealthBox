import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";

// import required modules
import { Autoplay, Pagination, Virtual } from "swiper/modules";
import { motion } from "framer-motion";
import fadeIn from "../../../Utility/varient";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import DiscountSliderCard from "./DiscountSliderCard";
import SwipperBtns from "../Banner/SwipperBtns";

const DiscountSlider = () => {
  const axiosNonSecure = useAxios();
  const getData = async () => {
    const { data } = await axiosNonSecure.get("/discountedMedicine");
    return data;
  };
  const {
    data: discountedMedicine = [],
    // isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["discountedMedicine"],
  });

  if (isError || error) {
    console.log(error);
  }
  console.log("discountedMedicine", discountedMedicine);
  return (
    <div className="max-w-7xl mx-auto my-7 md:my-14 ">
      <div className="text-center mb-4 space-y-2">
        <motion.h2
          variants={fadeIn("right", 0.2)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className=" text-2xl md:text-4xl tracking-wide font-Nunito text-SecondaryColor  leading-relaxed mb-5 font-bold "
        >
          Hot Deals on Health Essentials!
        </motion.h2>
        <motion.p
          variants={fadeIn("right", 0.2)}
          initial={"hidden"}
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-sm md:text-base leading-relaxed text-[#b2b0b0] max-w-screen-sm mx-auto "
        >
          Hurry, limited-time offers on your must-have health products!
        </motion.p>
      </div>
      {/* draggable slider */}
      <Swiper
        modules={[Autoplay, Pagination, Virtual]}
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        virtual
        className="mySwiper relative py-7"
        breakpoints={{
          // 640px and up
          640: {
            slidesPerView: 1,
          },
          // 768px and up
          768: {
            slidesPerView: 2,
          },
          // 1024px and up
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {discountedMedicine.map((slideContent, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <DiscountSliderCard slider={slideContent}></DiscountSliderCard>
          </SwiperSlide>
        ))}
        {/* buttons */}
        <SwipperBtns></SwipperBtns>
      </Swiper>
    </div>
  );
};

export default DiscountSlider;

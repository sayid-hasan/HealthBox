import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";

// import required modules
import { Autoplay, Pagination, Navigation, Virtual } from "swiper/modules";

// import BannerCard from "./BannerCard";

import BannerCard from "./BannerCard";

import SwipperBtns from "./SwipperBtns";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const axiosNonSecure = useAxios();
  const { data: bannerData = [] } = useQuery({
    queryKey: ["bannerData"],
    queryFn: async () => {
      const res = await axiosNonSecure.get(`/sliderAdvertisements`);
      return res?.data;
    },
  });

  return (
    <div className=" max-w-[1550px] mx-auto  justify-between items-center  rounded-b-xl  bg-PrimaryColor ">
      {/* here will be swipper */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        virtual
        modules={[Autoplay, Pagination, Navigation, Virtual]}
        className="mySwiper relative"
      >
        {bannerData.map((slideContent, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <BannerCard banner={slideContent}></BannerCard>
          </SwiperSlide>
        ))}
        {/* buttons */}
        <SwipperBtns></SwipperBtns>
      </Swiper>
    </div>
  );
};

export default Banner;

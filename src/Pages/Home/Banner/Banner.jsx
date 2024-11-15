import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";

// import required modules
import { Autoplay, Pagination, Navigation, Virtual } from "swiper/modules";
import { bannerData } from "../../../../public/data/bannerData";
// import BannerCard from "./BannerCard";

import BannerCard from "./BannerCard";
import ArrowBtn from "../../../components/ArrowBtn/ArrowBtn";

const Banner = () => {
  const swiper = useSwiper();
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
        className="mySwiper"
      >
        {bannerData.map((slideContent, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <BannerCard banner={slideContent}></BannerCard>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* buttons */}
      <div className="swiper-btns  text-center text-[#ff7f50] flex text-3xl justify-center items-center gap-4 ">
        <button onClick={() => swiper.slideNext()}>
          <ArrowBtn
            classNameleft={`hover:-translate-x-3 transition duration-100 hover:text-[#B20000] `}
          ></ArrowBtn>
        </button>
        <button onClick={() => swiper.slidePrev()}>
          <ArrowBtn
            position="right"
            classNameright={`hover:translate-x-3 transition duration-100 hover:text-[#B20000] `}
          ></ArrowBtn>
        </button>
      </div>
    </div>
  );
};

export default Banner;

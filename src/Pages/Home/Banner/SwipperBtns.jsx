import { useSwiper } from "swiper/react";
import ArrowBtn from "../../../components/ArrowBtn/ArrowBtn";

const SwipperBtns = () => {
  const swiper = useSwiper();
  return (
    <>
      <div className="swiper-btns absolute md:left-5 z-10 md:bottom-5 bottom-2 left-3 text-center  text-PrimaryColor flex text-3xl justify-center items-center gap-4  ">
        <button
          className="group bg-SecondaryColor flex items-center justify-center h-8 w-8  md:h-12 md:w-12 transition duration-300 cursor-pointer hover:bg-PrimaryColor hover:border-SecondaryColor hover:border rounded-full"
          onClick={() => swiper.slidePrev()}
        >
          <ArrowBtn
            classNameleft={`group-hover:text-SecondaryColor  group-hover:-translate-x-5 transition duration-300 text-base md:text-3xl `}
          ></ArrowBtn>
        </button>
        <button
          className="group bg-SecondaryColor flex items-center justify-center h-8 w-8 md: md:h-12 md:w-12 transition duration-300 cursor-pointer hover:bg-PrimaryColor hover:border-SecondaryColor hover:border rounded-full "
          onClick={() => swiper.slideNext()}
        >
          <ArrowBtn
            position="right"
            classNameright={`group-hover:text-SecondaryColor  group-hover:translate-x-5 transition duration-300 text-base md:text-3xl `}
          ></ArrowBtn>
        </button>
      </div>
    </>
  );
};

export default SwipperBtns;

import { FaArrowRight } from "react-icons/fa";
import BtnWithICon from "../../../components/NormalBtns/BtnWithIcon";

import Carousol from "./Carousol";

const Reviews = () => {
  return (
    <div
      className="flex flex-col md:flex-row my-5 max-w-7xl mx-auto px-2
     "
    >
      {/* review Text */}
      <div className="md:w-1/3 w-full font-frescha spac">
        <div className="flex flex-col  text-center md:text-left  ">
          <h1 className="md:text-4xl my-4 !text-2xl font-bold font-firaSans tracking-wide">
            Our Customers Say It Best
          </h1>
          <p className="text-base text-[#b2b2b2] tracking-wider">
            Every dish tells a story, and our customers have a lot to share.
            Here’s what they loved most!
          </p>
          <div className="mt-7 md:mt-10 flex justify-center md:justify-start">
            <BtnWithICon
              icon={<FaArrowRight></FaArrowRight>}
              text="Your Opinion"
              classname={`bg-SecondaryColor hover:bg-[#FFF] hover:text-[#000] text-[#fff]`}
            ></BtnWithICon>
          </div>
        </div>
      </div>
      {/* review carousol */}
      <div className="md:w-2/3 w-full flex justify-center reviewCarousol">
        <Carousol></Carousol>
      </div>
    </div>
  );
};

export default Reviews;

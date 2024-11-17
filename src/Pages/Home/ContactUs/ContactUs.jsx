import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import ContactUsSekelton from "./ContactUsSekelton";
import { FaArrowRight } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../../lotties/ContactUs.json";

const ContactUs = () => {
  // lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <>
        <ContactUsSekelton></ContactUsSekelton>
      </>
    );
  }
  return (
    <div>
      <div className="flex my-10 px-5 items-center justify-center flex-col md:flex-row max-w-7xl  mx-auto rounded-lg  font-Nunito md:px-6  bg-PrimaryColor py-4  ">
        <div className="flex flex-col justify-between bg-PrimaryColor items-center w-full md:w-1/2 text-center md:text-left ">
          <div className="space-y-2">
            <h2 className="text-4xl text-SecondaryColor font-bold leading-tight lg:text-5xl text-center">
              Let&#39;s talk!
            </h2>
            <div className="text-SubTextColor font-Nunito">
              Send us any thought or any suggestion
            </div>
          </div>
          <div className="p-6 h-[23rem] md:h-[27rem] object-contain object-center overflow-hidden">
            <Lottie
              options={defaultOptions}
              animationData={animationData}
              height={200}
              width={200}
            ></Lottie>
          </div>
        </div>
        <form
          noValidate=""
          className=" flex-col flex md:w-1/2 w-full grow space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="text-base font-bold text-SecondaryColor "
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jon Doe"
              className="w-full p-3 rounded dark:bg-gray-100"
              defaultValue={loading ? user.displayName : "Jon Doe"}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base font-bold text-SecondaryColor "
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={loading ? user.displayName : "Jondoe@gmail.com"}
              className="w-full p-3 rounded dark:bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-base font-bold text-SecondaryColor "
            >
              Message
            </label>
            <textarea
              id="message"
              rows="3"
              className="w-full p-3 rounded dark:bg-gray-100 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn  grow w-full h-auto mt-4 border-transparent text-[#fff] hover:text-SecondaryColor hover:bg-PrimaryColor hover:border-SecondaryColor  bg-SecondaryColor font-bold px-4  md:py-4 py-2 text-sm group  group  flex items-center gap-3 justify-center transition duration-300 "
          >
            Send Message
            <FaArrowRight className="group-hover:translate-x-4 transition duration-300"></FaArrowRight>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

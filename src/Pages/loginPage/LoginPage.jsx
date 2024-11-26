import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import animationData from "../../lotties/logInpage.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BtnWithICon from "../../components/NormalBtns/BtnWithIcon";
import { SiLogmein } from "react-icons/si";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  console.log("location", location?.state);
  const { loginUser, setLoading, user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then((res) => {
        console.log(res.user);

        Swal.fire({
          position: "top",
          icon: "success",
          title: res.user?.displayName
            ? ` 'Welcome Back' ${res.user?.displayName}`
            : "logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    const subscription = watch(() => {
      // console.log(data);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  if (user) {
    return;
  }
  return (
    <div
      className={`bg-PrimaryColor  flex justify-center items-center text-white  bg-cover bg-center min-h-screen  font-Nunito  w-full    `}
      style={{
        // backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Helmet>
        <title>Log into your account</title>
      </Helmet>
      <div className="lg:max-w-5xl md:max-w-3xl max-w-md rounded-lg w-full md:bg-PrimaryColor/70 backdrop-blur-md mx-auto overflow-x-hidden font-firaSans my-5 md:my-10 relative ">
        <div className="flex w-full gap-10 md:p-5 p-2 flex-col-reverse md:flex-row  md:justify- items-stretch ">
          {" "}
          <div className="w-full my-5  md:w-1/2  space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
            <h1 className="text-2xl  text-SecondaryColor font-bold text-center">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate=""
              action=""
              className="space-y-6 flex flex-col"
            >
              {/* email */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="email"
                  className="block dark:text-gray-600 text-SecondaryColor font-bold tracking-widest"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="w-full text-black focus:outline-none px-4 py-3 rounded-md focus:border-SecondaryColor bg-white"
                />
                <span className="font-semibold text-[#B20000] font-Nunito tracking-wide">
                  {errors.email?.type === "required" && "Email is required"}
                </span>
              </div>
              {/* password */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="password"
                  className="block dark:text-gray-600 text-SecondaryColor font-bold tracking-widest"
                >
                  Password
                </label>
                <div className="flex items-center relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{6,}$/,
                    })}
                    placeholder="Password"
                    className="w-full text-black focus:outline-none px-4 py-3 rounded-md focus:border-SecondaryColor  bg-white"
                  />
                  <div
                    className="absolute right-0 -translate-x-3 "
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <FaEyeSlash className="text-SecondaryColor"></FaEyeSlash>
                    ) : (
                      <FaEye className="text-SecondaryColor"></FaEye>
                    )}
                  </div>
                </div>
                <span className="font-semibold text-[#b20000] font-Nunito tracking-wide">
                  {errors.password?.type === "required" &&
                    "Password is required"}
                  {errors.password?.type === "pattern" &&
                    "Password must have at least one uppercase letter, one special character and at least one digit, and be at least 6 characters long"}
                </span>
              </div>
              {/* photo URL */}

              <button
                type="submit"
                className=" flex justify-center items-center flex-1 grow w-full"
              >
                <BtnWithICon
                  icon={<SiLogmein></SiLogmein>}
                  text="Log in"
                  classname={` md:h-[50px] grow flex-1 w-full bg-SecondaryColor hover:!bg-PrimaryColor  hover:!text-SecondaryColor text-white !max-w-full `}
                ></BtnWithICon>
              </button>
            </form>

            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
              <div className="">
                <div className="px-3 text-base font-Nunito font-bold text-SecondaryColor tracking-[1px] divider divider-error">
                  Login with social accounts
                </div>
              </div>

              <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            </div>
            {/* social login */}
            <SocialLogin></SocialLogin>

            <p className="text-xs text-center text sm:px-6 ">
              New here?
              <Link
                to="/signup"
                className="underline dark:text-gray-800 mx-3 text-SecondaryColor font-semibold text"
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="md:w-1/2 w-full h-full md:mt-[8rem] ">
            <Lottie
              loop
              autoPlay
              animationData={animationData}
              options={defaultOptions}
              height={400}
              width={4000}
            ></Lottie>
          </div>
        </div>

        {/* <ToastContainer></ToastContainer> */}
      </div>
    </div>
  );
};

export default LoginPage;

import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/RegPageBg.jpg";
import animationData from "../../lotties/signUp.json";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import BtnWithICon from "../../components/NormalBtns/BtnWithIcon";
import { IKContext, IKUpload } from "imagekitio-react";

const SignUp = () => {
  const [imageUrl, setImageUrl] = useState(null);
  // get authentication params for image uplaod in imagekit from server
  const authenticator = async () => {
    try {
      // You can also pass headers and validate the request source in the backend, or you can use headers for any other use case.

      const response = await fetch("http://localhost:5000/get-signature");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      console.log(data);
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImageUrl(res?.url);
  };

  const [showPass, setShowPass] = useState(false);
  const {
    setLoading,
    user,
    setUser,
    createUser,
    updateUserProfile,
    signInWithFacebook,
    signInWithGoogle,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, name, password, role } = data;

    console.log("signUp page", email, name, password, role, imageUrl);
    const from = "/";
    // creating user
    // createUser(email, password)
    //   .then((res) => {
    //     toast.success("registered successfully");
    //     console.log(res.user);

    //     updateUserProfile(name, image)
    //       .then(() => {})
    //       .catch((err) => console.log(err));

    //     setUser({ ...user, displayName: name, photoURL: image });

    //     navigate(from);
    //   })
    //   .catch(() => {
    //     toast.error("user exist already");
    //   });
  };

  // social login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        //const user = result.user;
        toast.success(`welcome back ${result.user.displayName}`);
        // redirect to location
        navigate(location?.state || "/");
        //console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        setLoading(false);
      });
  };
  // facebook login
  const handleFacebookLogin = () => {
    signInWithFacebook()
      .then((result) => {
        //const user = result.user;
        toast.success(`welcome back ${result.user.displayName}`);
        // redirect to location
        navigate(location?.state || "/");
        //console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        setLoading(false);
      });
  };
  console.log("SignInpage", imageUrl);
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
  return (
    <div
      className={`bg-PrimaryColor  flex justify-center items-center text-white  bg-cover bg-center min-h-screen  font-Nunito  w-full    `}
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Helmet>
        <title>Register your account</title>
      </Helmet>
      <div className="lg:max-w-5xl md:max-w-3xl max-w-md rounded-lg w-full md:bg-PrimaryColor/70 backdrop-blur-md mx-auto overflow-x-hidden font-firaSans my-5 md:my-10  ">
        <div className="flex w-full gap-10 md:p-5 p-2 flex-col-reverse md:flex-row  md:justify- items-stretch ">
          {" "}
          <div className="w-full my-5  md:w-1/2  space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
            <h1 className="text-2xl  text-SecondaryColor font-bold text-center">
              Sign Up for more amazing features
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate=""
              action=""
              className="space-y-6 flex flex-col"
            >
              {/* Name */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="email"
                  className="block dark:text-gray-600 text-SecondaryColor font-bold tracking-widest"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                  className="w-full text-black focus:outline-none px-4 py-3 rounded-md focus:border-SecondaryColor bg-PrimaryColor "
                />
                <span className="font-semibold text-[#B20000] font-Nunito tracking-wide">
                  {errors.name?.type === "required" && "Name is required"}
                </span>
              </div>
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

              {/* ikimage upload */}
              <div className="col-span-2 sm:col-span-1 ">
                <label
                  htmlFor="photo"
                  className="block dark:text-gray-600 text-SecondaryColor font-bold tracking-widest"
                >
                  Your Image
                </label>
                <div className="flex justify-start items-center gap-1">
                  <IKContext
                    publicKey={"public_T4zX45oipeTjSumsrvipza8t/Lo="}
                    urlEndpoint={"https://ik.imagekit.io/sayidImage34"}
                    authenticator={authenticator}
                  >
                    <IKUpload
                      required={true}
                      onError={onError}
                      onSuccess={onSuccess}
                      useUniqueFileName={true}
                      isPrivateFile={false}
                      className="file-input bg-PrimaryColor focus:outline-none text-SecondaryColor w-full max-w-xs"
                    />
                  </IKContext>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      height={"50px"}
                      width={"50px"}
                      alt="select a image"
                    />
                  )}
                </div>
              </div>
              {/* select a role */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="role"
                  className="block dark:text-gray-600 text-SecondaryColor font-bold tracking-widest"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="select w-full max-w-full bg-PrimaryColor text-black focus:outline-none"
                >
                  <option disabled selected>
                    Pick your favorite Simpson
                  </option>
                  <option className="font-bold text-black">User</option>
                  <option className="font-bold text-black">Seller</option>
                </select>
                <span className="font-semibold text-white font-Nunito tracking-wide">
                  {errors.role?.type === "required" && "Role is required"}
                </span>
              </div>

              <button
                type="submit"
                className=" flex justify-center items-center flex-1 grow w-full"
              >
                <BtnWithICon
                  icon={<FaSignInAlt></FaSignInAlt>}
                  text="Get Registered"
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
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleGoogleLogin();
                }}
                aria-label="Log in with Google"
                className="p-3 rounded-sm"
              >
                <div className="h-12 aspect-square rounded-full border-[1px] flex justify-center items-center border-SecondaryColor hover:bg-SecondaryColor hover:border-white text-SecondaryColor hover:scale-105 hover:text-white transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-[30px] h-[30px] fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                </div>
              </button>

              <button
                onClick={() => {
                  handleFacebookLogin();
                }}
                aria-label="Log in with GitHub"
                className="p-3 rounded-sm"
              >
                <div className="h-12 aspect-square rounded-full border-[1px] flex justify-center items-center border-SecondaryColor hover:bg-SecondaryColor hover:border-white text-SecondaryColor hover:scale-105 hover:text-white transition duration-300">
                  <svg
                    height="30px"
                    width="30px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-337 273 123.5 256"
                    xmlSpace="preserve"
                    className="fill-current"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"></path>{" "}
                    </g>
                  </svg>
                </div>
              </button>
            </div>

            <p className="text-xs text-center text sm:px-6 ">
              Already have an account?
              <Link
                to="/login"
                className="underline dark:text-gray-800 mx-3 text-SecondaryColor font-semibold text"
              >
                Sign in
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

export default SignUp;

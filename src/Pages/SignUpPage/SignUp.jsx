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
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const SignUp = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const axiosNonSecure = useAxios();
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
    setProgress(0);
    setUploading(false);
    toast.error("sorry, looks like something went wrong");
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setProgress(100);
    setUploading(false);
    toast.success("image uploaded successfully");
    setImageUrl(res?.url);
  };
  const onUploadStart = (evt) => {
    console.log("Start", evt);
    if (evt) {
      setUploading(true);
    }
  };
  const onUploadProgress = (progress) => {
    setUploading(false);
    console.log("Progress", progress);
    const percentage = Math.round((progress?.loaded / progress.total) * 98);
    setProgress(percentage);
  };

  const [showPass, setShowPass] = useState(false);
  const {
    user,
    setUser,

    createUser,

    updateUserProfile,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, name, password, role } = data;
    if (!imageUrl) {
      toast.error("Please upload an image before submitting!");
      return;
    }

    const from = "/";
    // creating user
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateUserProfile(name, imageUrl).then(() => {
          // create user entry in database
          const userInfo = {
            email,
            name,
            password,
            role: role.toLowerCase(),
            imageUrl,
          };
          console.log("singup page", userInfo);
          axiosNonSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top",
                icon: "success",
                title: "sign up successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              setUser({ ...user, displayName: name, photoURL: imageUrl });

              navigate(from);
              window.location.reload();
            } else if (res.data.message) {
              Swal.fire({
                position: "top",
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });

              navigate(from);
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        reset();
        Swal.fire({
          position: "top",
          icon: "error",

          title: err,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      });
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
  }, [watch, imageUrl]);
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
      <div className="lg:max-w-5xl md:max-w-3xl max-w-md rounded-lg w-full md:bg-PrimaryColor/70 backdrop-blur-md mx-auto overflow-x-hidden font-firaSans my-5 md:my-10 relative ">
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
                      onUploadStart={onUploadStart}
                      onUploadProgress={onUploadProgress}
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
                  {...register("role", {
                    required: true,
                  })}
                  className="select w-full max-w-full bg-PrimaryColor text-black focus:outline-none"
                >
                  <option disabled selected>
                    Select the role
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
            {/* social login */}
            <SocialLogin></SocialLogin>

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
        {/* progress bar */}
        {progress !== 0 && progress !== 100 && (
          <div className=" absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10 backdrop-blur-sm">
            {" "}
            <div
              className="radial-progress bg-PrimaryColor text-SecondaryColor border-PrimaryColor font-bold border-4"
              style={{
                "--value": progress,
                "--size": "7rem",
                "--thickness": "10px",
              }}
              role="progressbar"
            >
              {progress}%
            </div>
          </div>
        )}
        {/* loading */}
        {uploading && (
          <div className=" absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10 backdrop-blur-sm">
            {" "}
            <div
              className="loading loading-bars loading-lg bg-SecondaryColor  border-PrimaryColor font-bold border-4"
              role=""
            ></div>
          </div>
        )}

        {/* <ToastContainer></ToastContainer> */}
      </div>
    </div>
  );
};

export default SignUp;

import { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { signInWithGithub, signInWithFacebook, signInWithGoogle, setLoading } =
    useContext(AuthContext);
  const from = location.state?.from || "/";
  const axiosNonSecure = useAxios();
  // social login

  const saveUserNavigate = (result) => {
    const userInfo = {
      email: result?.user?.email,
      name: result?.user?.displayName,
      role: "user",
      imageUrl: result.user?.photoURL,
    };
    console.log("after third party social login", result.user);
    axiosNonSecure.post("/users", userInfo).then((res) => {
      console.log("social login", res.data);
      //const user = result.user;
      if (res.data?.insertedId) {
        toast.success(`welcome back ${result.user.displayName}`);
        setLoading(false);
        navigate(from);
      } else {
        toast.error("couldn't logged in");
      }
    });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        // redirect to location
        saveUserNavigate(result);
        //console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(`could not logged in ${error.message}`);
        console.log(error);
        setLoading(false);
      });
  };
  // facebook login
  const handleFacebookLogin = () => {
    signInWithFacebook()
      .then((result) => {
        // redirect to location
        saveUserNavigate(result);
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(`could not logged in ${error.message}`);
        console.log(error);
        setLoading(false);
      });
  };
  // github login
  const handleGithubLogin = () => {
    signInWithGithub()
      .then((result) => {
        // redirect to location
        saveUserNavigate(result);
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error(`could not logged in ${error.message}`);
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="flex justify-center space-x-4">
      {/* gogle */}
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
      {/* facebok */}
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
      {/* github */}
      <button
        onClick={() => {
          handleGithubLogin();
        }}
        aria-label="Log in with GitHub"
        className="p-3 rounded-sm"
      >
        <div className="h-12 aspect-square rounded-full border-[1px] flex justify-center items-center border-SecondaryColor hover:bg-SecondaryColor hover:border-white text-SecondaryColor hover:scale-105 hover:text-white transition duration-300">
          <FaGithub></FaGithub>
        </div>
      </button>
    </div>
  );
};

export default SocialLogin;

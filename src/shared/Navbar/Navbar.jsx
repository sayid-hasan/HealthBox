import { toast, ToastContainer } from "react-toastify";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/user.png";
import ShineyButton from "../../components/ShineyButton/ShineyButton";
import cartImg from "../../assets/images/cartIcon.png";

const Nav = () => {
  const { user, loading, logOutUser } = useContext(AuthContext);
  const handlelogOutUser = () => {
    logOutUser()
      .then(toast.info("Logged Out Successfully!"))
      .catch((err) => toast.error("Couldn't log out", err.message));
  };
  const navlinks = (
    <>
      <li className="flex !focus:outline-none !focus:ring-0 !active:bg-transparent">
        {" "}
        <NavLink
          to="/"
          className={`   
          flex items-center px-4 h-full text-TextColor rounded-none uppercase text-base  duration-75 !focus:outline-none !focus:ring-0 !active:bg-transparent `}
        >
          Home
        </NavLink>
      </li>

      <li className="flex">
        {" "}
        <NavLink
          to="/shop"
          className={` 
          flex items-center h-full px-4 text-TextColor rounded-none uppercase text-base  duration-75  `}
        >
          Shop
        </NavLink>
      </li>

      {user && (
        <li className="flex">
          {" "}
          <NavLink
            to="/dashboard"
            className={` flex items-center px-4 h-full text-TextColor rounded-none duration-75 uppercase text-base  `}
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li className="flex">
        {" "}
        <NavLink
          to="/cart"
          className={` flex items-center px-4 h-full text-TextColor rounded-none duration-75 uppercase text-base  `}
        >
          <img
            src={cartImg}
            className="md:w-12 md:h-12 w-7 h-7 object-contain object-center"
          ></img>
        </NavLink>
      </li>
    </>
  );

  const buttonProfile = (
    <>
      {/* buttons and user profile */}
      <div className="items-center flex-shrink-0 lg:flex ">
        {/* <button className="self-center px-8 py-3 rounded">Sign in</button> */}
        {loading ? (
          <>
            <span className="loading loading-spinner text-success"></span>
          </>
        ) : (
          <>
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" m-1">
                    <div className="avatar online">
                      <div className="w-11 rounded-full">
                        <img src={user?.photoURL || logo} />
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button onClick={() => handlelogOutUser()}>
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="self-center   w-full bg-transparent text-center border border-transparent"
                >
                  <ShineyButton text="Join us"></ShineyButton>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </>
  );

  return (
    <div>
      <div className="navbar p-0  text-TextColor items-center md:items-center font-Nunito">
        <div className="justify-start  grow">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost !pl-0 md:hidden"
            >
              {/* small screen icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 18  18 "
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content mt-3 z-[4] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlinks}
            </ul>
          </div>
          <Link
            to="/"
            className="  hover:tracking-wide transition-all duration-900 cursor-pointer rounded-full   text-2xl md:text-4xl font-bold  bg-opacity-70 md:py-5 py-2 px-0 h-auto min-h-0  "
          >
            <h2 className="font-firaSans">
              <span className="text-SecondaryColor text-4xl">H</span>ealth
              <span className="text-SecondaryColor text-4xl">B</span>ox
            </h2>
          </Link>
        </div>
        <div className="navbar-center hidden md:flex ">
          <ul className="menu menu-horizontal px-1  ">{navlinks}</ul>
        </div>
        <div className="justify-end  z-[4]">{buttonProfile}</div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Nav;

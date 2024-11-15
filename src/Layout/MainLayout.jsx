import { Outlet } from "react-router-dom";
import Nav from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-[1550px] mx-auto overflow-hidden p-0">
      <div className="bg-PrimaryColor mx-auto px-4 max-w-[1550px]">
        {" "}
        <Nav></Nav>
      </div>
      <div className="max-w-[1550px] mx-auto p-0 ">
        <div className=" min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="bg-PrimaryColor mx-auto px-4 max-w-[1550px] mb-0">
        {" "}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MainLayout;

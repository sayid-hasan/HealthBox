import { Outlet } from "react-router-dom";
import Nav from "../shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-PrimaryColor">
      <div className="container mx-auto p-0 ">
        <Nav></Nav>
        <div className="max-w-7xl mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

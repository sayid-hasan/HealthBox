import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { CiCalendar, CiMenuBurger } from "react-icons/ci";
import { FcSalesPerformance } from "react-icons/fc";
import {
  FaBars,
  FaBook,
  FaHome,
  FaList,
  FaSchool,
  FaUsers,
} from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

import useSeller from "../../Hooks/useSeller";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

const drawerWidth = 280;
const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // TDO : get admin value from database
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  // const isAdmin = true;
  // const isSeller = true;
  //   refetch();
  console.log(isAdmin, isSeller);
  //   const isSeller = false;
  //   const isAdmin = true;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div
      style={{
        backgroundImage: `linear-gradient(62deg, #1364FF 0%, #DEE9FF 100%)
        `,
      }}
      className="md:max-h-full max-h-fit h-fit md:h-full text-[#0A2A66]  font-Nunito  !bg-cover z-10"
    >
      <Toolbar className="p-5">
        <Typography
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { xs: "block", sm: "block" },
            textAlign: "Center",
            width: "100%",
          }}
        >
          <span className="uppercase w-full font-Nunito">
            {" "}
            <span className="  text-base leading-[31px] md:text-2xl  font-black">
              HealthBox
            </span>{" "}
            <br />
            <span className="text-xs w-full font-bold tracking-[2px] inline-flex my-2 gap-2 ">
              Your trusted medicine shop
            </span>
          </span>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {user && !isSeller && !isAdmin && (
          <>
            {" "}
            {/* my profile /userhome*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/myprofile"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaHome></FaHome>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    My Profile
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* myapplications */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/myapplications"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <CiCalendar></CiCalendar>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    My Applications
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* My Reviews */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/myreviews"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <MdOutlinePayment></MdOutlinePayment>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    My Reviews
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </>
        )}
        {user && isSeller && !isAdmin && (
          <>
            {" "}
            {/* seller profile */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/sellerprofile"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaHome></FaHome>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Seller Profile
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* manage medicines */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/managemedicines"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaList></FaList>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Medicines
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/*allappliedApplications */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/appliedscholarships"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaBook></FaBook>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    All Applied Applications
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* All/manage Reviews*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/allreviews"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaUsers></FaUsers>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    All Reviews
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* Add schoalrship */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/addscholarship"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaSchool></FaSchool>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    add Schoalarship
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </>
        )}
        {user && !isSeller && isAdmin && (
          <>
            {" "}
            {/* adminhome */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/admin"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaHome></FaHome>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Admin Profile
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* Manage Users*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/manageusers"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaUsers></FaUsers>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Users
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/*manage category list */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/managecategory"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaBook></FaBook>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Category
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* slaes report*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/salesreport"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FcSalesPerformance />
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Sales Report
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* manage payments */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/managepayments"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaList></FaList>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Payments
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/*Manage ads*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/manageads"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaBook></FaBook>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Adds
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        {/* Home */}
        <ListItem>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { color: "white" } : {};
            }}
            to="/"
          >
            <ListItemButton
              sx={{ display: "flex", gap: "15px", textDecoration: "uppercase" }}
            >
              <span className="text-2xl">
                <FaHome></FaHome>
              </span>
              <span className="font-Cinzel  text-base font-bold leading-[22px]">
                Home
              </span>
            </ListItemButton>
          </NavLink>
        </ListItem>
        {/* all Scholarship */}
        <ListItem>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { color: "white" } : {};
            }}
            to="/"
          >
            <ListItemButton
              sx={{ display: "flex", gap: "15px", textDecoration: "uppercase" }}
            >
              <span className="text-2xl">
                <CiMenuBurger></CiMenuBurger>
              </span>
              <span className="font-Cinzel  text-base font-bold leading-[22px]">
                menu
              </span>
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>DashBoard</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Toolbar
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: "10",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="hover:bg-SecondaryColor"
            sx={{
              padding: "10px",
              backgroundColor: "#DEE9FF",
            }}
          >
            <FaBars className="  text-SecondaryColor text-3xl hover:text-white" />
          </IconButton>
        </Toolbar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,

            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Outlet></Outlet>
        </Box>
      </Box>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Dashboard;

import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUpPage/SignUp";
import LoginPage from "../Pages/loginPage/LoginPage";
import ShopPage from "../Pages/ShopPage/ShopPage";
import CategoryDetailsPage from "../Pages/CategoryDetailsPage/CategoryDetailsPage";
import CartPage from "../Pages/CartPage/CartPage";
import Checkout from "../Pages/Checkout/Checkout";
import SuccessPayment from "../Pages/Checkout/SuccessPayment";
import Dashboard from "../Layout/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/categoryDetails/:category",
        element: <CategoryDetailsPage></CategoryDetailsPage>,
      },
      {
        path: "/shop",
        element: <ShopPage></ShopPage>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "/payment-success",
        element: <SuccessPayment></SuccessPayment>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // dashboard api need to relocate after creating dashboard layout
      {
        path: "admin",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "manageusers",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
]);

export default router;

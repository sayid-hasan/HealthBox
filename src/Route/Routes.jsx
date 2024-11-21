import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUpPage/SignUp";
import LoginPage from "../Pages/loginPage/LoginPage";
import ShopPage from "../Pages/ShopPage/ShopPage";
import CategoryDetailsPage from "../Pages/CategoryDetailsPage/CategoryDetailsPage";
import CartPage from "../Pages/CartPage/CartPage";

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
    ],
  },
  {
    path: "dashboard",
    // element: (
    //   <PrivateRoute>
    //     <Dashboard></Dashboard>
    //   </PrivateRoute>
    // ),
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      // dashboard api need to relocate after creating dashboard layout
    ],
  },
]);

export default router;

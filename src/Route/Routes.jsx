import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Pages/SignUpPage/SignUp";

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

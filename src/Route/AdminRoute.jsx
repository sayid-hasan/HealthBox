import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  console.log("useAdmin", location);
  if (loading || isAdminLoading) {
    return <div className="loading loading-spinner"></div>;
  } else if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate
      to="/"
      state={{ ...location?.state, from: location?.pathname }}
      replace
    ></Navigate>
  );
};

export default AdminRoute;

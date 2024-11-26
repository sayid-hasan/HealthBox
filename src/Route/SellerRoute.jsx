import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../Hooks/useSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoadings] = useSeller();
  const location = useLocation();
  if (loading || isSellerLoadings) {
    return <div className="loading loading-spinner"></div>;
  }
  if (user && isSeller) {
    return children;
  }
  return (
    <Navigate
      to="/"
      state={{ ...location?.state, from: location.pathname }}
      replace
    ></Navigate>
  );
};

export default SellerRoute;

import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading)
    return (
      <>
        <p>wait</p>
      </>
    );
  if (user) {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{ ...location?.state, from: location.pathname }}
    ></Navigate>
  );
};

export default PrivateRoute;

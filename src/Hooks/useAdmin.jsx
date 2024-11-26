import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   const axiosPublic = useAxiosPublic();
  const {
    data: isAdmin,

    isPending: isAdminLoading,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      // console.log(res);
      return res?.data?.admin;
    },
  });
  console.log("isAdmin", isAdmin);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;

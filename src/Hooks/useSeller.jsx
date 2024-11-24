import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useSeller = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  //   const axiosPublic = useAxiosPublic();
  const {
    data: isSeller,

    isPending: isSellerLoading,
  } = useQuery({
    queryKey: [user?.email, "isSeller"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/seller/${user?.email}`);
      console.log(res);
      return res?.data?.seller;
    },
  });
  console.log("isSeller", isSeller);
  return [isSeller, isSellerLoading];
};

export default useSeller;

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSeller = () => {
  const { user, loading } = useAuth();
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
      // console.log(res);
      return res?.data?.seller;
    },
  });
  console.log("isSeller", isSeller);
  return [isSeller, isSellerLoading];
};

export default useSeller;

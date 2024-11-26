import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // tanstack
  const { data: paymentHisSeller = [], refetch } = useQuery({
    queryKey: ["paymentHisSeller", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/seller-medicines-sell/${user?.email}`
      );
      return res?.data;
    },
  });
  console.log("seller medicines", paymentHisSeller);
  return <div></div>;
};

export default PaymentHistory;

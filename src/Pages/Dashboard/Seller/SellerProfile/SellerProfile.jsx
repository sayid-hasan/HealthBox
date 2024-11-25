import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const SellerProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [salesData, setSalesData] = useState();
  useEffect(() => {
    const fetchSalesRevenue = async () => {
      try {
        const { data } = await axiosSecure.get(`/sales-revenue/${user?.email}`);
        setSalesData(data);
      } catch (error) {
        console.error("Failed to fetch sales revenue:", error);
      }
    };
    fetchSalesRevenue();
  }, [axiosSecure, user?.email]);

  console.log("sales Data", salesData);

  return <div></div>;
};

export default SellerProfile;

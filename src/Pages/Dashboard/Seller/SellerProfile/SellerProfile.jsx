import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const SellerProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [salesData, setSalesData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSalesRevenue = async () => {
      try {
        const { data } = await axiosSecure.get(`/sales-revenue/${user?.email}`);
        setSalesData(data);
      } catch (error) {
        console.error("Failed to fetch sales revenue:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalesRevenue();
  }, [axiosSecure, user?.email]);
  // Filter data for paid and pending statuses
  const paidData = salesData?.find((item) => item.status === "paid");
  const pendingData = salesData?.find((item) => item.status === "pending");

  //   console.log("sales Data", salesData);
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center">
        <div className="grow flex-1 grid grid-cols-1 lg:grid-cols-2 justify-center items-center px-7 gap-5">
          {/* Skeleton for card1 */}

          {/* Skeleton for card2 */}
          <div className="card animate-pulse skeleton bg-PrimaryColor max-w-5xl p-7 ">
            <div className="card-body skeleton">
              <h2 className="card-title skeleton"></h2>
              <p className="skeleton"></p>
            </div>
          </div>

          {/* Skeleton for card3 */}
          <div className="card skeleton animate-pulse bg-PrimaryColor max-w-5xl p-7 ">
            <div className="card-body skeleton">
              <h2 className="card-title skeleton"></h2>
              <p className="skeleton"></p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-[#e2e2e2] max-w-7xl mx-auto h-screen flex items-center justify-center">
      <Helmet>
        <title>HealthBox | Seller Profile</title>
      </Helmet>
      <div className="container mx-auto">
        <div className=" grow flex-1 grid grid-cols-1 lg:grid-cols-2 justify-center items-center  px-7 gap-5">
          {/* card2 */}
          <div className="card bg-PrimaryColor    max-w-5xl  p-7 border border-SecondaryColor bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white">
            <div className="card-body">
              <h2 className="card-title">Paid Amount</h2>
              <p>${paidData?.amount.toFixed(2)}</p>
            </div>
          </div>
          {/* card3 */}
          <div className="card bg-PrimaryColor   max-w-5xl  p-7 border border-SecondaryColor bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white">
            <div className="card-body">
              <h2 className="card-title">Pending Amount</h2>
              <p>${pendingData?.amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

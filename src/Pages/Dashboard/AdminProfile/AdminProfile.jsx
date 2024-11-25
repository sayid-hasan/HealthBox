import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminProfile = () => {
  const [overview, setOverview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const { data } = await axiosSecure.get("/admin/overview");
        setOverview(data);
      } catch (error) {
        console.error("Failed to fetch admin overview:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverview();
  }, [axiosSecure]);
  // Filter data for paid and pending statuses
  const paidData = overview?.find((item) => item.status === "paid");
  const pendingData = overview?.find((item) => item.status === "pending");

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center">
        <div className="grow flex-1 grid grid-cols-1 lg:grid-cols-2 justify-center items-center px-7 gap-5">
          {/* Skeleton for card1 */}
          <div className="card skeleton bg-PrimaryColor lg:col-span-3 max-w-7xl p-7 animate-pulse">
            <div className="card-body skeleton">
              <h2 className="card-title skeleton"></h2>
              <p className="skeleton"></p>
            </div>
          </div>

          {/* Skeleton for card2 */}
          <div className="card skeleton bg-PrimaryColor max-w-5xl p-7 animate-pulse">
            <div className="card-body skeleton">
              <h2 className="card-title skeleton"></h2>
              <p className="skeleton"></p>
            </div>
          </div>

          {/* Skeleton for card3 */}
          <div className="card skeleton bg-PrimaryColor max-w-5xl p-7 animate-pulse">
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
        <title>HealthBox | Admin Profile</title>
      </Helmet>
      <div className=" grow flex-1 grid grid-cols-1 lg:grid-cols-2 justify-center items-center  px-7 gap-5">
        {/* card1 */}
        <div className="card bg-PrimaryColor lg:col-span-3    max-w-7xl  p-7 border border-SecondaryColor bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white">
          <div className="card-body">
            <h2 className="card-title">Total Revenue</h2>
            <p>
              $
              {parseFloat(paidData?.totalAmount.toFixed()) +
                parseFloat(pendingData?.totalAmount.toFixed())}
            </p>
            {/* <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div> */}
          </div>
        </div>
        {/* card2 */}
        <div className="card bg-PrimaryColor    max-w-5xl  p-7 border border-SecondaryColor bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white">
          <div className="card-body">
            <h2 className="card-title">Paid Amount</h2>
            <p>${paidData?.totalAmount.toFixed()}</p>
            {/* <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div> */}
          </div>
        </div>
        {/* card3 */}
        <div className="card bg-PrimaryColor   max-w-5xl  p-7 border border-SecondaryColor bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white">
          <div className="card-body">
            <h2 className="card-title">Pending Amount</h2>
            <p>$${pendingData?.totalAmount.toFixed()}</p>
            {/* <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

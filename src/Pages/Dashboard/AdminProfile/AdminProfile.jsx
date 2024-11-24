import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminProfile = () => {
  const [overview, setOverview] = useState({
    totalRevenue: 0,
    pendingTotal: 0,
    paidTotal: 0,
  });
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

  if (isLoading) return <div>Loading...</div>;
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
            <p>${overview?.totalRevenue.toFixed(2)}</p>
            {/* <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div> */}
          </div>
        </div>
        {/* card2 */}
        <div className="card bg-PrimaryColor    max-w-5xl  p-7 border border-SecondaryColor bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white">
          <div className="card-body">
            <h2 className="card-title">Paid Amount</h2>
            <p>
              $
              {overview?.totalRevenue.toFixed(2) -
                overview?.pendingTotal.toFixed(2)}
            </p>
            {/* <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div> */}
          </div>
        </div>
        {/* card3 */}
        <div className="card bg-PrimaryColor   max-w-5xl  p-7 border border-SecondaryColor bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white">
          <div className="card-body">
            <h2 className="card-title">Pending Amount</h2>
            <p>${overview?.pendingTotal.toFixed(2)}</p>
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

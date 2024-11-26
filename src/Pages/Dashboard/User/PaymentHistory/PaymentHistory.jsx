import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import PaymentsHistory from "./PaymentsHistory";

const UserPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // tanstack
  const { data: userPaymentHistory = [], refetch } = useQuery({
    queryKey: ["userPaymentHistory", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/purchases/${user?.uid}`);
      return res?.data;
    },
  });
  console.log("userPaymentHistory", userPaymentHistory);
  return (
    <div className="w-full relative">
      <Helmet>User | Payment History</Helmet>
      <div className="bg-white px-4 md:px-12  md:py-12">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-2xl text-SecondaryColor md:text-3xl  md:leading-[43px]">
            Total Payments: {userPaymentHistory?.length}
          </h2>
        </div>
        {/* table */}

        <div className="w-full">
          <div className="overflow-scroll md:overflow-y-auto md:overflow-x-auto   md:max-w-full rounded-t-lg mt-3">
            <table className="table space-y-3 font-Inter rounded-t-lg">
              {/* head */}
              <thead className="bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white-auto  py-3 md:py-6">
                <tr className="text-white h-auto rounded-t-2xl py-3 md:py-6 ">
                  <th className="py-4 md:py-6">#</th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    UserID
                  </th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    TRX ID
                  </th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    Date
                  </th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    status
                  </th>
                </tr>
              </thead>
              <tbody>
                {userPaymentHistory.map((payment, idx) => (
                  <PaymentsHistory
                    key={payment._id}
                    payment={payment}
                    idx={idx}
                    refetch={refetch}
                  ></PaymentsHistory>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentHistory;

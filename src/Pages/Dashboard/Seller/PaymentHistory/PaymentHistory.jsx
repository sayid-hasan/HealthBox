import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import PaymentTable from "./PaymentTable/PaymentTable";

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
  return (
    <div className="w-full relative">
      <Helmet>Seller | Payment History</Helmet>
      <div className="bg-white px-4 md:px-12  md:py-12">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-2xl text-SecondaryColor md:text-3xl  md:leading-[43px]">
            Total Sells: {paymentHisSeller?.length}
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
                    Amount
                  </th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHisSeller.map((payment, idx) => (
                  <PaymentTable
                    key={payment._id}
                    payment={payment}
                    idx={idx}
                    refetch={refetch}
                  ></PaymentTable>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SellerMedicineAds from "./MedicinesAd";
import { Helmet } from "react-helmet-async";
import AdsModal from "./AdsModal";
import BtnWithICon from "../../../../components/NormalBtns/BtnWithIcon";
import { MdAdd } from "react-icons/md";

const AskAds = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [modal, setModal] = useState(false);

  // tanstack
  const { data: sellerMedicinesAds = [], refetch } = useQuery({
    queryKey: ["sellerMedicinesAds", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sellerAdsMedicines/${user?.email}`);
      return res?.data;
    },
  });
  console.log("seller medicines", sellerMedicinesAds);
  return (
    <div className="w-full relative">
      <Helmet>Seller | Ask for Ads</Helmet>
      <div className="bg-white px-4 md:px-12  md:py-12">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-2xl text-SecondaryColor md:text-3xl  md:leading-[43px]">
            Total Medicines on Ads: {sellerMedicinesAds?.length}
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
                    Medicine
                  </th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    Medicine Image
                  </th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    description
                  </th>

                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellerMedicinesAds.map((medicine, idx) => (
                  <SellerMedicineAds
                    key={medicine._id}
                    medicine={medicine}
                    idx={idx}
                    refetch={refetch}
                  ></SellerMedicineAds>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* category btn */}
        <div className="w-full flex justify-center">
          {/* add a category */}

          <button onClick={() => setModal(true)}>
            <BtnWithICon
              text={"Give a medicine ads"}
              icon={<MdAdd></MdAdd>}
              classname={`hover:text-SecondaryColor hover:border-SecondaryColor  border hover:bg-PrimaryColor flex-1 max-w-[300px]`}
            ></BtnWithICon>
          </button>
        </div>
      </div>
      {
        <AdsModal
          modal={modal}
          setModal={setModal}
          refetch={refetch}
        ></AdsModal>
      }
    </div>
  );
};

export default AskAds;

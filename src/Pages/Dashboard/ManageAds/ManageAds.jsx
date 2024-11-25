import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import BtnWithICon from "../../../components/NormalBtns/BtnWithIcon";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [advertisements, setAdvertisements] = useState([]);

  const fetchAdvertisements = useCallback(async () => {
    try {
      const { data } = await axiosSecure.get("/advertisements");
      setAdvertisements(data);
    } catch (error) {
      console.error("Failed to fetch advertisements:", error);
    }
  }, [axiosSecure]);

  const handletoggleSlideStatus = async (id) => {
    try {
      const { data } = await axiosSecure.put(
        `/advertisements/${id}/toggleSlide`
      );
      if (data.modifiedCount > 0) {
        toast.success("updates successfully");
      } else {
        toast.error("Failed to update status");
      }
      fetchAdvertisements(); // Refresh advertisements list
    } catch (error) {
      toast.error("Failed to toggle slide status:", error);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, [fetchAdvertisements]);

  return (
    <div className="bg-[#F6F6F6] pt-5 px-4 min-h-screen">
      <Helmet>
        <title>Admin | Manage Ads</title>
      </Helmet>
      <div className="max-w-7xl rounded-lg    ">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-xs md:text-3xl  md:leading-[43px] text-SecondaryColor">
            Total Ads: {advertisements.length}
          </h2>
        </div>
        {/* table */}

        <div>
          <div className="overflow-scroll md:overflow-y-auto md:overflow-x-auto max-w-[350px]  md:max-w-full rounded-t-lg mt-3 ">
            <table className="table space-y-3 font-Inter rounded-t-lg">
              {/* head */}
              <thead className="bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white-auto  py-3 md:py-6">
                <tr className="text-white h-auto rounded-t-2xl py-3 md:py-6 ">
                  <th className="py-4 md:py-6">#</th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Image
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Name
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    description
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    seller Email
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {advertisements.map((ads, idx) => (
                  <tr key={ads._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{ads.image}</span>
                      </div>
                    </td>
                    <td className="text-[#737373] text-base py-3 md:py-6 ">
                      <span>{ads.name}</span>
                    </td>
                    <td className="text-[#737373] text-base py-3 md:py-6 ">
                      <span>{ads?.description}</span>
                    </td>
                    <td className="text-[#737373] text-base py-3 md:py-6 ">
                      <span>{ads.sellerEmail}</span>
                    </td>
                    <td className="text-[#737373] text-base flex justify-center items-center">
                      <button onClick={() => handletoggleSlideStatus(ads._id)}>
                        <BtnWithICon
                          text={
                            ads.isOnSlide
                              ? "Remove from Slider"
                              : "Add to Slider"
                          }
                          classname={`bg-SecondaryColor hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor mt-0`}
                        ></BtnWithICon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

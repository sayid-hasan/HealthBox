import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import Category from "./Category";
import BtnWithICon from "../../../components/NormalBtns/BtnWithIcon";
import { MdAdd } from "react-icons/md";
import AddModal from "./AddModal/AddModal";
import { useState } from "react";

const ManageCategory = () => {
  const [modal, setModal] = useState(null); // For editing

  const axiosSecure = useAxiosSecure();
  const getData = async () => {
    const response = await axiosSecure.get("/categories");
    return response.data;
  };

  const { data: categorieData = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData(),
  });

  return (
    <div className="w-full relative">
      <Helmet>Admin | Manage Categorys</Helmet>
      <div className="bg-white px-4 md:px-12  md:py-12">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-2xl text-SecondaryColor md:text-3xl  md:leading-[43px]">
            Total Category: {categorieData?.length}
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
                    Category Name
                  </th>
                  <th className="text-base text-center uppercase font-semibold leading-[19px]">
                    Category Image
                  </th>

                  <th className="text-base  uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                  <th className="text-base  uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categorieData.map((category, idx) => (
                  <Category
                    key={category._id}
                    category={category}
                    idx={idx}
                    refetch={refetch}
                  ></Category>
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
              text={"add a category"}
              icon={<MdAdd></MdAdd>}
              classname={`hover:text-SecondaryColor hover:border-SecondaryColor  border hover:bg-PrimaryColor flex-1 max-w-`}
            ></BtnWithICon>
          </button>
        </div>
      </div>
      {
        <AddModal
          modal={modal}
          setModal={setModal}
          refetch={refetch}
        ></AddModal>
      }
    </div>
  );
};

export default ManageCategory;

import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Category from "./Category";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [modalData, setModalData] = useState(null); // For editing
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImage: "",
  });
  const axiosSecure = useAxiosSecure();
  const getData = async () => {
    const response = await axiosSecure.get("/categories");
    return response.data;
  };

  const { data: categorieData = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCategory = async () => {
    try {
      const { data } = await axiosSecure.post("/categories", formData);
      alert(data.message);
      setCategories([...categories, formData]); // Update UI
      setFormData({ categoryName: "", categoryImage: "" }); // Reset form
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const { data } = await axiosSecure.put(
        `/categories/${modalData._id}`,
        formData
      );
      alert(data.message);
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === modalData._id ? { ...cat, ...formData } : cat
        )
      );
      setModalData(null); // Close modal
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div>
      <Helmet>Admin | Manage Categorys</Helmet>
      <div className="bg-white px-4 md:px-12  md:py-12">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-xs text-SecondaryColor md:text-3xl  md:leading-[43px]">
            Total ScholarShips: {categorieData?.length}
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
        <div></div>
      </div>
    </div>
  );
};

export default ManageCategory;

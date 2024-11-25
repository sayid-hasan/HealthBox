import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UpdateModal from "./UpdateModal";

const Category = ({ category, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [modal, setModal] = useState(false);
  const handleEditCategory = () => {
    setModal(true);
  };
  //  delete Category
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/categories/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Category has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <>
      <tr key={category._id}>
        <th>{idx + 1}</th>
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{category?.categoryName}</span>
          </div>
        </td>
        <td>
          <div className="text-[#737373] flex justify-center  text-center text-base py-3 md:py-6 ">
            <img
              src={category?.categoryImg}
              className="object-contain object-center h-10 w-20 rounded-lg"
            />
          </div>
        </td>

        {/* action butoon */}
        {/* edit */}
        <th className="">
          <button
            onClick={() => handleEditCategory(category?._id)}
            className="btn btn-ghost  text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <FaEdit></FaEdit>
          </button>
        </th>
        {/* <th>
          <Link to={`/category/${category?._id}`}>
            <button className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700">
              <FcViewDetails></FcViewDetails>
            </button>
          </Link>
        </th> */}
        {/* delete */}
        <th className="">
          <button
            title="cancel"
            onClick={() => handleDelete(category._id)}
            className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <FaTrashAlt></FaTrashAlt>
          </button>
        </th>
      </tr>
      {
        <UpdateModal
          categoryId={category._id}
          category={category}
          modal={modal}
          setModal={setModal}
          refetch={refetch}
        ></UpdateModal>
      }
    </>
  );
};

export default Category;

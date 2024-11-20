import { FaCartArrowDown, FaEye } from "react-icons/fa";
import bgImg from "../../assets/images/tableBg.jpg";
import { useState } from "react";

import useAxios from "../../Hooks/useAxios";
import ViewDetailsModal from "../ViewDetailsModal/ViewDetailsModal";

const TableWithAction = ({ rows }) => {
  const [isModal, setIsModal] = useState(false);

  const axiosNonSecure = useAxios();
  const [modalData, setModalData] = useState(null); // Store modal data here
  const [isLoading, setIsLoading] = useState(false); // Handle loading state

  // Handle button actions
  const handleViewDetails = async (id) => {
    setIsModal(true);

    setIsLoading(true);
    // Fetch data using axiosNonSecure
    axiosNonSecure
      .get(`/medicine/${id}`)
      .then((response) => {
        // Set the fetched data to modalData
        setModalData(response?.data);
        setIsLoading(false); // Stop loading once data is set
      })
      .catch((error) => {
        console.error("Error fetching medicine data:", error);
        setIsLoading(false); // Stop loading on error
      });

    console.log("Modal opened", modalData);
    // get data for modal
  };

  const handleAddToCart = (id) => {
    alert(`Item with _id: ${id} added to cart`);
  };

  return (
    /* table */
    <div
      className={`bg-PrimaryColor relative  flex justify-center items-center text-white  bg-cover bg-center min-h-screen w-full  font-Nunito     `}
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overflow-scroll backdrop-blur-sm  grow flex-1 md:overflow-y-auto  md:overflow-x-auto max-w-7xl  mx-auto rounded-t-lg mt-3 bg-PrimaryColor/90 rounded-lg">
        <table className="table space-y-3  rounded-t-lg ">
          {/* head */}
          <thead className="bg-SecondaryColor bg-opacity-70 text-white font-Nunito h-auto  py-3 md:py-6">
            <tr className="text-white h-auto rounded-t-2xl py-3 md:py-6 ">
              <th className="text-base uppercase font-Nunito text-center leading-[19px]">
                medicine
              </th>
              <th className="text-base uppercase font-Nunito text-center leading-[19px]">
                Add To Cart
              </th>
              <th className="text-base uppercase font-Nunito text-center leading-[19px]">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id}>
                {/* <th>{idx + 1}</th> */}
                <td>
                  <div className="text-SubTextColor text-base text-center ">
                    <span>{row.name}</span>
                  </div>
                </td>

                <th>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleAddToCart(row?._id)}
                      className="btn h-auto  border-transparent  hover:bg-PrimaryColor hover:border-SecondaryColor  bg-SecondaryColor text-white font-bold text-sm max-w-[180px]  transition duration-200  group  flex items-center gap-3 hover:text-SecondaryColor group "
                    >
                      <FaCartArrowDown className="group-hover:scale-150"></FaCartArrowDown>
                    </button>
                  </div>
                </th>
                <th>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleViewDetails(row?._id)}
                      className="btn h-auto border-transparent  hover:bg-PrimaryColor hover:border-SecondaryColor  bg-SecondaryColor text-white font-bold  text-sm max-w-[180px]  transition duration-200  group  flex items-center gap-3 hover:text-SecondaryColor group "
                    >
                      <FaEye className="group-hover:scale-150"></FaEye>
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModal && !isLoading && (
        <ViewDetailsModal
          setIsModal={setIsModal}
          itemGenericName={modalData?.itemGenericName}
          name={modalData?.name}
          image={modalData?.image}
          description={modalData?.description}
          category={modalData?.category}
          companyName={modalData?.companyName}
          discountPercentage={modalData?.discountPercentage}
          price={modalData?.price}
          stock={modalData?.stock}
        ></ViewDetailsModal>
      )}
    </div>
  );
};

export default TableWithAction;
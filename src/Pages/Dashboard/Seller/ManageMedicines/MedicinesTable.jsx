const MedicinesTable = ({ medicine, idx }) => {
  return (
    <>
      <tr key={medicine._id}>
        <th>{idx + 1}</th>
        {/* name */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{medicine?.name}</span>
          </div>
        </td>
        {/* image */}
        <td>
          <div className="text-[#737373] flex justify-center  text-center text-base py-3 md:py-6 ">
            <img
              src={medicine?.image}
              className="object-contain object-center h-10 w-20 rounded-lg"
            />
          </div>
        </td>
        {/* stock */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{medicine?.stock}</span>
          </div>
        </td>
        {/* unit price */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{medicine?.price}</span>
          </div>
        </td>
        {/* Discount Percentage */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{medicine?.discountPercentage}</span>
          </div>
        </td>
        {/* company Name*/}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{medicine?.companyName}</span>
          </div>
        </td>

        {/* action butoon */}
        {/* edit
        <th className="">
          <button
            // onClick={() => handleEditScholarship(category?._id)}
            className="btn btn-ghost  text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <FaEdit></FaEdit>
          </button>
        </th> */}
      </tr>
      {
        // <UpdateModal
        //   categoryId={category._id}
        //   category={category}
        //   modal={modal}
        //   setModal={setModal}
        //   refetch={refetch}
        // ></UpdateModal>
      }
    </>
  );
};

export default MedicinesTable;

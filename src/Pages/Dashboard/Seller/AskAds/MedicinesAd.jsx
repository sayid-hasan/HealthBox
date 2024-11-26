import BtnWithICon from "../../../../components/NormalBtns/BtnWithIcon";

const SellerMedicineAds = ({ medicine, idx }) => {
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
        {/* Description */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{medicine?.description}</span>
          </div>
        </td>
        {/* action butoon */}

        <th className="text-[#737373] flex justify-center text-base w-full">
          <BtnWithICon
            text={medicine?.isOnSlide ? `used` : `unused`}
            classname={`hover:text-SecondaryColor hover:border-SecondaryColor  border hover:bg-PrimaryColor flex-1 max-w-`}
          ></BtnWithICon>
        </th>
      </tr>
    </>
  );
};

export default SellerMedicineAds;

const PaymentTable = ({ payment, idx }) => {
  return (
    <>
      <tr key={payment._id}>
        <th>{idx + 1}</th>
        {/* userid */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{payment?.userId}</span>
          </div>
        </td>

        {/* amount */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{payment?.amount}</span>
          </div>
        </td>
        {/*status */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{payment?.status}</span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default PaymentTable;

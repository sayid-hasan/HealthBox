const PaymentHistory = ({ payment, idx }) => {
  return (
    <>
      <tr key={payment._id}>
        <th>{idx + 1}</th>
        {/* userId */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{payment?.userId}</span>
          </div>
        </td>

        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{payment?.transactionId}</span>
          </div>
        </td>
        {/* Date */}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>
              {new Date(payment?.date).toLocaleDateString("en-US", {
                weekday: "long", // Full name of the day (e.g., Monday)
                day: "2-digit", // Two-digit day
                month: "short", // Shortened month (e.g., Aug)
                year: "numeric", // Full year
              })}
            </span>
          </div>
        </td>

        {/* status*/}
        <td>
          <div className="text-[#737373] flex justify-center text-base py-3 md:py-6 ">
            <span>{payment?.status}</span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default PaymentHistory;

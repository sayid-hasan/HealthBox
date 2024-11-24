import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import jsPDF from "jspdf";
import BtnWithICon from "../../components/NormalBtns/BtnWithIcon";
import { FaDownload } from "react-icons/fa";

const SuccessPayment = () => {
  const location = useLocation();

  // Parse the query string from the location object
  const { amount, transactionId } = location.state;

  console.log("successPayment", amount, transactionId);
  const axiosNonSecure = useAxios();
  const [paymentDetails, setPaymentDetails] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all payment details for the user
    const fetchPaymentDetails = async () => {
      try {
        const response = await axiosNonSecure.get(`/payment/${transactionId}`);
        setPaymentDetails(response?.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [transactionId, axiosNonSecure]);
  const date = new Date(paymentDetails?.date);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  const handleDownloadPDF = () => {
    if (!paymentDetails) return;

    const { name, email, purchasedItems, amount, transactionId, purchaseDate } =
      paymentDetails;

    const doc = new jsPDF();

    // Add content to PDF
    doc.text("HealthBox Invoice", 20, 20);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Transaction ID: ${transactionId}`, 20, 60);
    doc.text(
      `Purchase Date: ${new Date(purchaseDate).toLocaleDateString()}`,
      20,
      70
    );
    doc.text(`Total Amount: AED ${amount}`, 20, 80);

    doc.text("Purchased Items:", 20, 100);
    purchasedItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - AED ${item.price} x ${item.quantity}`,
        20,
        110 + index * 10
      );
    });

    // Save the PDF
    doc.save(`invoice_${transactionId}.pdf`);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>
      </div>

      {/* designed invoice */}
      {/* <!-- component --> */}
      <section className=" py-5">
        <div className="max-w-2xl mx-auto py-0 md:py-3">
          <article className="shadow-none md:shadow-md md:rounded-md overflow-hidden">
            <div className="md:rounded-b-md  bg-white">
              <div className="p-9 border-b border-gray-200">
                <div className="space-y-6">
                  <div className="flex justify-between items-top">
                    <div className="space-y-4">
                      <div>
                        <img
                          className="h-6 object-cover mb-4"
                          src="https://cdn.mjwebs.com/sites/mjwebs/mjwebs-logo.png"
                        />
                        <p className="font-bold text-lg"> Invoice </p>
                        <p> HealthBox </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-400">
                          {" "}
                          Billed To{" "}
                        </p>
                        <p className="font-medium text-sm text-gray-400">
                          {" "}
                          {paymentDetails?.name}{" "}
                        </p>
                        <p className="font-medium text-sm text-gray-400">
                          {" "}
                          {paymentDetails?.email}{" "}
                        </p>
                        <p> </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-sm text-gray-400">
                          {" "}
                          TrxID{" "}
                        </p>
                        <p className="font-medium text-sm text-gray-400">
                          {" "}
                          {paymentDetails?.transactionId}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-400">
                          {" "}
                          Invoice Date{" "}
                        </p>
                        <p className="font-medium text-sm text-gray-400">
                          {" "}
                          {formattedDate}
                        </p>
                      </div>

                      <button onClick={() => handleDownloadPDF()}>
                        <BtnWithICon
                          text={`Download PDF`}
                          icon={<FaDownload></FaDownload>}
                          classname={` my-2 hover:bg-PrimaryColor hover:text-SecondaryColor`}
                        ></BtnWithICon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-9 border-b border-gray-200">
                <p className="font-medium text-sm text-gray-400"> Note </p>
                <p className="text-sm"> Thank you for your order. </p>
              </div>
              <table className="w-full divide-y divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-9 py-4 text-left font-semibold text-gray-400"
                    >
                      {" "}
                      Item{" "}
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left font-semibold text-gray-400"
                    >
                      {" "}
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left font-semibold text-gray-400"
                    >
                      {" "}
                      Qty{" "}
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left font-semibold text-gray-400"
                    >
                      {" "}
                      Amount{" "}
                    </th>

                    <th
                      scope="col"
                      className="py-3 text-left font-semibold text-gray-400"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paymentDetails?.purchasedItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                        <div>
                          <p className="font-medium text-sm text-gray-400">
                            {" "}
                            {item?.name}{" "}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap text-gray-600 truncate"></td>
                      <td className="whitespace-nowrap text-gray-600 truncate">
                        {item?.quantity}
                      </td>
                      <td className="whitespace-nowrap text-gray-600 truncate">
                        {" "}
                        {item?.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-9 border-b border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm"> Total </p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {" "}
                      AED {paymentDetails?.amount}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-9 border-b border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold text-black text-lg">
                        {" "}
                        Total paid{" "}
                      </p>
                    </div>
                    <p className="font-bold text-black text-lg">
                      {" "}
                      AED {paymentDetails?.amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default SuccessPayment;

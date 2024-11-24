import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import jsPDF from "jspdf";

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
      <div>
        <h2>Invoice Details</h2>
        <p>
          <strong>Name:</strong> {paymentDetails?.name}
        </p>
        <p>
          <strong>Email:</strong> {paymentDetails?.email}
        </p>
        <p>
          <strong>Transaction ID:</strong> {paymentDetails?.transactionId}
        </p>
        <p>
          <strong>Purchase Date:</strong>{" "}
          {new Date(paymentDetails?.purchaseDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Total Amount:</strong> AED {paymentDetails?.amount}
        </p>

        <h3>Purchased Items</h3>
        <ul>
          {paymentDetails?.purchasedItems.map((item, index) => (
            <li key={index}>
              {item.name} - AED {item.price} x {item.quantity}
            </li>
          ))}
        </ul>

        <button onClick={handleDownloadPDF}>Download Invoice</button>
      </div>
    </div>
  );
};

export default SuccessPayment;

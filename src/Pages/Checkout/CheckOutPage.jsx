import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import convertToSubcurrency from "../../Utility/ConvertToSubCurrency";
import BtnWithICon from "../../components/NormalBtns/BtnWithIcon";
import { MdPayment } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const CheckoutPage = ({ amount, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const axiosNonSecure = useAxios();
  const { user } = useContext(AuthContext);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
    },
  });
  useEffect(() => {
    // get client secret from server
    const createPaymentIntent = async () => {
      try {
        const { data } = await axiosNonSecure.post("/create-payment-intent", {
          amount: convertToSubcurrency(amount),
        });
        // console.log(data);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [amount, axiosNonSecure]);
  console.log("checkout component clientS", clientSecret);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:5000/payment-success?amount=${amount}`,
        payment_method_data: {
          billing_details: {
            name: billingDetails.name,
            email: billingDetails.email,
          },
        },
      },
    });
    if (error) {
      // it's only when there is an error while confirming the payment   for example payment details incomplete
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Handle successful payment
      console.log("Payment successful:", paymentIntent);
    }
    if (paymentIntent.status === "succeeded") {
      console.log("transaction id", paymentIntent.id);
      setTransactionId(paymentIntent.id);
      toast.success("payment succeeded");

      // now save info in database

      const payment = {
        email: user?.email,
        name: user?.displayName,
        amount: amount,
        date: new Date(),
        transactionId: paymentIntent.id,
        PurchaseItems: cartItems,
      };
      const res = await axiosNonSecure.post("/payments", payment);
      console.log("payment savedd", res.data);
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "thannk you",
          showCancelButton: false,
          timer: 1500,
        });
      }
    }
    setLoading(false);
  };
  // spinner for laoding the payment form
  if (!clientSecret || !stripe || !elements) {
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
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white rounded-md  p-3"
      >
        {clientSecret && <PaymentElement></PaymentElement>}
        {errorMessage && <div>{errorMessage}</div>}
        <button
          disabled={!stripe || loading}
          className="w-full flex justify-center disabled:opacity-50 disabled:animate-pulse"
        >
          {" "}
          <BtnWithICon
            text={!loading ? `Pay ${Math.round(amount)}` : "Processing..."}
            icon={<MdPayment></MdPayment>}
            classname={`hover:bg-white grow flex-1 max-w-full hover:text-SecondaryColor hover:border-SecondaryColor w-full `}
          ></BtnWithICon>
        </button>
      </form>
    </>
  );
};

export default CheckoutPage;

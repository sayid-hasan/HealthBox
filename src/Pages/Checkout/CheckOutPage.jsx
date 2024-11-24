import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import convertToSubcurrency from "../../Utility/ConvertToSubCurrency";

import { toast } from "react-toastify";

import { AuthContext } from "../../Provider/AuthProvider";
import Field from "./Field";
import "./Styes/paymentcard.css";
import "./Styes/detailedCard.css";
import BtnWithICon from "../../components/NormalBtns/BtnWithIcon";
import { MdPayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// card options
// card options
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",

      color: "#454545",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

// cardFields
const CardField = ({ onChange }) => (
  <div className=" flex w-full">
    <CardElement
      className="grow  bg-white flex w-full px-2 my-2 py-4 rounded-lg"
      options={CARD_OPTIONS}
      onChange={onChange}
    />
  </div>
);

// submit button component
const SubmitButton = ({ processing, error, children, disabled }) => (
  <button className={`" : ""}`} type="submit" disabled={processing || disabled}>
    <BtnWithICon
      text={processing ? `Processing...` : children}
      icon={<MdPayment></MdPayment>}
      classname={`hover:bg-white grow flex-1 max-w-full hover:text-SecondaryColor hover:border-SecondaryColor w-full `}
    ></BtnWithICon>
  </button>
);
// error messs=age component
const ErrorMessage = ({ children }) => (
  <div className="flex gap-2 items-center " role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const CheckoutPage = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  // state

  const { user } = useContext(AuthContext);
  const axiosNonSecure = useAxios();
  const [error, setError] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: user?.email,
    phone: "",
    name: user?.displayName,
  });

  // client secreet

  const [clientSecret, setClientSecret] = useState("");

  // api call for paymentIntent
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
  // handle submit process EVENT

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // if (error) {
    //   card.focus();
    //   return;
    // }

    if (cardComplete) {
      setProcessing(true);
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    if (error) {
      console.log("[error]", error);
      setError(error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentMethod(paymentMethod);
      setError("");
    }
    // CONFIRM PAYMENT
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: billingDetails,
        },
      }
    );
    if (confirmError) {
      console.log("confirem errr", confirmError);
      toast.error("payment Error");
    }
    if (paymentIntent) {
      //   console.log("confirm payment", paymentIntent);
      setPaymentIntent(paymentIntent);
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
          userId: user?.uid,
        };
        const res = await axiosNonSecure.post("/payments", payment);
        console.log("payment savedd", res.data);
        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "thannk you for ordering",
            showCancelButton: false,
            timer: 1500,
          });
          navigate("/payment-success", {
            state: {
              amount,
            },
          });
        }
      }
    }
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
    //   DETAILED CARD
    clientSecret && (
      <div className="flex justify-center overflow-hidden">
        <form
          className=" form flex flex-col justify-center  max-w-2xl mx-auto my-8"
          onSubmit={handleSubmit}
        >
          <fieldset className="grid grid-cols-1   gap-6">
            {/*  */}
            <Field
              label="Name"
              id="name"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              readonly={true}
              value={user?.displayName}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              placeholder="janedoe@gmail.com"
              required
              autoComplete="email"
              readonly={true}
              value={user?.email}
            />
            <Field
              label="Phone"
              id="phone"
              type="tel"
              placeholder="(941) 555-0123"
              required
              autoComplete="tel"
              value={billingDetails.phone}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, phone: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="">
            <div className="">
              <CardField
                onChange={(e) => {
                  setError(e.error);
                  setCardComplete(e.complete);
                }}
              />
            </div>
          </fieldset>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <SubmitButton
            processing={processing}
            error={error}
            disabled={!stripe || !clientSecret}
          >
            Pay {amount}
          </SubmitButton>
        </form>
      </div>
    )
  );
};

export default CheckoutPage;

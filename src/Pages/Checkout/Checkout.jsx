import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "../../Utility/ConvertToSubCurrency";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";

if (import.meta.env.VITE_STRIPE_PK === undefined) {
  throw new Error("VITE_STRIPE_PK is not defined");
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log("checkout page", location?.state);
  const amount = location?.state?.totalPrice;

  return (
    <div className="max-w-7xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-SecondaryColor to-PrimaryColor">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">{user?.displayName}</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "aed",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
};

export default Checkout;

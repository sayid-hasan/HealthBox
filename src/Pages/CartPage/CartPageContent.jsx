import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import BtnWithICon from "../../components/NormalBtns/BtnWithIcon";
import { MdCancel } from "react-icons/md";
const CartPageContent = ({ product, refetch }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1); // Initialize quantity with item's current quantity
  const [totalAmount, setTotalAmount] = useState(product.price * quantity); // Calculate initial total amount
  const axiosNonSecure = useAxios();
  const handleQuantityChange = async (action) => {
    let newQuantity = quantity;

    // Calculate the potential new quantity based on the action
    if (action === "increase") {
      if (newQuantity < product.stock) {
        newQuantity++;
      } else {
        toast.info("Cannot exceed stock limit.");
        return; // Exit if the stock limit is exceeded
      }
    } else if (action === "decrease") {
      if (newQuantity > 1) {
        newQuantity--;
      } else {
        toast.info("Minimum quantity is 1.");
        return; // Exit if quantity is already at the minimum
      }
    }

    // Send the update to the server
    try {
      const response = await axiosNonSecure.patch(`/cart/${product._id}`, {
        quantity: newQuantity,
      });

      if (response.status === 200) {
        // Update the UI only after the server is successfully updated
        setQuantity(newQuantity);

        setTotalAmount(product.price * newQuantity);
        refetch();
        toast.success("Cart updated successfully!");
      } else {
        toast.error("Failed to update the cart.");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Error updating cart.");
    }
  };
  // Handle delete cart item
  const handleDeleteItem = async (id) => {
    try {
      const response = await axiosNonSecure.delete(`/cart/${id}`);
      if (response.data.success) {
        refetch();
        toast.success("Item deleted successfully");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      toast.error("Error deleting item");
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 my-2 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
      <div className="shrink-0 md:order-1">
        <img
          className="h-20 w-20 rounded-lg "
          src={product?.image}
          alt={product?.name}
        />
      </div>
      {/* quantity input */}
      <label htmlFor="counter-input" className="sr-only">
        Choose quantity:
      </label>
      <div className="flex items-center justify-between md:order-3 md:justify-end">
        <div className="flex items-center">
          {/* decrease btn */}
          <button
            onClick={() => handleQuantityChange("decrease")}
            type="button"
            id="decrement-button"
            data-input-counter-decrement="counter-input"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <svg
              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
            {quantity}
          </p>
          {/* increse btn */}
          <button
            onClick={() => handleQuantityChange("increase")}
            type="button"
            id="increment-button"
            data-input-counter-increment="counter-input"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <svg
              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        {/* total dynamic price for quantity x price */}
        <div className="text-end md:order-4 md:w-32">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {totalAmount}
          </p>
        </div>
      </div>

      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
        {/* product name */}
        <p className="text-base font-medium text-gray-900  dark:text-white">
          {product?.name}
        </p>

        <div className="flex items-center gap-4">
          {/* remove button */}
          <button
            onClick={() => handleDeleteItem(product?._id)}
            type="button"
            className="inline-flex items-center text-sm 0"
          >
            <BtnWithICon
              text={`remove`}
              classname={`mt-0 hover:border-[#b20000] bg-[#B20000] !py- rounded-full min-w-[150px] !px-4 hover:bg-PrimaryColor hover:text-[#B20000] md:py-0`}
              icon={<MdCancel></MdCancel>}
            ></BtnWithICon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPageContent;

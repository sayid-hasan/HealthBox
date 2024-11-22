import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import CartPageContent from "./CartPageContent";
import { motion } from "framer-motion";
import fadeIn from "../../Utility/varient";
import BtnWithICon from "../../components/NormalBtns/BtnWithIcon";

const CartPage = () => {
  const axiosNonSecure = useAxios();
  const { user, loading } = useContext(AuthContext);
  const [subTotal, setSubTotal] = useState(0);
  const totalPrice = subTotal + 50 + Math.round(subTotal * 0.05);
  const {
    data: cartItems = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartItems", user?.uid],
    queryFn: async () => {
      const { data } = await axiosNonSecure.get(`/cart/${user?.uid}`);
      return data;
    },
  });
  useEffect(() => {
    const newSubTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubTotal(newSubTotal);
  }, [cartItems]);

  isLoading ? loading ? <div>loading..</div> : "" : "";
  if (isError) {
    return toast.error(`Error fetching cart items: ${error.message}<`);
  }
  console.log("cart page", cartItems.length);
  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 w-full">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className=" text-2xl md:text-4xl tracking-wide font-Nunito text-SecondaryColor  leading-relaxed mb-5 font-bold "
            >
              Check Your Cart
            </motion.h2>

            <div className="mt-6 sm:mt-8 md:gap-3 lg:flex lg:items-stretch xl:gap-4">
              {/* cart products */}
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {/* cartItems */}
                  <div className="rounded-lg border border-SecondaryColor bg-PrimaryColor bg-opacity-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    {/* here will be cartItems map */}
                    {cartItems.map((product) => {
                      return (
                        <CartPageContent
                          key={product._id}
                          product={product}
                          refetch={refetch}
                        ></CartPageContent>
                      );
                    })}
                  </div>
                </div>
                {/* people also bought */}
              </div>

              {/* order summery */}
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg bg-PrimaryColor border-SecondaryColor border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <motion.p
                    variants={fadeIn("right", 0.2)}
                    initial={"hidden"}
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                    className=" text-lg md:text-xl tracking-wide font-Nunito text-SecondaryColor  leading-relaxed mb-5 font-bold  "
                  >
                    Order summary
                  </motion.p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="font-Nunito text-SecondaryColor font-bold text-sm">
                          Sub-Total
                        </dt>
                        <dd className="text-base  font-bold text-gray-900 dark:text-white">
                          {Math.round(subTotal)}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Shipping cost
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          50
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          {Math.round(subTotal * 0.05)}
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {totalPrice}
                      </dd>
                    </dl>
                  </div>

                  <button className="flex justify-center grow w-full">
                    <BtnWithICon
                      text={`Checkout`}
                      icon={<IoBagCheckOutline></IoBagCheckOutline>}
                      classname={` mt-0 hover:bg-PrimaryColor hover:text-SecondaryColor`}
                    ></BtnWithICon>
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      or{" "}
                    </span>{" "}
                    <button>
                      <BtnWithICon
                        text={`Continue Shopping`}
                        icon={<FaArrowRight></FaArrowRight>}
                        classname={`mt-0 !text-xs !px-2 flex flex-row hover:bg-PrimaryColor hover:text-SecondaryColor`}
                      ></BtnWithICon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;

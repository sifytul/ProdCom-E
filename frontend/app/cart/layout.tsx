"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CartLayout = ({ children }: Props) => {
  const router = usePathname();

  return (
    <div>
      <div className="container">
        <h1 className="text-4xl text-center font-bold">Cart</h1>

        {/* stepper section  */}
        <div className="flex justify-center mt-4 mb-10">
          <Link href="/cart">
            <div
              className={`flex items-center gap-4 p-4 ${
                router === "/cart" && "border-b-2 border-gray"
              }`}
            >
              <p
                className={`h-10 w-10 rounded-full flex justify-center items-center ${
                  router === "/cart" ? "bg-black" : "bg-gray"
                } text-white`}
              >
                1
              </p>
              <p className="font-semibold font-inter">Shopping cart</p>
            </div>
          </Link>

          <Link href="/cart/checkout">
            <div
              className={`flex items-center gap-4 p-4 ${
                router.includes("checkout") && "border-b-2 border-gray"
              }`}
            >
              <p
                className={`h-10 w-10 rounded-full flex justify-center items-center ${
                  router.includes("checkout") ? "bg-black" : "bg-gray"
                } text-white`}
              >
                2
              </p>
              <p className="font-semibold font-inter">Checkout Details</p>
            </div>
          </Link>

          <Link href="/cart/order-complete">
            <div
              className={`flex items-center gap-4 p-4 ${
                router.includes("order-complete") && "border-b-2 border-gray"
              }`}
            >
              <p
                className={`h-10 w-10 rounded-full flex justify-center items-center ${
                  router.includes("order-complete") ? "bg-black" : "bg-gray"
                } text-white`}
              >
                3
              </p>
              <p className="font-semibold font-inter">Order Complete</p>
            </div>
          </Link>
        </div>

        {/* content section  */}
        {children}
      </div>
    </div>
  );
};

export default CartLayout;

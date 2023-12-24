"use client";
import { useAppSelector } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

type Props = {
  children: React.ReactNode;
};

const CartLayout = ({ children }: Props) => {
  const router = usePathname();
  const completedStep = useAppSelector((state) => state.cart.stepperState);

  return (
    <div>
      <div className="container">
        <h1 className="text-3xl text-center font-bold my-4">
          Happy Shopping...
        </h1>

        {/* stepper section  */}
        <div className="mb-10">
          <ol className="flex items-center w-full justify-center p-3 space-x-2 text-sm md:text-base font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            <Link href="/cart">
              <li
                className={`flex items-center  ${
                  router === "/cart" && "text-accent dark:text-accent"
                } `}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 me-2 text-xs border border-accent rounded-full shrink-0 dark:border-blue-500 ${
                    completedStep.includes("cart") && "bg-accent text-white"
                  }`}
                >
                  1
                </span>
                Cart
                <MdOutlineKeyboardDoubleArrowRight />
              </li>
            </Link>
            <li
              className={`flex items-center  ${
                router === "/cart/checkout" && "text-accent dark:text-accent"
              } `}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
                  router === "/cart/checkout"
                    ? "border-accent"
                    : completedStep.includes("checkout")
                    ? "border-accent"
                    : "border-gray-500"
                } rounded-full shrink-0 ${
                  completedStep.includes("checkout") && "bg-accent text-white"
                }`}
              >
                2
              </span>
              Checkout <MdOutlineKeyboardDoubleArrowRight />
            </li>
            <li
              className={`flex items-center  ${
                router === "/cart/payment" && "text-accent dark:text-accent"
              } `}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 dark:border-blue-500 ${
                  router === "/cart/payment"
                    ? "border-accent"
                    : completedStep.includes("payment")
                    ? "border-accent"
                    : "border-gray-500"
                } ${
                  completedStep.includes("payment") && "bg-accent text-white"
                }`}
              >
                3
              </span>
              Payment
            </li>
          </ol>
        </div>
        {/* content section  */}
        {children}
      </div>
    </div>
  );
};

export default CartLayout;

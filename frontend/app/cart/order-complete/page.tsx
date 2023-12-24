"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetOrderDetailsQuery } from "@/store/slices/cartApiSlice";
import { useSearchParams } from "next/navigation";
import { Bars } from "react-loader-spinner";
import Link from "next/link";

type Props = {};

const OrderComplete = (props: Props) => {
  const params = useSearchParams();
  let orderId = params.get("orderId");

  const {
    data: orderDetails,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetOrderDetailsQuery(orderId);

  let content;

  if (isLoading) {
    content = (
      <div className="h-screen flex justify-center items-center">
        <Bars
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="flex flex-col justify-center items-center gap-8 border border-gray-200 rounded-md p-8 max-w-xl mx-auto mb-5">
        <div className="text-center">
          <h3 className="text-gray text-xl font-semibold">Thank you!</h3>
          <h2 className="text-2xl font-semibold">
            Your order has been received
          </h2>
        </div>
        <div className="flex gap-6 justify-evenly">
          {orderDetails?.data.ordered_items.map((item) => (
            <div className="relative w-28 h-28 bg-white-100" key={item.id}>
              <p className="absolute -top-2 -right-2 rounded-full flex justify-center items-center h-6 w-6 bg-black text-white font-semibold">
                {item.quantity}
              </p>
              <Image
                src={item.product.image_urls[0]?.url}
                alt={item.product.name}
                width={60}
                height={60}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>

        <div className="md:w-3/5 w-full  p-2 space-y-5">
          <div className="flex justify-between ">
            <p className="text-gray">Order code:</p>
            <p className="font-semibold">{orderDetails.data.id}</p>
          </div>
          <div className="flex justify-between ">
            <p className="text-gray">Order Status</p>
            <p className="font-semibold">{orderDetails.data.status}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray">Date</p>
            <p className="font-semibold">{orderDetails.data.updated_at}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray">Total</p>
            <p className="font-semibold">${orderDetails.data.total_price}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray">Payment method</p>
            <p className="font-semibold">
              {orderDetails.data.payment_info?.medium}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray">Payment Status</p>
            <p className="font-semibold">
              {orderDetails.data.payment_info?.status}
            </p>
          </div>
        </div>

        <Link href="/">
          <Button className="rounded-full font-semibold">Go to home</Button>
        </Link>
      </div>
    );
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }
  return content;
};

export default OrderComplete;

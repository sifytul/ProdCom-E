import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Props = {};

const OrderComplete = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 shadow-lg rounded-md p-8 max-w-xl mx-auto">
      <div className="text-center">
        <h3 className="text-gray text-xl font-semibold">Thank you!</h3>
        <h2 className="text-2xl font-semibold">Your order has been received</h2>
      </div>
      <div className="flex gap-6 justify-evenly">
        <div className="relative w-28 h-28 bg-white-100">
          <p className="absolute -top-2 -right-2 rounded-full flex justify-center items-center h-6 w-6 bg-black text-white font-semibold">
            2
          </p>
          <Image
            src="/assets/images/sofa.png"
            alt="sofa"
            width={60}
            height={60}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="relative w-28 h-28 bg-white-100">
          <p className="absolute -top-2 -right-2 rounded-full flex justify-center items-center h-6 w-6 bg-black text-white font-semibold">
            2
          </p>
          <Image
            src="/assets/images/sofa.png"
            alt="sofa"
            width={60}
            height={60}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="relative w-28 h-28 bg-white-100">
          <p className="absolute -top-2 -right-2 rounded-full flex justify-center items-center h-6 w-6 bg-black text-white font-semibold">
            2
          </p>
          <Image
            src="/assets/images/sofa.png"
            alt="sofa"
            width={60}
            height={60}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <div className="w-3/5  p-2 space-y-5 text-sm">
        <div className="flex justify-between ">
          <p className="text-gray">Order code:</p>
          <p className="font-semibold">INV001</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray">Date</p>
          <p className="font-semibold">12/12/2021</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray">Total</p>
          <p className="font-semibold">$250.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray">Payment method</p>
          <p className="font-semibold">Bank Transfer</p>
        </div>
      </div>

      <Button className="rounded-full font-semibold">Purchase history</Button>
    </div>
  );
};

export default OrderComplete;

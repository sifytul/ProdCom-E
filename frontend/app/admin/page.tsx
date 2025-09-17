import React from "react";
import { BsBarChartFill, BsFillPersonPlusFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { FaSheetPlastic } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { TfiExport } from "react-icons/tfi";

const Admin = () => {
  let cardData = [
    {
      icon: BsBarChartFill,
      title: "Total Sales",
      value: "$1222",
      percentage: "+8",
      color: "red",
    },
    {
      icon: FaSheetPlastic,
      title: "Total Order",
      value: "20",
      percentage: "+5",
      color: "orange",
    },
    {
      icon: IoTicket,
      title: "Product Sold",
      value: 20,
      percentage: "+12",
      color: "green",
    },
    {
      icon: BsFillPersonPlusFill,
      title: "New Customers",
      value: 5,
      percentage: "+5",
      color: "purple",
    },
  ];
  return (
    <div>
      {/* today's sales */}
      <div className="bg-white p-4 mt-4 rounded-md w-fit">
        <div className="flex justify-between">
          <div className="">
            <h2 className="text-xl font-semibold">Today&apos;s Sales</h2>
            <p className="text-gray">Sales Summary</p>
          </div>
          <Button variant="outline">
            <TfiExport className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          {/* total sales  */}
          {cardData.map((item, index) => (
            <div key={index} className={`bg-${item.color}-100 p-4 rounded-md`}>
              <div
                className={`bg-${item.color}-400 rounded-full w-fit p-2 mb-2 text-white`}
              >
                <item.icon />
              </div>
              <p className="font-bold">{item.value}</p>
              <p className="text-sm text-slate-800">{item.title}</p>
              <p className="text-xs text-purple">
                {item.percentage}% from yesterday
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;

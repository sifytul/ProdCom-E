import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { RxLoop } from "react-icons/rx";

const DashboardPage = () => {
  let dashboardData = [
    {
      Icon: BsCartCheck,
      IconStrokeColor: "text-red-600",
      IconBgColor: "bg-red-100",
      title: "Total Orders",
      count: 299,
    },
    {
      Icon: RxLoop,
      IconStrokeColor: "text-orange-600",
      IconBgColor: "bg-orange-200",
      title: "Pending Orders",
      count: 13,
    },
    {
      Icon: FaTruck,
      IconStrokeColor: "text-sky-600",
      IconBgColor: "bg-sky-100",
      title: "Processing Orders",
      count: 9,
    },
    {
      Icon: IoMdCheckmark,
      IconStrokeColor: "text-green-600",
      IconBgColor: "bg-green-100",
      title: "Completed Orders",
      count: 123,
    },
  ];

  return (
    <div className="my-8">
      {" "}
      {/* dashboard summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardData.map((card, index) => (
          <SummaryCard
            key={index}
            Icon={card.Icon}
            IconBgColor={card.IconBgColor}
            IconStrokeColor={card.IconStrokeColor}
            title={card.title}
            count={card.count}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

type TSummaryCardProps = {
  Icon: React.FunctionComponent<{ className: any }>;
  IconBgColor: string;
  IconStrokeColor: string;
  title: string;
  count: number;
};

function SummaryCard({
  Icon,
  IconBgColor,
  IconStrokeColor,
  title,
  count,
}: TSummaryCardProps) {
  return (
    <div className="bg-white-200 p-5 flex items-center rounded hover:shadow-md duration-200">
      <div
        className={`rounded-full h-12 w-12 flex justify-center items-center mr-4 ${IconBgColor}`}
      >
        <Icon className={`${IconStrokeColor} text-2xl`} />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-lg font-semibold">{count}</p>
      </div>
    </div>
  );
}

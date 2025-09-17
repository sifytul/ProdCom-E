import React from "react";
import Image from "next/image";
import { FaChartPie } from "react-icons/fa";
import {
  IoBagCheck,
  IoBagCheckOutline,
  IoPeople,
  IoPeopleOutline,
} from "react-icons/io5";
import { LuLayoutDashboard, LuPieChart, LuSprout } from "react-icons/lu";
import { BiLogOut, BiSolidCategory } from "react-icons/bi";
import { RiEBike2Fill, RiEBike2Line } from "react-icons/ri";
import { MdOutlineCategory, MdSpaceDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { CgSupport } from "react-icons/cg";

type Props = {};

const AdminSidebar = (props: Props) => {
  let navItems = [
    { icon: LuLayoutDashboard, label: "Dashboard" },
    { icon: IoBagCheckOutline, label: "Orders" },
    { icon: IoPeopleOutline, label: "Customers" },
    { icon: LuSprout, label: "Products" },
    { icon: MdOutlineCategory, label: "Categories" },
    { icon: RiEBike2Line, label: "Couriers" },
    { icon: LuPieChart, label: "Reports" },
    { icon: CgSupport, label: "Support" },
    { icon: FiLogOut, label: "Logout" },
  ];
  return (
    <aside className="bg-white h-screen mr-4 p-2">
      <Image
        src="/assets/icons/ProdCom-E_logo.png"
        alt="logo"
        width={100}
        height={100}
      />

      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center p-4 rounded-md duration-300 cursor-pointer hover:bg-purple-light hover:text-purple"
            >
              <item.icon className="text-xl" />
              <span className="ml-2">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

"use client";
import React from "react";
import InputField from "../shared/InputField";
import DarkModeToggler from "../shared/DarkModeToggle";
import { LanguageSelect } from "../shared/LanguageSwitcher";
import { FaBell, FaRegBell } from "react-icons/fa";
import { AccountMenu } from "../AccountMenu";
import { useAppSelector } from "@/store";
import Image from "next/image";

type Props = {};

const AdminHeader = (props: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <header className="flex justify-between bg-white p-2 items-center">
      <InputField type="text" placeholder="Search here" />
      <div className="flex gap-4 items-center">
        <DarkModeToggler />
        <LanguageSelect />
        <div className="bg-orange-100 p-2 rounded relative">
          <div className="absolute -right-0.5 -top-0.5 bg-red-600 h-2 w-2 rounded-full" />
          <FaRegBell className="text-orange-600" />
        </div>

        {/* <AccountMenu user={user} /> */}
        <div className="flex items-center gap-1 w-28 p-1 leading-none">
          <div className="h-10 w-10">
            <Image
              src={user?.avatar as string}
              alt={"avatar"}
              height={40}
              width={40}
            />
          </div>
          <div>
            <p>{user?.name}</p>
            <p className="text-slate-500 text-sm pt-0.5">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

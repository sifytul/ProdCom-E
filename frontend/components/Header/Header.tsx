"use client";
import Link from "next/link";
import { useState } from "react";
import HeaderNav from "./HeaderNav";
import Sidebar from "../Sidebar";
import { useAppSelector } from "@/store";
import { AccountMenu } from "../AccountMenu";
import SearchInHeader from "./SearchInHeader";
import CartInSidebar from "./CartInSidebar";
import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="h-16">
      <div className="container flex my-auto h-full justify-between items-center mx-auto">
        {/* left portion of header */}
        <Link href="/">
          <Image
            src="/assets/icons/ProdCom-E_logo.png"
            alt="logo"
            width={195}
            height={65}
            className="cursor-pointer"
          />
        </Link>

        {/* middle portion of header */}
        <HeaderNav />

        {/* right portion of header */}
        <div>
          <div className="flex items-center gap-4 text-[24px]">
            {/* search icon  */}
            <SearchInHeader />

            {/* user icon */}
            <AccountMenu user={user} />
            {/* cart icon  */}
            <CartInSidebar />

            <div className="sm:hidden">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

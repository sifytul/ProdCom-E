"use client";
import Link from "next/link";
import HeaderNav from "./HeaderNav";
import Sidebar from "../Sidebar";
import { useAppSelector } from "@/store";
import { AccountMenu } from "../AccountMenu";
import SearchInHeader from "./SearchInHeader";
import CartInSidebar from "./CartInSidebar";
import Image from "next/image";
import DarkModeToggler from "../shared/DarkModeToggle";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="h-16">
      <div className="sm:container mr-2 flex my-auto h-full justify-between items-center mx-auto">
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

            {/* dark mode icon */}
            <DarkModeToggler />

            {/* user icon */}
            <AccountMenu user={user} />
            {/* cart icon  */}
            <CartInSidebar />

            <div className="md:hidden">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

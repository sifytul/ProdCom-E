"use client";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AccountLayout = ({ children }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const path = usePathname();
  const handleFilterChange = (value: string) => {
    // setCategoryFilter(value);
    if (value == "profile") {
      router.push("/profile", {
        scroll: false,
      });
    } else {
      router.push(`/profile/${value}`, {
        scroll: false,
      });
    }
  };
  return (
    <div className="container">
      <h1 className="text-center text-3xl font-medium">My Account</h1>
      <div className="flex flex-wrap">
        <div className="bg-white-200 w-full md:w-1/3 lg:w-1/4">
          <div className=" space-y-2">
            <div className="flex flex-col items-center justify-center border-b border-gray-300 py-6 mx-4">
              <Image
                src={user?.avatar || "/assets/images/avatar.png"}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
                loading="lazy"
                decoding="async"
                width={56}
                height={56}
              />
              <p className="font-semibold">{user?.name || "Guest User"}</p>
            </div>
            <div className="md:hidden">
              <Select
                onValueChange={handleFilterChange}
                value={path.split("/").pop()}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Account</SelectLabel>
                    <SelectItem value="profile">Profile</SelectItem>
                    <SelectItem value="address">Address</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="wishlist">Wishlist</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="hidden md:inline-block p-4 w-full">
            <Link href="/profile">
              <div
                className={`hover:bg-gray-200 w-full p-2 rounded-md cursor-pointer ${
                  path == "/profile" && "bg-gray-200"
                }`}
              >
                Profile
              </div>
            </Link>
            <Link href="/profile/address">
              <div
                className={`hover:bg-gray-200 w-full p-2 rounded-md cursor-pointer ${
                  path == "/profile/address" && "bg-gray-200"
                }`}
              >
                Address
              </div>
            </Link>
            <Link href="/profile/orders">
              <div
                className={`hover:bg-gray-200 w-full p-2 rounded-md cursor-pointer ${
                  path == "/profile/orders" && "bg-gray-200"
                }`}
              >
                Orders
              </div>
            </Link>
            <Link href="/profile/wishlist">
              <div
                className={`hover:bg-gray-200 w-full p-2 rounded-md cursor-pointer ${
                  path == "/profile/wishlist" && "bg-gray-200"
                }`}
              >
                Wishlist
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-fit md:ml-8">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;

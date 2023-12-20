"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { IoBasketOutline } from "react-icons/io5";
import HeaderNav from "./HeaderNav";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CartItemInSidebar from "./shared/card/CartItemInSidebar";
import { useAppSelector } from "@/store";
import { AccountMenu } from "./AccountMenu";

type Props = {};

const Header = (props: Props) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  let cartItemsList =
    cartItems.length > 0 ? (
      cartItems.map((item) => (
        <CartItemInSidebar key={item.id} product={item} />
      ))
    ) : (
      <p className="text-center bg-white-200 p-4">No items in cart</p>
    );

  return (
    <header className="h-16">
      <div className="container flex my-auto h-full justify-between items-center mx-auto">
        {/* left portion of header */}
        <div>
          <h1 className="text-2xl font-semibold">Logo</h1>
        </div>

        {/* middle portion of header */}
        <HeaderNav />

        {/* right portion of header */}
        <div>
          <ul className="flex items-center gap-4 text-[24px]">
            {/* search icon  */}
            <Dialog>
              <DialogTrigger>
                <li>
                  <GoSearch className="hover:scale-110 duration-200" />
                </li>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Search your favourite items...</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <form>
                  <Input
                    placeholder="airdots"
                    name="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <DialogFooter>
                    <Button type="submit" className="mt-2">
                      Search
                    </Button>
                  </DialogFooter>
                </form>{" "}
              </DialogContent>
            </Dialog>

            {/* user icon */}
            <AccountMenu user={user} />
            {/* cart icon  */}
            <li>
              <>
                <Sheet>
                  <SheetTrigger asChild className="flex">
                    <div className="flex">
                      <IoBasketOutline className="hover:scale-110 duration-200 cursor-pointer" />
                      <span className="h-5 w-5 flex justify-center items-center text-xs font-semibold rounded-full bg-black text-white ">
                        {cartItems.length}
                      </span>
                    </div>
                  </SheetTrigger>

                  <SheetContent className="flex flex-col">
                    <SheetHeader>
                      <SheetTitle>Your Cart Items</SheetTitle>
                    </SheetHeader>
                    <div className="flex-grow">{cartItemsList}</div>
                    <SheetFooter>
                      <div className="flex justify-between items-center gap-4">
                        {/* <p className="font-semibold text-lg">Total: $400</p> */}
                        <Link href={"/cart"}>
                          <Button>Checkout</Button>
                        </Link>
                      </div>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </>
            </li>
            <li className="sm:hidden">
              <Sidebar />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

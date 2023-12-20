import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/store";
import Link from "next/link";
import { IoBasketOutline } from "react-icons/io5";
import CartItemInSidebar from "./CartItemInSidebar";

type Props = {};

const CartInSidebar = (props: Props) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  let cartItemsList =
    cartItems.length > 0 ? (
      cartItems.map((item) => (
        <CartItemInSidebar key={item.id} product={item} />
      ))
    ) : (
      <p className="text-center bg-white-200 p-4">No items in cart</p>
    );
  return (
    <div>
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
    </div>
  );
};

export default CartInSidebar;

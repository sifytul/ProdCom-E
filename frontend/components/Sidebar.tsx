import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu3Fill } from "react-icons/ri";
import SidebarNav from "./SideBarNav";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <RiMenu3Fill />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>ProdCom-E</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        {/* <div className="grid">
          <div>
            <div>
              <p>Home</p>
            </div>
            <div className="flex justify-between">
              <p>Product</p>
              <IoIosArrowDown />
            </div>
            <div className="flex justify-between">
              <p>Shop</p>
              <IoIosArrowDown />
            </div>
            <div>
              <p>Contact Us</p>
            </div>
          </div>
          <div>
            <div>
              <p>Cart</p>
            </div>
            <div>
              <p>Wishlist</p>
            </div>
            <Button>Sign In</Button>
            <div className="flex gap-2 text-2xl">
              <FaInstagram />
              <FaFacebook />
              <SlSocialYoutube />
            </div>
          </div>
        </div> */}
        <SidebarNav />
        <SheetFooter className="mt-10">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;

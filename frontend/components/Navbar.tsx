import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="h-16">
      <div className="container flex my-auto h-full justify-between items-center mx-auto">
        <div>
          <h1 className="text-[24px] font-semibold">Logo</h1>
        </div>
        <div>
          <ul className="flex gap-10 items-center text-sm sm:text-base text-neutral-gray font-semibold">
            <li className="active:text-primary hover:text-neutral-black duration-200">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="active:text-primary hover:text-neutral-black duration-200">
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li className="active:text-primary hover:text-neutral-black duration-200">
              <Link href={"/product"}>Product</Link>
            </li>
            <li className="active:text-primary hover:text-neutral-black duration-200">
              <Link href={"/contact-us"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-4 text-[24px]">
            <li>
              <Link href={"/search"} data-testid="search-icon">
                <RiSearchLine className="hover:scale-110 duration-200" />
              </Link>
            </li>
            <li>
              <Link href={"/user"} data-testid="user-icon">
                <FaRegUserCircle className="hover:scale-110 duration-200" />
              </Link>
            </li>
            <li className="flex">
              <Link
                href={"/cart"}
                data-testid="cart-icon"
                className="
                "
              >
                <HiShoppingBag className="hover:scale-110 duration-200" />
              </Link>
              <span className="h-5 w-5 text-center text-xs font-semibold rounded-full bg-neutral-black text-neutral-white-light">
                10
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

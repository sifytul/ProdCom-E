import Link from "next/link";

type Props = {};

const HeaderNav = (props: Props) => {
  return (
    <nav>
      <ul className="hidden md:flex gap-10 items-center text-sm sm:text-base font-medium">
        <li className="hover:text-black duration-200">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hover:text-black duration-200">
          <Link href={"/shop"}>Shop</Link>
        </li>
        <li className="hover:text-black duration-200">
          <Link href={"/product"}>Product</Link>
        </li>
        <li className="hover:text-black duration-200">
          <Link href={"/contact-us"}>Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;

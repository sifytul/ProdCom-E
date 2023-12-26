import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-auto bg-black text-white min-h-[250px] grid items-center justify-center md:justify-normal py-8">
      <div className="container">
        <div className="md:flex justify-between items-center mb-4">
          <div className="flex divide-x items-center">
            <Link href="/">
              <Image
                src="/assets/icons/ProdCom-E_logo.png"
                alt="logo"
                width={195}
                height={65}
                className="cursor-pointer"
              />
            </Link>
            <p className="pl-8">Gift & Decoration Store</p>
          </div>

          <div className="grid md:grid-cols-4 text-center md:text-left justify-center space-y-2 md:space-y-0">
            <p>Home</p>
            <p>Shop</p>
            <p>About</p>
            <p>Contact Us</p>
          </div>
        </div>

        <div className="flex items-center flex-col-reverse gap-4 md:flex-row justify-between md:pt-8 md:border-t md:border-gray-800">
          <p className="text-sm text-gray-400">
            Copyright 2023 ProdCom-E. All rights reserved
          </p>
          <div className="flex gap-4 ml-8">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
          <div className="md:ml-auto">
            <div className="flex items-center gap-8 md:px-8 py-2 md:border-l-2 border-gray-200 space-x-2s">
              <FaFacebookF className="text-xl" />
              <FaTwitter className="text-xl" />
              <FaInstagram className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

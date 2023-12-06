import Counter from "@/components/Counter";
import NavBarLink from "@/components/shared/NavBarLink";
import ProductImageSlider from "@/components/shared/carousel/ProductImageSlider";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import React from "react";
import { CiHeart } from "react-icons/ci";
import {
  FaAngleDown,
  FaFacebookF,
  FaInstagram,
  FaSignal,
  FaStar,
  FaTwitter,
} from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

const SingleProduct = ({ children }: Props) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {/* product info section  */}
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* left side - image slider  */}
          <div className="lg:w-1/2 w-full lg:h-auto h-96 object-cover object-center rounded bg-green-400">
            {/* <ProductImageSlider images={images} /> */}
          </div>

          {/* right side - product info  */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              The Catcher in the Rye
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <div className="flex ">
                  {Array(5)
                    .fill(1)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        className="h-5 fill-current text-yellow-500 "
                      />
                    ))}
                </div>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <div className="flex items-center gap-1 ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <FaFacebookF />
                <FaTwitter />
                <FaInstagram />
              </div>
            </div>
            <p className="leading-relaxed line-clamp-3">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <div className="flex mt-6 items-center justify-between pb-2  mb-2">
              <div className="flex items-center">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <FaAngleDown />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="font-medium text-2xl">$58.00</span>
              <span className="text-gray mx-3 line-through">$89.00</span>
            </div>
            <div className="grid grid-cols-8 gap-4 border-y-1 border-white-200 py-8">
              <div className="col-span-3 sm:col-span-2">
                <Counter
                  value={2}
                  // increaseHandler={() => {}}
                  // decreaseHandler={() => {}}
                />
              </div>
              <div className="col-span-5 sm:col-span-6 flex gap-2 py-1 rounded-md bg-white-200 items-center justify-center ">
                <CiHeart className="text-2xl" />
                <p>Add to wishlist</p>
              </div>
              <Button className="col-span-full font-medium ">
                Add to Cart
              </Button>
            </div>

            <div>
              {/* tags section */}
              <div className="flex flex-wrap gap-6">
                <p className="bg-white-200 text-gray rounded-full py-1 px-6">
                  office
                </p>
                <p className="bg-white-200 text-gray rounded-full py-1 px-6">
                  furniture
                </p>
              </div>

              <Table className="w-4/5 md:w-1/2 text-gray">
                <tbody>
                  <tr>
                    <td>SKU</td>
                    <td className="text-left">123456789</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td className="text-left">Office furniture</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          {/* right side END - product info  */}
        </div>

        <div>
          <nav className="flex items-center h-10 my-6 space-x-4 md:space-x-8">
            <NavBarLink text="Additional Info" url="/products/sfds" />
            <NavBarLink text="Questions" url="/products/sfds/questions" />
            <NavBarLink text="Reviews" url="/products/sfds/reviews" />
          </nav>

          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;

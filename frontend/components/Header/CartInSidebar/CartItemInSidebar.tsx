"use client";
import Counter from "@/components/Counter";
import { useAppDispatch } from "@/store";
import Image from "next/image";
import { CgCross } from "react-icons/cg";
import { FaCross } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import {
  removeFromCart,
  addToCart,
  decreaseQtyFromCart,
} from "@/store/slices/cartSlice";

type TProduct = {
  product: {
    id: number;
    sku: string;
    name: string;
    price: number;
    discount: number | boolean;
    ratings: number;
    image_urls: any[];
    stock: number;
    trending_title: string;
    qty: number;
  };
};
const CartItemInSidebar = ({ product }: TProduct) => {
  const dispatch = useAppDispatch();
  let {
    name,
    price,
    discount,
    ratings,
    image_urls,
    trending_title: trendingTitle,
    qty,
  } = product;
  return (
    <div className="flex justify-between items-center py-4 border-b border-green-50">
      <div className="flex items-center gap-2">
        <div className="bg-white-100 w-24 h-24 flex-shrink-0">
          <Image
            src={image_urls[0].url}
            width={100}
            height={100}
            alt="sofa"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <div className="my-1">
            <p className="text-sm text-gray">Color: Black</p>
            <p className="text-sm">
              <span className="text-gray">Price: </span>$ {price}
            </p>
          </div>
          <Counter
            value={qty}
            increaseHandler={() => dispatch(addToCart(product))}
            decreaseHandler={() => dispatch(decreaseQtyFromCart(product))}
          />
        </div>
      </div>
      <div className="space-y-1 p-1">
        <div>
          <p className="font-semibold">${Number(price) * qty}</p>
        </div>

        <div
          onClick={() => dispatch(removeFromCart(product))}
          className="cursor-pointer ml-auto"
        >
          <RxCross1 />
        </div>
      </div>
    </div>
  );
};

export default CartItemInSidebar;

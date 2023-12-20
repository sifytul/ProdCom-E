"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { addToCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import { toast } from "react-toastify";

type TCategory = {
  id: number;
  category_name: string;
  image_url: string;
};
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
    category: TCategory;
    trending_title: string;
  };
  cardVariant?: "small";
};

const ProductCard = ({ product }: TProduct) => {
  const dispatch = useAppDispatch();
  let {
    name,
    price,
    discount,
    ratings,
    image_urls,
    trending_title: trendingTitle,
  } = product;

  let priceAfterDiscount: null | number = null;

  if (Number(discount) === 0 || Number(discount) >= 100) {
    discount = false;
  }

  if (discount) {
    priceAfterDiscount = Math.round(price * (discount as number)) - 0.01;
  }

  return (
    <div
      className={`
        w-[152px] h-[283px]  xs:h-[392px] xs:w-[231px]
        sm:h-[433px] sm:w-[262px] group space-y-3 
      flex flex-col`}
    >
      <div className="relative   sm:h-[350px] flex justify-center items-center flex-grow bg-white-100">
        <div className="">
          <div className="absolute top-2 left-2 xs:top-4 xs:left-4 space-y-2 font-semibold">
            {trendingTitle && (
              <p className="font-inter w-10 h-4 xs:w-16 xs:h-6 p-0.5 xs:px-3 xs:py-1 text-center bg-white rounded-md xs:leading-none leading-none uppercase text-xs xs:text-base">
                {trendingTitle}
              </p>
            )}
            {discount && (
              <div className="w-10 h-4 xs:w-16 xs:h-6 p-0.5 xs:px-2 xs:py-1 text-center bg-accent text-white-100 rounded-md leading-none xs:leading-none text-xs xs:text-base">
                -{(discount as number) * 100}%
              </div>
            )}
          </div>
          <div className="bg-white h-8 w-8 absolute top-4 right-4 shadow-md flex justify-center items-center rounded-full cursor-pointer group/wishbutton ">
            <CiHeart className="text-xl group-hover/wishbutton:scale-105" />
          </div>
        </div>
        <div className="w-full">
          <Image
            src={image_urls[0]?.url}
            alt={name}
            width={150}
            height={150}
            style={{ objectFit: "contain", height: "100%", width: "100%" }}
          />
        </div>
        <Button
          className="absolute bottom-3 w-4/5 invisible group-hover:visible"
          onClick={() => {
            dispatch(addToCart(product));
            toast.success("Added to cart");
          }}
        >
          Add to cart
        </Button>
      </div>

      <Link href={`/products/${product.id}`}>
        <div className="h-[98px] font-inter font-semibold p=">
          <div className="flex ">
            {Array(ratings < 5 ? 5 : ratings)
              .fill(1)
              .map((_, i) => (
                <FaStar key={i} className="h-5 fill-current text-yellow-500 " />
              ))}
          </div>
          <p className="text-sm xs:text-base truncate xs:trun">{name}</p>

          <div className="text-sm font-semibold flex gap-2">
            {discount ? (
              <>
                <p>${priceAfterDiscount}</p>
                <p className="line-through text-gray text-xs xs:text-sm">
                  ${price}
                </p>
              </>
            ) : (
              <p>${price}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

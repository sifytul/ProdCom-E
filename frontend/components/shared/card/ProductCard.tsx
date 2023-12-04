import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
type TProduct = {
  product: {
    title: string;
    price: number;
    discount: string | number;
    rating: number;
    image: string;
    trendingTitle: string;
  };
  cardVariant?: "small";
};

const ProductCard = ({ product }: TProduct) => {
  let { title, price, discount, rating, image, trendingTitle } = product;

  let priceAfterDiscount: null | number = null;
  if (
    discount &&
    typeof discount === "number" &&
    discount > 1 &&
    discount < price
  ) {
    discount = 0;
  } else {
    if (discount && typeof discount === "string" && discount.includes("%")) {
      const discountPercentage = parseInt(discount.replace("%", ""));
      priceAfterDiscount = Math.round(
        price - (price * discountPercentage) / 100
      );
    } else if (
      discount &&
      typeof discount === "number" &&
      discount > 0 &&
      discount < 1
    ) {
      priceAfterDiscount = Math.round(price - price * discount);
    } else {
      priceAfterDiscount = price;
    }
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
            <p className="font-inter w-10 h-4 xs:w-16 xs:h-6 p-0.5 xs:px-3 xs:py-1 text-center bg-white rounded-md xs:leading-none leading-none uppercase text-xs xs:text-base">
              {trendingTitle}
            </p>
            {discount !== 0 && (
              <div className="w-10 h-4 xs:w-16 xs:h-6 p-0.5 xs:px-2 xs:py-1 text-center bg-accent text-white-100 rounded-md leading-none xs:leading-none text-xs xs:text-base">
                -{discount}
              </div>
            )}
          </div>
          <div className="bg-white h-8 w-8 absolute top-4 right-4 shadow-md flex justify-center items-center rounded-full cursor-pointer group/wishbutton ">
            <CiHeart className="text-xl group-hover/wishbutton:scale-105" />
          </div>
        </div>
        <div className="w-full">
          <Image
            src={image}
            alt="airpods"
            width={500}
            height={500}
            style={{ objectFit: "contain", height: "100%", width: "100%" }}
          />
        </div>
        <Button className="absolute bottom-3 w-4/5 invisible group-hover:visible">
          Add to cart
        </Button>
      </div>
      <div className="h-[98px] font-inter font-semibold p=">
        <div className="flex ">
          {Array(rating)
            .fill(1)
            .map((_, i) => (
              <FaStar key={i} className="h-5 fill-current text-yellow-500 " />
            ))}
        </div>
        <p className="text-sm xs:text-base truncate xs:trun">{title}</p>

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
    </div>
  );
};

export default ProductCard;

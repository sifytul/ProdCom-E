import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

type CategoryDisplayCardProps = {
  imgSrc: string;
  title: string;
};

const CategoryDisplayCard = ({ imgSrc, title }: CategoryDisplayCardProps) => {
  return (
    <div className="bg-white-100 relative rounded-xl overflow-hidden group">
      <div>
        <Image
          src={imgSrc}
          alt={title}
          width={500}
          height={500}
          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="absolute left-8 bottom-8 bg-white px-4 py-3 h-fit rounded-md">
        <h3 className="text-2xl font-medium">{title}</h3>
        <Link
          href={`/shop?category=${title}`}
          className="flex items-center gap-3 cursor-pointer pb-0.5  hover:border-b border-gray w-fit"
        >
          <p>Collection</p>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default CategoryDisplayCard;

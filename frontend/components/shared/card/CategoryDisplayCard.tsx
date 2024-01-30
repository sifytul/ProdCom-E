import React from "react";
import { FaArrowRight } from "react-icons/fa";

const CategoryDisplayCard = () => {
  return (
    <div className="bg-white-100 h-full max-h-[664px] min-h-[320px] relative">
      <div>
        {/* <Image
          src="/assets/images/sofa-white.png"
          alt="hero"
          width={500}
          height={500}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        /> */}
      </div>
      <div className="absolute left-8 bottom-8">
        <h3 className="text-2xl font-medium">Headband</h3>
        <div className="flex items-center gap-3 cursor-pointer pb-0.5  hover:border-b border-gray w-fit">
          <p>Collection</p>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default CategoryDisplayCard;

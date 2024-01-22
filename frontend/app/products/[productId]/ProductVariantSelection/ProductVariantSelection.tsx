import React from "react";
import { FaAngleDown } from "react-icons/fa";
import ColorsSelection from "./ColorsSelection";
import SizeSelection from "./SizeSelection";

const ProductVariantSelection = () => {
  return (
    <div className="flex mt-6 items-center justify-between pb-2">
      <div className="flex items-center">
        {/* choose color  */}
        <ColorsSelection />

        {/* choose Size  */}
        <SizeSelection />
      </div>
    </div>
  );
};

export default ProductVariantSelection;

import React from "react";
import { FaAngleDown } from "react-icons/fa";

const SizeSelection = () => {
  return (
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
  );
};

export default SizeSelection;

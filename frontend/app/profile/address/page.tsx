import { Button } from "@/components/ui/button";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const Address = () => {
  return (
    <div className="my-10 text-gray-300">
      <h2 className="font-semibold text-xl mt-8 mb-4">Address</h2>
      <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4 ">
        <AddressCard address={{}} />
        <AddressCard address={{}} />
      </div>
    </div>
  );
};

export default Address;

function AddressCard({ address }) {
  return (
    <div className="border border-gray-200 rounded-md p-4 min-w-[342px] relative">
      <div className="flex items-center absolute right-4 top-4">
        <Button variant={"outline"} size={"sm"} className="hover:bg-green-200">
          <CiEdit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 hover:bg-red-500 hover:text-white"
        >
          <MdOutlineDelete className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm">
        <h3 className="font-semibold text-base mb-1">{"Shipping address"}</h3>
        <p>Karim Sifytul</p>
        <p>(+880) 1800 000000</p>
        <p>House 1, Road 1, Block A</p>
        <p>Halishahar, Chittagong, Bangladesh</p>
      </div>
    </div>
  );
}

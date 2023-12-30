import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { RxCross2 } from "react-icons/rx";

function Wishlist() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Your Wishlist</h1>
      <div>
        <Table className="center">
          <TableHeader>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {/* <div className="flex items-center space-x-4">
                  <div className="flex-none w-20 h-20">
                    <img
                      src="/assets/images/lamp.png"
                      alt=""
                      className="object-cover w-full h-full rounded"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Table lamp</h3>
                    <p>color: Gray</p>
                  </div>
                </div> */}
                <div className="flex items-center gap-2">
                  <div className=" w-20 h-20 flex-shrink-0">
                    <Image
                      src="/assets/images/lamp.png" //{image_urls[0].url}
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
                    <h3 className="font-semibold">{"Table lamp"}</h3>
                    <p className="text-xs md:text-sm text-gray">Color: Black</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>$1,099.00</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button>Add to cart</Button>
                  <RxCross2 className="ml-2 text-2xl text-red-500" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Wishlist;

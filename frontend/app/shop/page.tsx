"use client";
import ProductCard from "@/components/shared/card/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/public/demo/db";
import Image from "next/image";
import React from "react";

type Props = {};

const Shop = (props: Props) => {
  return (
    <div>
      {/* shop cover */}
      <div className="container">
        <div className="relative w-full h-[308px] md:h-[392px] min-h-[308px] md:max-h-[392px] justify-between items-center">
          {/* shop title  */}
          <div className="absolute w-full h-full flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-5xl font-bold">Shop Page</h1>
              <p className="text-gray md:text-xl">
                Let&apos;s design the place you always imagined.
              </p>
            </div>
          </div>
          {/* shop cover image  */}
          <div className="bg-gray-200 w-full h-full">
            <Image
              src={"/assets/images/shop-page-cover.png"}
              width={1120}
              height={400}
              alt={"shop cover image"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* shop page content  */}
      <div className="container my-8">
        {/* filter and sort part  */}
        <div className="flex justify-between items-end flex-wrap gap-4">
          {/* filter part  */}
          <div className="flex gap-4">
            {/* filter by category  */}
            <div>
              <p className="text-gray mb-1">Category</p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Sofa">Sofa</SelectItem>
                    <SelectItem value="Chair">Chair</SelectItem>
                    <SelectItem value="Table">Table</SelectItem>
                    <SelectItem value="Bed">Bed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* filter by price  */}
            <div>
              <p className="text-gray mb-1">Price</p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Sofa">Sofa</SelectItem>
                    <SelectItem value="Chair">Chair</SelectItem>
                    <SelectItem value="Table">Table</SelectItem>
                    <SelectItem value="Bed">Bed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* filter by rating  */}
            <div></div>
          </div>
          {/* sort part  */}
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="rating_desc">
                    Rating: High to Low
                  </SelectItem>
                  <SelectItem value="rating_asc">
                    Rating: Low to High
                  </SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="name_asc">Name: A to Z</SelectItem>
                  <SelectItem value="name_desc">Name: Z to A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* shop page products  */}
        <div
          className="flex flex-wrap gap-4 mt-8"
          style={{ minHeight: "50vh" }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* pagination  */}
        <div className="text-center">
          <Button
            className="text-center font-semibold"
            size={"lg"}
            variant={"secondary"}
          >
            Load More
          </Button>
        </div>
      </div>

      {/* newsletter banner */}
      <div className="bg-gray py-8">
        <div className="container">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold">
                Subscribe to our newsletter
              </h2>
              <p className="text-gray-500 md:text-lg">
                Get notified about new products and promotions.
              </p>
            </div>
            <div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full md:w-[300px] px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary"
                />
                <Button size={"lg"} variant={"default"}>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

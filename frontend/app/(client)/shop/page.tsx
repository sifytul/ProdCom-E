import ProductCard from "@/components/shared/card/ProductCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import FilterAndSort from "./FilterAndSort";

async function getProducts(category, searchTerm) {
  let query = "";

  if (category && searchTerm) {
    query = `?category=${category}&searchTerm=${searchTerm}`;
  } else if (category) {
    query = `?category=${category}`;
  } else if (searchTerm) {
    query = `?searchTerm=${searchTerm}`;
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + "/products" + query
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();

  return data;
}

async function getCategories() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/categories", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const Shop = async ({ searchParams }) => {
  let category = (searchParams.category || "all") as string;
  let searchTerm = (searchParams.searchTerm || "") as string;
  const { products } = await getProducts(category, searchTerm);
  const { categories } = await getCategories();

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

        <FilterAndSort categories={categories} />

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

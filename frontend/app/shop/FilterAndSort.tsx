"use client";
import React, { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterAndSort = ({ categories }) => {
  const router = useRouter();

  const handleFilterChange = (value) => {
    // setCategoryFilter(value);
    router.push(`?category=${value}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex justify-between items-end flex-wrap gap-4">
      {/* filter part  */}
      <div className="flex gap-4">
        {/* filter by category  */}
        <div>
          <p className="text-gray mb-1">Category</p>
          <Select onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.category_name}>
                    {category.category_name}
                  </SelectItem>
                ))}
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
              <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
              <SelectItem value="rating_asc">Rating: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="name_desc">Name: Z to A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterAndSort;

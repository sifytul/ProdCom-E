import Rating from "@/components/shared/Rating";
import CustomerReviewCard from "@/components/shared/card/CustomerReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FaFacebookF, FaInstagram, FaStar, FaTwitter } from "react-icons/fa";

type Props = {};

const Reviews = (props: Props) => {
  return (
    <div>
      <h2 className="text-xl font-medium">Customer Reviews</h2>
      <div className="flex mb-4">
        <span className="flex items-center">
          <Rating rating={5} />
          <span className="text-gray-600 ml-3 text-sm">4 Reviews</span>
        </span>
      </div>
      <div>
        <form className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Share your thoughts" />
          <Button>Review</Button>
        </form>
      </div>
      <div>
        <div className="flex justify-between items-center my-8">
          <h3>4 Reviews</h3>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="Newest">Newest</SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4">
          <CustomerReviewCard />
          <CustomerReviewCard />
          <CustomerReviewCard />
          <CustomerReviewCard />
        </div>
      </div>
    </div>
  );
};

export default Reviews;

"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Counter from "@/components/Counter";
import { useAppDispatch, useAppSelector } from "@/store";
import { addQtyToCart } from "@/store/slices/cartSlice";

const AddToCartAndWishlist = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const isProductExistInCart = cart.cartItems.find(
    (item) => item.id === product.id
  );

  const [state, setState] = React.useState(1);
  const increaseHandler = () => {
    setState(state + 1);
  };

  const decreaseHandler = () => {
    setState(state - 1);
  };

  if (isProductExistInCart) {
    return (
      <div className="grid grid-cols-8 gap-4 border-y-1 border-white-200 py-8">
        <div className="col-span-3 sm:col-span-2">
          <Counter value={isProductExistInCart.qty} disabled />
        </div>
        <div className="col-span-5 sm:col-span-6 flex gap-2 py-1 rounded-md bg-white-200 items-center justify-center ">
          <CiHeart className="text-2xl" />
          <p>Add to wishlist</p>
        </div>
        <Button className="col-span-full font-medium" disabled>
          Already in Cart
        </Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-8 gap-4 border-y-1 border-white-200 py-8">
      <div className="col-span-3 sm:col-span-2">
        <Counter
          value={state}
          increaseHandler={increaseHandler}
          decreaseHandler={decreaseHandler}
        />
      </div>
      <div className="col-span-5 sm:col-span-6 flex gap-2 py-1 rounded-md bg-white-200 items-center justify-center ">
        <CiHeart className="text-2xl" />
        <p>Add to wishlist</p>
      </div>
      <Button
        className="col-span-full font-medium"
        onClick={() => dispatch(addQtyToCart({ product, qty: state }))}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartAndWishlist;

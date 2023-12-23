"use client";
import React from "react";
import Counter from "@/components/Counter";
import { RxCross1 } from "react-icons/rx";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addToCart,
  decreaseQtyFromCart,
  removeFromCart,
  setDeliveryCharge,
  setStepperState,
} from "@/store/slices/cartSlice";
import Link from "next/link";

type Props = {};

const Cart = (props: Props) => {
  const cartItems = useAppSelector((state) => state.cart?.cartItems);
  const cartSubTotal = useAppSelector((state) => state.cart?.total);
  const deliveryCharge = useAppSelector(
    (state) => state.cart?.deliveryCharge?.charge
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      {/* content section  */}
      <div className="xl:grid grid-cols-3 justify-center gap-6 mb-8">
        {/* items in cart - left  */}
        <div className="xl:col-span-2">
          {cartItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="flex gap-1 items-center">
                        <div className="h-20 w-20 flex-shrink-0">
                          <Image
                            src={product.image_urls[0].url}
                            alt={product.title}
                            height={100}
                            width={100}
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div>
                          <p className="max-w-[10cr]">{product.title}</p>
                          <div
                            className="text-gray font-semibold flex items-center gap-1 text-sm cursor-pointer"
                            onClick={() => dispatch(removeFromCart(product))}
                          >
                            <RxCross1 />
                            <p>Remove</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>${product.price}</td>
                    <td>
                      <div>
                        <Counter
                          value={product.qty}
                          increaseHandler={() => dispatch(addToCart(product))}
                          decreaseHandler={() =>
                            dispatch(decreaseQtyFromCart(product))
                          }
                        />
                      </div>
                    </td>
                    <td className="font-semibold">${product.subTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="border border-gray-100 shadow-md rounded-sm p-6 text-center">
              <h3 className="text-xl font-medium">Your cart is empty</h3>
              <p className="text-sm text-gray">
                You have no items in your cart. Start adding{" "}
                <Link href="/shop" className="text-accent font-semibold">
                  some
                </Link>
                !
              </p>
            </div>
          )}
          {/* coupon code */}
          <div className="border border-gray rounded-sm p-6 space-y-2 my-6 max-w-md">
            <h3 className="text-xl font-medium">Have a coupon?</h3>
            <p className="text-sm text-gray">
              Add your code for an instant cart discount
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your coupon code"
                className="border border-gray rounded-sm px-4 py-2 w-full"
              />
              <Button>Apply</Button>
            </div>
          </div>
        </div>

        {/* price calculation - right */}
        <div className="border border-gray rounded-sm p-6 h-fit flex flex-col space-y-4">
          <h3 className="text-xl font-medium">Cart summary</h3>
          <div>
            <RadioGroup
              onValueChange={(value) => dispatch(setDeliveryCharge(value))}
            >
              <div className="flex items-center justify-between border border-gray rounded-sm px-4 py-3">
                <div className="space-x-2">
                  <RadioGroupItem value="inside-ctg" id="inside-ctg" />
                  <Label htmlFor="inside-ctg">Inside Chittagong</Label>
                </div>
                <p>$70</p>
              </div>
              <div className="flex items-center justify-between border border-gray rounded-sm px-4 py-3">
                <div className="space-x-2">
                  <RadioGroupItem value="outside-ctg" id="outside-ctg" />
                  <Label htmlFor="outside-ctg">Outside Chittagong</Label>
                </div>
                <p>$100</p>
              </div>
              <div className="flex items-center justify-between border border-gray rounded-sm px-4 py-3">
                <div className="space-x-2">
                  <RadioGroupItem value="free-pick-up" id="free-pick-up" />
                  <Label htmlFor="free-pick-up">Free Pick Up</Label>
                </div>
                <p>$0.00</p>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${cartSubTotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p>${Number(cartSubTotal) + Number(deliveryCharge)}</p>
          </div>
          {cartItems.length > 0 ? (
            <Link
              href="/cart/checkout"
              onClick={() => dispatch(setStepperState("cart"))}
            >
              <Button>Checkout</Button>
            </Link>
          ) : (
            <Link href="/shop">
              <Button variant={"outline"}>Go to Shop</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

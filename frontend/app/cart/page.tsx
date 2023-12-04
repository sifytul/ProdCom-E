"use client";
import React from "react";
import { products } from "../page";
import Counter from "@/components/Counter";
import { RxCross1 } from "react-icons/rx";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {};

const Cart = (props: Props) => {
  return (
    <div>
      {/* content section  */}
      <div className="xl:grid grid-cols-3 justify-center gap-6">
        {/* items in cart - left  */}
        <div className="xl:col-span-2">
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex gap-1 items-center">
                      <div className="h-20 w-20 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div>
                        <p className="max-w-[10cr]">{product.title}</p>
                        <div className="text-gray font-semibold flex items-center gap-1 text-sm">
                          <RxCross1 />
                          <p>Remove</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>
                    <div>
                      <Counter
                        value={3}
                        increaseHandler={() => {}}
                        decreaseHandler={() => {}}
                      />
                    </div>
                  </td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
            <RadioGroup defaultValue="inside-ctg">
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
                <p>$120</p>
              </div>
              <div className="flex items-center justify-between border border-gray rounded-sm px-4 py-3">
                <div className="space-x-2">
                  <RadioGroupItem value="pick-up" id="pick-up" />
                  <Label htmlFor="pick-up">Free Pick Up</Label>
                </div>
                <p>$0.00</p>
              </div>
            </RadioGroup>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>$1234</p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p>$1234</p>
          </div>
          <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

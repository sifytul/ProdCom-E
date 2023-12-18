import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {};

const Checkout = (props: Props) => {
  return (
    <div>
      <div className="my-8 space-y-2">
        <p>
          Returning customer?{" "}
          <Link
            href={"/auth/signin"}
            className="text-accent font-semibold hover:border-b hover:border-accent hover:text-accent"
          >
            Click here to login
          </Link>
        </p>
        <div className="border-dashed border border-green-100 rounded-md p-4 lg:w-2/5">
          <form className="space-y-4">
            <h2 className="text-gray">
              If you have a coupon code, please apply it below.
            </h2>
            <Input
              type="text"
              name="couponCode"
              id="couponCode"
              placeholder="Coupon code"
            />
            <Button>Apply coupon</Button>
          </form>
        </div>
      </div>

      {/* checkout form */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 sepa">
        {/* Contact information - left section  */}

        <div className="space-y-8">
          {/* contact information */}
          <div className="shadow-md rounded-md py-10 px-6">
            <form>
              <div className="space-y-6">
                <h2 className="font-medium text-xl">Contact information</h2>
                <div className="flex gap-1 md:gap-4">
                  <div className="w-full">
                    <label htmlFor="firstName">First Name</label>
                    <Input type="text" name="firstName" id="email" />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName">Last Name</label>
                    <Input type="text" name="lastName" id="lastName" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNo">Phone Number</label>
                  <Input type="text" name="phoneNo" id="phoneNo" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Input type="text" name="email" id="email" />
                </div>
              </div>
            </form>
          </div>

          {/* shipping address */}
          <div className="shadow-md rounded-md py-10 px-6 space-y-6">
            <h2 className="text-xl font-medium">Shipping address</h2>
            <div>
              <label htmlFor="streetAddress">
                Street Address <span>*</span>
              </label>
              <Input type="text" name="streetAddress" id="streetAddress" />
            </div>

            <div>
              <label htmlFor="city">
                City <span>*</span>
              </label>
              <Input type="text" name="city" id="city" />
            </div>

            <div>
              <label htmlFor="country">
                Country <span>*</span>
              </label>
              <Input type="text" name="country" id="country" />
            </div>

            <div>
              <label htmlFor="zip">
                Zip code <span>*</span>
              </label>
              <Input type="text" name="zip" id="zip" />
            </div>

            <div>
              <h3 className="text-lg font-medium">Additional information</h3>
              <Label htmlFor="orderNotes">Order notes (optional)</Label>
              <Textarea
                name="orderNotes"
                id="orderNotes"
                placeholder="Type your message here."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Save this information for next time
              </label>
            </div>
          </div>
        </div>

        {/* Order summary - right section */}

        <div className="space-y-8 ">
          {/* your order summary */}
          <div className="shadow-md rounded-md p-6">
            <h2 className="text-xl font-medium">Your Order</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Product</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-base">
                <TableRow>
                  <TableCell className="font-medium">
                    Memphis One Casual Slip - <span>42</span> -{" "}
                    <span> * 3</span>
                  </TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Kacchi Beli - <span>5 ml</span>- <span>* 1</span>
                  </TableCell>
                  <TableCell className="text-right">$300.00</TableCell>
                </TableRow>
              </TableBody>

              <TableFooter>
                <TableRow className="text-lg font-medium">
                  <TableCell>Subtotal</TableCell>
                  <TableCell className="text-right">$550.00</TableCell>
                </TableRow>

                <TableRow className="text-lg font-medium">
                  <TableCell>Shipping</TableCell>
                  <TableCell className="flex justify-end">
                    <RadioGroup defaultValue="inside-dhaka">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="inside-dhaka"
                          id="inside-dhaka"
                        />
                        <Label htmlFor="inside-dhaka">
                          Inside Dhaka{": "}
                          <span className="font-semibold text-accent text-lg">
                            $65
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="outside-dhaka"
                          id="outside-dhaka"
                        />
                        <Label htmlFor="outside-dhaka">
                          Outside Dhaka{": "}
                          <span className="font-semibold text-accent text-lg">
                            $109
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow className="text-xl font-semibold">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">$619.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* payment method */}
          <div className="shadow-md rounded-md p-6">
            <h2 className="text-xl font-medium mb-4">Payment method</h2>
            <div>
              <RadioGroup defaultValue="cod">
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on delivery</Label>
                  </div>
                  <div className="p-4 bg-green-50">
                    Have to pay after receiving the product
                  </div>
                </>

                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nagad" id="nagad" />
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="nagad">Nagad</Label>
                      <Image
                        src="/assets/icons/nagad.png"
                        alt="nagad"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-green-50">
                    <div>
                      <p>
                        নগদে টাকা প্রদান করার জন্য নগদ App এর মাধ্যমে অথবা
                        সরাসরি *167# ডায়াল করে &quot;Send Money (সেন্ড
                        মানি)&quot; অপশনটি সিলেক্ট করুন।
                      </p>
                      <p>
                        আমাদের নগদ নাম্বার &quot;01859667631&quot; এ আপনার মোট
                        বিল প্রদান করুন।
                      </p>
                      <p>
                        বিঃদ্রঃ শুধুমাত্র &quot;সেন্ড মানি&quot; অপশন এর মাধ্যমে
                        বিল পরিশোধ করতে হবে Nagad Personal Number : 01859667631
                      </p>
                    </div>
                    <div>
                      <div>
                        <Label htmlFor="nagadnumber">Nagad Number</Label>
                        <Input
                          type="text"
                          name="nagadNumber"
                          id="nagadNumber"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nagadTrxId">Transaction ID</Label>
                        <Input type="text" name="nagadTrxId" id="nagadTrxId" />
                      </div>
                    </div>
                  </div>
                </>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bkash" id="bkash" />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="bkash">Bkash</Label>
                    <Image
                      src="/assets/icons/bkash.png"
                      alt="bkash"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* place order button */}
          <Button>Place order</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

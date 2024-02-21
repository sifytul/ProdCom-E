import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RxCross2 } from "react-icons/rx";

const OrderSummery = ({ cart }) => {
  let itemsToOrder =
    cart.cartItems.length > 0 ? (
      cart.cartItems.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-medium flex items-center gap-2">
            {item.name} - <span>{item.variant || "Black"}</span> <RxCross2 />
            <span> {item.qty}</span>
          </TableCell>
          <TableCell className="text-right">${item.subTotal}</TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell className="text-center font-medium">
          No items in cart
        </TableCell>
      </TableRow>
    );
  return (
    <div className="space-y-8 ">
      <div className="border border-gray-200 rounded-md p-6">
        <h2 className="text-xl font-medium">Your Order</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Product</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-base">
            {/* cart items */}
            {itemsToOrder}
          </TableBody>
        </Table>
      </div>
      <div className="border border-gray-200 rounded-md p-6">
        <h2 className="text-xl font-semibold ">Cart totals</h2>
        <Table className="">
          <TableBody>
            <TableRow className="text-lg font-medium">
              <TableCell>Subtotal</TableCell>
              <TableCell className="text-right">${cart.total}</TableCell>
            </TableRow>

            <TableRow className="text-lg font-medium">
              <TableCell>Shipping</TableCell>
              <TableCell className="text-right">
                {cart.deliveryCharge.location}:{" "}
                <span className="font-semibold text-accent text-lg">
                  ${cart.deliveryCharge.charge}
                </span>
              </TableCell>
            </TableRow>
            <TableRow className="text-xl font-semibold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right">
                ${Number(cart.total) + Number(cart.deliveryCharge.charge)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderSummery;

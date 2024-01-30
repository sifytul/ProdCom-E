"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetOrderDetailsQuery } from "@/store/slices/cartApiSlice";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { RxCross2 } from "react-icons/rx";
import PaymentOptions from "./PaymentOptions";
import Link from "next/link";

const PaymentPage = () => {
  const params = useSearchParams();
  let orderId = params.get("orderId");

  const {
    data: orderDetails,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetOrderDetailsQuery(orderId);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess && orderDetails?.data?.status === "confirmed") {
    content = (
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-center">
          Your order has been confirmed
        </h2>
        <Link href="/profile/orders">
          <Button>Check your order</Button>
        </Link>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="space-y-8">
        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-medium mb-4">Order summery</h2>
          <Table className="w-full">
            <TableBody>
              {orderDetails.data.ordered_items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.product.image_urls[0]?.url}
                      width={100}
                      height={100}
                      alt={item.product.name}
                    />
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-2">
                    {item.product.name} -{" "}
                    <span>{item.product.variant && item.product.variant}</span>{" "}
                    <RxCross2 />
                    <span> {item.quantity}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.sub_total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border border-gray-200 rounded-md p-6">
          <h2 className="text-xl font-medium mb-4 text-center">Total</h2>
          <Table className="text-base border border-gray-100 rounded-md">
            <TableBody>
              <TableRow className="text-lg font-medium">
                <TableCell>Subtotal</TableCell>
                <TableCell className="text-right">
                  ${orderDetails.data.items_price}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Shipping address</TableCell>
                <TableCell className="text-right">
                  {orderDetails.data.shipping_info.address},{" "}
                  {orderDetails.data.shipping_info.city},{" "}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Shipping Charge</TableCell>

                <TableCell className="text-right">
                  ${orderDetails.data.shipping_price}
                </TableCell>
              </TableRow>
              <TableRow className="text-lg font-medium">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  ${orderDetails.data.total_price}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 my-10">
      {/* -------------------order summery start ----------------------- */}
      <div>
        {content}
        {/* <OrderSummery cart={[]} /> */}
      </div>
      {/* -------------------order summery end ----------------------- */}

      {isSuccess && orderDetails?.data?.status === "confirmed" ? null : (
        <PaymentOptions orderId={Number(orderId)} />
      )}
    </div>
  );
};

export default PaymentPage;

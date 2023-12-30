"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyAllOrdersQuery } from "@/store/slices/profileApiSlice";

type Props = {};

const Orders = (props: Props) => {
  const {
    data: allOrderDetails,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetMyAllOrdersQuery("");

  let orderList;

  if (isLoading) {
    orderList = <div>Loading...</div>;
  } else if (isSuccess) {
    orderList = allOrderDetails?.data?.map((order) => {
      return (
        <TableRow>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.date}</TableCell>
          <TableCell>{order.totalItems}</TableCell>
          <TableCell>{order.status}</TableCell>
          <TableCell>${order.totalPrice}</TableCell>
        </TableRow>
      );
    });
  }
  return (
    <div>
      <h2 className="font-semibold text-xl">Orders History</h2>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Ordered Items</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>{orderList}</TableBody>
        </Table>
      </div>
      <div className="my-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Orders;

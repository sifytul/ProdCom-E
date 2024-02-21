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
import { dateFormatter } from "@/utils/dateFormatter";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Orders = () => {
  const queryParams = useSearchParams();
  const page = queryParams.get("page") ? Number(queryParams.get("page")) : 1;

  const {
    data: allOrderDetails,
    isLoading,
    isSuccess,
  } = useGetMyAllOrdersQuery(page);

  let orderList;

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    if (allOrderDetails.data.length < 1) {
      orderList = (
        <TableRow>
          <TableCell>No orders yet</TableCell>;
        </TableRow>
      );
    } else {
      orderList = allOrderDetails?.data?.map((order) => {
        const formattedDate = dateFormatter(order.createdAt);
        return (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>{order.totalItems}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>${order.totalPrice}</TableCell>
          </TableRow>
        );
      });
    }
  }
  return (
    <div className="my-10">
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
      {/* <div className="my-8">
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={"?page=1"} isActive={page == 1}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=2`}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=3`}>3</PaginationLink>
            </PaginationItem>
            {allOrderDetails?.totalPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {allOrderDetails?.totalPage === page ? null : (
              <PaginationItem>
                <PaginationLink href={`?page=${allOrderDetails?.totalPage}`}>
                  {allOrderDetails?.totalPage}
                </PaginationLink>
              </PaginationItem>
            )}
            {allOrderDetails?.totalPage === page ? null : (
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div> */}
    </div>
  );
};

export default Orders;

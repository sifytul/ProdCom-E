import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderDetails: builder.query({
      query: (orderId) => `/orders/my-orders/${orderId}`,
      keepUnusedDataFor: 0,
      forceRefetch: () => true,
    }),

    orderProduct: builder.mutation({
      query: (orderDetails) => ({
        url: "/orders/new",
        method: "POST",
        body: orderDetails,
      }),
    }),

    confirmOrder: builder.mutation({
      query: ({ orderId, paymentDetails }) => ({
        url: `/orders/my-orders/${orderId}`,
        method: "PATCH",
        body: paymentDetails,
      }),
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/my-orders/${orderId}`,
        method: "PATCH",
        body: { status: "canceled" },
      }),
    }),
  }),
});

export const {
  useGetOrderDetailsQuery,
  useOrderProductMutation,
  useCancelOrderMutation,
  useConfirmOrderMutation,
} = cartApiSlice;

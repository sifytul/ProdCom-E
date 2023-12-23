import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderDetails: builder.query({
      query: (orderId) => `/orders/my-orders/${orderId}`,
      keepUnusedDataFor: 0,
      forceRefetch: () => true,
    }),

    confirmOrder: builder.mutation({
      query: ({ orderId, paymentDetails }) => ({
        url: `/orders/my-orders/${orderId}`,
        method: "PATCH",
        body: paymentDetails,
      }),
    }),
  }),
});

export const {
  useGetOrderDetailsQuery,

  useConfirmOrderMutation,
} = cartApiSlice;

import { apiSlice } from "./apiSlice";

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/me",
    }),

    updateMyProfile: builder.mutation({
      query: (data: { name: string; avatar: string }) => ({
        url: "/me/update",
        method: "PATCH",
        body: data,
      }),
    }),

    updateMyPassword: builder.mutation({
      query: (data: {
        oldPassword: string;
        newPassword: string;
        wantToLogOutFromOtherDevices: boolean;
      }) => ({
        url: "/me/password/update",
        method: "PATCH",
        body: data,
      }),
    }),

    updateMyAvatar: builder.mutation({
      query: (data: { avatar: string }) => ({
        url: "/me/update/avatar",
        method: "POST",
        body: data,
      }),
    }),

    getMyAllOrders: builder.query({
      query: () => "/orders/my-orders",
    }),

    getMySingleOrder: builder.query({
      query: (orderId) => `/orders/my-orders/${orderId}`,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateMyPasswordMutation,
  useUpdateMyAvatarMutation,
  useGetMyAllOrdersQuery,
  useGetMySingleOrderQuery,
} = profileApiSlice;

import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
    }),
  }),
});

export const { useSigninMutation, useLogoutMutation } = authApiSlice;

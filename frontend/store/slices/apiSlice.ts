import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { setAuth, setJid, logout } from "./authSlice";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.jid;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let results = await baseQuery(args, api, extraOptions);

  if (results?.error?.status === 403) {
    console.log("getting new access token");
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log("got new access token");
      const { accessToken } = refreshResult.data as {
        success: boolean;
        accessToken: string;
      };
      api.dispatch(setAuth(true));
      api.dispatch(setJid(accessToken));

      results = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      toast.error("Session Ended! Please login again");
      toast.info("Redirecting to login page...");
      window.location.href = "/auth/signin?redirect=" + "/";
    }
  }
  return results;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
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

export const { useSigninMutation, useLogoutMutation } = apiSlice;

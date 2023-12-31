import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { setAuth, setJid, logout } from "./authSlice";

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
    }
  }
  return results;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

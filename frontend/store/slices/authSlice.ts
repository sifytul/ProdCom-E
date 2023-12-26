import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { apiSlice } from "./apiSlice";

export type TUser = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
};
export interface IAuthState {
  isAuth: boolean;
  jid: string;
  user: null | TUser;
}

const initialState: IAuthState = {
  isAuth: false,
  jid: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setJid: (state, action: PayloadAction<string>) => {
      state.jid = action.payload;
    },

    setUser: (state, action: PayloadAction<IAuthState["user"]>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.jid = "";
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
      state.isAuth = false;
      state.jid = "";
      state.user = null;
    });
  },
});

export const { setAuth, setJid, setUser, logout } = authSlice.actions;

export const authSelector = (state: { auth: IAuthState }) => state.auth;

export const authReducer = authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "..";

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

const logoutThunk = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const state = (await thunkAPI.getState()) as IRootState;
  const { jid } = state.auth;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/auth/logout",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jid,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});
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
  },

  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isAuth = false;
      state.jid = "";
      state.user = null;
    });
  },
});

export const { setAuth, setJid, setUser } = authSlice.actions;
export { logoutThunk };

export const authSelector = (state: { auth: IAuthState }) => state.auth;

export const authReducer = authSlice.reducer;

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";

import { authReducer } from "./slices/authSlice";
import storage from "./customStorage";
import logger from "redux-logger";
import cartReducer from "./slices/cartSlice";
import { apiSlice } from "./slices/apiSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuth", "jid", "user"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems", "total", "deliveryCharge"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger, apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

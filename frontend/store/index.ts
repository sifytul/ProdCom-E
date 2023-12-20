import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";

import { authReducer } from "./slices/authSlice";
import storage from "./customStorage";
import logger from "redux-logger";
import cartReducer from "./slices/cartSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuth", "jid", "user"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"],
};

export interface IRootState {
  auth: ReturnType<typeof authReducer>;
  cart: ReturnType<typeof cartReducer>;
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

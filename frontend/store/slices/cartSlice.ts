import { createSlice } from "@reduxjs/toolkit";

type TProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  qty: number;
};

type TInitialState = {
  cartItems: any[];
};

const initialState: TInitialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addedItem = action.payload;
      const existItem = state.cartItems.findIndex(
        (product) => product?.id === addedItem.id
      );

      if (!(existItem === -1)) {
        state.cartItems[existItem].qty += 1;
      } else {
        state.cartItems.push({ ...addedItem, qty: 1 });
      }
    },

    decreaseQtyFromCart: (state, action) => {
      const decreasedItem = action.payload;
      const existItemIdx = state.cartItems.findIndex(
        (product) => product?.id === decreasedItem.id
      );

      if (existItemIdx !== -1 && state.cartItems[existItemIdx].qty > 1) {
        state.cartItems[existItemIdx].qty -= 1;
      } else if (existItemIdx && state.cartItems[existItemIdx].qty === 1) {
        state.cartItems.splice(existItemIdx, 1);
      }
    },
    removeFromCart: (state, action) => {
      const removedItem = action.payload;
      state.cartItems = state.cartItems.filter(
        (product) => product?.id !== removedItem.id
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, decreaseQtyFromCart, removeFromCart, clearCart } =
  cartSlice.actions;

export const cartItems = (state: TInitialState) => state.cartItems;

export default cartSlice.reducer;

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
  total: number;
  deliveryCharge: {
    location: string;
    charge: number;
  };
  stepperState: string[];
};

const initialState: TInitialState = {
  cartItems: [],
  total: 0,
  deliveryCharge: {
    location: "",
    charge: 0,
  },
  stepperState: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addedItem = action.payload;
      const existedItem = state.cartItems.find(
        (product) => product?.id === addedItem.id
      );

      if (existedItem) {
        existedItem.qty += 1;
        existedItem.stock -= 1;
        existedItem.subTotal = existedItem.qty * existedItem.discountedPrice;
        state.total += Number(existedItem.discountedPrice);
      } else {
        let discountedPrice = Number(addedItem.price * addedItem.discount);
        state.cartItems.push({
          ...addedItem,
          qty: 1,
          discountedPrice,
          subTotal: discountedPrice,
        });
        state.total += discountedPrice;
      }
    },

    decreaseQtyFromCart: (state, action) => {
      const decreasedItem = action.payload;
      const existedItem = state.cartItems.find(
        (product) => product?.id === decreasedItem.id
      );

      if (existedItem && existedItem.qty > 1) {
        existedItem.qty -= 1;
        existedItem.stock += 1;
        existedItem.subTotal = existedItem.qty * existedItem.discountedPrice;
        state.total -= Number(existedItem.discountedPrice);
      }
      return state;
    },
    removeFromCart: (state, action) => {
      const removedItem = action.payload;
      state.cartItems = state.cartItems.filter(
        (product) => product?.id !== removedItem.id
      );
      state.total -= Number(removedItem.subTotal);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },

    setDeliveryCharge: {
      reducer: (state, action) => {
        state.deliveryCharge.location = action.payload.location;
        state.deliveryCharge.charge = action.payload.charge;
      },
      prepare: (location: string) => {
        let payload = {
          location: "",
          charge: 0,
        };

        if (location === "inside-ctg") {
          payload.location = "Inside Chittagong";
          payload.charge = 70;
        } else if (location === "outside-ctg") {
          payload.location = "Outside Chittagong";
          payload.charge = 100;
        } else {
          payload.location = "Free Pickup";
          payload.charge = 0;
        }
        return {
          payload,
          meta: null,
          error: null,
        };
      },
    },

    setStepperState: (state, action) => {
      if (!state.stepperState.includes(action.payload)) {
        state.stepperState.push(action.payload);
      }
    },
  },
});

export const {
  addToCart,
  decreaseQtyFromCart,
  removeFromCart,
  clearCart,
  setDeliveryCharge,
  setStepperState,
} = cartSlice.actions;

export const cartItems = (state: TInitialState) => state.cartItems;

export default cartSlice.reducer;

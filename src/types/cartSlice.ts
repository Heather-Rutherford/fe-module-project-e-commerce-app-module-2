// src/redux/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "./Product";
import { type CartItem } from "./CartItem";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(_state, action: PayloadAction<Product>) {
      console.log("[cartSlice] addToCart payload", action.payload);
      // const existing = state.items.find(
      //   (item) => item.product.id === action.payload.id,
      // );
      // if (existing) {
      //   existing.quantity += 1;
      // } else {
      //   state.items.push({
      //     id: action.payload.id,
      //     product: action.payload,
      //     quantity: 1,
      //   });
      // }
    },
    removeFromCart(state, action: PayloadAction<string | number>) {
      const removeId = action.payload.toString();
      state.items = state.items.filter(
        (item) => item.product.id.toString() !== removeId,
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string | number; quantity: number }>,
    ) {
      const updateId = action.payload.id.toString();
      console.log(
        "[cartSlice:updateQuantity]",
        `Updating quantity for product ID: ${updateId} to ${action.payload.quantity}`,
      );
      // Does state exist
      if (!state.items || !Array.isArray(state.items)) {
        console.log("Cart state is invalid. Unable to update quantity.");
        return;
      }
      const item = state.items.find(
        (item) => item.product.id.toString() === updateId,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

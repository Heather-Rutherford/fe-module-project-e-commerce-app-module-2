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
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.product.id.toString() === action.payload.id.toString(),
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: action.payload.id,
          product: action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product.id.toString() !== action.payload.toString(),
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (item) => item.product.id.toString() === action.payload.id.toString(),
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

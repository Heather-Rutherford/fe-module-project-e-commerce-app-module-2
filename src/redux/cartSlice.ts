// src/redux/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import type { CartItemState } from "../types/CartItem";

const initialState: CartItemState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.id.toString();
      const existing = state.items.find(
        (item) => item.product.id.toString() === productId,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: productId,
          product: { ...action.payload, id: productId },
          quantity: 1,
        });
      }
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

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
      console.log("[cartSlice] addToCart payload", action.payload);
      const productId = (action.payload?.id ?? "").toString().trim();
      console.log("[cartSlice] addToCart productId", productId);
      if (!productId) {
        return;
      }
      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      const existing = state.items.find(
        (item) => (item.product?.id ?? "").toString() === productId,
      );
      if (existing) {
        console.log("[cartSlice] if (existing)", (existing.quantity += 1));
        existing.quantity += 1;
      } else {
        console.log("[cartSlice] State exists Adding to state", action.payload);
        state.items.push({
          id: productId,
          product: { ...action.payload, id: productId },
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<string | number>) {
      const removeId = (action.payload ?? "").toString();
      console.log("[cartSlice: removeFromCart] ProductId", removeId);
      if (!removeId) {
        return;
      }
      state.items = state.items.filter((item) => {
        const rowId = (item.id ?? "").toString();
        const productId = (item.product?.id ?? "").toString();
        return rowId !== removeId && productId !== removeId;
      });
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string | number; quantity: number }>,
    ) {
      const item = state.items.find(
        (item) => item.product.id === action.payload.id,
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

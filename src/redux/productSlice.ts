// src/redux/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../types/Product";
import { type ProductState } from "../types/Product";

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsListing: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  }, // Added comma here to fix syntax error
});

export const { getProductsListing } = productSlice.actions;
export default productSlice.reducer;

import type { Product } from "./Product";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price?: number;
}

export interface CartItemState {
  items: CartItem[];
}

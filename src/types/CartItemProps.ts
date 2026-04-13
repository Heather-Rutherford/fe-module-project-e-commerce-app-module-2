import { type Product } from "./Product";

export interface CartItemProps {
  product: Product;
  quantity: number;
  price?: number;
  onDeleteSuccess?: (msg: string) => void;
  // add other props as needed
}

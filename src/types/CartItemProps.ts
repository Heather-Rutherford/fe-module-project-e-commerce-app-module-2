import { type Product } from "./Product";

export interface CartItemProps {
  itemId?: string;
  product: Product;
  quantity: number;
  price?: number;
  onDeleteSuccess?: (msg: string) => void;
  // add other props as needed
}

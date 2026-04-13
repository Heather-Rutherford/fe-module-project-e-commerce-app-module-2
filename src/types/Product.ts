export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number; // Added rate property for product rating
}

export interface ProductState {
  products: Product[];
}

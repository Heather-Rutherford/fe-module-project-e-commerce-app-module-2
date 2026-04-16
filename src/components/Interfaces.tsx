export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number; // Added for compatibility with ProductCard
}

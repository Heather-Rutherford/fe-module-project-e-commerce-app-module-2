export interface Product {
  id: string; // id is now required and always a string
  title: string;
  rate: number;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface ProductState {
  products: Product[];
}

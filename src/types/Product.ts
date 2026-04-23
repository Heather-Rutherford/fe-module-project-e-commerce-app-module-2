export interface Product {
  id?: string; // id is optional, as it will only be available after data is fetched
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

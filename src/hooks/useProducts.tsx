import { useQuery } from "@tanstack/react-query";
import { type Product } from "../types/Product";
import { getRandomRating } from "../utils/RandomRating";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  // Add random rating to each product
  const productsWithRate = data.map((product: Omit<Product, "rate">) => ({
    ...product,
    rate: getRandomRating(),
  }));
  console.log("Fetched products with rate:", productsWithRate);
  return productsWithRate;
};

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

const fetchFilteredProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  );
  if (!res.ok)
    throw new Error(
      "Unable to load products. Please check your internet connection and try again.",
    );
  const data = await res.json();
  const filteredProductsWithRate = data.map(
    (product: Omit<Product, "rate">) => ({
      ...product,
      rate: getRandomRating(),
    }),
  );
  return filteredProductsWithRate;
};

export function useFilteredProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => fetchFilteredProductsByCategory(category),
    enabled: !!category,
  });
}

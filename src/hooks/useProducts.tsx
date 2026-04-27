import { useQuery } from "@tanstack/react-query";
import { type Product } from "../types/Product";
// import { getRandomRating } from "../utils/RandomRating";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const fetchProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const productsData: Product[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    productsData.push({
      ...data,
      id:
        typeof data.id === "string" && data.id.trim().length > 0
          ? data.id
          : docSnap.id,
      rate: typeof data.rate === "number" ? data.rate : 0,
    } as Product);
  });
  return productsData;
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
  if (!category || category === "All") {
    // If no category or 'All', return all products
    return fetchProducts();
  }
  const q = query(
    collection(db, "products"),
    where("category", "==", category),
  );
  const querySnapshot = await getDocs(q);
  const productsData: Product[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    productsData.push({
      ...data,
      id:
        typeof data.id === "string" && data.id.trim().length > 0
          ? data.id
          : docSnap.id,
      rate: typeof data.rate === "number" ? data.rate : 0,
    } as Product);
  });
  return productsData;
};

export function useFilteredProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => fetchFilteredProductsByCategory(category),
    enabled: !!category,
  });
}

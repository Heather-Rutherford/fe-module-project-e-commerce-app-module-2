import { useQuery } from "@tanstack/react-query";

const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok)
    throw new Error(
      "Unable to load categories. Please check your internet connection and try again.",
    );
  return res.json();
};

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

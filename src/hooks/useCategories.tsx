import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async (): Promise<string[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const categoriesSet = new Set<string>();
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.category) {
      categoriesSet.add(data.category);
    }
  });
  return Array.from(categoriesSet);
};

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

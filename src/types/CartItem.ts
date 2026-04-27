export interface User {
  id: string;
  name?: string;
  displayName?: string;
  [key: string]: string | undefined; // Allow for additional properties
}
// Filename - CartItems.tsx
// Path - src/types/CartItem.ts
// Description - This file contains the CartItem type definitions
// and related functions for managing cart items.
import type { Product } from "./Product";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import "../styles/AddProductPretty.css";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price?: number;
}

export interface CartItemState {
  items: CartItem[];
}

// linkingCollection: the name of the linking table (e.g., "userCarts")
// cartsCollection: the name of the carts collection (e.g., "carts")
export async function getCartsByUserId(
  userId: string,
  linkingCollection = "linkCart2User",
  cartsCollection = "carts",
) {
  // Step 1: Get all cartIds for the user
  const linkQuery = query(
    collection(db, linkingCollection),
    where("userId", "==", userId),
  );
  const linkSnapshot = await getDocs(linkQuery);
  const cartIds = linkSnapshot.docs.map((doc) => doc.data().cartId);

  // Step 2: Fetch all cart objects by cartId
  const cartPromises = cartIds.map(async (cartId: string) => {
    const cartDoc = await getDoc(doc(db, cartsCollection, cartId));
    return cartDoc.exists() ? { id: cartDoc.id, ...cartDoc.data() } : null;
  });

  // Filter out any nulls (in case a cartId doesn't exist)
  const carts = (await Promise.all(cartPromises)).filter(Boolean);
  return carts;
}

export async function getUserInfoByUserId(
  userId: string,
  usersCollection = "users",
) {
  const userDoc = await getDoc(doc(db, usersCollection, userId));
  return userDoc.exists()
    ? ({ id: userDoc.id, ...userDoc.data() } as User)
    : null;
}

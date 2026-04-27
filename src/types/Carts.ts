// Filename - Carts.tsx
// Path - src/types/Carts.ts
// Description - This file contains the Cart type definitions
// and related functions for managing carts.
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { type CartType } from "../types/CartType";

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
  const carts = (await Promise.all(cartPromises)).filter(Boolean) as CartType[];
  return carts;
}

export async function getCartById(cartId: string, cartsCollection = "carts") {
  const cartDoc = await getDoc(doc(db, cartsCollection, cartId));
  return cartDoc.exists() ? { id: cartDoc.id, ...cartDoc.data() } : null;
}

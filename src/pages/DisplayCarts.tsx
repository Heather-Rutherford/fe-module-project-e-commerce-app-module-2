// Filename - DisplayCarts.tsx
// Path - src/pages/DisplayCarts.tsx
// Description - This is the Display Carts Page Component
// It contains the Cart Display, and
// Basic Functionalities to Display Carts

import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { CartType } from "../types/CartType";
import { getCartsByUserId } from "../types/Carts";
import "../styles/AddProductPretty.css";

const DisplayCarts = () => {
  const [carts, setCarts] = useState<CartType[]>([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  // Fetch carts in useEffect...
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const cartsData = await getCartsByUserId(userId);
        setCarts(cartsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <h2>Your Carts</h2>
      <p>Click on a cart to view details.</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {carts.map((cart) => (
            <li
              key={cart.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "4px 0",
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Link
                to={`/cart/${cart.id}`}
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Cart #{cart.id.slice(-6).toUpperCase()}
              </Link>
              <span style={{ margin: "0 8px", color: "#888" }}>
                - placed on{" "}
                {cart.createdAt &&
                  (typeof cart.createdAt === "object" &&
                  typeof cart.createdAt.toDate === "function"
                    ? cart.createdAt.toDate().toLocaleDateString()
                    : new Date(cart.createdAt as string).toLocaleDateString())}
                ;
              </span>
              <span style={{ fontWeight: 500 }}>- Total: ${cart.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayCarts;

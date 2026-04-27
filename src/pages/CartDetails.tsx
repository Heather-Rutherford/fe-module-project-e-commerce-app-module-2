// Filename - AddProduct.tsx
// Path - src/pages/AddProduct.tsx
// Description - This is the Add Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCartById } from "../types/Carts";
import { getUserInfoByUserId, type User } from "../types/CartItem";
import "../styles/AddProductPretty.css";
import type { CartType } from "../types/CartType";
import { Timestamp } from "firebase/firestore";

const CartDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [cart, setCart] = useState<CartType | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getCartById(id)
      .then(async (cart) => {
        setCart(cart as CartType | null);
        if (cart && (cart as CartType).userId) {
          const user: User | null = await getUserInfoByUserId(
            (cart as CartType).userId,
          );
          if (user?.name) {
            setUserName(user.name);
          } else if (user?.displayName) {
            setUserName(user.displayName);
          } else if (
            user &&
            user.displayName &&
            user.displayName.toString().trim() !== ""
          ) {
            setUserName(user.displayName);
          } else {
            setUserName(null);
          }
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching cart");
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cart) return <div>Cart not found.</div>;

  const baseUrl = window.location.origin + "/src"; // e.g., "https://yoursite.com"

  return (
    <div className="order-summary justify-content-left">
      <h3>Cart #{cart.id.slice(-6).toUpperCase()}</h3>
      <p>User: {userName ? userName : cart.userId}</p>
      <p>
        Date:{" "}
        {cart.createdAt instanceof Timestamp
          ? cart.createdAt.toDate().toLocaleDateString()
          : new Date(cart.createdAt as string).toLocaleDateString()}
      </p>
      <p>Status: {cart.status}</p>
      <p>Payment Method: {cart.paymentInfo.method}</p>
      <p>
        Shipping Address: {cart.shippingAddress.address},{" "}
        {cart.shippingAddress.city}, {cart.shippingAddress.state},{" "}
        {cart.shippingAddress.country}, {cart.shippingAddress.zip}
      </p>
      <h3>Items</h3>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId}>
            <img
              src={baseUrl + item.image || "https://placehold.co/50"}
              alt={item.title}
              style={{
                height: "50px",
                objectFit: "contain",
                paddingRight: "10px",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/50";
              }}
            />
            {item.title} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p className="total-items-section">
        <span className="fw-bold">Total:</span> ${cart.total}
      </p>
    </div>
  );
};
export default CartDetails;

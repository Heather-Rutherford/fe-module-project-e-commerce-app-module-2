import EmptyCart from "../components/EmptyCart";
import CartSummary from "../components/CartSummary";
import ShoppingCartItem from "../components/ShoppingCartItem";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { CartItem } from "../types/CartItem";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "@firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // const [success, setSuccess] = useState("");

  const handleDeleteSuccess = (msg: string) => {
    window.alert(msg);

    // setSuccess(msg);
    // setTimeout(() => setSuccess(""), 3000);
  };

  return user ? (
    <div className="container mt-4">
      <h1>Your Cart</h1>
      <p>{cartItems.length} items in your cart</p>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="items-in-cart mb-3">
            <ul className="list-cart">
              {cartItems
                .filter((item: CartItem) => item.product)
                .map((item: CartItem) => (
                  <ShoppingCartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                    price={Number(item.product.price)}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                ))}
            </ul>
          </div>
          <div className="cart-summary">
            <CartSummary products={cartItems} />
          </div>
        </>
      )}
    </div>
  ) : (
    <>
      <p>Please log in to view your cart.</p>
      {navigate("/login", { state: { from: "cart" } })}
    </>
  );
};
export default Cart;

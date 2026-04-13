import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { CartItem } from "../types/CartItem";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

const CartSummary: React.FC<{
  products: { price?: number; quantity?: number }[];
  onCheckout?: () => void;
}> = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems
    .reduce((sum: number, item: CartItem) => {
      if (!item.product || typeof item.product.price !== "number") return sum;
      return sum + item.product.price * (item.quantity || 1);
    }, 0)
    .toFixed(2);

  const itemCount = cartItems.reduce(
    (sum: number, item: CartItem) => sum + (item.quantity || 1),
    0,
  );

  return (
    <div className="cart-summary">
      <h4>Cart Summary</h4>
      <p>Total Items: {itemCount}</p>
      <p className="fw-bold">Total: ${total}</p>
      <Button className="btn btn-primary" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;

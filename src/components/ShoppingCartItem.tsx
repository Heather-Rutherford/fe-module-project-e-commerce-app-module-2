import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { updateQuantity } from "../redux/cartSlice";
import { formatPrice } from "../utils/Formatters";
import { type CartItemProps } from "../types/CartItemProps";

interface ShoppingCartItemProps extends CartItemProps {
  onDeleteSuccess?: (msg: string) => void;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
  itemId,
  product,
  quantity,
  price,
  onDeleteSuccess,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");
  const resolvedId = (itemId || product.id || "").toString();

  const handleQuantityChange = (id: string | number, quantity: number) => {
    if (quantity < 1) {
      handleDelete(); // Prevent quantity from going below 1
      return;
    }
    dispatch(updateQuantity({ id, quantity }));
  };

  const subtotal = formatPrice((price || 0) * (quantity || 1));

  const handleDelete = () => {
    if (window.confirm(`Remove ${product.title || "product"} from cart?`)) {
      try {
        window.alert(
          `${product.title || "Product"} with ID ${resolvedId} removed from cart successfully!`,
        );
        dispatch(removeFromCart(resolvedId));
        setError("");
        if (onDeleteSuccess) {
          onDeleteSuccess("Product removed from cart successfully!");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to remove product from cart. Please try again.");
      }
    }
  };

  const baseUrl = window.location.origin + "/src"; // e.g., "https://yoursite.com"
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${baseUrl}/${product.image.replace(/^\/+/, "")}`
    : "https://placehold.co/125";

  return (
    <>
      <li className="cart-item">
        <img
          src={imageUrl}
          alt={product.title || "Product"}
          style={{ height: "125px", objectFit: "contain" }}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/125";
          }}
        />
        <p className="product-title">
          {product.title || `Product ID: ${product.id || product.id}`}
        </p>
        <div className="cart-item-buttons">
          <button
            className="btn btn-warning mt-3"
            onClick={() => handleQuantityChange(resolvedId, quantity - 1)}
          >
            -
          </button>
          Quantity: {quantity || 1}
          <button
            className="btn btn-success mt-3"
            onClick={() => handleQuantityChange(resolvedId, quantity + 1)}
          >
            +
          </button>
          <button
            className="btn btn-danger mt-3"
            onClick={handleDelete}
            aria-label={`Remove ${product.title || "product"} from cart`}
          >
            Delete
          </button>
        </div>
        <div className="cart-item-price">
          <p>
            Price: ${formatPrice(product.price)}
            <br />
            Subtotal: ${subtotal || "0.00"}
          </p>
        </div>
        {error && (
          <div className="alert alert-danger mt-2" role="alert">
            {error}
          </div>
        )}
      </li>
    </>
  );
};
export default ShoppingCartItem;

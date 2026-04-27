// Product Card component to display individual product details
// Fetches products from Firestore and displays them
// using ProductCard component

// Displays products in a grid layout
// Each product is wrapped in a Bootstrap column
// for responsiveness

// Location: src/components/ProductCard.tsx
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { type Product } from "../types/Product";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("[ProductCard] dispatch Add to cart:", product);
    try {
      // console.error(product);
      dispatch(addToCart(product));
      window.alert(`${product.title} added to cart successfully!`);
    } catch (err) {
      console.error(err);
      window.alert(err);
      // window.alert("Failed to add product to cart. Please try again.");
    }
    // window.alert(`${product.id} added to cart successfully!`);
  };

  const baseUrl = window.location.origin + "/src"; // e.g., "https://yoursite.com"
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${baseUrl}/${product.image.replace(/^\/+/, "")}`
    : "https://placehold.co/125";

  return (
    <>
      <div className="card">
        <img
          src={imageUrl ? imageUrl : "https://placehold.co/125"}
          alt={product.title || "Product"}
          style={{ height: "125px", objectFit: "contain" }}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/125";
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <div>
            {"★".repeat(product.rate)}
            {"☆".repeat(5 - product.rate)}
          </div>
          <p className="card-text fw-bold">{product.category}</p>
          <p className="card-text">{product.description}</p>
          <p className="card-text">${product.price}</p>
        </div>
        <div className="card-footer d-flex">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-primary w-100 ms-2"
            style={{ textAlign: "center" }}
          >
            Details
          </Link>
          <Button
            onClick={handleAddToCart}
            className="btn btn-primary w-100 ms-2"
            style={{ textAlign: "center" }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;

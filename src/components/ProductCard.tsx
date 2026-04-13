import { Button } from "react-bootstrap";
import { type Product } from "../types/Product";
import { addToCart } from "../types/cartSlice";
import { useDispatch } from "react-redux";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = (productTitle: string) => {
    try {
      dispatch(addToCart(product));
      window.alert(`${productTitle} added to cart successfully!`);
    } catch (err) {
      console.error(err);
      window.alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <>
      <div className="card">
        <img
          src={product.image || "https://placehold.co/125"}
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
        <div className="card-footer">
          <Button
            className="btn btn-primary float-end"
            onClick={() => handleAddToCart(product.title)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;

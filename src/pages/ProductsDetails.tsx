import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatPrice } from "../components/Formatters";
import "../styles/styles.css";

function ProductsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to load product: " + err.message);
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [id]);

  // Auto-dismiss success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleAddToCart = async () => {
    try {
      // Clear any previous errors
      setError("");

      // 1. Send the POST request to simulate adding to the API
      const cartData = { userId: 1, products: [{ id: product.id }] };
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add to cart: ${response.status}`);
      }

      await response.json();

      // 2. Update local React state to show the item in the UI immediately
      setCart((prevCart) => [...prevCart, product]);
      setSuccess("Product added to cart successfully!");
    } catch (err) {
      // Clear success message when error occurs
      setSuccess("");
      setError("Failed to add product to cart: " + err.message);
    }
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://fakestoreapi.com/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }

      setSuccess("Product deleted successfully!");
      setTimeout(() => navigate("/ProductListing"), 1000);
    } catch (err) {
      setError("Failed to delete product: " + err.message);
    }
  };

  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (isLoading) return <LoadingSpinner message="Loading product details..." />;
  if (!product)
    return <p className="text-center mt-5 text-danger">Product not found</p>;

  return (
    <div className="container mt-4">
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/300";
            }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <b>Category:</b> {product.category}
          </p>
          <h4>${formatPrice(product.price)}</h4>
          <div className="button-group mt-3">
            <button
              className="btn btn-success mt-3"
              onClick={handleAddToCart}
              aria-label="Add product to cart"
            >
              Add to Cart
            </button>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate(`/EditProduct/${product.id}`)}
              aria-label="Edit product"
            >
              Edit Product
            </button>
            <button
              className="btn btn-danger mt-3"
              onClick={handleDeleteProduct}
              aria-label="Delete product"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;

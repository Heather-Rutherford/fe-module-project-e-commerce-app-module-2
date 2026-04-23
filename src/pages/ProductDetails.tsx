// Filename - ProductDetails.tsx
// Path - src/pages/ProductDetails.tsx
// Description - This is the Product Details Page Component
// It contains the Product Details, its Structure
// and Basic Functionalities

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { db } from "../firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/Formatters";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/styles.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    rate: 0,
    price: 0,
    image: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const productDoc = doc(db, "products", id);
        const productSnap = await getDoc(productDoc);
        if (productSnap.exists()) {
          const data = productSnap.data();
          setProduct({
            ...data,
            id: typeof data.id === "string" ? data.id : String(data.id),
          } as Product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setError("");
    setSuccess("");
    try {
      if (!product || !product.id) {
        setError("Product information is incomplete or missing an ID.");
        return;
      }
      dispatch(addToCart(product));
      setSuccess("Product added to cart successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setError("Failed to add product to cart: " + err.message);
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setError("");
      if (product.id) {
        // Delete the product's document from Firestore
        await deleteDoc(doc(db, "products", product.id as string));
      }

      setSuccess("Product deleted successfully!");
      setTimeout(() => navigate("/ProductListing"), 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError("Failed to delete product: " + err.message);
      }
    }
  };

  const baseUrl = window.location.origin + "/src"; // e.g., "https://yoursite.com"
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${baseUrl}/${product.image.replace(/^\/+/, "")}`
    : "https://placehold.co/125";

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <div className="col-md-6 text-center">
          <h2>{id}</h2>
          <img
            src={imageUrl}
            alt={product.title}
            className="product-detail-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/300";
            }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <b>Category:</b> {product.category}
          </p>
          <h4>$ {formatPrice(product.price)}</h4>
          <div className="button-group mt-3">
            <button
              className="btn btn-success mt-3 w-25"
              onClick={handleAddToCart}
              aria-label="Add product to cart"
            >
              Add to Cart
            </button>
            <button
              className="btn btn-primary mt-3 w-25"
              onClick={() => navigate(`/EditProduct/${id}`)}
              aria-label="Edit product"
            >
              Edit Product
            </button>
            <button
              className="btn btn-danger mt-3 w-25"
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
};

export default ProductDetails;

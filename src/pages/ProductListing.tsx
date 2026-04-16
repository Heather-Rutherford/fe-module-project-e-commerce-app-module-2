import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../components/Interfaces";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/styles.css";

// Product Listing page component to display list of products
// Fetches products from Fake Store API and displays them
// using ProductCard component

// Example API: https://fakestoreapi.com/products
// Each product has id, title, price, description, category,
// image, rating

// Displays products in a grid layout
// Each product is wrapped in a Bootstrap column
// for responsiveness

// Location: src/pages/ProductListing.jsx
function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://fakestoreapi.com/products", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: Array<Product & { rating?: { rate: number } }>) => {
        // Map API data to add top-level rate property
        const mapped = data.map((item) => ({
          ...item,
          rate: item.rating?.rate ?? 0,
        }));
        setProducts(mapped);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Failed to load products: " + err.message);
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  if (isLoading) return <LoadingSpinner message="Loading products..." />;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Products</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/styles.css";

// Product Listing page component to display list of products
// Fetches products from Firestore and displays them
// using ProductCard component

// Displays products in a grid layout
// Each product is wrapped in a Bootstrap column
// for responsiveness

// Location: src/pages/ProductListing.tsx
function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: Product[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          productsData.push({
            ...data,
            id: typeof data.id === "string" ? parseInt(data.id, 10) : data.id,
            rate: typeof data.rate === "number" ? data.rate : 0,
          } as Product);
        });
        setProducts(productsData);
      } catch (err) {
        if (err instanceof Error) {
          setError("Failed to load products: " + err.message);
        } else {
          setError("Failed to load products.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
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

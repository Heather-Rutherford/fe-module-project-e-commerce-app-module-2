// DisplayData.tsx

import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import "../styles/styles.css";

const DisplayProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const dataArray = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            if (
              typeof data.title === "string" &&
              typeof data.rate === "number" &&
              typeof data.price === "number" &&
              typeof data.image === "string" &&
              typeof data.description === "string" &&
              typeof data.category === "string"
            ) {
              return {
                id: doc.id,
                ...data,
              } as unknown as Product;
            }
            return null;
          })
          .filter((item): item is Product => item !== null);
        setProducts(dataArray);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {isLoading && <p className="text-center mt-5">Loading products...</p>}
      {error && <p className="text-center mt-5 text-danger">{error}</p>}
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
};

export default DisplayProducts;

// Filename - AddProduct.jsx
// Path - src/pages/AddProduct.jsx
// Description - This is the Add Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import { useState, useEffect } from "react";
import AddEditCard from "../components/AddEditCard";
import "../styles/styles.css";
import type { Product } from "../components/Interfaces";

function AddProduct() {
  const [product, setProduct] = useState<Product | null>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    id: 0,
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    // Fetch categories from API
    fetch("https://fakestoreapi.com/products/categories", {
      signal: controller.signal, // Pass signal to fetch
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to load categories: " + err.message);
        }
      });

    return () => controller.abort(); // Cleanup function
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!product) return;

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setSuccess("Product added successfully!");
        setTimeout(() => handleReset(), 1500);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleReset = () => {
    setProduct({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      id: 0,
    });
    setSuccess("");
    setError("");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add Product</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <AddEditCard
        product={product}
        setProduct={setProduct}
        onSubmit={handleSubmit}
        categories={categories}
        setImageFile={null}
        isEditMode={false}
      />
    </div>
  );
}

AddProduct.propTypes = {};

export default AddProduct;

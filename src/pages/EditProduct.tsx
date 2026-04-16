// Filename - EditProduct.jsx
// Path - src/pages/EditProduct.jsx
// Description - This is the Edit Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddEditCard from "../components/AddEditCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/styles.css";
import type { Product } from "../components/Interfaces";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  // Removed unused field states
  const [categories, setCategories] = useState<string[]>([]);
  // Removed unused image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://fakestoreapi.com/products/categories", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Error fetching categories: " + err.message);
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Fetch error: " + err.message);
        }
      });
    return () => controller.abort();
  }, [id]);

  // Removed useEffect that set field states from product

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let imageData = product?.image || "";
    if (imageFile) {
      imageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    }

    const updatedProduct = {
      ...product,
      image: imageData,
    };

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setSuccess("Product updated successfully!");
        setTimeout(() => navigate("/ProductListing"), 1500);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (isLoading || !product)
    return <LoadingSpinner message="Loading product..." />;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Product</h1>
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
        setImageFile={setImageFile}
        isEditMode={true}
      />
    </div>
  );
}

EditProduct.propTypes = {};
export default EditProduct;

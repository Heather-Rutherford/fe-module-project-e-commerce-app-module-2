// Filename - EditProduct.tsx
// Path - src/pages/EditProduct.tsx
// Description - This is the Edit Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { Product } from "../types/Product";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "rate" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      const productDoc = doc(db, "products", id as string);
      const updateData = { ...product };
      delete updateData.id;
      await updateDoc(productDoc, updateData);
      alert("Product updated!");
      navigate("/");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Edit Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <label htmlFor="rate">Rate</label>
        <input
          id="rate"
          name="rate"
          type="number"
          value={product.rate}
          onChange={handleChange}
          placeholder="Rate"
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
        />
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

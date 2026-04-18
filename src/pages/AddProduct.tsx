// AddDataForm.tsx

import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AddProductPretty.css";

interface Product {
  id?: string; // id is optional, as it will only be available after data is fetched
  title: string;
  rate: number;
  price: number;
  image: string;
  description: string;
  category: string;
}

const AddProduct = () => {
  const [data, setData] = useState<Omit<Product, "id">>({
    title: "",
    rate: 0,
    price: 0,
    image: "",
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "rate" || name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), data);
      alert("Data added!");
      setData({
        title: "",
        rate: 0,
        price: 0,
        image: "",
        description: "",
        category: "",
      }); // reset form
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          value={data.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <label htmlFor="rate">Rate</label>
        <input
          id="rate"
          name="rate"
          type="number"
          value={data.rate}
          onChange={handleChange}
          placeholder="Rate"
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={data.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
        />
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

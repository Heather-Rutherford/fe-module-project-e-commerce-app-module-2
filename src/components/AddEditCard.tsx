// Filename - AddEditCard.jsx
// Path - src/components/AddEditCard.jsx
// Description - This is the Add/Edit Product Form Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import React from "react";
import PropTypes from "prop-types";
import "../styles/styles.css";

function AddEditCard({
  product,
  setProduct,
  onSubmit,
  categories,
  setImageFile,
  isEditMode,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="label">
          Product Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={product?.title || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, title: e.target.value } : prev,
            )
          }
          placeholder="Enter product title"
          required
        />

        <label htmlFor="price" className="label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={product?.price || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, price: Number(e.target.value) } : prev,
            )
          }
          placeholder="Enter the product price"
          required
          min="0"
          step="0.01"
        />

        <label htmlFor="description" className="label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={product?.description || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, description: e.target.value } : prev,
            )
          }
          placeholder="Enter a product description"
          required
        />

        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          className="form-control"
          id="category"
          value={product?.category || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, category: e.target.value } : prev,
            )
          }
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="file" className="label">
          Upload Product Image
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="form-control"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
        />
        <div className="button-group mt-3">
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

AddEditCard.propTypes = {
  product: PropTypes.object,
  setProduct: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setImageFile: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default AddEditCard;

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { getProductsListing } from "../redux/productSlice";
import { useCategories } from "../hooks/useCategories";
import "../styles/styles.css";
import { getRandomRating } from "../utils/RandomRating";
import type { Product } from "../types/Product";
import {
  useProducts,
  useFilteredProductsByCategory,
} from "../hooks/useProducts";

// Home page component to display list of products
// Fetches products from Fake Store API and displays them
// using ProductCard component

// Example API: https://fakestoreapi.com/products
// Each product has id, title, price, description, category,
// image, rate

// Displays products in a grid layout
// Each product is wrapped in a Bootstrap column
// for responsiveness

// Location: src/pages/Home.tsx
const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      // Add random rating to each product
      const productsWithRate = data.map((product: Omit<Product, "rate">) => ({
        ...product,
        rate: getRandomRating(),
      }));
      dispatch(getProductsListing(productsWithRate));
    }
    fetchProducts();
  }, [dispatch]);

  // Filter state for dropdowns
  type Filter = {
    category: string;
  };

  const [filters, setFilters] = useState<Filter>({
    category: "All",
  });

  const { data: categories = [] } = useCategories();

  const allProductsQuery = useProducts();
  const filteredProductsQuery = useFilteredProductsByCategory(filters.category);

  const isAll = filters.category === "All";
  const products = isAll
    ? (allProductsQuery.data ?? [])
    : (filteredProductsQuery.data ?? []);
  const isLoading = isAll
    ? allProductsQuery.isLoading
    : filteredProductsQuery.isLoading;
  const error = isAll ? allProductsQuery.error : filteredProductsQuery.error;

  return (
    <div className="container mt-4">
      {isLoading && <p className="text-center mt-5">Loading products...</p>}
      {error && (
        <p className="text-center mt-5 text-danger">
          {error instanceof Error ? error.message : "Error loading products"}
        </p>
      )}
      <h1 className="text-center mb-4">Products</h1>
      {/* Category filter dropdown */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>Products count: {products.length}</div>
        <div className="d-flex align-items-center">
          <label htmlFor="categoryFilter" className="me-2 mb-0">
            Filter by category:
          </label>
          <select
            id="categoryFilter"
            className="form-select w-auto"
            aria-label="Filter products by category"
            value={filters.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {products.map((product: Product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

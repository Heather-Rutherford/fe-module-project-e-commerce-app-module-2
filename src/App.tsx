// React and Firebase Imports
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";

// Navigation
import Navbar from "./navigation/NavBar";
import { Routes, Route } from "react-router-dom";

// Styles
import "./styles/App.css";
import "./styles/styles.css";

// Cart and Checkout
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Authentication Pages
import Register from "./authentication/Register";
import Login from "./authentication/Login";

// User Profile and Management
import UserManagement from "./pages/UserManagement";
import UserProfile from "./pages/UserProfile";

// Admin Pages for Product Management
import ProductListing from "./pages/ProductListing";
import AddProduct from "./pages/AddProduct";
import ProductsDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import DisplayProducts from "./pages/DisplayProducts";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {user ? (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/productslisting" element={<ProductListing />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/products/:id" element={<ProductsDetails />} />
            <Route path="/displayproducts" element={<DisplayProducts />} />
            <Route path="/addproducts" element={<AddProduct />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
          </>
        ) : (
          <>
            <Route path="/cart" element={<Login />} />
            <Route path="/checkout" element={<Login />} />
            <Route path="/profile" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Navbar from "./navigation/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";
import "./styles/App.css";
import "./styles/styles.css";

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

// Filename - NavBar.tsx
// Path - src/navigation/NavBar.tsx
// Description - This is the NavBar Component
// It contains the navigation buttons for Home, Cart, and User Profile

import React from "react";
import CartButton from "../components/CartButton";
import HomeButton from "../components/HomeButton";
import LoginButton from "../components/LoginButton";

const NavBar: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="h1-responsive font-weight-bold mb-0">
          Advanced E-Commerce App
        </h2>
        <div className="d-flex gap-1">
          <HomeButton />
          <CartButton />
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

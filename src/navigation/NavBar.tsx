//NavBar.tsx
import React from "react";
import CartButton from "../components/CartButton";
import HomeButton from "../components/HomeButton";

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
        </div>
      </div>
    </div>
  );
};

export default NavBar;

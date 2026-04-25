// Filename - UserManagement.tsx
// Path - src/pages/UserManagement.tsx
// Description - This is the User Management Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "@firebase/auth";
import { auth } from "../firebaseConfig";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import "../styles/UserManagement.css";

const UserManagement: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return user ? (
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>User, Product & Order Management</h1>
        <p className="user-management-welcome">
          Welcome, <span className="user-email">{user.email}</span>
        </p>
        <p className="user-management-desc">
          Use the options below to manage users, products, and orders.
        </p>
      </div>
      <div className="user-management-sections">
        <div className="user-management-card">
          <h2>User Management</h2>
          <p>View and manage your profile.</p>
          <Button
            variant="primary"
            onClick={() => navigate("/profile")}
            className="btn-uniform"
          >
            View Profile
          </Button>
        </div>
        <div className="user-management-card">
          <h2>Product Management</h2>
          <p>Add, edit, or delete products in your store.</p>
          <div className="button-group">
            <Button
              variant="primary"
              onClick={() => navigate("/addproducts")}
              className="btn-uniform"
            >
              Add Products
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() => navigate("/productslisting")}
              className="btn-uniform w-75"
            >
              View/Edit/Delete Products
            </Button>
          </div>
        </div>
        <div className="user-management-card">
          <h2>Order Management</h2>
          <p>View and manage customer orders.</p>
          <div className="button-group">
            <Button
              variant="primary"
              onClick={() => navigate("/displaycarts")}
              className="btn-uniform w-25"
            >
              View Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserManagement;

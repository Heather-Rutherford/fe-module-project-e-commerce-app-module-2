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

const UserManagement: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return user ? (
    <div className="container mt-4">
      <h1>User, Product, and Order Management</h1>
      <p>Welcome, {user.email}</p>
      <p>Use the buttons below to manage users, products, and orders.</p>
      <h2>Management Options:</h2>
      <h3>User Management</h3>
      <p>View and manage your profile.</p>
      <Button
        variant="primary"
        onClick={() => navigate("/profile")}
        className="ms-2"
      >
        View Profile
      </Button>
      <h3>Product Management</h3>
      <p>Add, edit, or delete products in your store.</p>
      <Button
        variant="primary"
        onClick={() => navigate("/addproducts")}
        className="ms-2"
      >
        Add Products
      </Button>{" "}
      <Button
        variant="primary"
        onClick={() => navigate("/productslisting")}
        className="ms-2"
      >
        View Products (Edit/Delete Products)
      </Button>
      <h3>Order Management</h3>
      <p>View and manage customer orders.</p>
      <Button
        variant="primary"
        onClick={() => navigate("/neworders")}
        className="ms-2"
      >
        Create Orders
      </Button>{" "}
      <Button
        variant="primary"
        onClick={() => navigate("/orderslisting")}
        className="ms-2"
      >
        View Orders
      </Button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserManagement;

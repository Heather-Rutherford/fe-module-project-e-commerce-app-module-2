// Import React hooks for state and lifecycle management
import { useEffect, useState } from "react";
// Import Button component from react-bootstrap
import { Button } from "react-bootstrap";
// Import useNavigate for navigation
import { useNavigate } from "react-router-dom";
// Import Firebase auth instance
import { auth } from "../firebaseConfig";
// Import Firebase authentication functions and User type
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

// LoginButton component handles login/logout UI and logic
function LoginButton() {
  // State to track the current authenticated user
  const [user, setUser] = useState<User | null>(null);
  // Hook for navigation
  const navigate = useNavigate();

  // Listen for authentication state changes and update user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // If user is logged in, show Logout button
  return user ? (
    <>
      <Button
        className="btn btn-secondary btn-uniform float-end"
        onClick={() => navigate("/usermanagement")}
      >
        User Management
      </Button>
      <Button
        className="btn btn-secondary btn-uniform float-end"
        onClick={async () => {
          try {
            await signOut(auth);
            alert("Logged out!");
            navigate("/");
          } catch (err: unknown) {
            if (err instanceof Error) {
              console.error("Logout error:", err.message);
            } else {
              console.error("An unknown error occurred during logout");
            }
          }
        }}
      >
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button
        className="btn btn-primary btn-uniform float-end"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </>
  );
}

// Export the LoginButton component
export default LoginButton;

// Filename - UserProfileButton.tsx
// Path - src/components/UserProfileButton.tsx
// Description - This is the UserProfileButton Component
// It contains the User Profile Button, Login/Logout Functionality
// and Basic User Management Functionalities

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

// UserProfileButton component handles login/logout UI and logic
function UserProfileButton() {
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
    <Button
      className="btn btn-secondary float-end"
      onClick={async () => {
        try {
          // Sign out the user
          await signOut(auth);
          alert("Logged out!");
          // Redirect to home page
          navigate("/");
        } catch (err: unknown) {
          // Handle logout errors
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
  ) : (
    // If user is not logged in, show Login button
    <Button
      className="btn btn-primary float-end"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
  );
}

// Export the LoginButton component
export default UserProfileButton;

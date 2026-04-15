// Login.tsx
// This component handles user login functionality using Firebase Authentication.
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useLocation } from "react-router-dom";

// Login component manages login form state and authentication
const Login = () => {
  // State for email and password input fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // State for error messages
  const [error, setError] = useState<string | null>(null);
  // Access the current location for redirect logic
  const location = useLocation();

  // Handles the login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Attempt to sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      //alert("location.state?.from: " + location.state?.from);
      // Redirect user based on where they came from
      if (location.state?.from === "/cart") {
        navigation.navigate("/cart");
      } else if (location.state?.from === "/checkout") {
        navigation.navigate("/checkout");
      } else {
        navigation.navigate("/");
      }
    } catch (err: unknown) {
      // Handle login errors
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // Render the login form
  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <div className="row mb-3">
          <div className="col">
            {/* Email input field */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            {/* Password input field */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* Submit button for login */}
            <button type="submit" className="btn btn-primary button">
              Login
            </button>
            {/* Display error message if any */}
            {error && <p>{error}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* Button to navigate to registration page */}
            <button
              type="button"
              className="btn btn-secondary button"
              onClick={() => navigation.navigate("/register")}
            >
              Register
            </button>
            {error && <p>{error}</p>}
          </div>
        </div>
      </form>
    </>
  );
};
// Export the Login component
export default Login;

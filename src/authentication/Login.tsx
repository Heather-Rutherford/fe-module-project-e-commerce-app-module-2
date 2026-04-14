// Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      alert("location.state?.from: " + location.state?.from);
      if (location.state?.from === "/cart") {
        navigation.navigate("/cart");
      } else if (location.state?.from === "/checkout") {
        navigation.navigate("/checkout");
      } else {
        navigation.navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <div className="row mb-3">
          <div className="col">
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
            <button type="submit" className="btn btn-primary button">
              Login
            </button>
            {error && <p>{error}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col">
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
export default Login;

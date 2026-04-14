import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

function LoginButton() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return user ? (
    <Button
      className="btn btn-secondary float-end"
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
  ) : (
    <Button
      className="btn btn-primary float-end"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
  );
}

export default LoginButton;

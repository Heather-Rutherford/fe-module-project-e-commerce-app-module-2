// Register.tsx
import { useState } from "react";
// Import function to create user with email/password
import { createUserWithEmailAndPassword } from "firebase/auth";
// Import Firestore document helpers
import { doc, setDoc } from "firebase/firestore";
// Import Firebase auth and db instances
import { auth, db } from "../firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid); // <-- Place this line here
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        name: name,
        createdAt: new Date(),
      });
      alert("Registration successful!");
      navigation.navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="row mb-1">
        <div className="col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button type="submit" className="btn btn-primary button">
            Register
          </button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default Register;

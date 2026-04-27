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
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
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
        address: address,
        phone: phone,
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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <button type="submit" className="btn btn-primary button">
        Register
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};
// Export the Register component
export default Register;

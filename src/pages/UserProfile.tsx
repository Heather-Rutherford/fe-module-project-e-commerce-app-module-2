// DisplayData.tsx
import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";

interface UserProfileData {
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

const UserProfile = () => {
  // State to track the current authenticated user
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileData>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // updateUser Function
  const updateUser = async (
    userId: string,
    updatedData: Partial<UserProfileData>,
  ) => {
    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Listen for authentication state changes and update user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed. User:", user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user profile from Firestore when user state changes
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log("Fetched user profile from Firestore:", data);
          setProfile({
            name: data.name || "",
            email: data.email || "",
            address: data.address || "",
            phone: data.phone || "",
          });
        } else {
          console.log("No Firestore document found for user.");
          setProfile({ name: "", email: "", address: "", phone: "" });
        }
      } else {
        console.log("No user signed in.");
        setProfile({ name: "", email: "", address: "", phone: "" });
      }
    };
    fetchData();
  }, [user]);

  // Debug UI messages
  if (!user) {
    return <div>No user is signed in.</div>;
  }
  if (!profile.name && !profile.email && !profile.address && !profile.phone) {
    return <div>User profile is empty or not found in Firestore.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <form className="user-profile">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={profile.email} readOnly />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={profile.address || ""}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={profile.phone || ""}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={() => updateUser(user.uid, profile)}
          className="btn btn-primary"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;

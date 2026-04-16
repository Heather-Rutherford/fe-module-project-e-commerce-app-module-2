// Import Firebase Authentication deleteUser function
import { deleteUser } from "firebase/auth";
// Import Firebase auth instance
import { auth } from "../firebaseConfig"; // adjust path as needed
// Import Firestore document deletion helpers
import { deleteDoc, doc } from "firebase/firestore";
// Import Firestore db instance
import { db } from "../firebaseConfig"; // adjust the path as needed
// Import Button component from react-bootstrap
import { Button } from "react-bootstrap";

// DeleteUserButton component provides a button to delete the current user's account and Firestore document
function DeleteUserButton() {
  // Handles deleting the user's authentication credentials and Firestore document
  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      // Delete the user from Firebase Authentication
      await deleteUser(user);
      // Delete the user's document from Firestore
      await deleteUserDocument(user.uid);
    }
  };

  // Deletes the user document from Firestore users collection
  const deleteUserDocument = async (uid: string) => {
    await deleteDoc(doc(db, "users", uid));
  };

  // Render the delete account button
  return (
    <Button
      onClick={handleDeleteAccount}
      className="btn btn-danger btn-uniform"
    >
      Delete Account
    </Button>
  );
}

// Export the DeleteUserButton component
export default DeleteUserButton;

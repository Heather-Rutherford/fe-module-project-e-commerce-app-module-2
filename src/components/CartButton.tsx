import { Button } from "react-bootstrap";
// Ensure the following import is present in your App.tsx or main entry file:
// import "../styles/UserProfile.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

function CartButton() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  return user ? (
    <Button
      onClick={() => navigate("/cart")}
      className="btn btn-primary btn-uniform float-end"
    >
      Cart
    </Button>
  ) : (
    <Button
      onClick={() => navigate("/login", { state: { from: "/cart" } })}
      className="btn btn-primary btn-uniform float-end"
    >
      Cart
    </Button>
  );
}

export default CartButton;

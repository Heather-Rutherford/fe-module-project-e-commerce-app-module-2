import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CartButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/cart")}
      className="btn btn-primary float-end"
    >
      Cart
    </Button>
  );
}

export default CartButton;

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/login")}
      className="btn btn-primary float-end"
    >
      Login
    </Button>
  );
}

export default LoginButton;

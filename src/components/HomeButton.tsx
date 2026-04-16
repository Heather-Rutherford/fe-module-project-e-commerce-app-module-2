// Import Button component from react-bootstrap
import { Button } from "react-bootstrap";
// Import useNavigate for navigation
import { useNavigate } from "react-router-dom";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/")}
      className="btn btn-primary btn-uniform"
    >
      Home
    </Button>
  );
}

export default HomeButton;

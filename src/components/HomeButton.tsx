import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/")} className="btn btn-primary float-end">
      Home
    </Button>
  );
}

export default HomeButton;

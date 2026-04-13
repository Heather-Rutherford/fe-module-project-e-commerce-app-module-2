import { Link } from "react-router-dom";

function OrderCompleted() {
  return (
    <div className="empty-cart text-center py-5">
      <h3>Your order is complete</h3>
      <p>Thank you for your purchase!</p>
      <Link to="/" className="btn btn-primary">
        Browse Products
      </Link>
    </div>
  );
}
export default OrderCompleted;

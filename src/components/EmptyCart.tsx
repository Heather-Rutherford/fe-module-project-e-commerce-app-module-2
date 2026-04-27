import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="empty-cart text-center py-5">
      <h3>Your cart is empty</h3>
      <p>Start shopping to add items to your cart</p>
      <Link to="/" className="btn btn-primary">
        Browse Products
      </Link>
    </div>
  );
}
export default EmptyCart;

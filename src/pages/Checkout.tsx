import { Form, Button } from "react-bootstrap";
import PageLayout from "./PageLayout";
import "../styles/styles.css";
import { useState } from "react";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import OrderSummary from "../components/OrderSummary";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import OrderCompleted from "../components/OrderCompleted";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState("");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCountry, setShippingCountry] = useState("United States");
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  // Clear form fields after successful checkout
  const clearForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setShippingAddress("");
    setShippingCity("");
    setShippingState("");
    setShippingZip("");
    setShippingCountry("United States");
    setPaymentMethod("PayPal");
  };

  // Validate form fields before checkout
  const validateForm = () => {
    if (!customerName.trim()) return "Please enter your name.";
    if (
      !customerEmail.trim() ||
      !/^[^@\s]+@[^@\s]+\.(com|net|org|edu|gov|mil)$/i.test(customerEmail)
    )
      return "Please enter a valid email address.";
    if (
      !customerPhone.trim() ||
      !/^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(
        customerPhone,
      )
    )
      return "Please enter a valid phone number.";
    if (!shippingAddress.trim()) return "Please enter your shipping address.";
    if (!shippingCity.trim()) return "Please enter your city.";
    if (!shippingState.trim()) return "Please select your state.";
    if (!shippingZip.trim()) return "Please enter your zip code.";
    if (!shippingCountry.trim()) return "Please enter your country.";
    if (!paymentMethod.trim()) return "Please select a payment method.";
    return "";
  };

  // Place order handler
  const handlePlaceOrder = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      window.alert(errorMsg);
      return;
    }
    setFormError("");
    dispatch(clearCart());
    clearForm();
    window.alert(
      "Your payment has been processed and your cart has been cleared!",
    );
  };

  return (
    <div className="container mt-4">
      <h1>Your Order</h1>
      {cartItems.length === 0 ? (
        <OrderCompleted />
      ) : (
        <>
          <PageLayout>
            <h1 className="h1-responsive font-weight-bold text-center my-4">
              Checkout
            </h1>
            <h2 className="h1-responsive font-weight-bold text-center my-4">
              Order Summary
            </h2>
            <div className="h1-responsive font-weight-bold text-center my-4">
              <div>
                <OrderSummary products={cartItems} />
              </div>
            </div>
            <Form className="text-start position-relative">
              {formError && (
                <div className="alert alert-danger mb-3" role="alert">
                  {formError}
                </div>
              )}
              <section className="mb-4">
                <h2 className="h1-responsive font-weight-bold text-center my-4">
                  Customer Information
                </h2>
                <Form.Label htmlFor="customerName">Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  id="CustomerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
                <Form.Label htmlFor="customerEmail">Customer Email</Form.Label>
                <Form.Control
                  type="email"
                  id="customerEmail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <Form.Label htmlFor="customerPhone">Customer Phone</Form.Label>
                <Form.Control
                  type="tel"
                  id="CustomerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </section>
              <section className="mb-4">
                <h2 className="h1-responsive font-weight-bold text-center my-4">
                  Shipping Address
                </h2>
                <Form.Label htmlFor="shippingAddress">Address</Form.Label>
                <Form.Control
                  type="text"
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                  required
                />
                <Form.Label htmlFor="shippingCity">City</Form.Label>
                <Form.Control
                  type="text"
                  id="shippingCity"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="Enter your city"
                  required
                />
                <Form.Label htmlFor="shippingState">State</Form.Label>
                <Form.Control
                  as="select"
                  id="shippingState"
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  required
                >
                  <option value="">Select your state</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="Arkansas">Arkansas</option>
                  <option value="California">California</option>
                  <option value="Colorado">Colorado</option>
                  <option value="Connecticut">Connecticut</option>
                  <option value="Delaware">Delaware</option>
                  <option value="Florida">Florida</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Hawaii">Hawaii</option>
                  <option value="Idaho">Idaho</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Indiana">Indiana</option>
                  <option value="Iowa">Iowa</option>
                  <option value="Kansas">Kansas</option>
                  <option value="Kentucky">Kentucky</option>
                  <option value="Louisiana">Louisiana</option>
                  <option value="Maine">Maine</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Massachusetts">Massachusetts</option>
                  <option value="Michigan">Michigan</option>
                  <option value="Minnesota">Minnesota</option>
                  <option value="Mississippi">Mississippi</option>
                  <option value="Missouri">Missouri</option>
                  <option value="Montana">Montana</option>
                  <option value="Nebraska">Nebraska</option>
                  <option value="Nevada">Nevada</option>
                  <option value="New Hampshire">New Hampshire</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="New Mexico">New Mexico</option>
                  <option value="New York">New York</option>
                  <option value="North Carolina">North Carolina</option>
                  <option value="North Dakota">North Dakota</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Oklahoma">Oklahoma</option>
                  <option value="Oregon">Oregon</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Rhode Island">Rhode Island</option>
                  <option value="South Carolina">South Carolina</option>
                  <option value="South Dakota">South Dakota</option>
                  <option value="Tennessee">Tennessee</option>
                  <option value="Texas">Texas</option>
                  <option value="Utah">Utah</option>
                  <option value="Vermont">Vermont</option>
                  <option value="Virginia">Virginia</option>
                  <option value="Washington">Washington</option>
                  <option value="West Virginia">West Virginia</option>
                  <option value="Wisconsin">Wisconsin</option>
                  <option value="Wyoming">Wyoming</option>
                </Form.Control>
                <Form.Label htmlFor="shippingZip">Zip</Form.Label>
                <Form.Control
                  type="text"
                  id="shippingZip"
                  value={shippingZip}
                  onChange={(e) => setShippingZip(e.target.value)}
                  placeholder="Enter your zip code"
                  required
                />
                <Form.Label htmlFor="shippingCountry">Country</Form.Label>
                <Form.Control
                  type="text"
                  id="shippingCountry"
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                  placeholder="Enter your country"
                  required
                />
              </section>
              <section className="mb-4">
                <h2>Payment Method</h2>
                <Form.Label htmlFor="paymentMethod">
                  Select Payment Method
                </Form.Label>
                <Form.Control
                  as="select"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="PayPal">PayPal</option>
                  <option value="CreditCard">Credit Card</option>
                  <option value="ApplePay">Apple Pay</option>
                  <option value="GooglePay">Google Pay</option>
                </Form.Control>
              </section>
              {paymentMethod === "CreditCard" && (
                <div className="mb-4">
                  <Form.Label htmlFor="creditCardInfo">
                    Credit Card Information
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="creditCardInfo"
                    placeholder="Enter your card number"
                  />
                  <div className="d-flex mt-2">
                    <Form.Control
                      type="text"
                      id="creditCardExpiry"
                      placeholder="MM/YY"
                    />
                    <Form.Control
                      type="text"
                      id="creditCardCVC"
                      placeholder="CVC"
                      className="ms-2"
                    />
                  </div>
                </div>
              )}
              <Button
                className="btn btn-primary"
                onClick={handlePlaceOrder}
                type="button"
              >
                Place Order
              </Button>
            </Form>
          </PageLayout>
        </>
      )}
    </div>
  );
};
export default Checkout;

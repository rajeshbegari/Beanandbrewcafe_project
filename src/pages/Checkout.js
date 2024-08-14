import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { VisaIcon, MasterCardIcon, AmexIcon, VerveIcon, PayPalIcon, ApplePayIcon } from '../assets/icons/PaymentIcons';
import '../styles.css';

const stripePromise = loadStripe('your-stripe-public-key');

const Checkout = () => {
  const { cartItems, clearCart, lastVisitedPage } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [shippingInfo, setShippingInfo] = useState({ address: '', city: '', state: '', zip: '', country: '' });
  const [billingInfo, setBillingInfo] = useState({ address: '', city: '', state: '', zip: '', country: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the source of the checkout: Cart or Order page
  const orderItems = location.state?.orderItems || [];
  const itemsToCheckout = orderItems.length > 0 ? orderItems : cartItems;

  useEffect(() => {
    if (!itemsToCheckout || itemsToCheckout.length === 0) {
      navigate('/cart');
    }
  }, [itemsToCheckout, navigate]);

  const parsePrice = (priceString) => {
    if (priceString && priceString[0] === '$') {
      return parseFloat(priceString.slice(1));
    }
    return 0;
  };

  const subtotal = itemsToCheckout.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  const federalTaxRate = 0.05;
  const quebecTaxRate = 0.09975;
  const federalTax = subtotal * federalTaxRate;
  const quebecTax = subtotal * quebecTaxRate;
  const total = subtotal + federalTax + quebecTax;

  const handleOrder = async () => {
    if (!validateAddress(shippingInfo.address) || !validateZip(shippingInfo.zip)) {
      setMessage('Invalid shipping address or zip code.');
      return;
    }

    if (paymentMethod === 'Credit Card') {
      const cardElement = elements.getElement(CardElement);
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          address: {
            line1: billingInfo.address,
            city: billingInfo.city,
            state: billingInfo.state,
            postal_code: billingInfo.zip,
            country: billingInfo.country,
          },
        },
      });

      if (error) {
        setMessage('Error processing payment. Please try again.');
      } else {
        setMessage('Payment successful! Receipt has been sent to your email.');
        clearCart();
        navigate('/');
      }
    } else if (paymentMethod === 'Paypal' || paymentMethod === 'ApplePay') {
      setMessage('Payment successful! Receipt has been sent to your email.');
      clearCart();
      navigate('/');
    } else {
      setMessage('Please select a payment method.');
    }
  };

  const handleCancelOrder = () => {
    navigate(lastVisitedPage);
  };

  const validateAddress = (address) => address.trim().length > 0;

  const validateZip = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

  const getStates = (country) => {
    const states = {
      USA: ['California', 'New York', 'Texas'],
      Canada: ['Ontario', 'Quebec', 'British Columbia'],
    };
    return states[country] || [];
  };

  const getCities = (state) => {
    const cities = {
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      New_York: ['New York City', 'Buffalo', 'Rochester'],
      Texas: ['Houston', 'Dallas', 'Austin'],
      Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
      Quebec: ['Montreal', 'Quebec City', 'Laval'],
      British_Columbia: ['Vancouver', 'Victoria', 'Richmond'],
    };
    return cities[state] || [];
  };

  return (
    <main className="checkout-container">
      <div className="container">
        {user && <h3>Account: {user.email}</h3>}
        <h2>Order Summary</h2>
        {itemsToCheckout.map((item) => (
          <div key={item.id}>
            <p>
              {item.caption}
              {item.captionText && (
                <span style={{ fontStyle: 'italic', color: 'gray' }}> from Special Offers</span>
              )} 
              - Quantity: {item.quantity} - Price: ${(parsePrice(item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Federal Tax: ${federalTax.toFixed(2)}</p>
        <p>Quebec Tax: ${quebecTax.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>

        <h3>Shipping Information</h3>
        <form>
          <div className="form-group">
            <label>Country</label>
            <select
              className="form-control"
              value={shippingInfo.country}
              onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          <div className="form-group">
            <label>State/Province</label>
            <select
              className="form-control"
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
            >
              <option value="">Select State/Province</option>
              {getStates(shippingInfo.country).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>City</label>
            <select
              className="form-control"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
            >
              <option value="">Select City</option>
              {getCities(shippingInfo.state).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              className="form-control"
              value={shippingInfo.zip}
              onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
            />
          </div>
        </form>

        <h3>Billing Information</h3>
        <form>
          <div className="form-group">
            <label>Country</label>
            <select
              className="form-control"
              value={billingInfo.country}
              onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          <div className="form-group">
            <label>State/Province</label>
            <select
              className="form-control"
              value={billingInfo.state}
              onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
            >
              <option value="">Select State/Province</option>
              {getStates(billingInfo.country).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>City</label>
            <select
              className="form-control"
              value={billingInfo.city}
              onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
            >
              <option value="">Select City</option>
              {getCities(billingInfo.state).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              value={billingInfo.address}
              onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              className="form-control"
              value={billingInfo.zip}
              onChange={(e) => setBillingInfo({ ...billingInfo, zip: e.target.value })}
            />
          </div>
        </form>

        <h3>Payment Method</h3>
        <form>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="creditCard"
              value="Credit Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="creditCard">
              Credit/Debit Card
            </label>
            <div className="payment-icons">
              <VisaIcon />
              <MasterCardIcon />
              <AmexIcon />
              <VerveIcon />
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="Paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="paypal">
              Paypal
            </label>
            <div className="payment-icons">
              <PayPalIcon />
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="applePay"
              value="ApplePay"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="applePay">
              ApplePay
            </label>
            <div className="payment-icons">
              <ApplePayIcon />
            </div>
          </div>
        </form>

        {paymentMethod === 'Credit Card' && (
          <div className="credit-card-section">
            <Elements stripe={stripePromise}>
              <CardElement />
            </Elements>
          </div>
        )}

        {paymentMethod === 'Paypal' && (
          <PayPalScriptProvider options={{ "client-id": "your-paypal-client-id" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(() => {
                  handleOrder();
                });
              }}
            />
          </PayPalScriptProvider>
        )}

        <button className="btn btn-primary mt-3" onClick={handleOrder}>
          Proceed to Order
        </button>
        <button className="btn btn-secondary mt-3 ml-2" onClick={handleCancelOrder}>
        Cancel Order
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </main>
  );
};

export default Checkout;
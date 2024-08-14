import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { sendReceiptEmail } from '../utils/emailUtils'; // Utility to handle email sending
import '../styles.css';

const Checkout = () => {
  const { cartItems, clearCart, lastVisitedPage } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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

  const generateReceipt = (orderId) => {
    const receiptDetails = {
      orderId,
      items: itemsToCheckout.map(item => ({
        caption: item.caption,
        description: item.description,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      subtotal: subtotal.toFixed(2),
      federalTax: federalTax.toFixed(2),
      quebecTax: quebecTax.toFixed(2),
      total: total.toFixed(2),
      userEmail: user.email,
    };

    sendReceiptEmail(receiptDetails);
  };

  const handleOrder = async (orderId) => {
    generateReceipt(orderId);
    setMessage('Payment successful! Receipt has been sent to your email.');
    clearCart();
    navigate('/');
  };

  const handleCancelOrder = () => {
    navigate(lastVisitedPage);
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

        <PayPalScriptProvider options={{ "client-id": "ASSSqYxFuDop_vK-WC3AX9MXpl-649zUjxZqDOeG5lJ0ZzQOJ4ZkKOAmIUm9M-A5PgyUtGmV5fGQRiJ9" }}>
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
              return actions.order.capture().then(details => {
                handleOrder(details.id); // Pass the order ID to generate the receipt
              });
            }}
          />
        </PayPalScriptProvider>

        <button className="btn btn-primary mt-3" onClick={() => handleOrder('ManualOrderId')}>
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
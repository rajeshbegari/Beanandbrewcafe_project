import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, lastVisitedPage } = useContext(CartContext);
  const { user, moveFromCartToWishlist } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuantityChange = (item, delta) => {
    const newQuantity = Math.max(item.quantity + delta, 1);
    updateCartItemQuantity(item.id, newQuantity);
  };

  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.quantity, 0);
  const federalTaxRate = 0.05;
  const quebecTaxRate = 0.09975;
  const federalTax = subtotal * federalTaxRate;
  const quebecTax = subtotal * quebecTaxRate;
  const total = subtotal + federalTax + quebecTax;

  const handleContinueShopping = () => {
    navigate(lastVisitedPage);
  };

  const handleMoveToWishlist = (item) => {
    if (user) {
      moveFromCartToWishlist(item, removeFromCart);
    } else {
      alert('You need to be logged in to move items to the wishlist.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <main className="cart-container">
      <div className="container">
        <h2>Shopping Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="card mb-3">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={item.image} className="card-img" alt={item.caption} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.caption}
                          {item.captionTag && (
                            <span style={{ fontStyle: 'italic', color: 'gray' }}> {item.captionTag}</span>
                          )}
                        </h5>
                        <div className="quantity-control">
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="quantity-input"
                          />
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="card-text"><strong>${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}</strong></p>
                        <button className="btn btn-danger mr-2" onClick={() => removeFromCart(item.id)}>Remove</button>
                        <button className="btn btn-secondary mr-2" onClick={handleContinueShopping}>Continue Shopping</button>
                        <button className="btn btn-info" onClick={() => handleMoveToWishlist(item)}>Move to Wishlist</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Summary</h5>
                {cartItems.map((item) => (
                  <p key={item.id} className="card-text">
                    Item: {item.caption}
                    {item.captionTag && (
                      <span style={{ fontStyle: 'italic', color: 'gray' }}> {item.captionTag}</span>
                    )}
                    - Quantity: {item.quantity} - Price: ${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}
                  </p>
                ))}
                <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
                <p className="card-text">Federal Tax: ${federalTax.toFixed(2)}</p>
                <p className="card-text">Quebec Tax: ${quebecTax.toFixed(2)}</p>
                <h5 className="card-title">Total: ${total.toFixed(2)}</h5>
                <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;



/*import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, lastVisitedPage } = useContext(CartContext);
  const { user, moveFromCartToWishlist } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuantityChange = (item, delta) => {
    const newQuantity = Math.max(item.quantity + delta, 1);
    updateCartItemQuantity(item.id, newQuantity);
  };

  const parsePrice = (price) => parseFloat(price);  // No need to slice, as we're passing a number now

  // const subtotal = cartItems.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const federalTaxRate = 0.05;
  const quebecTaxRate = 0.09975;
  const federalTax = subtotal * federalTaxRate;
  const quebecTax = subtotal * quebecTaxRate;
  const total = subtotal + federalTax + quebecTax;

  const handleContinueShopping = () => {
    navigate(lastVisitedPage);
  };

  const handleMoveToWishlist = (item) => {
    if (user) {
      moveFromCartToWishlist(item, removeFromCart);
    } else {
      alert('You need to be logged in to move items to the wishlist.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <main className="cart-container">
      <div className="container">
        <h2>Shopping Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="card mb-3">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={item.image} className="card-img" alt={item.caption} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.caption}
                          {item.captionTag && (
                            <span style={{ fontStyle: 'italic', color: 'gray' }}> {item.captionTag}</span>
                          )}
                        </h5>
                        <div className="quantity-control">
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item, -1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="quantity-input"
                          />
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="card-text"><strong>${(parsePrice(item.price) * item.quantity).toFixed(2)}</strong></p>
                        <button className="btn btn-danger mr-2" onClick={() => removeFromCart(item.id)}>Remove</button>
                        <button className="btn btn-secondary mr-2" onClick={handleContinueShopping}>Continue Shopping</button>
                        <button className="btn btn-info" onClick={() => handleMoveToWishlist(item)}>Move to Wishlist</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Summary</h5>
                {cartItems.map((item) => (
                  <p key={item.id} className="card-text">
                    Item: {item.caption}
                    {item.captionTag && (
                      <span style={{ fontStyle: 'italic', color: 'gray' }}> {item.captionTag}</span>
                    )}
                    - Quantity: {item.quantity} - Price: ${(parsePrice(item.price) * item.quantity).toFixed(2)}
                  </p>
                ))}
                <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
                <p className="card-text">Federal Tax: ${federalTax.toFixed(2)}</p>
                <p className="card-text">Quebec Tax: ${quebecTax.toFixed(2)}</p>
                <h5 className="card-title">Total: ${total.toFixed(2)}</h5>
                <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;*/
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const Cart = () => {
  const { cartItems, removeFromCart, lastVisitedPage } = useContext(CartContext);
  const { user, moveFromCartToWishlist } = useContext(AuthContext);
  const navigate = useNavigate();

  const federalTaxRate = 0.05; // Canada Federal Tax Rate
  const quebecTaxRate = 0.09975; // Quebec Tax Rate

  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)), 0);
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
    navigate('/checkout');
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
                        <h5 className="card-title">{item.caption}</h5>
                        <p className="card-text"><strong>{item.price}</strong></p>
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
                    Item: {item.caption} - Price: {item.price}
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
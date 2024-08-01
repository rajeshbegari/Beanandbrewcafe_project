import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, user } = useContext(AuthContext);
  const item = location.state?.item || null;
  const referrer = location.state?.referrer || '/';
  const [message, setMessage] = useState('');

  if (!item) {
    return <p>Item not found.</p>;
  }

  const federalTaxRate = 0.05; // Canada Federal Tax Rate
  const quebecTaxRate = 0.09975; // Quebec Tax Rate

  const subtotal = parseFloat(item.currentPrice.slice(1));
  const federalTax = subtotal * federalTaxRate;
  const quebecTax = subtotal * quebecTaxRate;
  const total = subtotal + federalTax + quebecTax;

  const handleAddToCart = () => {
    addToCart(item);
    setMessage('Added to Cart');
    setTimeout(() => {
      setMessage('');
      navigate(referrer);
    }, 2000); // Display message for 2 seconds before redirecting to the referrer page
  };

  const handleAddToWishlist = () => {
    if (user) {
      addToWishlist(item);
      setMessage('Added to Wishlist');
      setTimeout(() => {
        setMessage('');
        navigate(referrer);
      }, 2000); // Display message for 2 seconds before redirecting
    } else {
      alert('You need to be logged in to add items to the wishlist.');
    }
  };

  return (
    <main className="cart-container">
      <div className="container">
        <h2>Order Item</h2>
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={item.image} className="card-img" alt={item.caption} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                  <h5 className="card-title">{item.caption}</h5>
                    <p className="card-text"><strong>{item.currentPrice}</strong></p>
                    <button className="btn btn-secondary mr-2" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="btn btn-info" onClick={handleAddToWishlist}>Add to Wishlist</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Summary</h5>
                <p className="card-text">Item: {item.caption}</p>
                <p className="card-text">Price: {item.currentPrice}</p>
                <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
                <p className="card-text">Federal Tax: ${federalTax.toFixed(2)}</p>
                <p className="card-text">Quebec Tax: ${quebecTax.toFixed(2)}</p>
                <h5 className="card-title">Total: ${total.toFixed(2)}</h5>
                <button className="btn btn-primary">Checkout</button>
              </div>
            </div>
          </div>
        </div>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </main>
  );
};

export default Order;


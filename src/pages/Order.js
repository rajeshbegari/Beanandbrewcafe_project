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
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <p>Item not found.</p>;
  }

  const itemPrice = item.price ? parseFloat(item.price.replace('$', '')) : 0;

  const federalTaxRate = 0.05;
  const quebecTaxRate = 0.09975;

  const subtotal = itemPrice * quantity;
  const federalTax = subtotal * federalTaxRate;
  const quebecTax = subtotal * quebecTaxRate;
  const total = subtotal + federalTax + quebecTax;

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1));
  };

  const handleAddToCart = () => {
    addToCart({
      ...item,
      price: item.price,
      quantity,
      captionTag: item.captionTag, // Ensure the captionTag is maintained
    });
    setMessage('Added to Cart');
    setTimeout(() => {
      setMessage('');
      navigate(referrer);
    }, 2000);
  };

  const handleAddToWishlist = () => {
    if (user) {
      addToWishlist({ ...item, quantity });
      setMessage('Added to Wishlist');
      setTimeout(() => {
        setMessage('');
        navigate(referrer);
      }, 2000);
    } else {
      alert('You need to be logged in to add items to the wishlist.');
    }
  };

  const handleCheckout = () => {
    const newCartItem = { ...item, price: item.price, quantity, captionTag: item.captionTag };
    addToCart(newCartItem);
    navigate('/checkout', { state: { orderItems: [newCartItem] } });
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
                    <h5 className="card-title">
                      {item.caption}
                      {item.captionTag && (
                        <span style={{ fontStyle: 'italic', color: 'gray' }}> {item.captionTag}</span>
                      )}
                    </h5>
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="quantity-input"
                      />
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="card-text"><strong>${(itemPrice * quantity).toFixed(2)}</strong></p>
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
                {item.captionTag && (
                  <p className="card-text"><span style={{ fontStyle: 'italic', color: 'gray' }}>{item.captionTag}</span></p>
                )}
                <p className="card-text">Price: {item.price}</p>
                <p className="card-text">Quantity: {quantity}</p>
                <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
                <p className="card-text">Federal Tax: ${federalTax.toFixed(2)}</p>
                <p className="card-text">Quebec Tax: ${quebecTax.toFixed(2)}</p>
                <h5 className="card-title">Total: ${total.toFixed(2)}</h5>
                <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
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



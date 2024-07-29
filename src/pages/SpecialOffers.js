
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const specialOffersData = [
  { id: 1, caption: 'Espresso', beforePrice: '$5.00', currentPrice: '$3.00', image: 'path_to_image1.jpg' },
  { id: 2, caption: 'Latte', beforePrice: '$6.00', currentPrice: '$4.50', image: 'path_to_image2.jpg' },
  { id: 3, caption: 'Cappuccino', beforePrice: '$5.50', currentPrice: '$3.50', image: 'path_to_image3.jpg' },
  { id: 4, caption: 'Americano', beforePrice: '$4.50', currentPrice: '$3.00', image: 'path_to_image4.jpg' },
  { id: 5, caption: 'Mocha', beforePrice: '$6.50', currentPrice: '$5.00', image: 'path_to_image5.jpg' },
  { id: 6, caption: 'Macchiato', beforePrice: '$5.75', currentPrice: '$4.25', image: 'path_to_image6.jpg' },
  { id: 7, caption: 'Flat White', beforePrice: '$5.25', currentPrice: '$4.00', image: 'path_to_image7.jpg' },
  { id: 8, caption: 'Iced Coffee', beforePrice: '$4.75', currentPrice: '$3.50', image: 'path_to_image8.jpg' },
  { id: 9, caption: 'Cold Brew', beforePrice: '$5.00', currentPrice: '$3.75', image: 'path_to_image9.jpg' },
];

const SpecialOffers = () => {
  const { addToCart, setLastVisitedPage } = useContext(CartContext);
  const { user, addToWishlist } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLastVisitedPage('/special-offers');
  }, [setLastVisitedPage]);

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      price: item.currentPrice // Ensure price is properly formatted
    });
    setMessage('Added to Cart');
    setTimeout(() => {
      setMessage('');
      navigate('/cart');
    }, 2000); // Display message for 2 seconds before redirecting to Cart page
  };

  const handleOrder = (item) => {
    navigate(`/order/${item.id}`, { state: { item, referrer: '/special-offers' } });
  };

  return (
    <main className="special-offers-container">
      <div className="container">
        <h2>Special Offers</h2>
        <div className="row">
          {specialOffersData.map((offer) => (
            <div key={offer.id} className="col-md-4 mb-4">
              <div className="card offer-card">
                <img src={offer.image} className="card-img-top" alt={offer.caption} />
                <div className="card-body">
                  <h5 className="card-title">{offer.caption}</h5>
                  <p className="card-text">
                    Price: <span className="before-price">{offer.beforePrice}</span> <span className="current-price">{offer.currentPrice}</span>
                  </p>
                  <button className="btn btn-primary mr-2" onClick={() => handleOrder(offer)}>Order</button>
                  <button className="btn btn-secondary mr-2" onClick={() => handleAddToCart(offer)}>Add to Cart</button>
                  <button className="btn btn-info" onClick={() => addToWishlist(offer)}>Add to Wishlist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </main>
  );
};

export default SpecialOffers;
